import type { Transition } from 'motion/react';

export const entranceEasing = [0.22, 1, 0.36, 1] as const;

export const entranceTransition = {
  duration: 1.5,
  ease: entranceEasing,
} as const satisfies Transition;

export const inViewViewport = {
  amount: 0.3,
  once: true,
} as const;

export const inViewStagger = 0.1;

export const inViewTextDefaults = {
  duration: 0.25,
  letterStagger: 0.035,
  wordStagger: 0.1,
  paragraphPause: 0.12,
  linkGap: 0.2,
} as const;

export function getEntranceTransition(reduceMotion: boolean | null, delay = 0) {
  return reduceMotion
    ? { duration: 0 }
    : { ...entranceTransition, ...(delay ? { delay } : {}) };
}

export function getInViewFadeProps(reduceMotion: boolean | null, delay = 0) {
  return {
    initial: reduceMotion ? (false as const) : { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: inViewViewport,
    transition: getEntranceTransition(reduceMotion, delay),
  };
}

export function getInViewFadeUpProps(reduceMotion: boolean | null, delay = 0) {
  return {
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 48 },
    whileInView: { opacity: 1, y: 0 },
    viewport: inViewViewport,
    transition: getEntranceTransition(reduceMotion, delay),
  };
}
