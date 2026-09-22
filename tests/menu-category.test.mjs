import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  isDrinkMenuCategory,
  putDrinkMenuCategoryLast,
} from '../lib/menu-category.ts';

test('drink category matching supports CMS values in both source languages', () => {
  assert.equal(isDrinkMenuCategory('drink'), true);
  assert.equal(isDrinkMenuCategory(' Drink '), true);
  assert.equal(isDrinkMenuCategory('ドリンク'), true);
  assert.equal(isDrinkMenuCategory('dessert'), false);
});

test('drink groups appear last without changing the order of other categories', () => {
  const groups = [
    ['appetizer', ['olives']],
    ['drink', ['wine']],
    ['pasta', ['carbonara']],
    ['dessert', ['tiramisu']],
  ];

  assert.deepEqual(
    putDrinkMenuCategoryLast(groups).map(([category]) => category),
    ['appetizer', 'pasta', 'dessert', 'drink'],
  );
});
