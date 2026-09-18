import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { Locale } from '@/lib/i18n';

type LanguageFontProps<T extends ElementType> = {
  as: T;
  locale: Locale;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'locale' | 'className'>;

/** Applies the locale font directly to the chosen element or component. */
export function LanguageFont<T extends ElementType>({
  as,
  locale,
  className,
  ...props
}: LanguageFontProps<T>) {
  const Component: ElementType = as;
  const fontClass = locale === 'en' ? 'font-label' : 'font-accent';

  return (
    <Component
      {...props}
      className={className ? `${fontClass} ${className}` : fontClass}
    />
  );
}
