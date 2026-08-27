import Image from 'next/image';
import Link from 'next/link';
import type { HomePageCopy } from './types';

function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href='#wine'
      className='gusto-about-more flex h-auto w-max items-center gap-[min(1.667vw,32px)] font-accent text-[clamp(0.75rem,1.25vw,1.5rem)] leading-[1.375] text-warm-light underline underline-offset-4 min-[1200px]:max-[1599px]:h-[60px] min-[1200px]:max-[1599px]:gap-8 min-[1200px]:max-[1599px]:text-2xl min-[1200px]:max-[1599px]:leading-[1.36] min-[481px]:max-[768.02px]:h-[60px] min-[481px]:max-[768.02px]:w-[720px] min-[481px]:max-[768.02px]:justify-center min-[481px]:max-[768.02px]:gap-8 min-[481px]:max-[768.02px]:text-[22px] min-[481px]:max-[768.02px]:leading-6 max-[480px]:h-[60px] max-[480px]:w-full max-[480px]:justify-start max-[480px]:gap-8 max-[480px]:text-lg max-[480px]:leading-6 max-[480px]:no-underline'
    >
      <span className='max-[480px]:min-w-0 max-[480px]:flex-1'>{children}</span>
      <svg className='h-auto w-[clamp(3.5rem,5.8vw,6.96rem)] shrink-0 overflow-visible fill-none stroke-current stroke-1 min-[1200px]:max-[1599px]:w-[111.396759px] max-[768.02px]:h-[60px] max-[768.02px]:w-[111.396759px]' aria-hidden='true' viewBox='0 0 111.4 60' focusable='false'>
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}

export function HomeAboutSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='about'
      className="relative flex h-[min(61.77vw,1186px)] min-h-0 items-start justify-center gap-[min(1.25vw,24px)] bg-ink pt-[min(6.25vw,120px)] text-paper before:absolute before:inset-x-0 before:bottom-[-1px] before:z-[3] before:h-[clamp(24px,4vw,78px)] before:bg-ink before:[clip-path:polygon(0_24%,5%_61%,10%_47%,16%_85%,22%_43%,29%_66%,35%_28%,43%_70%,49%_46%,56%_88%,63%_42%,70%_65%,77%_30%,85%_72%,93%_42%,100%_67%,100%_100%,0_100%)] before:content-[''] min-[1200px]:max-[1599px]:h-[832px] min-[1200px]:max-[1599px]:gap-6 min-[1200px]:max-[1599px]:p-[60px_96px_100px] min-[481px]:max-[768.02px]:block min-[481px]:max-[768.02px]:h-[1239.476807px] min-[481px]:max-[768.02px]:bg-transparent min-[481px]:max-[768.02px]:p-0 min-[481px]:max-[768.02px]:after:absolute min-[481px]:max-[768.02px]:after:inset-[56.62664px_0_auto] min-[481px]:max-[768.02px]:after:z-0 min-[481px]:max-[768.02px]:after:h-[1182.850098px] min-[481px]:max-[768.02px]:after:bg-ink min-[481px]:max-[768.02px]:after:content-[''] max-[480px]:h-auto max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:items-start max-[480px]:gap-x-0 max-[480px]:gap-y-8 max-[480px]:bg-transparent max-[480px]:px-4 max-[480px]:pt-[calc(28.976917px_+_48px)] max-[480px]:pb-12 max-[480px]:after:absolute max-[480px]:after:inset-[28.976917px_0_0] max-[480px]:after:z-0 max-[480px]:after:bg-ink max-[480px]:after:content-['']"
    >
      <Image src='/images/b-1.png' alt='' width={3841} height={284} sizes='768px' className='gusto-about-brush pointer-events-none absolute top-0 left-0 z-[1] hidden w-full object-fill min-[481px]:max-[768.02px]:block min-[481px]:max-[768.02px]:h-[56.62664px] max-[480px]:block max-[480px]:h-[28.976917px]' />
      <div className='gusto-about-left relative h-[min(39.48vw,758px)] w-[min(30.47vw,585px)] min-[1200px]:max-[1599px]:h-[672px] min-[1200px]:max-[1599px]:w-[612px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[calc(56.62664px_+_64px)] min-[481px]:max-[768.02px]:left-6 min-[481px]:max-[768.02px]:z-[2] min-[481px]:max-[768.02px]:h-[352.000031px] min-[481px]:max-[768.02px]:w-[720px] max-[480px]:relative max-[480px]:z-[2] max-[480px]:order-[-1] max-[480px]:h-auto max-[480px]:min-w-0 max-[480px]:basis-full max-[480px]:w-auto'>
        <div className='relative z-[2] flex w-full flex-col gap-[min(2.5vw,48px)] min-[1200px]:max-[1599px]:w-[612px] min-[1200px]:max-[1599px]:gap-12 min-[481px]:max-[768.02px]:h-[352.000031px] min-[481px]:max-[768.02px]:w-[720px] min-[481px]:max-[768.02px]:items-center min-[481px]:max-[768.02px]:gap-12 max-[480px]:h-[408.000031px] max-[480px]:items-center max-[480px]:gap-12'>
          <div className="gusto-about-title relative h-[min(4.375vw,84px)] w-full after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] min-[1200px]:max-[1599px]:h-[84px] min-[1200px]:max-[1599px]:w-[320px] min-[481px]:max-[768.02px]:h-[52.000023px] min-[481px]:max-[768.02px]:w-[192px] min-[481px]:max-[768.02px]:after:h-0.5 max-[480px]:h-[35px] max-[480px]:w-max max-[480px]:self-center max-[480px]:after:h-0.5">
            <h2 className='font-display text-[clamp(2.5rem,4.167vw,5rem)] leading-none font-normal tracking-[-0.25em] text-coral min-[1200px]:max-[1599px]:text-[80px] min-[481px]:max-[768.02px]:h-12 min-[481px]:max-[768.02px]:whitespace-nowrap min-[481px]:max-[768.02px]:text-[60px] min-[481px]:max-[768.02px]:leading-12 max-[480px]:h-8 max-[480px]:whitespace-nowrap max-[480px]:text-5xl max-[480px]:leading-8'>{copy.home.aboutTitle}</h2>
          </div>
          <div className='gusto-about-body h-auto font-accent text-[clamp(0.85rem,1.25vw,1.5rem)] leading-[1.375] text-warm-light min-[1200px]:max-[1599px]:h-[231px] min-[1200px]:max-[1599px]:w-[612px] min-[1200px]:max-[1599px]:text-2xl min-[1200px]:max-[1599px]:leading-[1.36] min-[481px]:max-[768.02px]:h-36 min-[481px]:max-[768.02px]:w-[597.013916px] min-[481px]:max-[768.02px]:overflow-hidden min-[481px]:max-[768.02px]:text-[22px] min-[481px]:max-[768.02px]:leading-6 max-[480px]:h-[216px] max-[480px]:w-full max-[480px]:overflow-hidden max-[480px]:text-lg max-[480px]:leading-6'>
            {copy.home.aboutBody.map((paragraph) => <p className='leading-[inherit] [&+&]:mt-0' key={paragraph}>{paragraph}</p>)}
          </div>
          <AboutMoreLink>{copy.home.aboutMore}</AboutMoreLink>
        </div>
        <Image src='/images/glasscheese.png' alt='' width={276} height={239} className='absolute top-[min(27.03vw,519px)] left-0 z-[2] h-auto w-[min(14.355vw,275.62px)] opacity-90 min-[1200px]:max-[1599px]:top-[507.815918px] min-[1200px]:max-[1599px]:w-[276px] min-[1200px]:max-[1599px]:opacity-100 max-[768.02px]:hidden' />
      </div>
      <div className='gusto-about-right w-[min(50.68vw,973px)] min-[1200px]:max-[1599px]:h-[672px] min-[1200px]:max-[1599px]:w-[612px] min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[calc(56.62664px_+_448px)] min-[481px]:max-[768.02px]:left-6 min-[481px]:max-[768.02px]:z-[2] min-[481px]:max-[768.02px]:h-[670.850098px] min-[481px]:max-[768.02px]:w-[720px] max-[480px]:relative max-[480px]:z-[2] max-[480px]:h-[397px] max-[480px]:min-w-0 max-[480px]:basis-full max-[480px]:w-auto'>
        <div className='gusto-about-image relative aspect-[973/1066] w-full min-[1200px]:max-[1599px]:h-[672px] min-[1200px]:max-[1599px]:w-[612px] min-[1200px]:max-[1599px]:[aspect-ratio:auto] min-[481px]:max-[768.02px]:mx-auto min-[481px]:max-[768.02px]:h-[670.850098px] min-[481px]:max-[768.02px]:w-[611.997742px] max-[480px]:h-[397px] max-[480px]:w-full'>
          <Image src='/images/inside.png' alt={copy.home.aboutImageAlt} fill sizes='(max-width: 768px) 92vw, 51vw' className='object-contain max-[480px]:object-fill' />
        </div>
      </div>
    </section>
  );
}
