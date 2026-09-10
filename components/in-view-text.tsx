'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

type InViewTextElement = 'div' | 'p' | 'span';
type InViewTextUnit = 'letter' | 'word';
type InViewTextTrigger = 'parent' | 'self';

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
  trigger?: InViewTextTrigger;
};

type InViewTextGroupProps = {
  children: readonly string[];
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  paragraphPause?: number;
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

function getTextRevealDuration(
  text: string,
  by: InViewTextUnit,
  duration: number,
  stagger: number,
) {
  const unitCount = countAnimationUnits(text, by);

  return unitCount === 0 ? 0 : (unitCount - 1) * stagger + duration;
}

export function getInViewTextSequenceDuration(
  paragraphs: readonly string[],
  {
    by = 'letter',
    delay = 0,
    duration = 0.25,
    stagger = by === 'word' ? 0.1 : 0.035,
    paragraphPause = 0.12,
  }: {
    by?: InViewTextUnit;
    delay?: number;
    duration?: number;
    stagger?: number;
    paragraphPause?: number;
  } = {},
) {
  return paragraphs.reduce(
    (total, paragraph, index) =>
      total +
      getTextRevealDuration(paragraph, by, duration, stagger) +
      (index < paragraphs.length - 1 ? paragraphPause : 0),
    delay,
  );
}

export function InViewText({
  children,
  as = 'p',
  by = 'letter',
  className,
  delay = 0,
  duration = 0.25,
  stagger = by === 'word' ? 0.1 : 0.035,
  amount = 0.3,
  once = true,
  trigger = 'self',
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
      initial={
        trigger === 'self' ? (reduceMotion ? false : 'hidden') : undefined
      }
      whileInView={trigger === 'self' ? 'visible' : undefined}
      viewport={trigger === 'self' ? { amount, once } : undefined}
      data-in-view-text={by}
    >
      <span className='sr-only'>{children}</span>
      <span aria-hidden='true'>{animatedText}</span>
    </Component>
  );
}

export function InViewTextGroup({
  children,
  className,
  delay = 0,
  duration = 0.25,
  stagger = 0.035,
  paragraphPause = 0.12,
  amount = 0.3,
  once = true,
}: InViewTextGroupProps) {
  const reduceMotion = useReducedMotion();

  const paragraphs = children.map((paragraph, index) => {
    const currentDelay = children
      .slice(0, index)
      .reduce(
        (total, previousParagraph) =>
          total +
          getTextRevealDuration(
            previousParagraph,
            'letter',
            duration,
            stagger,
          ) +
          paragraphPause,
        delay,
      );

    return (
      <InViewText
        key={`${index}-${paragraph}`}
        delay={currentDelay}
        duration={duration}
        stagger={stagger}
        trigger='parent'
      >
        {paragraph}
      </InViewText>
    );
  });

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView='visible'
      viewport={{ amount, once }}
      data-in-view-text-group
    >
      {paragraphs}
    </motion.div>
  );
}
