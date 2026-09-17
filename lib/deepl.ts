import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { CMS_TAG } from './microcms/content';
import {
  buildTranslationBatches,
  isTranslationBatchWithinLimit,
  requestDeepLTranslation,
} from './deepl-request';

const translationTag = 'gusto-menu-translations';
async function translateBatch(texts: string[]) {
  'use cache';
  cacheLife('hours');
  cacheTag(CMS_TAG, translationTag);
  return requestDeepLTranslation(texts, process.env.DEEPL_API_KEY!);
}

async function translateTexts(texts: string[]) {
  if (!process.env.DEEPL_API_KEY || texts.length === 0) return texts;
  const translated: string[] = [];
  for (const batch of buildTranslationBatches(texts)) {
    if (!isTranslationBatchWithinLimit(batch)) {
      translated.push(...batch);
      continue;
    }
    try {
      translated.push(...(await translateBatch(batch)));
    } catch (error) {
      console.error(
        'DeepL translation request failed',
        error instanceof Error ? error.message : error,
      );
      translated.push(...batch);
    }
  }
  return translated;
}

export async function translateManagedFields<
  T extends { name: string; description?: string },
>(items: T[]) {
  const source = items.flatMap((item) => [
    item.name,
    ...(item.description ? [item.description] : []),
  ]);
  const translated = await translateTexts(source);
  let index = 0;
  return items.map((item) => ({
    ...item,
    name: translated[index++] ?? item.name,
    description: item.description
      ? (translated[index++] ?? item.description)
      : undefined,
  }));
}

export async function translateMenuFields<
  T extends { name: string; description?: string; category: string },
>(items: T[]) {
  const categories = [...new Set(items.map((item) => item.category))];
  const [translatedItems, translatedCategories] = await Promise.all([
    translateManagedFields(items),
    translateTexts(categories),
  ]);
  const labels = new Map(
    categories.map((category, index) => [
      category,
      translatedCategories[index] ?? category,
    ]),
  );
  return translatedItems.map((item) => ({
    ...item,
    categoryLabel: labels.get(item.category) ?? item.category,
  }));
}
