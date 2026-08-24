import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { HomeSocialIcon } from './social-icon';
import type { HomePageCopy, SocialCard } from './types';

const gallery = ['slide-3.jpg', 'slide-1.jpg', 'slide-6.jpg', 'slide-2.jpg', 'slide-4.jpg', 'slide-5.jpg', 'slide-7.jpg'];

export function HomeSocialSection({ copy, socialCards }: { copy: HomePageCopy; socialCards: SocialCard[] }) {
  return (
    <section id='social' className='gusto-social' aria-label={copy.home.gallery}>
      <Image src='/images/b-1.png' alt='' width={3841} height={284} sizes='100vw' className='gusto-social-brush' />
      <div className='gusto-gallery'>
        {gallery.map((image) => (
          <div className='gusto-gallery-item' key={image}>
            <Image src={`/images/${image}`} alt={copy.home.galleryImageAlt} width={290} height={192} />
          </div>
        ))}
      </div>
      <div className='gusto-social-links'>
        {socialCards.map((card) => (
          <a href={siteConfig.socialUrl} key={card.name}>
            <div className='gusto-social-copy'>
              <div className='gusto-social-heading'>
                <Image src='/images/deco-1.png' alt='' width={216} height={120} />
                <span>{card.name}</span>
              </div>
              <p>{card.description}</p>
            </div>
            <HomeSocialIcon type={card.icon} />
          </a>
        ))}
      </div>
    </section>
  );
}
