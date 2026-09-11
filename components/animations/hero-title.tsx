'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import type { HomePageCopy } from '../types';
import { entranceTransition } from './config';

const emphasisPauseRange = {
  min: 8000,
  max: 10000,
};

const emphasisCharacterStagger = 1;

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

type HeroTitleSegments = HomePageCopy['hero']['titleSegments'];
type HeroTitleSegment = HeroTitleSegments[number][number];

function isEmphasizedSegment(segment: HeroTitleSegment) {
  return 'emphasis' in segment && segment.emphasis;
}

function EmphasizedTitleSegment({
  animationIndex,
  className,
  isActive,
  onAnimationComplete,
  text,
}: {
  animationIndex: number;
  className: string;
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

    const runAnimation = async () => {
      await controls.start('bounce');

      if (!cancelled) {
        onAnimationComplete(animationIndex);
      }
    };

    void runAnimation();

    return () => {
      cancelled = true;
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

export function AnimatedHeroTitle({
  className,
  emphasizedSegmentClassName,
  titleSegments,
}: {
  className: string;
  emphasizedSegmentClassName: string;
  titleSegments: HeroTitleSegments;
}) {
  const reduceMotion = useReducedMotion();
  const emphasisCount = titleSegments.reduce(
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

  return (
    <motion.h1
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
      {titleSegments.map((line, lineIndex) => (
        <motion.span
          className='block'
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
              <EmphasizedTitleSegment
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
    </motion.h1>
  );
}
