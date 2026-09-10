'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

const entranceTransition = {
  duration: 1.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

const heroClassNames = {
  root: [
    'gusto-hero relative isolate h-screen overflow-hidden px-4 py-0',
    'sm:px-[86px]',
    'xl:px-24 xl:py-[132px_64px]',
    '3xl:px-[max(12vw,calc((100vw_-_1920px)/2))]',
  ].join(' '),
  verticalTitle: [
    'gusto-vertical hidden',
    'sm:top-[500px] sm:left-20 sm:text-[length:68px] sm:leading-[90px] sm:tracking-[-0.25em] sm:[text-shadow:var(--shadow-hero-title)] sm:block sm:origin-top-left',
    'lg:top-30 lg:left-20 lg:text-[60px]',
    'xl:top-30 xl:left-[90px] xl:text-[86px] xl:leading-[90px]',
    '2xl:top-[164px]',
    '3xl:top-[270px]',
  ].join(' '),
  content: 'relative w-full',
  intro: [
    'absolute flex w-max flex-col items-start gap-12 z-5',
    'sm:top-0 sm:left-0',
    'lg:top-[calc(50dvh-180px)] lg:left-20 lg:gap-8',
    'xl:top-[calc(50dvh-132px)] xl:-translate-y-1/2 xl:gap-12',
    '2xl:left-30',
    '3xl:left-10',
  ].join(' '),
  title: [
    'text-center font-display text-5xl leading-[50px] font-normal tracking-[-0.2em] whitespace-pre-line text-coral',
    'sm:text-left sm:text-[68px] sm:leading-[70px]',
    'lg:text-[52px] lg:leading-[50px]',
    'xl:text-[68px] xl:leading-[70px]',
    '3xl:text-[clamp(4.5rem,5.21vw,100px)] 3xl:leading-[108px] 3xl:tracking-[-0.3em]',
  ].join(' '),
  emphasizedTitleSegment: [
    'gusto-hero-title-emphasis text-[68px]',
    'sm:text-[86px]',
    'lg:text-[70px]',
    'xl:text-[86px]',
    '3xl:text-[126px]',
  ].join(' '),
  navigation: [
    'gusto-hero-nav relative hidden gap-4.5 font-label text-[28px] leading-6 font-bold',
    'lg:flex lg:flex-col lg:gap-3 lg:text-[24px]',
    'xl:gap-4.5 xl:text-[28px]',
  ].join(' '),
  vegetables: [
    'gusto-hero-veg absolute right-28 -bottom-125 h-auto w-[202px] -z-1',
    'sm:right-20 sm:-bottom-160 sm:w-[347px]',
    'lg:-right-25 lg:-bottom-20 lg:w-[260px]',
    'xl:-right-30 xl:-bottom-30 xl:w-[315px]',
    '2xl:-right-25 2xl:-bottom-40 2xl:w-[347px]',
    '3xl:right-0 3xl:-bottom-30 3xl:w-[360px]',
  ].join(' '),
  dishesWrapper: [
    'absolute top-30 -right-15 w-max h-auto z-2',
    'sm:top-[clamp(60px,calc(100vh-700px),120px)] sm:-right-50',
    'md:top-[clamp(0px,calc(100vh-700px),30px)]',
    'lg:top-[calc(50dvh-340px)] lg:right-[clamp(-100px,calc(50vw-840px),0px)]',
    'xl:top-[calc(50dvh-132px)] xl:right-[clamp(-240px,calc(50vw-840px),0px)] xl:-translate-y-1/2',
  ].join(' '),
  dishes: [
    'gusto-hero-dishes h-auto w-[min(120vw,150vw)] object-contain',
    'sm:w-[min(100vw,150vw)]',
    'lg:w-[clamp(90vh,100dvh,120vh)]',
  ].join(' '),
  brush:
    'gusto-hero-brush pointer-events-none absolute bottom-0 left-0 z-[3] h-auto w-full translate-y-px',
};

export function HomeHeroSection({ copy }: { copy: HomePageCopy }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={heroClassNames.root}>
      <motion.div
        className='pointer-events-none absolute inset-0'
        initial={{ opacity: 0, x: reduceMotion ? 0 : -48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={entranceTransition}
      >
        <Marquee
          className={heroClassNames.verticalTitle}
          text={copy.home.verticalTitle}
        />
      </motion.div>
      <div className={heroClassNames.content}>
        <div className={heroClassNames.intro}>
          <motion.h1
            className={heroClassNames.title}
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
            {copy.hero.titleSegments.map((line, lineIndex) => (
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
                {line.map((segment, segmentIndex) => (
                  <span
                    className={
                      'emphasis' in segment && segment.emphasis
                        ? heroClassNames.emphasizedTitleSegment
                        : undefined
                    }
                    key={`${lineIndex}-${segmentIndex}`}
                  >
                    {segment.text}
                  </span>
                ))}
              </motion.span>
            ))}
          </motion.h1>
          <motion.nav
            aria-label={copy.home.heroNavLabel}
            className={heroClassNames.navigation}
            initial='hidden'
            animate='visible'
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.15,
                  staggerChildren: reduceMotion ? 0 : 0.1,
                },
              },
            }}
          >
            {[
              [copy.home.heroNav.home, ''],
              [copy.home.heroNav.about, '#about'],
              [copy.home.heroNav.menu, '#recommendations'],
              [copy.home.heroNav.access, '#access'],
              [copy.home.heroNav.reservation, '#reservation'],
            ].map(([label, href]) => (
              <motion.a
                key={href}
                href={href}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: reduceMotion ? 0 : 32,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: entranceTransition,
                  },
                }}
              >
                {label}
              </motion.a>
            ))}
          </motion.nav>
          <motion.div
            className={heroClassNames.vegetables}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.2 }}
          >
            <Image
              src='/images/four-veggies.png'
              alt=''
              width={360}
              height={246}
              className='h-auto w-full'
            />
          </motion.div>
        </div>
        <motion.div
          className={heroClassNames.dishesWrapper}
          initial={{ opacity: 0, x: reduceMotion ? 0 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...entranceTransition, delay: 0.1 }}
        >
          <Image
            src='/images/dishes.png'
            alt={copy.home.heroDishesAlt}
            width={768}
            height={480}
            priority
            className={heroClassNames.dishes}
          />
        </motion.div>
      </div>
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='100vw'
        className={heroClassNames.brush}
      />
    </section>
  );
}
