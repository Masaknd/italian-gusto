import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';

const detailValueClass = 'm-0 list-none p-0 not-italic';
const detailRowClass =
  'gusto-access-row grid grid-cols-[min(5.2083vw,100px)_1fr] min-[1200px]:max-[1599px]:grid-cols-[100px_1fr] min-[481px]:max-[768.02px]:grid-cols-[100px_1fr] max-[480px]:grid-cols-[79px_1fr]';

export function HomeAccessSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='access'
      className='gusto-access relative flex min-h-[min(38.0729vw,731px)] flex-col items-center gap-[min(2.9688vw,57px)] bg-coral p-[min(4.375vw,84px)_min(12.5vw,240px)] text-center text-content min-[1200px]:max-[1599px]:h-[671.248474px] min-[1200px]:max-[1599px]:min-h-[671.248474px] min-[1200px]:max-[1599px]:gap-[57px] min-[1200px]:max-[1599px]:p-[50px_96px] max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:gap-12 max-[1100px]:p-[72px_max(24px,9vw)] min-[481px]:max-[768.02px]:h-[1137.248535px] min-[481px]:max-[768.02px]:min-h-[1137.248535px] min-[481px]:max-[768.02px]:gap-[57px] min-[481px]:max-[768.02px]:p-[64px_86px] max-[480px]:h-[954.010742px] max-[480px]:min-h-[954.010742px] max-[480px]:gap-4 max-[480px]:p-[32px_16px]'
    >
      <div className='gusto-access-title flex h-[min(4.7917vw,92px)] w-[min(75vw,1440px)] flex-col items-center gap-[min(0.4167vw,8px)] min-[1200px]:max-[1599px]:h-[94.248497px] min-[1200px]:max-[1599px]:w-[1248px] min-[1200px]:max-[1599px]:gap-2 max-[1100px]:h-auto max-[1100px]:w-full max-[1100px]:gap-2 min-[481px]:max-[768.02px]:h-[94.248497px] min-[481px]:max-[768.02px]:w-[191px] max-[480px]:h-[64.010719px] max-[480px]:w-[191px]'>
        <h2 className='w-full font-display text-[min(2.7083vw,52px)] leading-none font-normal tracking-[-0.288em] text-ink min-[1200px]:max-[1599px]:h-[52px] min-[1200px]:max-[1599px]:text-[52px] max-[1100px]:text-[46px] min-[481px]:max-[768.02px]:h-[52px] min-[481px]:max-[768.02px]:text-[52px] min-[481px]:max-[768.02px]:leading-[52px] min-[481px]:max-[768.02px]:tracking-[-15px] max-[480px]:h-8 max-[480px]:text-[32px] max-[480px]:leading-8 max-[480px]:tracking-[-0.25em]'>
          {copy.home.accessTitle}
        </h2>
        <p className="relative pb-[min(0.4167vw,8px)] font-accent text-[min(0.9375vw,18px)] leading-[1.36] text-ink after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] min-[1200px]:max-[1599px]:h-[34.248497px] min-[1200px]:max-[1599px]:w-[172px] min-[1200px]:max-[1599px]:px-[14px] min-[1200px]:max-[1599px]:pt-0 min-[1200px]:max-[1599px]:pb-[10.248497px] min-[1200px]:max-[1599px]:text-lg min-[1200px]:max-[1599px]:whitespace-nowrap min-[1200px]:max-[1599px]:after:right-[14px] min-[1200px]:max-[1599px]:after:left-[14px] min-[1200px]:max-[1599px]:after:h-0.5 max-[1100px]:pb-2 max-[1100px]:text-[17px] min-[481px]:max-[768.02px]:h-[34.248497px] min-[481px]:max-[768.02px]:w-[144px] min-[481px]:max-[768.02px]:p-[0_0_10.248497px] min-[481px]:max-[768.02px]:text-lg min-[481px]:max-[768.02px]:leading-6 min-[481px]:max-[768.02px]:whitespace-nowrap min-[481px]:max-[768.02px]:after:h-0.5 max-[480px]:h-[24.010719px] max-[480px]:w-[191px] max-[480px]:p-[0_0_10.010719px] max-[480px]:text-sm max-[480px]:leading-[14px] max-[480px]:whitespace-nowrap max-[480px]:after:right-[31.1px] max-[480px]:after:left-[31.1px] max-[480px]:after:h-0.5 max-[480px]:after:rotate-[0.895deg]">
          {copy.home.accessLabel}
        </p>
      </div>
      <div className='gusto-access-grid grid min-h-[min(21.5625vw,414px)] w-[min(75vw,1440px)] grid-cols-[min(25.3023vw,485.804px)_min(24.9479vw,479px)] justify-center gap-[min(1.25vw,24px)] text-left min-[1200px]:max-[1599px]:h-[420px] min-[1200px]:max-[1599px]:min-h-[420px] min-[1200px]:max-[1599px]:w-[1248px] min-[1200px]:max-[1599px]:grid-cols-[481.522461px_479px] min-[1200px]:max-[1599px]:gap-6 max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:w-[min(100%,560px)] max-[1100px]:grid-cols-1 max-[1100px]:gap-9 min-[481px]:max-[768.02px]:h-[858px] min-[481px]:max-[768.02px]:min-h-[858px] min-[481px]:max-[768.02px]:w-[596px] min-[481px]:max-[768.02px]:grid-rows-[414px_420px] min-[481px]:max-[768.02px]:gap-6 max-[480px]:h-[810px] max-[480px]:min-h-[810px] max-[480px]:w-[361px] max-[480px]:grid-rows-[414px_372px] max-[480px]:gap-6'>
        <div className='gusto-map h-[min(21.5625vw,414px)] w-[min(25.3023vw,485.804px)] overflow-hidden bg-[var(--color-map-surface)] min-[1200px]:max-[1599px]:h-[414px] min-[1200px]:max-[1599px]:w-[481.522461px] max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:w-full max-[1100px]:aspect-[486/414] min-[481px]:max-[768.02px]:h-[414px] min-[481px]:max-[768.02px]:w-[596px] min-[481px]:max-[768.02px]:[aspect-ratio:auto] max-[480px]:h-[414px] max-[480px]:[aspect-ratio:auto]'>
          <iframe
            src={siteConfig.mapEmbedUrl}
            title={copy.home.accessMapTitle}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='block h-full w-full border-0'
          />
        </div>
        <dl className='gusto-access-details grid min-h-[min(21.5625vw,414px)] w-[min(24.9479vw,479px)] content-start text-[min(0.8333vw,16px)] leading-[min(2.1875vw,42px)] min-[1200px]:max-[1599px]:h-[420px] min-[1200px]:max-[1599px]:min-h-[420px] min-[1200px]:max-[1599px]:w-[479px] min-[1200px]:max-[1599px]:text-base min-[1200px]:max-[1599px]:leading-[42px] max-[1100px]:h-auto max-[1100px]:min-h-0 max-[1100px]:w-full max-[1100px]:text-[15px] max-[1100px]:leading-[2.2] min-[481px]:max-[768.02px]:h-[420px] min-[481px]:max-[768.02px]:min-h-[420px] min-[481px]:max-[768.02px]:w-[596px] min-[481px]:max-[768.02px]:text-base min-[481px]:max-[768.02px]:leading-[42px] max-[480px]:h-[372px] max-[480px]:min-h-[372px] max-[480px]:grid-rows-[81px_125px_25px_50px_27px] max-[480px]:gap-y-4 max-[480px]:text-base max-[480px]:leading-[27px]'>
          <div className={detailRowClass}>
            <dt className='font-normal'>{copy.info.address}</dt>
            <dd className={detailValueClass}>
              <address className={detailValueClass}>{siteConfig.address}</address>
              <a
                href={siteConfig.mapUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={copy.home.accessMapExternal}
                className='text-inherit underline underline-offset-4'
              >
                {copy.home.accessMap}
              </a>
            </dd>
          </div>
          <div
            className={`${detailRowClass} mb-[min(2.1875vw,42px)] min-[1200px]:max-[1599px]:mb-[42px] max-[1100px]:mb-6 min-[481px]:max-[768.02px]:mb-[42px] max-[480px]:mb-0`}
          >
            <dt className='font-normal'>{copy.home.accessDetails}</dt>
            <dd className={detailValueClass}>
              <ul className={detailValueClass}>
                {copy.home.accessRoutes.map((route) => (
                  <li key={route}>{route}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className={detailRowClass}>
            <dt className='font-normal'>{copy.info.phone}</dt>
            <dd className={detailValueClass}>
              <a
                href={siteConfig.phoneHref}
                className='text-inherit underline underline-offset-4'
              >
                {siteConfig.phone}
              </a>
            </dd>
          </div>
          <div className={detailRowClass}>
            <dt className='font-normal'>{copy.info.hours}</dt>
            <dd className={detailValueClass}>{siteConfig.hours}</dd>
          </div>
          <div className={detailRowClass}>
            <dt className='font-normal'>{copy.home.paymentLabel}</dt>
            <dd className={detailValueClass}>{copy.home.paymentMethods}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
