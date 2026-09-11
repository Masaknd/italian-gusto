'use client';

import {
  InstagramLogoIcon,
  WineIcon,
  XLogoIcon,
} from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import { useRepeatingEmphasisAnimation } from './animations/animated-emphasis-text';
import type { SocialIconType } from './types';

const socialIcons = {
  instagram: InstagramLogoIcon,
  drink: WineIcon,
  x: XLogoIcon,
} as const;

const animatedSocialIcons = {
  instagram: motion.create(InstagramLogoIcon),
  drink: motion.create(WineIcon),
  x: motion.create(XLogoIcon),
} as const;

export function HomeSocialIcon({
  type,
  className,
  animated = false,
}: {
  type: SocialIconType;
  className?: string;
  animated?: boolean;
}) {
  const emphasisAnimation = useRepeatingEmphasisAnimation(animated);

  if (animated) {
    const AnimatedIcon = animatedSocialIcons[type];

    return (
      <AnimatedIcon
        aria-hidden='true'
        className={className}
        weight='regular'
        {...emphasisAnimation}
      />
    );
  }

  const Icon = socialIcons[type];

  return <Icon aria-hidden='true' className={className} weight='regular' />;
}
