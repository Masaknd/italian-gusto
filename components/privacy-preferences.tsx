'use client';

import { setAnalyticsConsent } from './analytics';
import type { getDictionary } from '@/locales';

export function PrivacyPreferences({
  copy,
}: {
  copy: ReturnType<typeof getDictionary>['privacy'];
}) {
  return (
    <div className='mt-8 flex flex-wrap gap-3' aria-label={copy.change}>
      <button
        type='button'
        onClick={() => setAnalyticsConsent(false)}
        className='min-h-11 rounded-md border border-ink px-4'
      >
        {copy.reject}
      </button>
      <button
        type='button'
        onClick={() => setAnalyticsConsent(true)}
        className='min-h-11 rounded-md bg-ink px-4 text-white'
      >
        {copy.accept}
      </button>
    </div>
  );
}
