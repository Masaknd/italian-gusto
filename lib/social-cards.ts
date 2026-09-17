import 'server-only';
import type { SocialCard } from '@/components/types';
import type { getDictionary } from '@/locales';

export function getSocialCards(
  copy: ReturnType<typeof getDictionary>,
): SocialCard[] {
  const destinations = [
    {
      ...copy.home.social.twitter,
      icon: 'x' as const,
      url: process.env.SOCIAL_TWITTER_URL,
    },
    {
      ...copy.home.social.instagram,
      icon: 'instagram' as const,
      url: process.env.SOCIAL_INSTAGRAM_URL,
    },
    {
      ...copy.home.social.blog,
      icon: 'drink' as const,
      url: process.env.SOCIAL_BLOG_URL,
    },
  ];
  return destinations.flatMap((card): SocialCard[] => {
    if (!card.url) return [];
    try {
      return new URL(card.url).protocol === 'https:'
        ? [
            {
              name: card.name,
              description: card.description,
              icon: card.icon,
              url: card.url,
            },
          ]
        : [];
    } catch {
      return [];
    }
  });
}
