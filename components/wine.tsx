import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { HomePageCopy } from './types';

function WineMoreLink({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <Link href={`/${locale}/menu`} className='gusto-wine-more'>
      <span>{children}</span>
      <svg aria-hidden='true' viewBox='0 0 111.4 60' focusable='false'>
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}

export function HomeWineSection({ copy, locale }: { copy: HomePageCopy; locale: Locale }) {
  return (
    <section id='wine' className='gusto-wine'>
      <Image src='/images/b-2.png' alt='' width={3840} height={362} sizes='100vw' className='gusto-wine-brush gusto-wine-brush-top' />
      <div className='gusto-wine-inner'>
        <div className='gusto-wine-visual'>
          <Image src='/images/bottle-grapes.png' alt={copy.home.wineArtworkAlt} fill sizes='(max-width: 768px) 82vw, 43.23vw' className='object-contain' />
        </div>
        <div className='gusto-wine-copy'>
          <div className='gusto-wine-title'><h2>{copy.home.wineTitle}</h2></div>
          <div className='gusto-wine-text'>
            {copy.home.wineBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <WineMoreLink locale={locale}>{copy.home.wineMenu}</WineMoreLink>
        </div>
      </div>
      <Image src='/images/b-3.png' alt='' width={3840} height={380} sizes='100vw' className='gusto-wine-brush gusto-wine-brush-bottom' />
    </section>
  );
}
