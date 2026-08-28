import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';

const detailValueClass = 'm-0 list-none p-0 not-italic';
const detailRowClass =
  'gusto-access-row grid grid-cols-[79px_1fr] sm:grid-cols-[100px_1fr] 3xl:grid-cols-[min(5.2083vw,100px)_1fr]';

export function HomeAccessSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='access'
      className='gusto-access relative flex  flex-col items-center gap-4 bg-coral p-[32px_16px] text-center text-content sm:gap-8 sm:p-[64px_86px] lg:gap-12 lg:p-[72px_max(24px,9vw)] xl:gap-[57px] xl:p-[50px_96px] 3xl:gap-[min(2.9688vw,57px)] 3xl:p-[min(4.375vw,84px)_min(12.5vw,240px)]'
    >
      <div className='gusto-access-title flex flex-col items-center w-full gap-[min(0.4167vw,8px)] sm:gap-2'>
        <h2 className='w-full font-display text-[32px] leading-8 font-normal tracking-[-0.25em] text-ink sm:text-[52px] sm:leading-[52px] sm:tracking-[-15px] lg:text-[46px] lg:leading-none lg:tracking-[-0.288em] xl:text-[52px] 3xl:text-[min(2.7083vw,52px)] -translate-x-1 sm:-translate-x-2 md:-translate-x-2.5'>
          {copy.home.accessTitle}
        </h2>
        <p className="relative p-[0_0_10px] whitespace-nowrap font-accent text-sm leading-[14px] text-ink after:absolute after:w-full after:bottom-0 after:left-0 after:h-0.5 after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] sm:p-[0_0_10.248497px] sm:text-lg sm:leading-6 lg:pb-2 lg:text-[17px] lg:leading-[1.36] xl:pb-[10.248497px] xl:text-lg 3xl:pb-[min(0.4167vw,8px)] 3xl:text-[min(0.9375vw,18px)] 3xl:after:h-[3px]">
          {copy.home.accessLabel}
        </p>
      </div>
      <div className='gusto-access-grid w-full lg:w-[80%] grid grid-rows-2 lg:grid-rows-none lg:grid-cols-5 justify-center gap-6 text-left lg:gap-9 xl:gap-6 3xl:gap-[min(1.25vw,24px)]'>
        <div className='gusto-map lg:col-span-3 w-full h-auto overflow-hidden bg-[var(--color-map-surface)] [aspect-ratio:auto]'>
          <iframe
            src={siteConfig.mapEmbedUrl}
            title={copy.home.accessMapTitle}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='block h-full w-full border-0'
          />
        </div>
        <dl className='gusto-access-details lg:col-span-2 text-base lg:text-[15px] xl:text-base leading-[32px] sm:leading-[42px] lg:leading-[2.2] xl:leading-[42px]'>
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
            className={`${detailRowClass} mb-0 sm:mb-[42px] lg:mb-6 xl:mb-[42px] 3xl:mb-[min(2.1875vw,42px)]`}
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
