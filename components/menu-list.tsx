import Image from 'next/image';
import type { Menu } from '@/lib/microcms/types';
import { includingTax } from '@/lib/site-config';
import type { getDictionary } from '@/locales';
import { Marquee } from './marquee';

type Copy = ReturnType<typeof getDictionary>;

const yen = (value: number) =>
  `¥${new Intl.NumberFormat('ja-JP', { useGrouping: false }).format(value)}`;

const drinkCategory = (category: string) => /drink|ドリンク/i.test(category);

function MenuPrice({
  copy,
  priceExcludingTax,
}: {
  copy: Copy;
  priceExcludingTax: number;
}) {
  return (
    <p className='gusto-menu-card__price mt-auto mb-0 flex min-h-8 w-full items-baseline justify-end font-accent leading-none font-normal text-black xl:min-h-[60px]'>
      <span className='text-2xl xl:text-[42px]'>{yen(priceExcludingTax)}</span>
      <span className='ml-[3px] text-[28px] xl:text-[42px]'>
        <small className='text-sm font-normal'>
          （{copy.menu.includingTax}
        </small>{' '}
        {yen(includingTax(priceExcludingTax))}
        <small className='text-sm font-normal'>）</small>
      </span>
    </p>
  );
}

export function MenuList({ menus, copy }: { menus: Menu[]; copy: Copy }) {
  const groups = Object.entries(Object.groupBy(menus, (menu) => menu.category));

  if (!groups.length) {
    return <p className='m-0 text-muted'>{copy.menu.unavailable}</p>;
  }

  return (
    <>
      <nav
        className='gusto-menu__category-nav grid min-h-[72px] w-full grid-cols-3 content-center items-center gap-y-2 sm:min-h-20 sm:content-normal xl:flex xl:h-[52px] xl:min-h-0 xl:items-end xl:justify-between 3xl:h-[60px]'
        aria-label={copy.menu.categoryNavigation}
      >
        {groups.map(([category], index) => (
          <span
            className='flex min-w-0 items-center justify-center xl:contents [&:not(:nth-child(3n+1))]:border-l-2 [&:not(:nth-child(3n+1))]:border-dashed [&:not(:nth-child(3n+1))]:border-coral xl:[&:not(:nth-child(3n+1))]:border-l-0'
            key={category}
          >
            {index > 0 && (
              <span
                className='hidden h-[42px] w-0 flex-none self-center border-l-2 border-dashed border-coral xl:block 3xl:h-[50px]'
                aria-hidden='true'
              />
            )}
            <a
              href={`#menu-category-${index + 1}`}
              className={[
                'inline-flex h-8 items-center justify-center font-display text-2xl leading-[29px] font-normal tracking-[-0.25em] whitespace-nowrap text-coral no-underline sm:h-9 sm:text-[32px] sm:leading-[38px] xl:h-[52px] xl:text-5xl xl:leading-[58px] 3xl:h-[60px]! 3xl:text-[60px]! 3xl:leading-[72px]!',
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
                className='gusto-menu__category-title m-0 flex h-[24.12px] w-fit items-center border-b-2 border-dashed border-coral font-display text-[20.1px] leading-[24.12px] font-normal tracking-[-0.25em] text-coral sm:h-[52px] sm:text-[40px] sm:leading-[52px] xl:h-16 xl:text-5xl xl:leading-16'
              >
                {category}
              </h2>
              <div
                className={[
                  'gusto-menu__grid grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 3xl:w-[calc(100%_-_6px)]',
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
                          : 'gusto-menu-card flex h-[504.91px] min-w-0 flex-col items-start gap-4 rounded-2xl bg-[#fbece6] p-6 sm:h-[486.73px] xl:h-[604.51px] 3xl:h-[642.25px]'
                      }
                    >
                      {!drink && item.image?.url.trim() && (
                        <div className='gusto-menu-card__image relative aspect-[414/412.25] w-full flex-none [box-shadow:0_4px_8px_rgb(0_0_0/25%)]'>
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
                            copy={copy}
                            priceExcludingTax={item.priceExcludingTax}
                          />
                        )}
                      </div>
                      {drink && (
                        <MenuPrice
                          copy={copy}
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
        className='gusto-menu__marquee top-[46px] left-[90px] hidden xl:block'
        text={copy.home.verticalTitle}
      />
    </>
  );
}
