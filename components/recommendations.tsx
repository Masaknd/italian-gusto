import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { FeaturedMenu } from '@/lib/microcms/types';
import type { HomePageCopy } from './types';

type RecommendationIndex = 1 | 2 | 3;

const articleLayout: Record<RecommendationIndex, string> = {
  1: 'h-[min(49.2945vw,946.454px)] gap-[min(1.25vw,24px)] p-[min(3.125vw,60px)_min(12.5vw,240px)] xl:h-[826px] xl:gap-6 xl:p-[60px_0] sm:block sm:h-[994.930908px] sm:p-0 xs:h-[843.472534px] xs:gap-6 xs:p-[24px_16px]',
  2: 'h-[min(53.7383vw,1031.774px)] gap-[min(1.25vw,24px)] p-[min(3.125vw,60px)_min(12.5vw,240px)] xl:h-[895.717163px] xl:gap-6 xl:p-[60px_0] sm:block sm:h-[1091.632813px] sm:p-0 xs:h-[880.692139px] xs:gap-6 xs:p-[24px_16px]',
  3: 'h-[min(53.7189vw,1031.403px)] gap-[min(1.25vw,24px)] p-[min(3.125vw,60px)_min(12.5vw,240px)] xl:h-[905.751831px] xl:gap-6 xl:p-[60px_0] sm:block sm:h-[1068px] sm:p-0 xs:h-[916.735596px] xs:gap-6 xs:p-[24px_16px]',
};

const copyLayout: Record<RecommendationIndex, string> = {
  1: 'h-[min(31.6146vw,607px)] w-[min(30.5208vw,586px)] xl:h-[607px] xl:w-[611px] sm:absolute sm:top-16 sm:left-[86px] sm:h-[356.000031px] sm:w-[596px] xs:h-[412.000031px] xs:w-full',
  2: 'order-2 h-[min(28.1771vw,541px)] w-[min(30.5208vw,586px)] xl:h-[574px] xl:w-[614.077393px] sm:absolute sm:top-16 sm:left-[86px] sm:h-[380px] sm:w-[596px] sm:order-none xs:order-none xs:h-auto xs:w-full',
  3: 'relative z-[1] h-[min(28.1771vw,541px)] w-[min(30.5208vw,586px)] xl:h-[574px] xl:w-[504px] sm:absolute sm:top-16 sm:left-[86px] sm:h-[356px] sm:w-[596px] xs:h-auto xs:w-full',
};

const headingLayout: Record<RecommendationIndex, string> = {
  1: 'after:w-[min(23.4375vw,450px)] xl:h-[88px] xl:after:w-[450px] sm:h-[56.000034px] sm:w-[300px] sm:after:top-[56.000013px] sm:after:bottom-auto sm:after:w-[300px] xs:h-[40.000027px] xs:w-[200px] xs:after:w-[200px]',
  2: 'after:w-[min(24.0104vw,461px)] xl:h-[88px] xl:after:w-[461px] sm:h-[56px] sm:w-[300px] sm:after:top-[56px] sm:after:bottom-auto sm:after:w-[300px] xs:h-10 xs:w-[200px] xs:after:w-[200px]',
  3: 'after:w-[min(24.0104vw,461px)] xl:h-[88px] xl:w-[500px] xl:after:w-[461px] sm:h-[56px] sm:w-[300px] sm:after:top-[56px] sm:after:bottom-auto sm:after:w-[300px] xs:h-8 xs:w-[200px] xs:after:top-8 xs:after:bottom-auto xs:after:w-[200px]',
};

const contentLayout: Record<RecommendationIndex, string> = {
  1: 'xl:h-[471px] xl:w-[611px] xl:mt-12 sm:absolute sm:top-[104.000031px] sm:left-0 sm:mt-0 sm:h-[252px] sm:w-[596px] xs:mt-6 xs:h-[348px]',
  2: 'xl:h-[438px] xl:w-[614.077393px] xl:mt-12 sm:absolute sm:top-[104px] sm:left-0 sm:mt-0 sm:h-[276px] sm:w-[596px] xs:mt-6 xs:h-auto',
  3: 'xl:h-[438px] xl:w-[504px] xl:mt-12 sm:absolute sm:top-[104px] sm:left-0 sm:mt-0 sm:h-[252px] sm:w-[596.02063px] xs:mt-6 xs:h-auto',
};

const titleLayout: Record<RecommendationIndex, string> = {
  1: 'xl:h-[83px] xl:text-[52px] xl:leading-[1.596] sm:h-8 sm:w-[596px] sm:overflow-hidden sm:text-[42px] sm:leading-8 xs:h-8 xs:text-[32px] xs:leading-8',
  2: 'xl:h-[83px] xl:text-[52px] xl:leading-[1.596] sm:h-8 sm:w-max sm:max-w-full sm:overflow-visible sm:text-[42px] sm:leading-8 xs:h-8 xs:text-[32px] xs:leading-8',
  3: 'xl:h-[83px] xl:text-[52px] xl:leading-[1.596] sm:h-8 sm:w-[596.02063px] sm:overflow-hidden sm:text-[42px] sm:leading-8 xs:h-8 xs:text-[32px] xs:leading-8',
};

const descriptionLayout: Record<RecommendationIndex, string> = {
  1: 'xl:h-[264px] xl:w-[611px] xl:mt-8 xl:text-2xl sm:mt-8 sm:h-24 sm:w-[596px] sm:overflow-hidden sm:text-[22px] sm:leading-6 xs:mt-8 xs:h-[192px] xs:text-lg xs:leading-6',
  2: 'h-[min(10.3125vw,198px)] xl:h-[231px] xl:w-[614.077393px] xl:mt-8 xl:text-2xl sm:mt-8 sm:h-[120px] sm:w-[596px] sm:overflow-hidden sm:text-[22px] sm:leading-6 xs:mt-8 xs:h-auto xs:text-lg xs:leading-6',
  3: 'h-[min(10.3125vw,198px)] xl:h-[231px] xl:w-[504px] xl:mt-8 xl:text-2xl sm:mt-8 sm:h-24 sm:w-[596.02063px] sm:overflow-hidden sm:text-[22px] sm:leading-6 xs:mt-8 xs:h-auto xs:text-lg xs:leading-6',
};

const moreLayout: Record<RecommendationIndex, string> = {
  1: 'xl:w-max sm:w-[323.396759px] sm:[&_span]:w-[180px]',
  2: 'xl:w-[614.077393px] sm:w-[305.396759px] sm:[&_span]:w-[162px]',
  3: 'xl:w-[504px] sm:w-[287.396759px] sm:max-w-[596.02063px] sm:[&_span]:w-[144px]',
};

const imageLayout: Record<RecommendationIndex, string> = {
  1: 'h-[min(43.0445vw,826.454px)] w-[min(43.2292vw,830px)] xl:h-[706px] xl:w-[709px] sm:absolute sm:top-[444.000031px] sm:left-[139.5px] sm:h-[486.930878px] sm:w-[489px] xs:h-[359.472534px] xs:w-full',
  2: 'order-1 h-[min(47.4883vw,911.774px)] w-[min(43.2292vw,830px)] xl:h-[775.717163px] xl:w-[705.922607px] sm:absolute sm:top-[476px] sm:left-[133px] sm:h-[551.632751px] sm:w-[502px] sm:order-none xs:order-2 xs:h-[396.692108px] xs:w-full',
  3: 'z-[1] h-[min(47.4689vw,911.403px)] w-[min(36.8732vw,707.965px)] xl:h-[785.751831px] xl:w-[610.360779px] sm:absolute sm:top-[444px] sm:left-[166.5px] sm:h-[560px] sm:w-[435px] xs:h-[464.735626px] xs:w-full',
};

function RecommendationMoreLink({
  children,
  index,
  locale,
}: {
  children: React.ReactNode;
  index: RecommendationIndex;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/menu`}
      className={`mt-[min(1.6667vw,32px)] flex h-[min(3.125vw,60px)] w-max items-center gap-[min(1.6667vw,32px)] font-accent text-[min(1.25vw,24px)] leading-[1.36] text-ink underline underline-offset-4 xl:mt-8 xl:h-[60px] xl:gap-8 xl:text-2xl sm:mt-8 sm:h-[60px] sm:gap-8 sm:text-[22px] sm:leading-6 sm:[&_span]:h-6 sm:[&_span]:flex-none sm:[&_span]:whitespace-nowrap xs:mt-8 xs:h-[60px] xs:w-full xs:gap-8 xs:text-lg xs:leading-6 xs:no-underline ${moreLayout[index]}`}
    >
      <span>{children}</span>
      <svg
        className='h-auto w-[min(5.8021vw,111.4px)] shrink-0 overflow-visible fill-none stroke-ink stroke-1 xl:w-[111.396759px] sm:h-[60px] sm:w-[111.396759px] xs:h-[60px] xs:w-[111.396759px]'
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
      className={`relative flex min-h-0 w-full items-center justify-center xs:flex-col xs:items-stretch ${articleLayout[index]}`}
    >
      <div
        className={`gusto-feature-copy max-w-none flex-none ${copyLayout[index]}`}
      >
        <div
          className={`gusto-feature-heading relative h-[min(4.7396vw,91px)] w-full after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] xl:after:h-0.5 sm:after:h-0.5 xs:after:h-0.5 ${headingLayout[index]}`}
        >
          <p className='m-0 whitespace-nowrap font-display text-[min(4.1667vw,80px)] leading-none font-normal tracking-[-0.25em] text-coral xl:text-[80px] sm:h-12 sm:w-[300px] sm:text-[60px] sm:leading-12 xs:h-8 xs:text-[32px] xs:leading-8'>
            {copy.featured.title}
            {copy.featured.numberLabels[index - 1]}
          </p>
        </div>
        <div
          className={`gusto-feature-content mt-[min(2.3438vw,45px)] w-full ${contentLayout[index]}`}
        >
          <h3
            className={`m-0 h-[min(4.3229vw,83px)] font-display text-[min(2.7083vw,52px)] leading-[1.596] font-normal tracking-[-0.25em] text-ink ${titleLayout[index]}`}
          >
            {item.name}
          </h3>
          {item.description && (
            <p
              className={`gusto-feature-description mt-[min(1.6667vw,32px)] h-[min(13.75vw,264px)] w-full whitespace-pre-line font-accent text-[min(1.25vw,24px)] leading-[1.36] text-ink ${descriptionLayout[index]}`}
            >
              {item.description}
            </p>
          )}
          <RecommendationMoreLink index={index} locale={locale}>
            {copy.featured.menuLinks[index - 1]}
          </RecommendationMoreLink>
        </div>
      </div>
      <div
        className={`gusto-feature-image relative flex-none ${imageLayout[index]}`}
      >
        <Image
          src={item.image.url}
          alt={item.name}
          fill
          sizes='(max-width: 768px) 80vw, 36vw'
          className={`object-contain ${index === 3 ? 'xl:object-fill' : ''}`}
        />
      </div>
      {index === 2 && (
        <Image
          src='/images/two-veggies.png'
          alt=''
          width={535}
          height={445}
          className='gusto-feature-2-deco absolute top-[min(4.0906vw,78.539px)] left-[min(78.7972vw,1512.906px)] h-auto w-[min(13.9193vw,267.25px)] xl:top-0 xl:left-[1172.750366px] xl:w-[267.249664px] max-md:hidden'
        />
      )}
      {index === 3 && (
        <Image
          src='/images/olives.png'
          alt=''
          width={996}
          height={872}
          className='gusto-feature-3-deco pointer-events-none absolute top-[min(-6.3884vw,-122.657px)] left-[min(71.8959vw,1380.401px)] z-0 h-[min(23.0676vw,442.898px)] w-[min(22.2244vw,426.709px)] xl:top-[-126.476285px] xl:left-[1101.374634px] xl:h-[442.898px] xl:w-[426.709015px] max-md:hidden'
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
  return (
    <section id='recommendations' className='p-0'>
      {featured.slice(0, 3).map((item, index) => (
        <Recommendation
          item={item}
          index={(index + 1) as RecommendationIndex}
          copy={copy}
          locale={locale}
          key={item.id}
        />
      ))}
    </section>
  );
}
