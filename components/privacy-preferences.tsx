'use client';

import { setAnalyticsConsent } from './analytics';
import type { getDictionary } from '@/locales';

export function PrivacyPreferences({
  copy,
}: {
  copy: ReturnType<typeof getDictionary>['privacy'];
}) {
  return (
    <div
      className='mt-6 flex flex-wrap gap-3'
      role='group'
      aria-label={copy.change}
    >
      <button
        type='button'
        onClick={() => setAnalyticsConsent(false)}
        className='min-h-11 rounded-md border border-ink px-5 py-3 text-sm font-bold transition-colors hover:bg-ink/5'
      >
        {copy.reject}
      </button>
      <button
        type='button'
        onClick={() => setAnalyticsConsent(true)}
        className='min-h-11 rounded-md border border-ink bg-ink px-5 py-3 text-sm font-bold text-warm-light transition-colors hover:bg-action-hover'
      >
        {copy.accept}
      </button>
    </div>
  );
}
