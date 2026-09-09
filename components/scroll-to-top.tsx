'use client';

import { useEffect, useState } from 'react';
import * as Icon from '@phosphor-icons/react/ssr';

const SCROLL_THRESHOLD = 300;

export function ScrollToTop({ label }: { label: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type='button'
      className={`gusto-scroll-to-top fixed right-4 bottom-32 z-30 flex size-14 cursor-pointer items-center justify-center rounded-full border-3 border-coral bg-paper text-coral transition-[opacity,visibility,background-color,color,transform] duration-200 hover:bg-coral hover:text-paper active:scale-95 sm:right-8 sm:bottom-38 lg:right-18 lg:bottom-50 lg:size-18.5 lg:border-4 ${
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      aria-label={label}
      onClick={scrollToTop}
    >
      <Icon.CaretUpIcon weight='bold' className='size-8 lg:size-10' />
    </button>
  );
}
