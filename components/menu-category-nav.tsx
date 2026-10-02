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
      className='gusto-menu__category-nav flex w-full flex-wrap items-center gap-2 sm:gap-3'
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
      {categories.map((category) => (
        <motion.span
          className='flex items-center'
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
          <a
            href={`#${getMenuCategoryAnchor(category.id)}`}
            className='inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-4 py-2.5 font-display text-xl leading-6 font-normal tracking-normal whitespace-nowrap text-coral no-underline transition-colors hover:bg-coral hover:text-ink focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-coral sm:px-5 sm:py-3 sm:text-2xl sm:leading-7 3xl:px-6 3xl:text-[28px] 3xl:leading-9'
          >
            <HoverJumpText text={category.label} />
          </a>
        </motion.span>
      ))}
    </motion.nav>
  );
}
