import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';

export function HomeAccessSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section id='access' className='gusto-access'>
      <div className='gusto-access-title'>
        <h2>{copy.home.accessTitle}</h2>
        <p>{copy.home.accessLabel}</p>
      </div>
      <div className='gusto-access-grid'>
        <div className='gusto-map'>
          <iframe src={siteConfig.mapEmbedUrl} title={copy.home.accessMapTitle} loading='lazy' referrerPolicy='no-referrer-when-downgrade' />
        </div>
        <dl className='gusto-access-details'>
          <div className='gusto-access-row'>
            <dt>{copy.info.address}</dt>
            <dd>
              <address>{siteConfig.address}</address>
              <a href={siteConfig.mapUrl} target='_blank' rel='noopener noreferrer' aria-label={copy.home.accessMapExternal}>
                {copy.home.accessMap}
              </a>
            </dd>
          </div>
          <div className='gusto-access-row gusto-access-routes'>
            <dt>{copy.home.accessDetails}</dt>
            <dd><ul>{copy.home.accessRoutes.map((route) => <li key={route}>{route}</li>)}</ul></dd>
          </div>
          <div className='gusto-access-row'>
            <dt>{copy.info.phone}</dt>
            <dd><a href={siteConfig.phoneHref}>{siteConfig.phone}</a></dd>
          </div>
          <div className='gusto-access-row'>
            <dt>{copy.info.hours}</dt>
            <dd>{siteConfig.hours}</dd>
          </div>
          <div className='gusto-access-row'>
            <dt>{copy.home.paymentLabel}</dt>
            <dd>{copy.home.paymentMethods}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
