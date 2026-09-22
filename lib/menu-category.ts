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
