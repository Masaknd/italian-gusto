import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { FeaturedMenu } from '@/lib/microcms/types';
import type { HomePageCopy } from './types';

type RecommendationIndex = 1 | 2 | 3;

const articleLayout: Record<RecommendationIndex, string> = {
  1: 'h-[843.472534px] gap-6 p-[24px_16px] sm:block sm:h-[994.930908px] sm:p-0 xl:flex xl:h-[826px] xl:p-[60px_0] 3xl:h-[min(49.2945vw,946.454px)] 3xl:gap-[min(1.25vw,24px)] 3xl:p-[min(3.125vw,60px)_min(12.5vw,240px)]',
  2: 'h-[880.692139px] gap-6 p-[24px_16px] sm:block sm:h-[1091.632813px] sm:p-0 xl:flex xl:h-[895.717163px] xl:p-[60px_0] 3xl:h-[min(53.7383vw,1031.774px)] 3xl:gap-[min(1.25vw,24px)] 3xl:p-[min(3.125vw,60px)_min(12.5vw,240px)]',
  3: 'h-[916.735596px] gap-6 p-[24px_16px] sm:block sm:h-[1068px] sm:p-0 xl:flex xl:h-[905.751831px] xl:p-[60px_0] 3xl:h-[min(53.7189vw,1031.403px)] 3xl:gap-[min(1.25vw,24px)] 3xl:p-[min(3.125vw,60px)_min(12.5vw,240px)]',
};

const copyLayout: Record<RecommendationIndex, string> = {
  1: 'h-[412.000031px] w-full sm:absolute sm:top-16 sm:left-[86px] sm:h-[356.000031px] sm:w-[596px] xl:relative xl:top-auto xl:left-auto xl:h-[607px] xl:w-[611px] 3xl:h-[min(31.6146vw,607px)] 3xl:w-[min(30.5208vw,586px)]',
  2: 'order-none h-auto w-full sm:absolute sm:top-16 sm:left-[86px] sm:h-[380px] sm:w-[596px] xl:relative xl:top-auto xl:left-auto xl:order-2 xl:h-[574px] xl:w-[614.077393px] 3xl:h-[min(28.1771vw,541px)] 3xl:w-[min(30.5208vw,586px)]',
  3: 'relative z-[1] h-auto w-full sm:absolute sm:top-16 sm:left-[86px] sm:h-[356px] sm:w-[596px] xl:relative xl:top-auto xl:left-auto xl:h-[574px] xl:w-[504px] 3xl:h-[min(28.1771vw,541px)] 3xl:w-[min(30.5208vw,586px)]',
};

const headingLayout: Record<RecommendationIndex, string> = {
  1: 'h-[40.000027px] w-[200px] after:w-[200px] sm:h-[56.000034px] sm:w-[300px] sm:after:top-[56.000013px] sm:after:bottom-auto sm:after:w-[300px] xl:h-[88px] xl:w-full xl:after:top-auto xl:after:bottom-0 xl:after:w-[450px] 3xl:w-full 3xl:after:w-[min(23.4375vw,450px)]',
  2: 'h-10 w-[200px] after:w-[200px] sm:h-[56px] sm:w-[300px] sm:after:top-[56px] sm:after:bottom-auto sm:after:w-[300px] xl:h-[88px] xl:w-full xl:after:top-auto xl:after:bottom-0 xl:after:w-[461px] 3xl:w-full 3xl:after:w-[min(24.0104vw,461px)]',
  3: 'h-8 w-[200px] after:top-8 after:bottom-auto after:w-[200px] sm:h-[56px] sm:w-[300px] sm:after:top-[56px] sm:after:w-[300px] xl:h-[88px] xl:w-[500px] xl:after:top-auto xl:after:bottom-0 xl:after:w-[461px] 3xl:w-full 3xl:after:w-[min(24.0104vw,461px)]',
};

const contentLayout: Record<RecommendationIndex, string> = {
  1: 'mt-6 h-[348px] sm:absolute sm:top-[104.000031px] sm:left-0 sm:mt-0 sm:h-[252px] sm:w-[596px] xl:relative xl:top-auto xl:mt-12 xl:h-[471px] xl:w-[611px]',
  2: 'mt-6 h-auto sm:absolute sm:top-[104px] sm:left-0 sm:mt-0 sm:h-[276px] sm:w-[596px] xl:relative xl:top-auto xl:mt-12 xl:h-[438px] xl:w-[614.077393px]',
  3: 'mt-6 h-auto sm:absolute sm:top-[104px] sm:left-0 sm:mt-0 sm:h-[252px] sm:w-[596.02063px] xl:relative xl:top-auto xl:mt-12 xl:h-[438px] xl:w-[504px]',
};

const titleLayout: Record<RecommendationIndex, string> = {
  1: 'h-8 text-[32px] leading-8 sm:w-[596px] sm:overflow-hidden sm:text-[42px] xl:h-[83px] xl:w-auto xl:overflow-visible xl:text-[52px] xl:leading-[1.596]',
  2: 'h-8 text-[32px] leading-8 sm:w-max sm:max-w-full sm:text-[42px] xl:h-[83px] xl:max-w-none xl:text-[52px] xl:leading-[1.596]',
  3: 'h-8 text-[32px] leading-8 sm:w-[596.02063px] sm:overflow-hidden sm:text-[42px] xl:h-[83px] xl:w-auto xl:overflow-visible xl:text-[52px] xl:leading-[1.596]',
};

const descriptionLayout: Record<RecommendationIndex, string> = {
  1: 'mt-8 h-[192px] text-lg leading-6 sm:h-24 sm:w-[596px] sm:overflow-hidden sm:text-[22px] xl:h-[264px] xl:w-[611px] xl:text-2xl',
  2: 'mt-8 h-auto text-lg leading-6 sm:h-[120px] sm:w-[596px] sm:overflow-hidden sm:text-[22px] xl:h-[231px] xl:w-[614.077393px] xl:text-2xl 3xl:h-[min(10.3125vw,198px)]',
  3: 'mt-8 h-auto text-lg leading-6 sm:h-24 sm:w-[596.02063px] sm:overflow-hidden sm:text-[22px] xl:h-[231px] xl:w-[504px] xl:text-2xl 3xl:h-[min(10.3125vw,198px)]',
};

const moreLayout: Record<RecommendationIndex, string> = {
  1: 'sm:w-[323.396759px] sm:[&_span]:w-[180px] xl:w-max xl:[&_span]:w-auto',
  2: 'sm:w-[305.396759px] sm:[&_span]:w-[162px] xl:w-[614.077393px] xl:[&_span]:w-auto',
  3: 'sm:w-[287.396759px] sm:max-w-[596.02063px] sm:[&_span]:w-[144px] xl:w-[504px] xl:[&_span]:w-auto',
};

const imageLayout: Record<RecommendationIndex, string> = {
  1: 'h-[359.472534px] w-full sm:absolute sm:top-[444.000031px] sm:left-[139.5px] sm:h-[486.930878px] sm:w-[489px] xl:relative xl:top-auto xl:left-auto xl:h-[706px] xl:w-[709px] 3xl:h-[min(43.0445vw,826.454px)] 3xl:w-[min(43.2292vw,830px)]',
  2: 'order-2 h-[396.692108px] w-full sm:absolute sm:top-[476px] sm:left-[133px] sm:order-none sm:h-[551.632751px] sm:w-[502px] xl:relative xl:top-auto xl:left-auto xl:order-1 xl:h-[775.717163px] xl:w-[705.922607px] 3xl:h-[min(47.4883vw,911.774px)] 3xl:w-[min(43.2292vw,830px)]',
  3: 'z-[1] h-[464.735626px] w-full sm:absolute sm:top-[444px] sm:left-[166.5px] sm:h-[560px] sm:w-[435px] xl:relative xl:top-auto xl:left-auto xl:h-[785.751831px] xl:w-[610.360779px] 3xl:h-[min(47.4689vw,911.403px)] 3xl:w-[min(36.8732vw,707.965px)]',
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
      className={`mt-8 flex h-[60px] w-full items-center gap-8 font-accent text-lg leading-6 text-ink no-underline sm:text-[22px] sm:[&_span]:h-6 sm:[&_span]:flex-none sm:[&_span]:whitespace-nowrap xl:w-max xl:text-2xl xl:underline xl:underline-offset-4 3xl:mt-[min(1.6667vw,32px)] 3xl:h-[min(3.125vw,60px)] 3xl:gap-[min(1.6667vw,32px)] 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36] ${moreLayout[index]}`}
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
      className={`relative flex min-h-0 w-full flex-col items-stretch justify-center xl:flex-row xl:items-center ${articleLayout[index]}`}
    >
      <div
        className={`gusto-feature-copy max-w-none flex-none ${copyLayout[index]}`}
      >
        <div
          className={`gusto-feature-heading relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] 3xl:h-[min(4.7396vw,91px)] 3xl:after:h-[3px] ${headingLayout[index]}`}
        >
          <p className='m-0 h-8 whitespace-nowrap font-display text-[32px] leading-8 font-normal tracking-[-0.25em] text-coral sm:h-12 sm:w-[300px] sm:text-[60px] sm:leading-12 xl:h-auto xl:w-auto xl:text-[80px] xl:leading-none 3xl:text-[min(4.1667vw,80px)]'>
            {copy.featured.title}
            {copy.featured.numberLabels[index - 1]}
          </p>
        </div>
        <div
          className={`gusto-feature-content w-full 3xl:mt-[min(2.3438vw,45px)] ${contentLayout[index]}`}
        >
          <h3
            className={`m-0 font-display font-normal tracking-[-0.25em] text-ink 3xl:h-[min(4.3229vw,83px)] 3xl:text-[min(2.7083vw,52px)] 3xl:leading-[1.596] ${titleLayout[index]}`}
          >
            {item.name}
          </h3>
          {item.description && (
            <p
              className={`gusto-feature-description w-full whitespace-pre-line font-accent text-ink 3xl:mt-[min(1.6667vw,32px)] 3xl:h-[min(13.75vw,264px)] 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36] ${descriptionLayout[index]}`}
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
          className={`object-contain ${index === 3 ? 'xl:object-fill 3xl:object-contain' : ''}`}
        />
      </div>
      {index === 2 && (
        <Image
          src='/images/two-veggies.png'
          alt=''
          width={535}
          height={445}
          className='gusto-feature-2-deco absolute top-0 left-[1172.750366px] hidden h-auto w-[267.249664px] xl:block 3xl:top-[min(4.0906vw,78.539px)] 3xl:left-[min(78.7972vw,1512.906px)] 3xl:w-[min(13.9193vw,267.25px)]'
        />
      )}
      {index === 3 && (
        <Image
          src='/images/olives.png'
          alt=''
          width={996}
          height={872}
          className='gusto-feature-3-deco pointer-events-none absolute top-[-126.476285px] left-[1101.374634px] z-0 hidden h-[442.898px] w-[426.709015px] xl:block 3xl:top-[min(-6.3884vw,-122.657px)] 3xl:left-[min(71.8959vw,1380.401px)] 3xl:h-[min(23.0676vw,442.898px)] 3xl:w-[min(22.2244vw,426.709px)]'
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
