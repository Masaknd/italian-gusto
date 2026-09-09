import { includingTax } from '@/lib/site-config';

type MenuPriceProps = {
  includingTaxLabel: string;
  priceExcludingTax: number;
};

export function MenuPrice({
  includingTaxLabel,
  priceExcludingTax,
}: MenuPriceProps) {
  const priceIncludingTax = includingTax(priceExcludingTax);

  return (
    <p className='gusto-menu-card__price mt-auto mb-0 flex w-full items-baseline justify-end leading-none font-normal text-black'>
      {/* PRICE EXCLUDED TAX */}
      <div>
        <span className='gusto-menu-card__yen font-quaternary text-[24px] leading-[20px]'>
          ¥
        </span>
        <span className='font-primary text-2xl leading-6 tracking-[-0.25em] xl:text-[42px] xl:leading-[22px]'>
          {priceExcludingTax}
        </span>
      </div>
      <span className='ml-1 text-[28px] xl:text-[42px]'>
        <small className='font-tertiary text-sm font-normal'>
          （{includingTaxLabel}
        </small>
        <span className='gusto-menu-card__yen font-quaternary text-[24px] leading-[20px]'>
          ¥
        </span>
        <span className='mr-1 font-primary text-2xl leading-6 tracking-[-0.25em] xl:text-[42px] xl:leading-[22px]'>
          {priceIncludingTax}
        </span>
        <small className='text-sm font-normal'>）</small>
      </span>
    </p>
  );
}
