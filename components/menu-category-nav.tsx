'use client';

import { motion, useReducedMotion } from 'motion/react';
import {
  getEntranceTransition,
  inViewStagger,
  inViewViewport,
} from './animations/config';

export function MenuCategoryNav({
  ariaLabel,
  categories,
}: {
  ariaLabel: string;
  categories: string[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.nav
      className='gusto-menu__category-nav flex w-full flex-wrap content-center items-center gap-2 gap-y-2 sm:content-normal sm:gap-4 lg:flex lg:items-end lg:justify-start lg:gap-6 3xl:gap-8'
      aria-label={ariaLabel}
      initial={reduceMotion ? false : 'hidden'}
      whileInView='visible'
      viewport={inViewViewport}
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
      {categories.map((category, index) => (
        <motion.span
          className='flex min-w-0 items-center justify-center'
          key={category}
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
          {index > 0 && (
            <span
              className='mr-2 block h-5 w-0 self-center border-l-2 border-dashed border-coral sm:h-[24px] xl:mr-4 xl:h-8'
              aria-hidden='true'
            />
          )}
          <a
            href={`#category-${index + 1}`}
            className={[
              'inline-flex items-center justify-center font-display text-xl leading-[29px] font-normal tracking-[-0.25em] whitespace-nowrap text-coral no-underline sm:text-[32px] sm:leading-[40px] xl:text-[40px] xl:leading-[40px]',
              index === 0 ? 'text-[#c3a8a2]!' : '',
              category.length > 7 ? 'scale-x-[0.82] sm:scale-x-100' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {category}
          </a>
        </motion.span>
      ))}
    </motion.nav>
  );
}
