import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { FeaturedMenu } from '@/lib/microcms/types';
import type { HomePageCopy } from './types';

function RecommendationMoreLink({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <Link href={`/${locale}/menu`} className='gusto-feature-more'>
      <span>{children}</span>
      <svg aria-hidden='true' viewBox='0 0 111.4 60' focusable='false'>
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}

function Recommendation({ item, index, copy, locale }: { item: FeaturedMenu; index: number; copy: HomePageCopy; locale: Locale }) {
  return (
    <article id={`recommendation-${index}`} className={`gusto-feature gusto-feature-${index}`}>
      <div className='gusto-feature-copy'>
        <div className='gusto-feature-heading'>
          <p>{copy.featured.title}{copy.featured.numberLabels[index - 1]}</p>
        </div>
        <div className='gusto-feature-content'>
          <h3>{item.name}</h3>
          {item.description && <p className='gusto-feature-description'>{item.description}</p>}
          <RecommendationMoreLink locale={locale}>{copy.featured.menuLinks[index - 1]}</RecommendationMoreLink>
        </div>
      </div>
      <div className='gusto-feature-image'>
        <Image src={item.image.url} alt={item.name} fill sizes='(max-width: 768px) 80vw, 36vw' className='object-contain' />
      </div>
      {index === 2 && <Image src='/images/two-veggies.png' alt='' width={535} height={445} className='gusto-feature-2-deco' />}
      {index === 3 && <Image src='/images/olives.png' alt='' width={996} height={872} className='gusto-feature-3-deco' />}
    </article>
  );
}

export function HomeRecommendationsSection({ copy, featured, locale }: { copy: HomePageCopy; featured: FeaturedMenu[]; locale: Locale }) {
  return (
    <section id='recommendations' className='gusto-recommendations'>
      {featured.slice(0, 3).map((item, index) => (
        <Recommendation item={item} index={index + 1} copy={copy} locale={locale} key={item.id} />
      ))}
    </section>
  );
}
