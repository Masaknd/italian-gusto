'use client';

import { useState } from 'react';
import { setAnalyticsConsent, useAnalyticsConsent } from './analytics';
import type { getDictionary } from '@/locales';

export function PrivacyPreferences({
  copy,
}: {
  copy: ReturnType<typeof getDictionary>['privacy'];
}) {
  const consent = useAnalyticsConsent();
  const [savedChoice, setSavedChoice] = useState<boolean | null>(null);

  const choose = (allowed: boolean) => {
    setAnalyticsConsent(allowed);
    setSavedChoice(allowed);
  };

  return (
    <div className='mt-6'>
      <p className='text-sm font-bold'>
        {copy.currentChoice}{' '}
        <span className='font-normal'>
          {consent === 'yes'
            ? copy.accept
            : consent === 'no'
              ? copy.reject
              : copy.noChoice}
        </span>
      </p>
      <div
        className='mt-4 flex flex-wrap gap-3'
        role='group'
        aria-label={copy.change}
      >
        {(
          [
            { allowed: false, label: copy.reject },
            { allowed: true, label: copy.accept },
          ] as const
        ).map(({ allowed, label }) => {
          const selected = consent === (allowed ? 'yes' : 'no');
          return (
            <button
              key={label}
              type='button'
              aria-pressed={selected}
              onClick={() => choose(allowed)}
              className={`min-h-11 cursor-pointer rounded-md border border-ink px-5 py-3 text-sm font-bold transition-colors ${
                selected ? 'bg-ink text-warm-light' : 'text-ink hover:bg-ink/10'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <p role='status' aria-live='polite' className='mt-4 text-sm'>
        {savedChoice === null
          ? ''
          : savedChoice
            ? copy.savedAccept
            : copy.savedReject}
      </p>
    </div>
  );
}
