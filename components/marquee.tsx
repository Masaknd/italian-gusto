type MarqueeProps = {
  className?: string;
  text: string;
};

export function Marquee({ className, text }: MarqueeProps) {
  return (
    <p
      className={['gusto-marquee', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {text}
    </p>
  );
}
