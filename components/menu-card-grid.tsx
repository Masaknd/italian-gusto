'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import type { Menu } from '@/lib/microcms/types';
import {
  getEntranceTransition,
  inViewStagger,
  inViewViewport,
} from './animations/config';
import { MenuPrice } from './menu-price';

const drinkCategory = (category: string) => /drink|ドリンク/i.test(category);
const menuGridViewport = { ...inViewViewport, amount: 0 } as const;

export function MenuCardGrid({
  includingTaxLabel,
  items,
}: {
  includingTaxLabel: string;
  items: Menu[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className='gusto-menu__grid grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 3xl:w-[calc(100%_-_6px)] 3xl:grid-cols-4'
      initial={reduceMotion ? false : 'hidden'}
      whileInView='visible'
      viewport={menuGridViewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : inViewStagger,
          },
        },
      }}
      data-in-view-stagger
    >
      {items.map((item) => {
        const drink = drinkCategory(item.category);

        return (
          <motion.article
            key={item.id}
            className={
              drink
                ? 'gusto-menu-card flex h-auto min-h-0 min-w-0 flex-row items-baseline justify-between gap-6 bg-transparent p-0'
                : 'gusto-menu-card flex min-w-0 flex-col items-start gap-4 rounded-2xl bg-[#fbece6] p-6'
            }
            variants={{
              hidden: {
                opacity: 0,
                y: 48,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: getEntranceTransition(reduceMotion),
              },
            }}
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
                  includingTaxLabel={includingTaxLabel}
                  priceExcludingTax={item.priceExcludingTax}
                />
              )}
            </div>
            {drink && (
              <MenuPrice
                includingTaxLabel={includingTaxLabel}
                priceExcludingTax={item.priceExcludingTax}
              />
            )}
          </motion.article>
        );
      })}
    </motion.div>
  );
}
