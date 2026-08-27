import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';

const detailValueClass = 'm-0 list-none p-0 not-italic';
const detailRowClass =
  'gusto-access-row grid grid-cols-[min(5.2083vw,100px)_1fr] xl:grid-cols-[100px_1fr] sm:grid-cols-[100px_1fr] xs:grid-cols-[79px_1fr]';

export function HomeAccessSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='access'
      className='gusto-access relative flex min-h-[min(38.0729vw,731px)] flex-col items-center gap-[min(2.9688vw,57px)] bg-coral p-[min(4.375vw,84px)_min(12.5vw,240px)] text-center text-content xl:h-[671.248474px] xl:min-h-[671.248474px] xl:gap-[57px] xl:p-[50px_96px] max-lg:h-auto max-lg:min-h-0 max-lg:gap-12 max-lg:p-[72px_max(24px,9vw)] sm:h-[1137.248535px] sm:min-h-[1137.248535px] sm:gap-[57px] sm:p-[64px_86px] xs:h-[954.010742px] xs:min-h-[954.010742px] xs:gap-4 xs:p-[32px_16px]'
    >
      <div className='gusto-access-title flex h-[min(4.7917vw,92px)] w-[min(75vw,1440px)] flex-col items-center gap-[min(0.4167vw,8px)] xl:h-[94.248497px] xl:w-[1248px] xl:gap-2 max-lg:h-auto max-lg:w-full max-lg:gap-2 sm:h-[94.248497px] sm:w-[191px] xs:h-[64.010719px] xs:w-[191px]'>
        <h2 className='w-full font-display text-[min(2.7083vw,52px)] leading-none font-normal tracking-[-0.288em] text-ink xl:h-[52px] xl:text-[52px] max-lg:text-[46px] sm:h-[52px] sm:text-[52px] sm:leading-[52px] sm:tracking-[-15px] xs:h-8 xs:text-[32px] xs:leading-8 xs:tracking-[-0.25em]'>
          {copy.home.accessTitle}
        </h2>
        <p className="relative pb-[min(0.4167vw,8px)] font-accent text-[min(0.9375vw,18px)] leading-[1.36] text-ink after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] xl:h-[34.248497px] xl:w-[172px] xl:px-[14px] xl:pt-0 xl:pb-[10.248497px] xl:text-lg xl:whitespace-nowrap xl:after:right-[14px] xl:after:left-[14px] xl:after:h-0.5 max-lg:pb-2 max-lg:text-[17px] sm:h-[34.248497px] sm:w-[144px] sm:p-[0_0_10.248497px] sm:text-lg sm:leading-6 sm:whitespace-nowrap sm:after:h-0.5 xs:h-[24.010719px] xs:w-[191px] xs:p-[0_0_10.010719px] xs:text-sm xs:leading-[14px] xs:whitespace-nowrap xs:after:right-[31.1px] xs:after:left-[31.1px] xs:after:h-0.5 xs:after:rotate-[0.895deg]">
          {copy.home.accessLabel}
        </p>
      </div>
      <div className='gusto-access-grid grid min-h-[min(21.5625vw,414px)] w-[min(75vw,1440px)] grid-cols-[min(25.3023vw,485.804px)_min(24.9479vw,479px)] justify-center gap-[min(1.25vw,24px)] text-left xl:h-[420px] xl:min-h-[420px] xl:w-[1248px] xl:grid-cols-[481.522461px_479px] xl:gap-6 max-lg:h-auto max-lg:min-h-0 max-lg:w-[min(100%,560px)] max-lg:grid-cols-1 max-lg:gap-9 sm:h-[858px] sm:min-h-[858px] sm:w-[596px] sm:grid-rows-[414px_420px] sm:gap-6 xs:h-[810px] xs:min-h-[810px] xs:w-[361px] xs:grid-rows-[414px_372px] xs:gap-6'>
        <div className='gusto-map h-[min(21.5625vw,414px)] w-[min(25.3023vw,485.804px)] overflow-hidden bg-[var(--color-map-surface)] xl:h-[414px] xl:w-[481.522461px] max-lg:h-auto max-lg:min-h-0 max-lg:w-full max-lg:aspect-[486/414] sm:h-[414px] sm:w-[596px] sm:[aspect-ratio:auto] xs:h-[414px] xs:[aspect-ratio:auto]'>
          <iframe
            src={siteConfig.mapEmbedUrl}
            title={copy.home.accessMapTitle}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='block h-full w-full border-0'
          />
        </div>
        <dl className='gusto-access-details grid min-h-[min(21.5625vw,414px)] w-[min(24.9479vw,479px)] content-start text-[min(0.8333vw,16px)] leading-[min(2.1875vw,42px)] xl:h-[420px] xl:min-h-[420px] xl:w-[479px] xl:text-base xl:leading-[42px] max-lg:h-auto max-lg:min-h-0 max-lg:w-full max-lg:text-[15px] max-lg:leading-[2.2] sm:h-[420px] sm:min-h-[420px] sm:w-[596px] sm:text-base sm:leading-[42px] xs:h-[372px] xs:min-h-[372px] xs:grid-rows-[81px_125px_25px_50px_27px] xs:gap-y-4 xs:text-base xs:leading-[27px]'>
          <div className={detailRowClass}>
            <dt className='font-normal'>{copy.info.address}</dt>
            <dd className={detailValueClass}>
              <address className={detailValueClass}>
                {siteConfig.address}
              </address>
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
            className={`${detailRowClass} mb-[min(2.1875vw,42px)] xl:mb-[42px] max-lg:mb-6 sm:mb-[42px] xs:mb-0`}
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
