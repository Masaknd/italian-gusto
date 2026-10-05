'use client';

import { motion } from 'motion/react';
import { useReducedMotion } from './animations/use-reduced-motion';
import type { Variants } from 'motion/react';
import { inViewTextDefaults } from './animations/config';

type InViewTextElement = 'div' | 'p' | 'span';
type InViewTextUnit = 'letter' | 'word';

type InViewTextProps = {
  children: string;
  as?: InViewTextElement;
  by?: InViewTextUnit;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
};

const motionElements = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
};

const cjkCharacter =
  /[\u3000-\u30ff\u3400-\u9fff\uf900-\ufaff\uff00-\uffef\uac00-\ud7af]/u;

function isWhitespace(value: string) {
  return /^\s+$/u.test(value);
}

function countAnimationUnits(text: string, by: InViewTextUnit) {
  const chunks = text.split(/(\s+)/u).filter(Boolean);

  return chunks.reduce((total, chunk) => {
    if (isWhitespace(chunk)) return total;

    return total + (by === 'word' ? 1 : Array.from(chunk).length);
  }, 0);
}

export function getInViewTextDuration(
  text: string,
  {
    by = 'letter',
    duration = inViewTextDefaults.duration,
    stagger = by === 'word'
      ? inViewTextDefaults.wordStagger
      : inViewTextDefaults.letterStagger,
  }: {
    by?: InViewTextUnit;
    duration?: number;
    stagger?: number;
  } = {},
) {
  const unitCount = countAnimationUnits(text, by);

  return unitCount === 0 ? 0 : (unitCount - 1) * stagger + duration;
}

export function InViewText({
  children,
  as = 'p',
  by = 'letter',
  className,
  delay = 0,
  duration = inViewTextDefaults.duration,
  stagger = by === 'word'
    ? inViewTextDefaults.wordStagger
    : inViewTextDefaults.letterStagger,
  amount = 0.3,
  once = true,
}: InViewTextProps) {
  const reduceMotion = useReducedMotion();
  const Component = motionElements[as];
  const chunks = children.split(/(\s+)/u).filter(Boolean);
  let unitIndex = 0;

  const unitVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: {
        delay: delay + index * stagger,
        duration,
        ease: 'easeOut',
      },
    }),
  };

  const animatedText =
    by === 'word'
      ? chunks.map((chunk, chunkIndex) => {
          if (isWhitespace(chunk)) return chunk;

          const index = unitIndex++;

          return (
            <motion.span
              key={`${chunkIndex}-${chunk}`}
              className='inline-block'
              custom={index}
              variants={unitVariants}
              data-in-view-text-unit
            >
              {chunk}
            </motion.span>
          );
        })
      : chunks.map((chunk, chunkIndex) => {
          if (isWhitespace(chunk)) return chunk;

          const letters = Array.from(chunk);
          const keepWordTogether = !letters.some((letter) =>
            cjkCharacter.test(letter),
          );
          const letterElements = letters.map((letter, letterIndex) => {
            const index = unitIndex++;

            return (
              <motion.span
                key={`${chunkIndex}-${letterIndex}-${letter}`}
                className='inline-block'
                custom={index}
                variants={unitVariants}
                data-in-view-text-unit
              >
                {letter}
              </motion.span>
            );
          });

          return keepWordTogether ? (
            <span key={`${chunkIndex}-${chunk}`} className='inline-block'>
              {letterElements}
            </span>
          ) : (
            letterElements
          );
        });

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView='visible'
      viewport={{ amount, once }}
      data-in-view-text={by}
    >
      <span className='sr-only'>{children}</span>
      <span aria-hidden='true'>{animatedText}</span>
    </Component>
  );
}
