'use client';

import { motion, useReducedMotion } from 'motion/react';
import { entranceTransition } from './animations/config';
import { Marquee } from './marquee';

type AnimatedMarqueeProps = {
  className?: string;
  text: string;
};

export function AnimatedMarquee({ className, text }: AnimatedMarqueeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className='pointer-events-none absolute inset-0'
      initial={{ opacity: 0, x: reduceMotion ? 0 : -48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={entranceTransition}
    >
      <Marquee className={className} text={text} />
    </motion.div>
  );
}
