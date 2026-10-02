import type { Locale } from '@/lib/i18n';
import type { Menu } from '@/lib/microcms/types';
import type { getDictionary } from '@/locales';
import { groupDrinkMenus } from '@/lib/menu-category';
import { LanguageFont } from './language-font';
import { MenuCardGrid } from './menu-card-grid';

export function DrinkMenuList({
  items,
  copy,
  locale,
}: {
  items: Menu[];
  copy: ReturnType<typeof getDictionary>;
  locale: Locale;
}) {
  const subCategoryLabels: Readonly<Record<string, string>> =
    copy.menu.drinkSubCategories;
  const typeLabels: Readonly<Record<string, string>> = copy.menu.drinkTypes;

  return (
    <div className='flex w-full flex-col gap-12'>
      {groupDrinkMenus(items).map(({ subCategory, types }) => (
        <div
          key={subCategory}
          className='gusto-menu__drink-subcategory flex w-full flex-col items-start gap-6'
        >
          {subCategory && (
            <h3 className='gusto-menu__subcategory-title m-0 font-display text-[28px] leading-tight font-normal tracking-[-0.25em] text-ink sm:text-[32px]'>
              {subCategoryLabels[subCategory.toLowerCase()] ?? subCategory}
            </h3>
          )}
          {types.map(({ type, items: typeItems }) => (
            <div
              key={type}
              className='gusto-menu__drink-type flex w-full flex-col items-start gap-4'
            >
              {type && (
                <LanguageFont
                  as={subCategory ? 'h4' : 'h3'}
                  locale={locale}
                  className='gusto-menu__type-title m-0 text-lg leading-tight font-normal text-coral sm:text-xl'
                >
                  {typeLabels[type.toLowerCase()] ?? type}
                </LanguageFont>
              )}
              <MenuCardGrid
                excludingTaxLabel={copy.menu.excludingTax}
                items={typeItems}
                locale={locale}
                headingAs={
                  subCategory && type ? 'h5' : subCategory || type ? 'h4' : 'h3'
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
