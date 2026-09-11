'use client';

import { motion, useReducedMotion } from 'motion/react';
import { getInViewFadeUpProps } from './animations/config';

export function InViewHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h2
      className={className}
      {...getInViewFadeUpProps(reduceMotion)}
      data-in-view-heading
    >
      {children}
    </motion.h2>
  );
}
