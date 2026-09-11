import type { Menu } from '@/lib/microcms/types';
import type { getDictionary } from '@/locales';
import { AnimatedMarquee } from './animated-marquee';
import { InViewHeading } from './in-view-heading';
import { MenuCardGrid } from './menu-card-grid';
import { MenuCategoryNav } from './menu-category-nav';

type Copy = ReturnType<typeof getDictionary>;

export function MenuList({ menus, copy }: { menus: Menu[]; copy: Copy }) {
  const groups = Object.entries(Object.groupBy(menus, (menu) => menu.category));

  if (!groups.length) {
    return <p className='m-0 text-muted'>{copy.menu.unavailable}</p>;
  }

  return (
    <>
      <MenuCategoryNav
        ariaLabel={copy.menu.categoryNavigation}
        categories={groups.map(([category]) => category)}
      />

      <div className='flex w-full flex-col gap-[136px]'>
        {groups.map(([category, items], index) => {
          return (
            <section
              key={category}
              id={`category-${index + 1}`}
              className='gusto-menu__group flex w-full scroll-mt-6 flex-col gap-8'
              aria-labelledby={`menu-category-heading-${index + 1}`}
            >
              <InViewHeading
                id={`menu-category-heading-${index + 1}`}
                className='gusto-menu__category-title m-0 flex w-fit items-center border-b-[3px] border-dashed border-coral font-display text-[24px] leading-[24px] font-normal tracking-[-0.25em] text-coral sm:text-[40px] sm:leading-[40px] xl:text-5xl xl:leading-12'
              >
                {category}
              </InViewHeading>
              <MenuCardGrid
                includingTaxLabel={copy.menu.includingTax}
                items={items ?? []}
              />
            </section>
          );
        })}
      </div>

      <AnimatedMarquee
        className='gusto-menu__marquee top-[46px] left-[90px] hidden 3xl:block'
        text={copy.home.verticalTitle}
      />
    </>
  );
}
