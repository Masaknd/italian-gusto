'use client';

import { motion } from 'motion/react';
import { useReducedMotion } from './animations/use-reduced-motion';
import { getInViewFadeUpProps } from './animations/config';

export function InViewHeading({
  as = 'h2',
  children,
  className,
  id,
}: {
  as?: 'h1' | 'h2';
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const MotionHeading = as === 'h1' ? motion.h1 : motion.h2;

  return (
    <MotionHeading
      id={id}
      className={className}
      {...getInViewFadeUpProps(reduceMotion)}
      data-in-view-heading
    >
      {children}
    </MotionHeading>
  );
}
