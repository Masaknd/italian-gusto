'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { WheelEvent } from 'react';
import type { Locale } from '@/lib/i18n';
import type { FeaturedMenu } from '@/lib/microcms/types';
import type { HomePageCopy } from './types';

type RecommendationIndex = 1 | 2 | 3;

const imageLayout: Record<RecommendationIndex, string> = {
  1: 'h-[360px] w-full sm:h-[670px] sm:w-[669px] xl:h-[706px] xl:w-[709px]',
  2: 'h-[396px] w-full sm:h-[727px] sm:w-[669px] xl:h-[775px] xl:w-[706px] 3xl:h-[min(47.4883vw,911.774px)] 3xl:w-[min(43.2292vw,830px)]',
  3: 'h-[465px] w-full sm:h-[794px] sm:w-[669px] xl:h-[785px] xl:w-[610px] 3xl:h-[min(47.4689vw,911.403px)] 3xl:w-[min(36.8732vw,707.965px)]',
};

function RecommendationMoreLink({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/menu`}
      className={`mt-8 flex items-center gap-8 font-accent text-lg leading-6 text-ink no-underline sm:text-[22px] xl:text-2xl xl:underline xl:underline-offset-4 3xl:mt-[min(1.6667vw,32px)] 3xl:gap-[min(1.6667vw,32px)] 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36] sm:[&_span]:h-6 sm:[&_span]:flex-none sm:[&_span]:whitespace-nowrap`}
    >
      <span>{children}</span>
      <svg
        className='h-[60px] w-[111.396759px] shrink-0 overflow-visible fill-none stroke-ink stroke-1 3xl:h-auto 3xl:w-[min(5.8021vw,111.4px)]'
        aria-hidden='true'
        viewBox='0 0 111.4 60'
        focusable='false'
      >
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}

function Recommendation({
  item,
  index,
  copy,
  locale,
}: {
  item: FeaturedMenu;
  index: RecommendationIndex;
  copy: HomePageCopy;
  locale: Locale;
}) {
  return (
    <article
      id={`recommendation-${index}`}
      className={`relative grid h-screen w-full grid-cols-1 place-items-center gap-6 p-[24px_16px] sm:p-[24px_88px] xl:p-[60px_120px] 2xl:grid-cols-4 3xl:grid-cols-5 3xl:gap-20 3xl:p-[min(3.125vw,60px)_min(12.5vw,240px)]`}
    >
      <div className={`gusto-feature-copy xl:col-span-2`}>
        <div className={`gusto-feature-heading w-max`}>
          <h3
            className={`relative font-display text-[32px] leading-8 font-normal tracking-[-0.25em] whitespace-nowrap text-coral after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] sm:text-[60px] sm:leading-14 xl:text-[80px] xl:leading-none 3xl:text-[80px]`}
          >
            {copy.featured.title}
            {copy.featured.numberLabels[index - 1]}
          </h3>
        </div>
        <div
          className={`gusto-feature-content mt-4 sm:mt-6 xl:mt-12 3xl:mt-[min(2.3438vw,45px)]`}
        >
          <h3
            className={`m-0 font-display text-[32px] leading-8 font-normal tracking-[-0.25em] text-ink sm:text-[42px] xl:text-[52px] xl:leading-[1.596] 3xl:text-[min(2.7083vw,52px)] 3xl:leading-[1.596]`}
          >
            {item.name}
          </h3>
          {item.description && (
            <p
              className={`gusto-feature-description mt-4 font-accent text-lg leading-6 whitespace-pre-line text-ink sm:text-[22px] xl:text-2xl 3xl:mt-[min(1.6667vw,32px)] 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36]`}
            >
              {item.description}
            </p>
          )}
          <RecommendationMoreLink locale={locale}>
            {copy.featured.menuLinks[index - 1]}
          </RecommendationMoreLink>
        </div>
      </div>
      <div
        className={`gusto-feature-image relative 2xl:col-span-2 3xl:col-span-3 ${imageLayout[index]}`}
      >
        <Image
          src={item.image.url}
          alt={item.name}
          fill
          sizes='(max-width: 768px) 80vw, 36vw'
          className={`object-contain ${index === 3 ? 'xl:object-fill 3xl:object-contain' : ''}`}
        />
      </div>
      {index === 1 && (
        <Image
          src='/images/two-veggies.png'
          alt=''
          width={535}
          height={445}
          className='gusto-feature-2-deco pointer-events-none absolute top-0 left-[1250px] hidden h-auto w-[267.249664px] xl:block 3xl:top-[min(4.0906vw,78.539px)] 3xl:left-[min(78.7972vw,1850px)] 3xl:w-[min(13.9193vw,267.25px)]'
        />
      )}
      {index === 2 && (
        <Image
          src=''
          alt=''
          width={535}
          height={445}
          className='gusto-feature-3-deco pointer-events-none absolute top-0 left-[1250px] hidden h-auto w-[267.249664px] xl:block 3xl:top-[min(4.0906vw,78.539px)] 3xl:left-[min(78.7972vw,1850px)] 3xl:w-[min(13.9193vw,267.25px)]'
        />
      )}

      {index === 3 && (
        <Image
          src='/images/olives.png'
          alt=''
          width={996}
          height={872}
          className='gusto-feature-3-deco pointer-events-none absolute top-20 left-[1230px] z-0 hidden h-85 w-auto xl:block 3xl:top-15 3xl:left-[1700px] 3xl:h-110'
        />
      )}
    </article>
  );
}

export function HomeRecommendationsSection({
  copy,
  featured,
  locale,
}: {
  copy: HomePageCopy;
  featured: FeaturedMenu[];
  locale: Locale;
}) {
  const section = useRef<HTMLElement>(null);
  const wheelGestureActive = useRef(false);
  const wheelGestureEnd = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const recommendations = featured.slice(0, 3);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });
  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${Math.max(recommendations.length - 1, 0) * 100}vw`],
  );

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (wheelGestureActive.current) return;

    setActiveIndex(
      Math.round(progress * Math.max(recommendations.length - 1, 0)),
    );
  });

  useEffect(
    () => () => {
      clearTimeout(wheelGestureEnd.current);
    },
    [],
  );

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (reduceMotion) return;

    const delta =
      Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
    if (!delta) return;

    if (wheelGestureActive.current) {
      event.preventDefault();
      clearTimeout(wheelGestureEnd.current);
      wheelGestureEnd.current = setTimeout(() => {
        wheelGestureActive.current = false;
      }, 180);
      return;
    }

    const direction = delta > 0 ? 1 : -1;
    const nextIndex = activeIndex + direction;
    const canAdvance = nextIndex >= 0 && nextIndex < recommendations.length;

    if (!canAdvance) return;

    event.preventDefault();
    clearTimeout(wheelGestureEnd.current);
    wheelGestureEnd.current = setTimeout(() => {
      wheelGestureActive.current = false;
    }, 180);

    wheelGestureActive.current = true;
    setActiveIndex(nextIndex);

    const sectionTop =
      window.scrollY + (section.current?.getBoundingClientRect().top ?? 0);
    window.scrollTo({
      top: sectionTop + nextIndex * window.innerHeight,
      behavior: 'auto',
    });
  };

  if (!recommendations.length) return null;

  return (
    <section
      ref={section}
      id='recommendations'
      className='relative isolate p-0 motion-reduce:!h-auto'
      style={{ height: `${recommendations.length * 100}vh` }}
      onWheel={handleWheel}
    >
      <div className='sticky top-0 h-screen overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible'>
        <motion.div
          className='flex h-full will-change-transform motion-reduce:!transform-none motion-reduce:flex-col'
          style={{ x: trackX }}
          data-testid='recommendations-track'
        >
          {recommendations.map((item, index) => (
            <motion.div
              className='h-screen w-screen shrink-0'
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 1.5,
                ease: 'easeOut',
              }}
              key={item.id}
            >
              <Recommendation
                item={item}
                index={(index + 1) as RecommendationIndex}
                copy={copy}
                locale={locale}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
