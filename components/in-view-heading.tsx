'use client';

import { motion, useReducedMotion } from 'motion/react';

const entranceTransition = {
  duration: 1.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

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
      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, once: true }}
      transition={reduceMotion ? { duration: 0 } : entranceTransition}
      data-in-view-heading
    >
      {children}
    </motion.h2>
  );
}
