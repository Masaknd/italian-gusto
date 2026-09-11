'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { entranceTransition } from './config';

const emphasisPauseRange = {
  min: 8000,
  max: 10000,
};

const emphasisCharacterStagger = 0.3;
const emphasisUnitPauseMs = 1200;

const emphasisParentVariants: Variants = {
  idle: {},
  bounce: {
    transition: {
      staggerChildren: emphasisCharacterStagger,
      staggerDirection: 1,
    },
  },
};

const emphasisCharacterVariants: Variants = {
  idle: { y: 0, scaleY: 1 },
  bounce: {
    scale: [1, 1.15, 0.9, 1.1, 1],
    y: [0, -30, 5, -3, 0],
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export function useRepeatingEmphasisAnimation(enabled = true) {
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!enabled || reduceMotion || isActive) return;

    const pause =
      emphasisPauseRange.min +
      Math.random() * (emphasisPauseRange.max - emphasisPauseRange.min);
    const timeoutId = setTimeout(() => setIsActive(true), pause);

    return () => clearTimeout(timeoutId);
  }, [enabled, isActive, reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    if (reduceMotion) {
      controls.set('idle');
      return;
    }

    if (!isActive) return;

    let cancelled = false;
    let completionTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const runAnimation = async () => {
      await controls.start('bounce');

      if (!cancelled) {
        completionTimeoutId = setTimeout(
          () => setIsActive(false),
          emphasisUnitPauseMs,
        );
      }
    };

    void runAnimation();

    return () => {
      cancelled = true;
      clearTimeout(completionTimeoutId);
      controls.stop();
    };
  }, [controls, enabled, isActive, reduceMotion]);

  return {
    animate: controls,
    initial: 'idle' as const,
    variants: emphasisCharacterVariants,
  };
}

export type EmphasisTextSegment = {
  text: string;
  emphasis?: boolean;
};

export type EmphasisTextLines = readonly (readonly EmphasisTextSegment[])[];

export type EmphasisTextElement = 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';

export type AnimatedEmphasisTextProps = {
  as?: EmphasisTextElement;
  className?: string;
  emphasizedSegmentClassName?: string;
  lineClassName?: string;
  lines: EmphasisTextLines;
};

const motionTextElements = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

function isEmphasizedSegment(segment: EmphasisTextSegment) {
  return segment.emphasis === true;
}

function AnimatedEmphasisSegment({
  animationIndex,
  className,
  isActive,
  onAnimationComplete,
  text,
}: {
  animationIndex: number;
  className?: string;
  isActive: boolean;
  onAnimationComplete: (animationIndex: number) => void;
  text: string;
}) {
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      controls.set('idle');
      return;
    }

    if (!isActive) return;

    let cancelled = false;
    let completionTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const runAnimation = async () => {
      await controls.start('bounce');

      if (!cancelled) {
        completionTimeoutId = setTimeout(
          () => onAnimationComplete(animationIndex),
          emphasisUnitPauseMs,
        );
      }
    };

    void runAnimation();

    return () => {
      cancelled = true;
      clearTimeout(completionTimeoutId);
      controls.stop();
    };
  }, [animationIndex, controls, isActive, onAnimationComplete, reduceMotion]);

  return (
    <motion.span
      aria-label={text}
      animate={controls}
      className={className}
      initial='idle'
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 14,
        mass: 0.7,
      }}
      variants={emphasisParentVariants}
    >
      {Array.from(text).map((character, characterIndex) => (
        <motion.span
          aria-hidden='true'
          className='inline-block origin-bottom'
          key={`${character}-${characterIndex}`}
          variants={emphasisCharacterVariants}
        >
          {character}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function AnimatedEmphasisText({
  as = 'span',
  className,
  emphasizedSegmentClassName,
  lineClassName = 'block',
  lines,
}: AnimatedEmphasisTextProps) {
  const reduceMotion = useReducedMotion();
  const emphasisCount = lines.reduce(
    (count, line) => count + line.filter(isEmphasizedSegment).length,
    0,
  );
  const [activeEmphasisIndex, setActiveEmphasisIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (reduceMotion || activeEmphasisIndex !== null || emphasisCount === 0) {
      return;
    }

    const pause =
      emphasisPauseRange.min +
      Math.random() * (emphasisPauseRange.max - emphasisPauseRange.min);
    const timeoutId = setTimeout(() => setActiveEmphasisIndex(0), pause);

    return () => clearTimeout(timeoutId);
  }, [activeEmphasisIndex, emphasisCount, reduceMotion]);

  const handleEmphasisAnimationComplete = useCallback(
    (animationIndex: number) => {
      setActiveEmphasisIndex(
        animationIndex + 1 < emphasisCount ? animationIndex + 1 : null,
      );
    },
    [emphasisCount],
  );

  let emphasisIndex = 0;
  const MotionTextElement = motionTextElements[as];

  return (
    <MotionTextElement
      className={className}
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.3,
          },
        },
      }}
    >
      {lines.map((line, lineIndex) => (
        <motion.span
          className={lineClassName}
          key={lineIndex}
          variants={{
            hidden: {
              opacity: 0,
              y: reduceMotion ? 0 : 32,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: entranceTransition,
            },
          }}
        >
          {line.map((segment, segmentIndex) => {
            if (!isEmphasizedSegment(segment)) {
              return (
                <span key={`${lineIndex}-${segmentIndex}`}>{segment.text}</span>
              );
            }

            const animationIndex = emphasisIndex++;

            return (
              <AnimatedEmphasisSegment
                animationIndex={animationIndex}
                className={emphasizedSegmentClassName}
                isActive={activeEmphasisIndex === animationIndex}
                key={`${lineIndex}-${segmentIndex}`}
                onAnimationComplete={handleEmphasisAnimationComplete}
                text={segment.text}
              />
            );
          })}
        </motion.span>
      ))}
    </MotionTextElement>
  );
}
