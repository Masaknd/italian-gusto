import Link from 'next/link';
import type { getDictionary } from '@/locales';

export function TranslationAvailabilityNotice({
  copy,
}: {
  copy: ReturnType<typeof getDictionary>;
}) {
  return (
    <p className='m-0 text-muted' role='status'>
      {copy.translations.unavailable}{' '}
      <Link className='underline underline-offset-4' href='/ja/menu'>
        {copy.translations.viewJapaneseMenu}
      </Link>
    </p>
  );
}
