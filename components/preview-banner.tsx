import { draftMode } from 'next/headers';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/locales';

export async function PreviewBanner({ locale }: { locale: Locale }) {
  const draft = await draftMode();
  if (!draft.isEnabled) return null;

  const copy = getDictionary(locale).preview;

  return (
    <aside
      className='fixed inset-x-0 bottom-0 z-[100] flex items-center justify-center gap-4 bg-neutral-950 px-4 py-3 text-center text-sm text-white shadow-lg'
      role='status'
    >
      <span>{copy.active}</span>
      <form action='/api/draft' method='post'>
        <button
          className='rounded border border-white px-3 py-1 font-semibold transition-colors hover:bg-white hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
          type='submit'
        >
          {copy.exit}
        </button>
      </form>
    </aside>
  );
}
