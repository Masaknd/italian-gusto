import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildPlan, parseSource } from '../scripts/import-menus.mjs';

const drink = {
  menuName: 'ジンジャーエール',
  category: 'drink',
  subCategory: 'soft-drink',
  subSubCategory: '',
  price: 300,
  description: '',
  image: { url: '', width: 0, height: 0 },
  sortOrder: 1,
  isAvailable: true,
};

test('drink import preserves Japanese CMS category, price and subgroup fields', () => {
  assert.deepEqual(parseSource([drink]), [{
    name: 'ジンジャーエール',
    category: ['ドリンク'],
    subCategory: 'soft-drink',
    type: '',
    priceExcludingTax: 300,
    sortOrder: 1,
    isAvailable: true,
  }]);
});

test('wine styles map from source subSubCategory to the CMS type field', () => {
  const [wine] = parseSource([{ ...drink, subCategory: 'wine', subSubCategory: 'sparkling' }]);
  assert.equal(wine.type, 'sparkling');
  assert.equal(Object.hasOwn(wine, 'subSubCategory'), false);
});

test('import updates an existing drink, adds missing drinks, and leaves food untouched', () => {
  const desired = parseSource([
    drink,
    { ...drink, menuName: '赤ワイン', subCategory: 'wine', subSubCategory: 'red', sortOrder: 2 },
  ]);
  const existing = [
    { ...desired[0], id: 'ginger', priceExcludingTax: 350, subCategory: undefined },
    { ...desired[0], id: 'food', name: 'ピザ', category: ['ピザ'] },
  ];
  const plan = buildPlan(desired, existing);
  assert.deepEqual(plan.map(({ action, contentId }) => ({ action, contentId })), [
    { action: 'update', contentId: 'ginger' },
    { action: 'create', contentId: undefined },
  ]);
  assert.deepEqual(
    buildPlan(desired, desired.map((content, i) => ({ ...content, id: String(i) }))).map(x => x.action),
    ['skip', 'skip'],
  );
});

test('import rejects duplicate names and sort orders before writing', () => {
  assert.throws(() => parseSource([drink, { ...drink, sortOrder: 2 }]), /Duplicate menuName/);
  assert.throws(() => parseSource([drink, { ...drink, menuName: '赤ワイン' }]), /Duplicate sortOrder/);
});

test('import refuses ambiguous existing names and invalid subgroup types', () => {
  const [desired] = parseSource([drink]);
  assert.throws(
    () => buildPlan([desired], [{ ...desired, id: 'a' }, { ...desired, id: 'b' }]),
    /2 existing contents have that name/,
  );
  assert.throws(() => parseSource([{ ...drink, subCategory: ['wine'] }]), /subCategory must be a string/);
});

test('empty optional subgroup text round-trips when CMS omits the empty field', () => {
  const [desired] = parseSource([drink]);
  const stored = { ...desired, id: 'ginger', type: undefined };
  assert.equal(buildPlan([desired], [stored])[0].action, 'skip');
  assert.equal(buildPlan([desired], [{ ...stored, subCategory: undefined }])[0].action, 'update');
});
