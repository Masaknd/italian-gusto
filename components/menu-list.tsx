import Image from 'next/image';
import type { Menu } from '@/lib/microcms/types';
import { includingTax } from '@/lib/site-config';
import type { getDictionary } from '@/locales';
import { Marquee } from './marquee';

type Copy = ReturnType<typeof getDictionary>;
const yen = (value: number) =>
  `¥${new Intl.NumberFormat('ja-JP', { useGrouping: false }).format(value)}`;
const drinkCategory = (category: string) => /drink|ドリンク/i.test(category);

export function MenuList({ menus, copy }: { menus: Menu[]; copy: Copy }) {
  const groups = Object.entries(Object.groupBy(menus, (menu) => menu.category));
  if (!groups.length)
    return <p className="gusto-menu__status">{copy.menu.unavailable}</p>;

  return (
    <>
      <nav className="gusto-menu__category-nav" aria-label={copy.menu.categoryNavigation}>
        {groups.map(([category], index) => (
          <span className="gusto-menu__category-item" key={category}>
            {index > 0 && (
              <span className="gusto-menu__category-divider" aria-hidden="true" />
            )}
            <a
              href={`#menu-category-${index + 1}`}
              className={[
                index === 0 ? 'is-current' : '',
                category.length > 7 ? 'is-wide' : '',
              ].filter(Boolean).join(' ') || undefined}
            >
              {category}
            </a>
          </span>
        ))}
      </nav>

      <div className="gusto-menu__groups">
        {groups.map(([category, items], index) => (
          <section
            key={category}
            id={`menu-category-${index + 1}`}
            className="gusto-menu__group"
            aria-labelledby={`menu-category-heading-${index + 1}`}
          >
            <h2
              id={`menu-category-heading-${index + 1}`}
              className="gusto-menu__category-title"
            >
              {category}
            </h2>
            <div className={`gusto-menu__grid ${drinkCategory(category) ? 'gusto-menu__grid--drinks' : ''}`}>
            {items?.map((item) => {
              const drink = drinkCategory(item.category);
              return (
                <article
                  key={item.id}
                  className={`gusto-menu-card ${drink ? 'gusto-menu-card--drink' : ''}`}
                >
                  {!drink && item.image && (
                    <div className="gusto-menu-card__image">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt ?? item.name}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1023px) 300px, (max-width: 1599px) 352px, 416px"
                      />
                    </div>
                  )}
                  <div className="gusto-menu-card__copy">
                    <h3>{item.name}</h3>
                    {!drink && item.description && (
                      <p>{item.description}</p>
                    )}
                    {!drink && (
                      <p className="gusto-menu-card__price">
                        <span className="gusto-menu-card__price-excluding">
                          {yen(item.priceExcludingTax)}
                        </span>
                        <span className="gusto-menu-card__price-including">
                          <small>（{copy.menu.includingTax}</small>{' '}
                          {yen(includingTax(item.priceExcludingTax))}
                          <small>）</small>
                        </span>
                      </p>
                    )}
                  </div>
                  {drink && (
                    <p className="gusto-menu-card__price">
                      <span className="gusto-menu-card__price-excluding">
                        {yen(item.priceExcludingTax)}
                      </span>
                      <span className="gusto-menu-card__price-including">
                        <small>（{copy.menu.includingTax}</small>{' '}
                        {yen(includingTax(item.priceExcludingTax))}
                        <small>）</small>
                      </span>
                    </p>
                  )}
                </article>
              );
            })}
            </div>
          </section>
        ))}
      </div>

      <Marquee className="gusto-menu__marquee" text={copy.home.verticalTitle} />
    </>
  );
}
