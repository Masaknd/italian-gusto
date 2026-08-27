import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { FeaturedMenu } from '@/lib/microcms/types';
import type { HomePageCopy } from './types';

type RecommendationIndex = 1 | 2 | 3;

const articleLayout: Record<RecommendationIndex, string> = {
  1: 'h-[min(49.2945vw,946.454px)] gap-[min(1.25vw,24px)] p-[min(3.125vw,60px)_min(12.5vw,240px)] min-[1200px]:max-[1599px]:h-[826px] min-[1200px]:max-[1599px]:gap-6 min-[1200px]:max-[1599px]:p-[60px_0] min-[481px]:max-[768.02px]:block min-[481px]:max-[768.02px]:h-[994.930908px] min-[481px]:max-[768.02px]:p-0 max-[480px]:h-[843.472534px] max-[480px]:gap-6 max-[480px]:p-[24px_16px]',
  2: 'h-[min(53.7383vw,1031.774px)] gap-[min(1.25vw,24px)] p-[min(3.125vw,60px)_min(12.5vw,240px)] min-[1200px]:max-[1599px]:h-[895.717163px] min-[1200px]:max-[1599px]:gap-6 min-[1200px]:max-[1599px]:p-[60px_0] min-[481px]:max-[768.02px]:block min-[481px]:max-[768.02px]:h-[1091.632813px] min-[481px]:max-[768.02px]:p-0 max-[480px]:h-[880.692139px] max-[480px]:gap-6 max-[480px]:p-[24px_16px]',
  3: 'h-[min(53.7189vw,1031.403px)] gap-[min(1.25vw,24px)] p-[min(3.125vw,60px)_min(12.5vw,240px)] min-[1200px]:max-[1599px]:h-[905.751831px] min-[1200px]:max-[1599px]:gap-6 min-[1200px]:max-[1599px]:p-[60px_0] min-[481px]:max-[768.02px]:block min-[481px]:max-[768.02px]:h-[1068px] min-[481px]:max-[768.02px]:p-0 max-[480px]:h-[916.735596px] max-[480px]:gap-6 max-[480px]:p-[24px_16px]',
};

const copyLayout: Record<RecommendationIndex, string> = {
  1: 'h-[min(31.6146vw,607px)] w-[min(30.5208vw,586px)] min-[1200px]:max-[1599px]:h-[607px] min-[1200px]:max-[1599px]:w-[611px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-16 min-[481px]:max-[768.02px]:left-[86px] min-[481px]:max-[768.02px]:h-[356.000031px] min-[481px]:max-[768.02px]:w-[596px] max-[480px]:h-[412.000031px] max-[480px]:w-full',
  2: 'order-2 h-[min(28.1771vw,541px)] w-[min(30.5208vw,586px)] min-[1200px]:max-[1599px]:h-[574px] min-[1200px]:max-[1599px]:w-[614.077393px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-16 min-[481px]:max-[768.02px]:left-[86px] min-[481px]:max-[768.02px]:h-[380px] min-[481px]:max-[768.02px]:w-[596px] min-[481px]:max-[768.02px]:order-none max-[480px]:order-none max-[480px]:h-auto max-[480px]:w-full',
  3: 'relative z-[1] h-[min(28.1771vw,541px)] w-[min(30.5208vw,586px)] min-[1200px]:max-[1599px]:h-[574px] min-[1200px]:max-[1599px]:w-[504px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-16 min-[481px]:max-[768.02px]:left-[86px] min-[481px]:max-[768.02px]:h-[356px] min-[481px]:max-[768.02px]:w-[596px] max-[480px]:h-auto max-[480px]:w-full',
};

const headingLayout: Record<RecommendationIndex, string> = {
  1: 'after:w-[min(23.4375vw,450px)] min-[1200px]:max-[1599px]:h-[88px] min-[1200px]:max-[1599px]:after:w-[450px] min-[481px]:max-[768.02px]:h-[56.000034px] min-[481px]:max-[768.02px]:w-[300px] min-[481px]:max-[768.02px]:after:top-[56.000013px] min-[481px]:max-[768.02px]:after:bottom-auto min-[481px]:max-[768.02px]:after:w-[300px] max-[480px]:h-[40.000027px] max-[480px]:w-[200px] max-[480px]:after:w-[200px]',
  2: 'after:w-[min(24.0104vw,461px)] min-[1200px]:max-[1599px]:h-[88px] min-[1200px]:max-[1599px]:after:w-[461px] min-[481px]:max-[768.02px]:h-[56px] min-[481px]:max-[768.02px]:w-[300px] min-[481px]:max-[768.02px]:after:top-[56px] min-[481px]:max-[768.02px]:after:bottom-auto min-[481px]:max-[768.02px]:after:w-[300px] max-[480px]:h-10 max-[480px]:w-[200px] max-[480px]:after:w-[200px]',
  3: 'after:w-[min(24.0104vw,461px)] min-[1200px]:max-[1599px]:h-[88px] min-[1200px]:max-[1599px]:w-[500px] min-[1200px]:max-[1599px]:after:w-[461px] min-[481px]:max-[768.02px]:h-[56px] min-[481px]:max-[768.02px]:w-[300px] min-[481px]:max-[768.02px]:after:top-[56px] min-[481px]:max-[768.02px]:after:bottom-auto min-[481px]:max-[768.02px]:after:w-[300px] max-[480px]:h-8 max-[480px]:w-[200px] max-[480px]:after:top-8 max-[480px]:after:bottom-auto max-[480px]:after:w-[200px]',
};

const contentLayout: Record<RecommendationIndex, string> = {
  1: 'min-[1200px]:max-[1599px]:h-[471px] min-[1200px]:max-[1599px]:w-[611px] min-[1200px]:max-[1599px]:mt-12 min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[104.000031px] min-[481px]:max-[768.02px]:left-0 min-[481px]:max-[768.02px]:mt-0 min-[481px]:max-[768.02px]:h-[252px] min-[481px]:max-[768.02px]:w-[596px] max-[480px]:mt-6 max-[480px]:h-[348px]',
  2: 'min-[1200px]:max-[1599px]:h-[438px] min-[1200px]:max-[1599px]:w-[614.077393px] min-[1200px]:max-[1599px]:mt-12 min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[104px] min-[481px]:max-[768.02px]:left-0 min-[481px]:max-[768.02px]:mt-0 min-[481px]:max-[768.02px]:h-[276px] min-[481px]:max-[768.02px]:w-[596px] max-[480px]:mt-6 max-[480px]:h-auto',
  3: 'min-[1200px]:max-[1599px]:h-[438px] min-[1200px]:max-[1599px]:w-[504px] min-[1200px]:max-[1599px]:mt-12 min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[104px] min-[481px]:max-[768.02px]:left-0 min-[481px]:max-[768.02px]:mt-0 min-[481px]:max-[768.02px]:h-[252px] min-[481px]:max-[768.02px]:w-[596.02063px] max-[480px]:mt-6 max-[480px]:h-auto',
};

const titleLayout: Record<RecommendationIndex, string> = {
  1: 'min-[1200px]:max-[1599px]:h-[83px] min-[1200px]:max-[1599px]:text-[52px] min-[1200px]:max-[1599px]:leading-[1.596] min-[481px]:max-[768.02px]:h-8 min-[481px]:max-[768.02px]:w-[596px] min-[481px]:max-[768.02px]:overflow-hidden min-[481px]:max-[768.02px]:text-[42px] min-[481px]:max-[768.02px]:leading-8 max-[480px]:h-8 max-[480px]:text-[32px] max-[480px]:leading-8',
  2: 'min-[1200px]:max-[1599px]:h-[83px] min-[1200px]:max-[1599px]:text-[52px] min-[1200px]:max-[1599px]:leading-[1.596] min-[481px]:max-[768.02px]:h-8 min-[481px]:max-[768.02px]:w-max min-[481px]:max-[768.02px]:max-w-full min-[481px]:max-[768.02px]:overflow-visible min-[481px]:max-[768.02px]:text-[42px] min-[481px]:max-[768.02px]:leading-8 max-[480px]:h-8 max-[480px]:text-[32px] max-[480px]:leading-8',
  3: 'min-[1200px]:max-[1599px]:h-[83px] min-[1200px]:max-[1599px]:text-[52px] min-[1200px]:max-[1599px]:leading-[1.596] min-[481px]:max-[768.02px]:h-8 min-[481px]:max-[768.02px]:w-[596.02063px] min-[481px]:max-[768.02px]:overflow-hidden min-[481px]:max-[768.02px]:text-[42px] min-[481px]:max-[768.02px]:leading-8 max-[480px]:h-8 max-[480px]:text-[32px] max-[480px]:leading-8',
};

const descriptionLayout: Record<RecommendationIndex, string> = {
  1: 'min-[1200px]:max-[1599px]:h-[264px] min-[1200px]:max-[1599px]:w-[611px] min-[1200px]:max-[1599px]:mt-8 min-[1200px]:max-[1599px]:text-2xl min-[481px]:max-[768.02px]:mt-8 min-[481px]:max-[768.02px]:h-24 min-[481px]:max-[768.02px]:w-[596px] min-[481px]:max-[768.02px]:overflow-hidden min-[481px]:max-[768.02px]:text-[22px] min-[481px]:max-[768.02px]:leading-6 max-[480px]:mt-8 max-[480px]:h-[192px] max-[480px]:text-lg max-[480px]:leading-6',
  2: 'h-[min(10.3125vw,198px)] min-[1200px]:max-[1599px]:h-[231px] min-[1200px]:max-[1599px]:w-[614.077393px] min-[1200px]:max-[1599px]:mt-8 min-[1200px]:max-[1599px]:text-2xl min-[481px]:max-[768.02px]:mt-8 min-[481px]:max-[768.02px]:h-[120px] min-[481px]:max-[768.02px]:w-[596px] min-[481px]:max-[768.02px]:overflow-hidden min-[481px]:max-[768.02px]:text-[22px] min-[481px]:max-[768.02px]:leading-6 max-[480px]:mt-8 max-[480px]:h-auto max-[480px]:text-lg max-[480px]:leading-6',
  3: 'h-[min(10.3125vw,198px)] min-[1200px]:max-[1599px]:h-[231px] min-[1200px]:max-[1599px]:w-[504px] min-[1200px]:max-[1599px]:mt-8 min-[1200px]:max-[1599px]:text-2xl min-[481px]:max-[768.02px]:mt-8 min-[481px]:max-[768.02px]:h-24 min-[481px]:max-[768.02px]:w-[596.02063px] min-[481px]:max-[768.02px]:overflow-hidden min-[481px]:max-[768.02px]:text-[22px] min-[481px]:max-[768.02px]:leading-6 max-[480px]:mt-8 max-[480px]:h-auto max-[480px]:text-lg max-[480px]:leading-6',
};

const moreLayout: Record<RecommendationIndex, string> = {
  1: 'min-[1200px]:max-[1599px]:w-max min-[481px]:max-[768.02px]:w-[323.396759px] min-[481px]:max-[768.02px]:[&_span]:w-[180px]',
  2: 'min-[1200px]:max-[1599px]:w-[614.077393px] min-[481px]:max-[768.02px]:w-[305.396759px] min-[481px]:max-[768.02px]:[&_span]:w-[162px]',
  3: 'min-[1200px]:max-[1599px]:w-[504px] min-[481px]:max-[768.02px]:w-[287.396759px] min-[481px]:max-[768.02px]:max-w-[596.02063px] min-[481px]:max-[768.02px]:[&_span]:w-[144px]',
};

const imageLayout: Record<RecommendationIndex, string> = {
  1: 'h-[min(43.0445vw,826.454px)] w-[min(43.2292vw,830px)] min-[1200px]:max-[1599px]:h-[706px] min-[1200px]:max-[1599px]:w-[709px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[444.000031px] min-[481px]:max-[768.02px]:left-[139.5px] min-[481px]:max-[768.02px]:h-[486.930878px] min-[481px]:max-[768.02px]:w-[489px] max-[480px]:h-[359.472534px] max-[480px]:w-full',
  2: 'order-1 h-[min(47.4883vw,911.774px)] w-[min(43.2292vw,830px)] min-[1200px]:max-[1599px]:h-[775.717163px] min-[1200px]:max-[1599px]:w-[705.922607px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[476px] min-[481px]:max-[768.02px]:left-[133px] min-[481px]:max-[768.02px]:h-[551.632751px] min-[481px]:max-[768.02px]:w-[502px] min-[481px]:max-[768.02px]:order-none max-[480px]:order-2 max-[480px]:h-[396.692108px] max-[480px]:w-full',
  3: 'z-[1] h-[min(47.4689vw,911.403px)] w-[min(36.8732vw,707.965px)] min-[1200px]:max-[1599px]:h-[785.751831px] min-[1200px]:max-[1599px]:w-[610.360779px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[444px] min-[481px]:max-[768.02px]:left-[166.5px] min-[481px]:max-[768.02px]:h-[560px] min-[481px]:max-[768.02px]:w-[435px] max-[480px]:h-[464.735626px] max-[480px]:w-full',
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
      className={`mt-[min(1.6667vw,32px)] flex h-[min(3.125vw,60px)] w-max items-center gap-[min(1.6667vw,32px)] font-accent text-[min(1.25vw,24px)] leading-[1.36] text-ink underline underline-offset-4 min-[1200px]:max-[1599px]:mt-8 min-[1200px]:max-[1599px]:h-[60px] min-[1200px]:max-[1599px]:gap-8 min-[1200px]:max-[1599px]:text-2xl min-[481px]:max-[768.02px]:mt-8 min-[481px]:max-[768.02px]:h-[60px] min-[481px]:max-[768.02px]:gap-8 min-[481px]:max-[768.02px]:text-[22px] min-[481px]:max-[768.02px]:leading-6 min-[481px]:max-[768.02px]:[&_span]:h-6 min-[481px]:max-[768.02px]:[&_span]:flex-none min-[481px]:max-[768.02px]:[&_span]:whitespace-nowrap max-[480px]:mt-8 max-[480px]:h-[60px] max-[480px]:w-full max-[480px]:gap-8 max-[480px]:text-lg max-[480px]:leading-6 max-[480px]:no-underline ${moreLayout[index]}`}
    >
      <span>{children}</span>
      <svg
        className='h-auto w-[min(5.8021vw,111.4px)] shrink-0 overflow-visible fill-none stroke-ink stroke-1 min-[1200px]:max-[1599px]:w-[111.396759px] min-[481px]:max-[768.02px]:h-[60px] min-[481px]:max-[768.02px]:w-[111.396759px] max-[480px]:h-[60px] max-[480px]:w-[111.396759px]'
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
      className={`relative flex min-h-0 w-full items-center justify-center max-[480px]:flex-col max-[480px]:items-stretch ${articleLayout[index]}`}
    >
      <div
        className={`gusto-feature-copy max-w-none flex-none ${copyLayout[index]}`}
      >
        <div
          className={`gusto-feature-heading relative h-[min(4.7396vw,91px)] w-full after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] min-[1200px]:max-[1599px]:after:h-0.5 min-[481px]:max-[768.02px]:after:h-0.5 max-[480px]:after:h-0.5 ${headingLayout[index]}`}
        >
          <p className='m-0 whitespace-nowrap font-display text-[min(4.1667vw,80px)] leading-none font-normal tracking-[-0.25em] text-coral min-[1200px]:max-[1599px]:text-[80px] min-[481px]:max-[768.02px]:h-12 min-[481px]:max-[768.02px]:w-[300px] min-[481px]:max-[768.02px]:text-[60px] min-[481px]:max-[768.02px]:leading-12 max-[480px]:h-8 max-[480px]:text-[32px] max-[480px]:leading-8'>
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
          className={`object-contain ${index === 3 ? 'min-[1200px]:max-[1599px]:object-fill' : ''}`}
        />
      </div>
      {index === 2 && (
        <Image
          src='/images/two-veggies.png'
          alt=''
          width={535}
          height={445}
          className='gusto-feature-2-deco absolute top-[min(4.0906vw,78.539px)] left-[min(78.7972vw,1512.906px)] h-auto w-[min(13.9193vw,267.25px)] min-[1200px]:max-[1599px]:top-0 min-[1200px]:max-[1599px]:left-[1172.750366px] min-[1200px]:max-[1599px]:w-[267.249664px] max-[768.02px]:hidden'
        />
      )}
      {index === 3 && (
        <Image
          src='/images/olives.png'
          alt=''
          width={996}
          height={872}
          className='gusto-feature-3-deco pointer-events-none absolute top-[min(-6.3884vw,-122.657px)] left-[min(71.8959vw,1380.401px)] z-0 h-[min(23.0676vw,442.898px)] w-[min(22.2244vw,426.709px)] min-[1200px]:max-[1599px]:top-[-126.476285px] min-[1200px]:max-[1599px]:left-[1101.374634px] min-[1200px]:max-[1599px]:h-[442.898px] min-[1200px]:max-[1599px]:w-[426.709015px] max-[768.02px]:hidden'
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
