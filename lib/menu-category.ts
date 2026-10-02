export function isDrinkMenuCategory(category: string) {
  const normalizedCategory = category
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('ja');

  return normalizedCategory === 'drink' || normalizedCategory === 'ドリンク';
}

export function putDrinkMenuCategoryLast<T>(groups: [string, T][]) {
  return [
    ...groups.filter(([category]) => !isDrinkMenuCategory(category)),
    ...groups.filter(([category]) => isDrinkMenuCategory(category)),
  ];
}

export function getMenuCategoryAnchor(category: string) {
  const slug = category
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('ja')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return `category-${slug || 'menu'}`;
}

export function groupDrinkMenus<
  T extends { subCategory?: string; type?: string },
>(menus: T[]) {
  return Object.entries(
    Object.groupBy(menus, (menu) => menu.subCategory?.trim() ?? ''),
  ).map(([subCategory, items]) => ({
    subCategory,
    types: Object.entries(
      Object.groupBy(items ?? [], (menu) => menu.type?.trim() ?? ''),
    ).map(([type, typeItems]) => ({ type, items: typeItems ?? [] })),
  }));
}
