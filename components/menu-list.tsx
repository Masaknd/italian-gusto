import Image from 'next/image';
import type { Menu } from '@/lib/microcms/types';
import type { getDictionary } from '@/locales';
import { Marquee } from './marquee';
import { MenuPrice } from './menu-price';

type Copy = ReturnType<typeof getDictionary>;

const drinkCategory = (category: string) => /drink|ドリンク/i.test(category);

export function MenuList({ menus, copy }: { menus: Menu[]; copy: Copy }) {
  const groups = Object.entries(Object.groupBy(menus, (menu) => menu.category));

  if (!groups.length) {
    return <p className='m-0 text-muted'>{copy.menu.unavailable}</p>;
  }

  return (
    <>
      <nav
        className='gusto-menu__category-nav flex w-full flex-wrap content-center items-center gap-4 gap-y-2 sm:content-normal lg:flex lg:items-end lg:justify-start lg:gap-6 3xl:gap-8'
        aria-label={copy.menu.categoryNavigation}
      >
        {groups.map(([category], index) => (
          <span
            className='flex min-w-0 items-center justify-center'
            key={category}
          >
            {index > 0 && (
              <span
                className='mr-2 block h-[24px] w-0 self-center border-l-[3px] border-dashed border-coral sm:h-[32px] xl:mr-4 3xl:mr-6 3xl:h-[50px]'
                aria-hidden='true'
              />
            )}
            <a
              href={`#menu-category-${index + 1}`}
              className={[
                'inline-flex items-center justify-center font-display text-2xl leading-[29px] font-normal tracking-[-0.25em] whitespace-nowrap text-coral no-underline sm:text-[32px] sm:leading-[40px] xl:text-5xl xl:leading-[58px] 3xl:text-[60px]! 3xl:leading-[72px]!',
                index === 0 ? 'text-[#c3a8a2]!' : '',
                category.length > 7 ? 'scale-x-[0.82] sm:scale-x-100' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {category}
            </a>
          </span>
        ))}
      </nav>

      <div className='flex w-full flex-col gap-[136px]'>
        {groups.map(([category, items], index) => {
          return (
            <section
              key={category}
              id={`menu-category-${index + 1}`}
              className='gusto-menu__group flex w-full scroll-mt-6 flex-col gap-8'
              aria-labelledby={`menu-category-heading-${index + 1}`}
            >
              <h2
                id={`menu-category-heading-${index + 1}`}
                className='gusto-menu__category-title m-0 flex w-fit items-center border-b-[3px] border-dashed border-coral font-display text-[24px] leading-[24px] font-normal tracking-[-0.25em] text-coral sm:text-[40px] sm:leading-[40px] xl:text-5xl xl:leading-12'
              >
                {category}
              </h2>
              <div
                className={[
                  'gusto-menu__grid grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 3xl:w-[calc(100%_-_6px)] 3xl:grid-cols-4',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {items?.map((item) => {
                  const drink = drinkCategory(item.category);

                  return (
                    <article
                      key={item.id}
                      className={
                        drink
                          ? 'gusto-menu-card flex h-auto min-h-0 min-w-0 flex-row items-baseline justify-between gap-6 bg-transparent p-0'
                          : 'gusto-menu-card flex min-w-0 flex-col items-start gap-4 rounded-2xl bg-[#fbece6] p-6'
                      }
                    >
                      {!drink && item.image?.url.trim() && (
                        <div className='gusto-menu-card__image relative aspect-[414/412.25] w-full flex-none'>
                          <Image
                            src={item.image.url.trim()}
                            alt={item.image.alt ?? item.name}
                            fill
                            sizes='(max-width: 767px) calc(100vw - 80px), (max-width: 1023px) 300px, (max-width: 1599px) 352px, 416px'
                            className='object-contain'
                          />
                        </div>
                      )}
                      <div className='flex min-h-0 w-full flex-1 flex-col gap-2'>
                        <h3
                          className={
                            drink
                              ? 'm-0 font-display text-base leading-[50px] font-normal tracking-[-0.25em] text-ink'
                              : 'm-0 font-display text-[28px] leading-[34px] font-normal tracking-[-0.25em] text-coral xl:text-4xl xl:leading-[43px] 3xl:text-[42px]! 3xl:leading-[50px]!'
                          }
                        >
                          {item.name}
                        </h3>
                        {!drink && item.description && (
                          <p className='m-0 font-accent text-sm leading-[1.5] font-normal whitespace-pre-line text-black xl:text-lg xl:leading-[1.36]'>
                            {item.description}
                          </p>
                        )}
                        {!drink && (
                          <MenuPrice
                            includingTaxLabel={copy.menu.includingTax}
                            priceExcludingTax={item.priceExcludingTax}
                          />
                        )}
                      </div>
                      {drink && (
                        <MenuPrice
                          includingTaxLabel={copy.menu.includingTax}
                          priceExcludingTax={item.priceExcludingTax}
                        />
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <Marquee
        className='gusto-menu__marquee top-[46px] left-[90px] hidden 3xl:block'
        text={copy.home.verticalTitle}
      />
    </>
  );
}
