import Image from 'next/image';
import type { Menu } from '@/lib/microcms/types';
import { includingTax } from '@/lib/site-config';
import type { getDictionary } from '@/locales';

type Copy = ReturnType<typeof getDictionary>;
const yen = (value: number) =>
  `¥${new Intl.NumberFormat('ja-JP').format(value)}`;
const drinkCategory = (category: string) => /drink|ドリンク/i.test(category);

export function MenuList({ menus, copy }: { menus: Menu[]; copy: Copy }) {
  const groups = Object.entries(Object.groupBy(menus, (menu) => menu.category));
  if (!groups.length)
    return <p className='text-muted'>{copy.menu.unavailable}</p>;
  return (
    <div className='space-y-16'>
      {groups.map(([category, items]) => (
        <section key={category} aria-labelledby={`category-${category}`}>
          <h2
            id={`category-${category}`}
            className='mb-6 border-b border-line pb-3 font-display text-3xl tracking-[var(--tracking-title)]'
          >
            {category}
          </h2>
          <div className='grid gap-5 sm:grid-cols-2'>
            {items?.map((item) => {
              const drink = drinkCategory(item.category);
              return (
                <article
                  key={item.id}
                  className={`rounded-card bg-surface p-5 shadow-card ${drink ? 'flex items-baseline justify-between' : ''}`}
                >
                  {!drink && item.image && (
                    <Image
                      src={item.image.url}
                      alt={item.image.alt ?? item.name}
                      width={item.image.width ?? 720}
                      height={item.image.height ?? 500}
                      className='mb-4 aspect-[4/3] w-full rounded-lg object-cover'
                    />
                  )}
                  <div>
                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                    {!drink && item.description && (
                      <p className='mt-2 text-body-sm leading-6 text-muted'>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <p className={drink ? 'text-right text-body-sm' : 'mt-4 text-body-sm'}>
                    <span>
                      {yen(item.priceExcludingTax)}{' '}
                      <small>{copy.menu.excludingTax}</small>
                    </span>
                    <span className='ml-2 font-semibold'>
                      {yen(includingTax(item.priceExcludingTax))}{' '}
                      <small>{copy.menu.includingTax}</small>
                    </span>
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
