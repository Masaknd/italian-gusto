export function getMenuCategoryAnchor(category: string) {
  const slug = category
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('ja')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return `category-${slug || 'menu'}`;
}
