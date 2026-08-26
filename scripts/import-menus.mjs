// @ts-check

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import nextEnv from '@next/env';
import { createClient } from 'microcms-js-sdk';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(projectRoot, 'app/sample-menu-list.json');
const endpoint = 'menus';
const { loadEnvConfig } = nextEnv;
const categoryMap = new Map([
  ['appatizer', 'appetizer'],
  ['appetizer', 'appetizer'],
  ['a la carte', 'a la carte'],
  ['salad', 'salad'],
  ['pasta', 'Pasta'],
  ['pizza', 'Pizza'],
  ['desert', 'dessert'],
  ['dessert', 'dessert'],
]);

/** @typedef {{ url: string, width?: number, height?: number }} SourceImage */
/**
 * @typedef {object} SourceMenu
 * @property {string} menuName
 * @property {string} category
 * @property {number} price
 * @property {string=} description
 * @property {SourceImage=} image
 * @property {number} sortOrder
 * @property {boolean} isAvailable
 */
/**
 * @typedef {object} MenuWriteContent
 * @property {string} name
 * @property {string[]} category
 * @property {number} priceExcludingTax
 * @property {string=} description
 * @property {SourceImage=} image
 * @property {number} sortOrder
 * @property {boolean} isAvailable
 */
/** @typedef {MenuWriteContent & { id: string }} ExistingMenu */

function usage() {
  console.log(`Import app/sample-menu-list.json into the microCMS "menus" API.

Usage:
  pnpm import:menus           Validate and preview changes (no writes)
  pnpm import:menus --write   Create missing menu content with POST
  pnpm import:menus --write --allow-updates
                              Apply changes to existing content with PATCH

The command loads MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY from the same
.env files as Next.js. GET and POST are required; PATCH is required only with
--allow-updates.`);
}

/** @param {unknown} value @param {string} field */
function requireNonEmptyString(value, field) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${field} must be a non-empty string`);
  }
  return value.trim();
}

/** @param {unknown} value @param {string} field */
function requireNonNegativeInteger(value, field) {
  if (!Number.isInteger(value) || /** @type {number} */ (value) < 0) {
    throw new Error(`${field} must be a non-negative integer`);
  }
  return /** @type {number} */ (value);
}

/** @param {unknown} value @param {number} index */
export function parseSourceMenu(value, index) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Item ${index + 1} must be an object`);
  }

  const item = /** @type {Record<string, unknown>} */ (value);
  const name = requireNonEmptyString(item.menuName, `Item ${index + 1}.menuName`);
  const sourceCategory = requireNonEmptyString(
    item.category,
    `Item ${index + 1}.category`,
  );
  const cmsCategory = categoryMap.get(sourceCategory);
  if (!cmsCategory) {
    throw new Error(
      `Item ${index + 1}.category has no microCMS mapping: ${sourceCategory}`,
    );
  }
  const description =
    item.description === undefined || item.description === ''
      ? undefined
      : requireNonEmptyString(item.description, `Item ${index + 1}.description`);

  if (typeof item.isAvailable !== 'boolean') {
    throw new Error(`Item ${index + 1}.isAvailable must be a boolean`);
  }

  /** @type {MenuWriteContent} */
  const content = {
    name,
    category: [cmsCategory],
    priceExcludingTax: requireNonNegativeInteger(
      item.price,
      `Item ${index + 1}.price`,
    ),
    sortOrder: requireNonNegativeInteger(
      item.sortOrder,
      `Item ${index + 1}.sortOrder`,
    ),
    isAvailable: item.isAvailable,
  };

  if (description) content.description = description;

  // Only microCMS media-library URLs are valid for a microCMS image field.
  // Placeholder values in the sample JSON are intentionally ignored.
  if (item.image && typeof item.image === 'object' && !Array.isArray(item.image)) {
    const image = /** @type {Record<string, unknown>} */ (item.image);
    if (
      typeof image.url === 'string' &&
      /^https:\/\/images\.microcms-assets\.io\/assets\//.test(image.url)
    ) {
      content.image = {
        url: image.url,
        ...(typeof image.width === 'number' ? { width: image.width } : {}),
        ...(typeof image.height === 'number' ? { height: image.height } : {}),
      };
    }
  }

  return content;
}

/** @param {unknown} value */
export function parseSource(value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('The sample menu source must be a non-empty array');
  }

  const menus = value.map(parseSourceMenu);
  const names = new Set();
  const sortOrders = new Set();

  for (const menu of menus) {
    if (names.has(menu.name)) {
      throw new Error(`Duplicate menuName in source: ${menu.name}`);
    }
    if (sortOrders.has(menu.sortOrder)) {
      throw new Error(`Duplicate sortOrder in source: ${menu.sortOrder}`);
    }
    names.add(menu.name);
    sortOrders.add(menu.sortOrder);
  }

  return menus;
}

/** @param {MenuWriteContent} desired @param {ExistingMenu} existing */
function needsUpdate(desired, existing) {
  return Object.entries(desired).some(([key, value]) => {
    const current = existing[/** @type {keyof MenuWriteContent} */ (key)];
    return JSON.stringify(current) !== JSON.stringify(value);
  });
}

/** @param {MenuWriteContent[]} menus @param {ExistingMenu[]} existingMenus */
export function buildPlan(menus, existingMenus) {
  /** @type {Map<string, ExistingMenu[]>} */
  const existingByName = new Map();
  for (const menu of existingMenus) {
    const matches = existingByName.get(menu.name) ?? [];
    matches.push(menu);
    existingByName.set(menu.name, matches);
  }

  return menus.map((content) => {
    const matches = existingByName.get(content.name) ?? [];
    if (matches.length > 1) {
      throw new Error(
        `Cannot safely import "${content.name}": ${matches.length} existing contents have that name`,
      );
    }
    if (matches.length === 0) return { action: 'create', content };
    if (needsUpdate(content, matches[0])) {
      return { action: 'update', contentId: matches[0].id, content };
    }
    return { action: 'skip', contentId: matches[0].id, content };
  });
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--help')) {
    usage();
    return;
  }

  const unknownArgs = [...args].filter(
    (arg) => arg !== '--write' && arg !== '--allow-updates',
  );
  if (unknownArgs.length > 0) {
    throw new Error(`Unknown argument: ${unknownArgs.join(', ')}`);
  }

  loadEnvConfig(projectRoot);
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) {
    throw new Error(
      'MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY must be set in .env.local',
    );
  }

  const source = JSON.parse(await readFile(sourcePath, 'utf8'));
  const menus = parseSource(source);
  const client = createClient({ serviceDomain, apiKey });
  const existingMenus = /** @type {ExistingMenu[]} */ (
    await client.getAllContents({ endpoint })
  );
  const plan = buildPlan(menus, existingMenus);
  const totals = Object.groupBy(plan, ({ action }) => action);

  console.log(
    `${args.has('--write') ? 'Importing' : 'Dry run for'} ${menus.length} menus: ` +
      `${totals.create?.length ?? 0} create, ` +
      `${totals.update?.length ?? 0} update, ` +
      `${totals.skip?.length ?? 0} unchanged.`,
  );
  console.log(
    `${menus.filter((menu) => !menu.image).length} placeholder images will be omitted.`,
  );

  if (!args.has('--write')) {
    console.log('No content was written. Re-run with --write to apply this plan.');
    return;
  }
  if ((totals.update?.length ?? 0) > 0 && !args.has('--allow-updates')) {
    throw new Error(
      `${totals.update.length} existing menus require PATCH. Grant PATCH access and re-run with --write --allow-updates.`,
    );
  }

  let completed = 0;
  for (const item of plan) {
    if (item.action === 'create') {
      // Omitting contentId intentionally uses microCMS's POST API.
      await client.create({ endpoint, content: item.content });
    } else if (item.action === 'update') {
      await client.update({
        endpoint,
        contentId: item.contentId,
        content: item.content,
      });
    }
    completed += 1;
    console.log(`[${completed}/${plan.length}] ${item.action}: ${item.content.name}`);
  }

  const storedMenus = /** @type {ExistingMenu[]} */ (
    await client.getAllContents({ endpoint })
  );
  const remainingChanges = buildPlan(menus, storedMenus).filter(
    ({ action }) => action !== 'skip',
  );
  if (remainingChanges.length > 0) {
    throw new Error(
      `Post-write verification failed: ${remainingChanges.length} menus still differ from the source`,
    );
  }

  console.log('Menu import completed successfully.');
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
