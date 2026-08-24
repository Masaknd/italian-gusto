import Image from 'next/image';
import Link from 'next/link';
import type { HomePageCopy } from './types';

function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href='#wine' className='gusto-about-more'>
      <span>{children}</span>
      <svg aria-hidden='true' viewBox='0 0 111.4 60' focusable='false'>
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}

export function HomeAboutSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section id='about' className='gusto-about gusto-dark'>
      <Image src='/images/b-1.png' alt='' width={3841} height={284} sizes='768px' className='gusto-about-brush' />
      <div className='gusto-about-left'>
        <div className='gusto-about-copy'>
          <div className='gusto-about-title'><h2>{copy.home.aboutTitle}</h2></div>
          <div className='gusto-about-body'>
            {copy.home.aboutBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <AboutMoreLink>{copy.home.aboutMore}</AboutMoreLink>
        </div>
        <Image src='/images/glasscheese.png' alt='' width={276} height={239} className='gusto-about-deco' />
      </div>
      <div className='gusto-about-right'>
        <div className='gusto-about-image'>
          <Image src='/images/inside.png' alt={copy.home.aboutImageAlt} fill sizes='(max-width: 768px) 92vw, 51vw' className='object-contain' />
        </div>
      </div>
    </section>
  );
}
