import { InstagramLogoIcon, WineIcon, XLogoIcon } from '@phosphor-icons/react/ssr';
import type { SocialIconType } from './types';

export function HomeSocialIcon({
  type,
  className,
}: {
  type: SocialIconType;
  className?: string;
}) {
  if (type === 'instagram') {
    return (
      <InstagramLogoIcon
        aria-hidden='true'
        className={className}
        weight='regular'
      />
    );
  }
  if (type === 'drink') {
    return (
      <WineIcon aria-hidden='true' className={className} weight='regular' />
    );
  }
  return (
    <XLogoIcon aria-hidden='true' className={className} weight='regular' />
  );
}
