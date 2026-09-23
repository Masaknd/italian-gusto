'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { useReducedMotion } from './use-reduced-motion';

const characterStagger = 0.04;
const jumpHeight = 8;

const jumpTransition = {
  type: 'spring' as const,
  stiffness: 450,
  damping: 14,
  mass: 0.7,
};

function JumpingCharacter({
  animationRun,
  character,
  index,
  reduceMotion,
}: {
  animationRun: number;
  character: string;
  index: number;
  reduceMotion: boolean;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduceMotion) {
      controls.stop();
      controls.set({ y: 0 });
      return;
    }

    if (animationRun === 0) return;

    let cancelled = false;

    const jump = async () => {
      controls.stop();
      controls.set({ y: 0 });

      await controls.start({
        y: -jumpHeight,
        transition: {
          ...jumpTransition,
          delay: index * characterStagger,
        },
      });

      if (!cancelled) {
        await controls.start({
          y: 0,
          transition: jumpTransition,
        });
      }
    };

    void jump();

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [animationRun, controls, index, reduceMotion]);

  return (
    <motion.span
      animate={controls}
      aria-hidden='true'
      className='inline-block'
      data-hover-jump-letter
      initial={{ y: 0 }}
    >
      {character === ' ' ? '\u00a0' : character}
    </motion.span>
  );
}

export function HoverJumpText({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  const reduceMotion = useReducedMotion();
  const [animationRun, setAnimationRun] = useState(0);

  return (
    <motion.span
      aria-label={text}
      className={['inline-block whitespace-nowrap', className]
        .filter(Boolean)
        .join(' ')}
      data-hover-jump-text
      onHoverStart={() => {
        if (!reduceMotion) {
          setAnimationRun((currentRun) => currentRun + 1);
        }
      }}
    >
      {Array.from(text).map((character, index) => (
        <JumpingCharacter
          animationRun={animationRun}
          character={character}
          index={index}
          key={`${character}-${index}`}
          reduceMotion={reduceMotion}
        />
      ))}
    </motion.span>
  );
}
