import { InstagramLogoIcon, WineIcon, XLogoIcon } from '@phosphor-icons/react/ssr';
import type { SocialIconType } from './types';

export function HomeSocialIcon({ type }: { type: SocialIconType }) {
  if (type === 'instagram') return <InstagramLogoIcon aria-hidden='true' weight='regular' />;
  if (type === 'drink') return <WineIcon aria-hidden='true' weight='regular' />;
  return <XLogoIcon aria-hidden='true' weight='regular' />;
}
