import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  isDrinkMenuCategory,
  groupDrinkMenus,
  putDrinkMenuCategoryLast,
} from '../lib/menu-category.ts';

test('drink category matching supports CMS values in both source languages', () => {
  assert.equal(isDrinkMenuCategory('drink'), true);
  assert.equal(isDrinkMenuCategory(' Drink '), true);
  assert.equal(isDrinkMenuCategory('ドリンク'), true);
  assert.equal(isDrinkMenuCategory('dessert'), false);
});

test('drinks group by subcategory then type, preserving first appearance and item order', () => {
  const menus = [
    { id: 'red-1', subCategory: 'wine', type: 'red' },
    { id: 'beer-1', subCategory: 'beer' },
    { id: 'white-1', subCategory: 'wine', type: 'white' },
    { id: 'red-2', subCategory: 'wine', type: 'red' },
    { id: 'beer-2', subCategory: 'beer', type: '' },
    { id: 'house-wine', subCategory: 'wine', type: '  ' },
    { id: 'ungrouped' },
    { id: 'type-only', type: 'sparkling' },
  ];
  assert.deepEqual(groupDrinkMenus(menus), [
    {
      subCategory: 'wine',
      types: [
        { type: 'red', items: [menus[0], menus[3]] },
        { type: 'white', items: [menus[2]] },
        { type: '', items: [menus[5]] },
      ],
    },
    {
      subCategory: 'beer',
      types: [{ type: '', items: [menus[1], menus[4]] }],
    },
    {
      subCategory: '',
      types: [
        { type: '', items: [menus[6]] },
        { type: 'sparkling', items: [menus[7]] },
      ],
    },
  ]);
  assert.deepEqual(groupDrinkMenus([]), []);
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
