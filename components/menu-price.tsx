import { includingTax } from '@/lib/site-config';

type MenuPriceProps = {
  excludingTaxLabel: string;
  priceExcludingTax: number;
};

export function MenuPrice({
  excludingTaxLabel,
  priceExcludingTax,
}: MenuPriceProps) {
  const priceIncludingTax = includingTax(priceExcludingTax);

  return (
    <p className='gusto-menu-card__price mt-auto mb-0 flex w-full items-baseline justify-end leading-none font-normal text-black'>
      {/* PRICE INCLUDED TAX */}
      <span>
        <span className='gusto-menu-card__yen font-quaternary text-[24px] leading-5'>
          ¥
        </span>
        <span className='font-primary text-2xl leading-6 tracking-[-0.25em] xl:text-[42px] xl:leading-5.5'>
          {priceIncludingTax}
        </span>
      </span>
      {/* PRICE EXCLUDED TAX */}
      <span className='ml-1 text-[28px] xl:text-[42px]'>
        <small className='font-tertiary text-sm font-normal'>
          （{excludingTaxLabel}
        </small>
        <span className='gusto-menu-card__yen font-quaternary text-[18px] leading-4.5'>
          ¥
        </span>
        <span className='mr-1 font-primary text-[18px] leading-4.5 tracking-[-0.25em] xl:text-[28px] xl:leading-7'>
          {priceExcludingTax}
        </span>
        <small className='text-sm font-normal'>）</small>
      </span>
    </p>
  );
}
