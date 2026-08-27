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
    <p className='gusto-menu-card__price mt-auto mb-0 flex min-h-[60px] w-full items-baseline justify-end font-accent leading-none font-normal text-black max-lg:min-h-8'>
      <span className='text-[42px] max-lg:text-2xl'>
        {yen(priceExcludingTax)}
      </span>
      <span className='ml-[3px] text-[42px] max-lg:text-[28px]'>
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
        className='gusto-menu__category-nav flex h-[60px] w-full items-end justify-between max-2xl:h-[52px] max-lg:grid max-lg:h-auto max-lg:min-h-20 max-lg:grid-cols-3 max-lg:items-center max-lg:gap-y-2 xs:min-h-[72px] xs:content-center'
        aria-label={copy.menu.categoryNavigation}
      >
        {groups.map(([category], index) => (
          <span
            className='contents max-lg:flex max-lg:min-w-0 max-lg:items-center max-lg:justify-center max-lg:[&:not(:nth-child(3n+1))]:border-l-2 max-lg:[&:not(:nth-child(3n+1))]:border-dashed max-lg:[&:not(:nth-child(3n+1))]:border-coral'
            key={category}
          >
            {index > 0 && (
              <span
                className='h-[50px] w-0 flex-none self-center border-l-2 border-dashed border-coral max-2xl:h-[42px] max-lg:hidden'
                aria-hidden='true'
              />
            )}
            <a
              href={`#menu-category-${index + 1}`}
              className={[
                'inline-flex h-[60px] items-center whitespace-nowrap font-display text-[60px] leading-[72px] font-normal tracking-[-0.25em] text-coral no-underline max-2xl:h-[52px] max-2xl:text-5xl max-2xl:leading-[58px] max-lg:h-9 max-lg:justify-center max-lg:text-[32px] max-lg:leading-[38px] xs:h-8 xs:text-2xl xs:leading-[29px]',
                index === 0 ? 'text-[#c3a8a2]!' : '',
                category.length > 7 ? 'xs:scale-x-[0.82]' : '',
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
                className='gusto-menu__category-title m-0 flex h-16 w-fit items-center border-b-2 border-dashed border-coral font-display text-5xl leading-16 font-normal tracking-[-0.25em] text-coral max-lg:h-[52px] max-lg:text-[40px] max-lg:leading-[52px] xs:h-[24.12px] xs:text-[20.1px] xs:leading-[24.12px]'
              >
                {category}
              </h2>
              <div
                className={[
                  'gusto-menu__grid grid w-full grid-cols-3 gap-6 2xl:w-[calc(100%_-_6px)] max-lg:grid-cols-2 xs:grid-cols-1',
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
                          : 'gusto-menu-card flex h-[642.25px] min-w-0 flex-col items-start gap-4 rounded-2xl bg-[#fbece6] p-6 max-2xl:h-[604.51px] max-lg:h-[486.73px] xs:h-[504.91px]'
                      }
                    >
                      {!drink && item.image && (
                        <div className='gusto-menu-card__image relative aspect-[414/412.25] w-full flex-none [box-shadow:0_4px_8px_rgb(0_0_0/25%)]'>
                          <Image
                            src={item.image.url}
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
                              : 'm-0 font-display text-[42px] leading-[50px] font-normal tracking-[-0.25em] text-coral max-2xl:text-4xl max-2xl:leading-[43px] max-lg:text-[28px] max-lg:leading-[34px]'
                          }
                        >
                          {item.name}
                        </h3>
                        {!drink && item.description && (
                          <p className='m-0 whitespace-pre-line font-accent text-lg leading-[1.36] font-normal text-black max-lg:text-sm max-lg:leading-[1.5]'>
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
        className='gusto-menu__marquee top-[46px] left-[90px] max-lg:hidden'
        text={copy.home.verticalTitle}
      />
    </>
  );
}
