import type { getDictionary } from '@/locales';

export type HomePageCopy = ReturnType<typeof getDictionary>;
export type SocialIconType = 'x' | 'instagram' | 'drink';
export type SocialCard = {
  name: string;
  description: string;
  icon: SocialIconType;
};
