import Image from 'next/image';
import type { HomePageCopy } from './types';

export function HomeHeroSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section className='gusto-hero'>
      <p className='gusto-vertical'>{copy.home.verticalTitle}</p>
      <div className='gusto-hero-copy'>
        <h1>
          {copy.hero.titleSegments.map((line, lineIndex) => (
            <span className='gusto-hero-title-line' key={lineIndex}>
              {line.map((segment, segmentIndex) => (
                <span
                  className={'emphasis' in segment && segment.emphasis ? 'gusto-hero-title-emphasis' : undefined}
                  key={`${lineIndex}-${segmentIndex}`}
                >
                  {segment.text}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <nav aria-label={copy.home.heroNavLabel} className='gusto-hero-nav'>
          <a href=''>{copy.home.heroNav.home}</a>
          <a href='#about'>{copy.home.heroNav.about}</a>
          <a href='#recommendations'>{copy.home.heroNav.menu}</a>
          <a href='#access'>{copy.home.heroNav.access}</a>
          <a href='#reservation'>{copy.home.heroNav.reservation}</a>
        </nav>
      </div>
      <Image src='/images/dishes.png' alt={copy.home.heroDishesAlt} fill priority sizes='(max-width: 768px) 90vw, 65vw' className='gusto-hero-dishes object-contain object-right-top' />
      <Image src='/images/four-veggies.png' alt='' width={360} height={246} className='gusto-hero-veg' />
      <a className='gusto-hero-caret' href='#about' aria-label={copy.home.heroScrollLabel}>
        <span aria-hidden='true'>↑</span>
      </a>
      <Image src='/images/b-1.png' alt='' width={3841} height={284} sizes='100vw' className='gusto-hero-brush' />
    </section>
  );
}
