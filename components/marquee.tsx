type MarqueeProps = {
  className?: string;
  text: string;
};

export function Marquee({ className, text }: MarqueeProps) {
  return (
    <p
      className={[
        'absolute m-0 origin-top-left [transform:rotate(90deg)] whitespace-nowrap font-display text-[86px] leading-[90px] font-normal tracking-[-0.25em] text-orange [text-shadow:var(--shadow-hero-title)]',
        className,
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {text}
    </p>
  );
}
