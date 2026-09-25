'use client';

import { motion } from 'motion/react';
import { HoverJumpText } from './animations/hover-jump-text';
import { useReducedMotion } from './animations/use-reduced-motion';
import {
  getEntranceTransition,
  inViewStagger,
  inViewViewport,
} from './animations/config';
import { getMenuCategoryAnchor } from '@/lib/menu-category';

export function MenuCategoryNav({
  ariaLabel,
  categories,
}: {
  ariaLabel: string;
  categories: { id: string; label: string }[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.nav
      className='gusto-menu__category-nav flex w-full flex-wrap content-center items-center gap-2 gap-y-0 sm:content-normal sm:gap-4 lg:flex lg:items-end lg:justify-start lg:gap-6 3xl:gap-8'
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
          key={category.id}
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
              className='mr-2 block h-5 w-0 self-center border-l-2 border-dashed border-ink sm:h-[24px] xl:mr-4 xl:h-8'
              aria-hidden='true'
            />
          )}
          <a
            href={`#${getMenuCategoryAnchor(category.id)}`}
            className={[
              'inline-flex items-center justify-center font-display text-xl leading-[29px] font-normal tracking-[-0.25em] whitespace-nowrap text-ink no-underline transition-colors hover:text-[#c3a8a2] sm:text-[32px] sm:leading-[40px] xl:text-[40px] xl:leading-[40px]',
              // index === 0 ? 'text-brand-ink-hover!' : '',
              category.label.length > 7 ? 'scale-x-[0.82] sm:scale-x-100' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <HoverJumpText text={category.label} />
          </a>
        </motion.span>
      ))}
    </motion.nav>
  );
}
