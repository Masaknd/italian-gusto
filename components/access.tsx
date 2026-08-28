import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';

const detailValueClass = 'm-0 list-none p-0 not-italic';
const detailRowClass =
  'gusto-access-row grid grid-cols-[79px_1fr] sm:grid-cols-[100px_1fr] 3xl:grid-cols-[min(5.2083vw,100px)_1fr]';

export function HomeAccessSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='access'
      className='gusto-access relative flex h-[954.010742px] min-h-[954.010742px] flex-col items-center gap-4 bg-coral p-[32px_16px] text-center text-content sm:h-[1137.248535px] sm:min-h-[1137.248535px] sm:gap-[57px] sm:p-[64px_86px] lg:h-auto lg:min-h-0 lg:gap-12 lg:p-[72px_max(24px,9vw)] xl:h-[671.248474px] xl:min-h-[671.248474px] xl:gap-[57px] xl:p-[50px_96px] 3xl:h-auto 3xl:min-h-[min(38.0729vw,731px)] 3xl:gap-[min(2.9688vw,57px)] 3xl:p-[min(4.375vw,84px)_min(12.5vw,240px)]'
    >
      <div className='gusto-access-title flex h-[64.010719px] w-[191px] flex-col items-center gap-[min(0.4167vw,8px)] sm:h-[94.248497px] sm:gap-2 lg:h-auto lg:w-full xl:h-[94.248497px] xl:w-[1248px] 3xl:h-[min(4.7917vw,92px)] 3xl:w-[min(75vw,1440px)]'>
        <h2 className='h-8 w-full font-display text-[32px] leading-8 font-normal tracking-[-0.25em] text-ink sm:h-[52px] sm:-translate-x-2.5 sm:text-[52px] sm:leading-[52px] sm:tracking-[-15px] lg:h-auto lg:translate-x-0 lg:text-[46px] lg:leading-none lg:tracking-[-0.288em] xl:h-[52px] xl:text-[52px] 3xl:h-auto 3xl:text-[min(2.7083vw,52px)]'>
          {copy.home.accessTitle}
        </h2>
        <p className="relative h-[24.010719px] w-[191px] p-[0_0_10px] whitespace-nowrap font-accent text-sm leading-[14px] text-ink after:absolute after:right-[31.1px] after:bottom-0 after:left-[31.1px] after:h-0.5 after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] sm:h-[34.248497px] sm:w-[144px] sm:p-[0_0_10.248497px] sm:text-lg sm:leading-6 sm:after:right-0 sm:after:left-0 lg:h-auto lg:w-auto lg:pb-2 lg:text-[17px] lg:leading-[1.36] xl:h-[34.248497px] xl:w-[172px] xl:pb-[10.248497px] xl:text-lg xl:after:right-[14px] xl:after:left-[14px] 3xl:h-auto 3xl:w-auto 3xl:pb-[min(0.4167vw,8px)] 3xl:text-[min(0.9375vw,18px)] 3xl:after:right-0 3xl:after:left-0 3xl:after:h-[3px]">
          {copy.home.accessLabel}
        </p>
      </div>
      <div className='gusto-access-grid grid h-[810px] min-h-[810px] w-[361px] grid-cols-1 grid-rows-[414px_372px] justify-center gap-6 text-left sm:h-[858px] sm:min-h-[858px] sm:w-[596px] sm:grid-rows-[414px_420px] lg:h-auto lg:min-h-0 lg:w-[min(100%,560px)] lg:grid-rows-none lg:gap-9 xl:h-[420px] xl:min-h-[420px] xl:w-[1248px] xl:grid-cols-[481.522461px_479px] xl:gap-6 3xl:min-h-[min(21.5625vw,414px)] 3xl:w-[min(75vw,1440px)] 3xl:grid-cols-[min(25.3023vw,485.804px)_min(24.9479vw,479px)] 3xl:gap-[min(1.25vw,24px)]'>
        <div className='gusto-map h-[414px] w-full overflow-hidden bg-[var(--color-map-surface)] [aspect-ratio:auto] sm:w-[596px] lg:h-auto lg:min-h-0 lg:aspect-[486/414] xl:h-[414px] xl:w-[481.522461px] xl:[aspect-ratio:auto] 3xl:h-[min(21.5625vw,414px)] 3xl:w-[min(25.3023vw,485.804px)]'>
          <iframe
            src={siteConfig.mapEmbedUrl}
            title={copy.home.accessMapTitle}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='block h-full w-full border-0'
          />
        </div>
        <dl className='gusto-access-details grid h-[372px] min-h-[372px] w-[361px] grid-rows-[81px_125px_25px_50px_27px] content-start gap-y-4 text-base leading-[27px] sm:h-[420px] sm:min-h-[420px] sm:w-[596px] sm:grid-rows-none sm:gap-y-0 sm:leading-[42px] lg:h-auto lg:min-h-0 lg:w-full lg:text-[15px] lg:leading-[2.2] xl:h-[420px] xl:min-h-[420px] xl:w-[479px] xl:text-base xl:leading-[42px] 3xl:h-auto 3xl:min-h-[min(21.5625vw,414px)] 3xl:w-[min(24.9479vw,479px)] 3xl:text-[min(0.8333vw,16px)] 3xl:leading-[min(2.1875vw,42px)]'>
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
