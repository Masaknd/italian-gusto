import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  InstagramLogoIcon,
  PhoneIcon,
  WineIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { Locale } from "@/lib/i18n";
import type { FeaturedMenu } from "@/lib/microcms/types";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/locales";
import { ReservationLink } from "./reservation-link";

type Copy = ReturnType<typeof getDictionary>;

function Hero({ d }: { d: Copy }) {
  return (
    <section
      className={
        'gusto-hero h-[min(66.458vw,_1276px)] min-h-[900px] relative isolate overflow-hidden p-[205px_max(8vw,_calc((100vw_-_1440px)_/_2))] [&_h1]:whitespace-pre-line [&_h1]:text-[var(--coral)] [&_h1]:text-[clamp(4.5rem,_5.21vw,_100px)] [&_h1]:leading-[108px] [&_h1]:tracking-[-0.3em] [&_h1]:font-normal min-[1200px]:max-[1599.02px]:h-[952px]! min-[1200px]:max-[1599.02px]:min-h-[952px]! min-[1200px]:max-[1599.02px]:p-0! min-[1200px]:max-[1599.02px]:[&_h1]:w-[424px]! min-[1200px]:max-[1599.02px]:[&_h1]:text-[68px]! min-[1200px]:max-[1599.02px]:[&_h1]:leading-[80px]! min-[1200px]:max-[1599.02px]:[&_h1]:tracking-[-0.2em]! max-[768.02px]:h-auto! max-[768.02px]:min-h-[470px]! max-[768.02px]:p-[5.2rem_15%_5rem_22%]! max-[768.02px]:[&_h1]:text-[clamp(1.55rem,_5vw,_2.5rem)]! max-[768.02px]:[&_h1]:leading-[1.35]! max-[768.02px]:[&_h1]:tracking-[normal]! min-[481px]:max-[768.02px]:h-[844px]! min-[481px]:max-[768.02px]:min-h-[844px]! min-[481px]:max-[768.02px]:p-0! min-[481px]:max-[768.02px]:[&_h1]:text-[68px]! min-[481px]:max-[768.02px]:[&_h1]:h-[240px]! min-[481px]:max-[768.02px]:[&_h1]:tracking-[-0.2em]! min-[481px]:max-[768.02px]:[&_h1]:leading-[80px]! min-[481px]:max-[768.02px]:[&_h1]:w-[424px]! max-[480.02px]:h-[675px]! max-[480.02px]:min-h-[675px]! max-[480.02px]:p-[0_16px]! max-[480.02px]:[&_h1]:text-[48px]! max-[480.02px]:[&_h1]:font-normal! max-[480.02px]:[&_h1]:h-[180px]! max-[480.02px]:[&_h1]:tracking-[-0.2em]! max-[480.02px]:[&_h1]:leading-[60px]! max-[480.02px]:[&_h1]:text-center! max-[480.02px]:[&_h1]:w-[361px]!'
      }
    >
      <p
        className={
          'gusto-vertical [.gusto-home_&]:absolute [.gusto-home_&]:left-[90px] [.gusto-home_&]:top-[304.5px] [.gusto-home_&]:text-[var(--color-brand-orange)] [.gusto-home_&]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [.gusto-home_&]:font-normal [.gusto-home_&]:text-[86px] [.gusto-home_&]:leading-[90px] [.gusto-home_&]:tracking-[-0.25em] [.gusto-home_&]:text-shadow-[var(--shadow-hero-title)] [.gusto-home_&]:rotate-[90deg] [.gusto-home_&]:origin-[top_left] [.gusto-home_&]:whitespace-nowrap min-[1200px]:max-[1599.02px]:[.gusto-home_&]:top-[163.935059px]! max-[768.02px]:left-[5%]! max-[768.02px]:top-[27%]! max-[768.02px]:text-[clamp(1.1rem,_4vw,_2rem)]! max-[768.02px]:leading-[1.1]! max-[768.02px]:tracking-[0.2em]! max-[768.02px]:text-shadow-none! min-[481px]:max-[768.02px]:[.gusto-home_&]:items-center! min-[481px]:max-[768.02px]:[.gusto-home_&]:flex! min-[481px]:max-[768.02px]:[.gusto-home_&]:text-[length:68px]! min-[481px]:max-[768.02px]:[.gusto-home_&]:h-[60px]! min-[481px]:max-[768.02px]:[.gusto-home_&]:justify-start! min-[481px]:max-[768.02px]:[.gusto-home_&]:left-[-233.499996px]! min-[481px]:max-[768.02px]:[.gusto-home_&]:tracking-[-0.25em]! min-[481px]:max-[768.02px]:[.gusto-home_&]:leading-[90px]! min-[481px]:max-[768.02px]:[.gusto-home_&]:text-shadow-[var(--shadow-hero-title)]! min-[481px]:max-[768.02px]:[.gusto-home_&]:top-[233.500009px]! min-[481px]:max-[768.02px]:[.gusto-home_&]:rotate-[90deg]! min-[481px]:max-[768.02px]:[.gusto-home_&]:origin-[center]! min-[481px]:max-[768.02px]:[.gusto-home_&]:w-[527px]! max-[480.02px]:[.gusto-home_&]:hidden!'
        }
      >
        {d.home.verticalTitle}
      </p>
      <div
        className={
          'gusto-hero-copy relative z-[2] max-w-[596px] min-[1200px]:max-[1599.02px]:absolute! min-[1200px]:max-[1599.02px]:top-[204.869141px]! min-[1200px]:max-[1599.02px]:left-[202.271194px]! min-[1200px]:max-[1599.02px]:w-[424px]! min-[1200px]:max-[1599.02px]:max-w-none! max-[768.02px]:max-w-[440px]! min-[481px]:max-[768.02px]:left-[86.237976px]! min-[481px]:max-[768.02px]:max-w-none! min-[481px]:max-[768.02px]:absolute! min-[481px]:max-[768.02px]:top-0! min-[481px]:max-[768.02px]:w-[424px]! max-[480.02px]:left-[16px]! max-[480.02px]:max-w-none! max-[480.02px]:absolute! max-[480.02px]:top-0! max-[480.02px]:w-[361px]!'
        }
      >
        <h1>
          {d.hero.titleSegments.map((line, lineIndex) => (
            <span className='gusto-hero-title-line block' key={lineIndex}>
              {line.map((segment, segmentIndex) => (
                <span
                  className={
                    'emphasis' in segment && segment.emphasis
                      ? 'gusto-hero-title-emphasis min-[481px]:max-[768.02px]:text-[86px]! max-[480.02px]:text-[68px]!'
                      : undefined
                  }
                  key={`${lineIndex}-${segmentIndex}`}
                >
                  {segment.text}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <nav
          aria-label={d.home.heroNavLabel}
          className={
            'gusto-hero-nav grid gap-[18px] mt-[68px] font-[family-name:var(--font-kalam),_var(--font-noto-sans-jp),_sans-serif] text-[28px] leading-[24px] font-bold [&_a]:w-max [&_a]:text-[var(--ink)] [&_a]:no-underline min-[1200px]:max-[1599.02px]:absolute! min-[1200px]:max-[1599.02px]:top-[calc(_532.714966px_-_204.869141px_)]! min-[1200px]:max-[1599.02px]:left-[2.556107px]! min-[1200px]:max-[1599.02px]:gap-[18px]! min-[1200px]:max-[1599.02px]:mt-0! min-[1200px]:max-[1599.02px]:text-[28px]! min-[1200px]:max-[1599.02px]:leading-[24px]! max-[768.02px]:gap-[0.3rem]! max-[768.02px]:mt-[1.6rem]! max-[768.02px]:text-[clamp(0.72rem,_1vw,_1rem)]! max-[768.02px]:leading-[normal]! min-[481px]:max-[768.02px]:hidden! max-[480.02px]:hidden!'
          }
        >
          <a href=''>{d.home.heroNav.home}</a>
          <a href='#about'>{d.home.heroNav.about}</a>
          <a href='#recommendations'>{d.home.heroNav.menu}</a>
          <a href='#access'>{d.home.heroNav.access}</a>
          <a href='#reservation'>{d.home.heroNav.reservation}</a>
        </nav>
      </div>
      <Image
        src='/images/dishes.png'
        alt={d.home.heroDishesAlt}
        fill
        priority
        sizes='(max-width: 768px) 90vw, 65vw'
        className={
          'gusto-hero-dishes z-[1] left-[32.8125%]! w-[68%]! h-[92%]! top-0! min-[1200px]:max-[1599.02px]:top-[-59.054199px]! min-[1200px]:max-[1599.02px]:left-[627.082397px]! min-[1200px]:max-[1599.02px]:w-[844.035925px]! min-[1200px]:max-[1599.02px]:h-[908.671057px]! min-[1200px]:max-[1599.02px]:object-fill! min-[1200px]:max-[1599.02px]:object-[center]! max-[768.02px]:left-[23%]! max-[768.02px]:w-[89%]! max-[768.02px]:h-[58%]! max-[768.02px]:top-0! min-[481px]:max-[768.02px]:bottom-auto! min-[481px]:max-[768.02px]:h-[797.771484px]! min-[481px]:max-[768.02px]:left-[141.321472px]! min-[481px]:max-[768.02px]:object-fill! min-[481px]:max-[768.02px]:object-[center]! min-[481px]:max-[768.02px]:right-auto! min-[481px]:max-[768.02px]:top-[-1.597839px]! min-[481px]:max-[768.02px]:w-[739.296631px]! max-[480.02px]:bottom-auto! max-[480.02px]:h-[501.597656px]! max-[480.02px]:left-[-17.040405px]! max-[480.02px]:max-w-none! max-[480.02px]:object-fill! max-[480.02px]:object-[center]! max-[480.02px]:right-auto! max-[480.02px]:top-[123.562851px]! max-[480.02px]:w-[464.832825px]! object-contain object-right-top'
        }
      />
      <Image
        src='/images/four-veggies.png'
        alt=''
        width={360}
        height={246}
        className={
          'gusto-hero-veg absolute z-[2] w-[360px] h-auto left-[24.0625%] top-[675px] opacity-[0.7] min-[1200px]:max-[1599.02px]:top-[549.103516px]! min-[1200px]:max-[1599.02px]:left-[394.24704px]! min-[1200px]:max-[1599.02px]:w-[415.595337px]! min-[1200px]:max-[1599.02px]:opacity-[1]! max-[768.02px]:left-[16%]! max-[768.02px]:top-auto! max-[768.02px]:bottom-[7%]! max-[768.02px]:w-[clamp(130px,_24vw,_280px)]! min-[481px]:max-[768.02px]:bottom-auto! min-[481px]:max-[768.02px]:h-[237.561798px]! min-[481px]:max-[768.02px]:left-[86.73233px]! min-[481px]:max-[768.02px]:opacity-[1]! min-[481px]:max-[768.02px]:top-[597.101837px]! min-[481px]:max-[768.02px]:w-[347.39679px]! max-[480.02px]:bottom-auto! max-[480.02px]:h-[137.972656px]! max-[480.02px]:left-[16px]! max-[480.02px]:opacity-[1]! max-[480.02px]:top-[516.244629px]! max-[480.02px]:w-[201.76062px]!'
        }
      />
      <a
        className={
          'gusto-hero-caret items-center border-[5px] border-[var(--coral)] rounded-full text-[var(--coral)] flex font-normal text-[46px] leading-none font-[family-name:var(--font-kirigirisu)] h-[74px] justify-center absolute right-[72px] no-underline top-[1026px] w-[74px] z-[4] max-[768.02px]:hidden! min-[481px]:max-[768.02px]:hidden! max-[480.02px]:hidden!'
        }
        href='#about'
        aria-label={d.home.heroScrollLabel}
      >
        <span aria-hidden='true'>↑</span>
      </a>
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='100vw'
        className={
          'gusto-hero-brush absolute z-[3] inset-[auto_0_-1px]! block w-full! h-auto! max-w-none! pointer-events-none min-[481px]:max-[768.02px]:hidden! max-[480.02px]:hidden!'
        }
      />
    </section>
  );
}

function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="#wine"
      className={
        "gusto-about-more flex items-center gap-[min(1.667vw,_32px)] w-max text-[var(--color-brand-warm-light)] font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] text-[clamp(0.75rem,_1.25vw,_1.5rem)] leading-[1.375] underline underline-offset-[4px] [&_svg]:flex-[none] [&_svg]:w-[clamp(3.5rem,_5.8vw,_6.96rem)] [&_svg]:h-auto [&_svg]:overflow-visible [&_svg]:fill-none [&_svg]:stroke-[currentColor] [&_svg]:stroke-[1] min-[1200px]:max-[1599.02px]:gap-[32px]! min-[1200px]:max-[1599.02px]:h-[60px]! min-[1200px]:max-[1599.02px]:text-[24px]! min-[1200px]:max-[1599.02px]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[&_svg]:w-[111.396759px]! min-[481px]:max-[768.02px]:gap-[32px]! min-[481px]:max-[768.02px]:h-[60px]! min-[481px]:max-[768.02px]:justify-center! min-[481px]:max-[768.02px]:w-[720px]! min-[481px]:max-[768.02px]:text-[22px]! min-[481px]:max-[768.02px]:leading-[24px]! min-[481px]:max-[768.02px]:[&_svg]:h-[60px]! min-[481px]:max-[768.02px]:[&_svg]:w-[111.396759px]! max-[480.02px]:text-[18px]! max-[480.02px]:gap-[32px]! max-[480.02px]:h-[60px]! max-[480.02px]:justify-start! max-[480.02px]:leading-[24px]! max-[480.02px]:no-underline! max-[480.02px]:w-full! max-[480.02px]:[&_span]:flex-[1_1_auto]! max-[480.02px]:[&_span]:min-w-0! max-[480.02px]:[&_svg]:h-[60px]! max-[480.02px]:[&_svg]:w-[111.396759px]!"
      }
    >
      <span>{children}</span>
      <svg aria-hidden="true" viewBox="0 0 111.4 60" focusable="false">
        <circle cx="46" cy="30" r="29.5" />
        <path d="M37 30h73m-22-22 22 22-22 22" />
      </svg>
    </Link>
  );
}

function About({ d }: { d: Copy }) {
  return (
    <section
      id="about"
      className={
        "gusto-about gusto-dark h-[min(61.77vw,_1186px)] min-h-0 p-[min(6.25vw,_120px)_0_0] flex justify-center gap-[min(1.25vw,_24px)] items-start min-[1200px]:max-[1599.02px]:h-[832px]! min-[1200px]:max-[1599.02px]:p-[60px_96px_100px]! min-[1200px]:max-[1599.02px]:gap-[24px]! max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:p-[5rem_15%_7rem]! max-[768.02px]:gap-[1.5rem]! max-[768.02px]:h-auto! min-[481px]:max-[768.02px]:bg-transparent! min-[481px]:max-[768.02px]:block! min-[481px]:max-[768.02px]:h-[1239.476807px]! min-[481px]:max-[768.02px]:p-0! min-[481px]:max-[768.02px]:relative! min-[481px]:max-[768.02px]:[&::after]:bg-[var(--color-brand-ink)]! min-[481px]:max-[768.02px]:[&::after]:content-['']! min-[481px]:max-[768.02px]:[&::after]:h-[1182.850098px]! min-[481px]:max-[768.02px]:[&::after]:inset-[56.62664px_0_auto]! min-[481px]:max-[768.02px]:[&::after]:absolute! min-[481px]:max-[768.02px]:[&::after]:z-0! max-[480.02px]:items-start! max-[480.02px]:bg-transparent! max-[480.02px]:flex! max-[480.02px]:flex-row! max-[480.02px]:flex-wrap! max-[480.02px]:gap-[32px_0]! max-[480.02px]:h-auto! max-[480.02px]:min-h-0! max-[480.02px]:p-[calc(_28.976917px_+_48px_)_16px_48px]! max-[480.02px]:relative! max-[480.02px]:[&::after]:bg-[var(--color-brand-ink)]! max-[480.02px]:[&::after]:content-['']! max-[480.02px]:[&::after]:inset-[28.976917px_0_0]! max-[480.02px]:[&::after]:absolute! max-[480.02px]:[&::after]:z-0! [&::before]:content-[''] [&::before]:absolute [&::before]:inset-[auto_0_-1px] [&::before]:h-[clamp(24px,_4vw,_78px)] [&::before]:bg-[var(--ink)] [&::before]:[clip-path:polygon(_0_24%,_5%_61%,_10%_47%,_16%_85%,_22%_43%,_29%_66%,_35%_28%,_43%_70%,_49%_46%,_56%_88%,_63%_42%,_70%_65%,_77%_30%,_85%_72%,_93%_42%,_100%_67%,_100%_100%,_0_100%_)] [&::before]:z-[3] relative bg-[var(--ink)] text-[var(--cream)] max-[480.02px]:p-[3.8rem_9%_5rem]! max-[480.02px]:min-h-0!"
      }
    >
      <Image
        src="/images/b-1.png"
        alt=""
        width={3841}
        height={284}
        sizes="768px"
        className={
          "gusto-about-brush hidden min-[481px]:max-[768.02px]:block! min-[481px]:max-[768.02px]:h-[56.62664px]! min-[481px]:max-[768.02px]:left-0! min-[481px]:max-[768.02px]:object-fill! min-[481px]:max-[768.02px]:absolute! min-[481px]:max-[768.02px]:top-0! min-[481px]:max-[768.02px]:w-full! min-[481px]:max-[768.02px]:z-[1]! max-[480.02px]:block! max-[480.02px]:h-[28.976917px]! max-[480.02px]:left-0! max-[480.02px]:object-fill! max-[480.02px]:absolute! max-[480.02px]:top-0! max-[480.02px]:w-full! max-[480.02px]:z-[1]!"
        }
      />
      <div
        className={
          "gusto-about-left relative w-[min(30.47vw,_585px)] h-[min(39.48vw,_758px)] min-[1200px]:max-[1599.02px]:w-[612px]! min-[1200px]:max-[1599.02px]:h-[672px]! max-[768.02px]:w-full! max-[768.02px]:h-auto! min-[481px]:max-[768.02px]:h-[352.000031px]! min-[481px]:max-[768.02px]:left-[24px]! min-[481px]:max-[768.02px]:absolute! min-[481px]:max-[768.02px]:top-[calc(56.62664px_+_64px)]! min-[481px]:max-[768.02px]:w-[720px]! min-[481px]:max-[768.02px]:z-[2]! max-[480.02px]:flex-[0_0_100%]! max-[480.02px]:h-auto! max-[480.02px]:min-w-0! max-[480.02px]:order-[-1]! max-[480.02px]:relative! max-[480.02px]:w-auto! max-[480.02px]:z-[2]!"
        }
      >
        <div
          className={
            "gusto-about-copy relative z-[2] flex flex-col gap-[min(2.5vw,_48px)] w-full min-[1200px]:max-[1599.02px]:gap-[48px]! min-[1200px]:max-[1599.02px]:w-[612px]! max-[768.02px]:w-full! max-[768.02px]:h-auto! min-[481px]:max-[768.02px]:items-center! min-[481px]:max-[768.02px]:gap-[48px]! min-[481px]:max-[768.02px]:h-[352.000031px]! min-[481px]:max-[768.02px]:w-[720px]! max-[480.02px]:items-center! max-[480.02px]:gap-[48px]! max-[480.02px]:h-[408.000031px]! max-[480.02px]:w-full!"
          }
        >
          <div
            className={
              "gusto-about-title [--gusto-about-title-width:100%] relative w-[var(--gusto-about-title-width)] h-[min(4.375vw,_84px)] [&::after]:absolute [&::after]:bottom-0 [&::after]:left-0 [&::after]:w-[var(--gusto-about-title-width)] [&::after]:h-[3px] [&::after]:bg-[repeating-linear-gradient(_90deg,_var(--coral)_0_8px,_transparent_8px_16px_)] [&::after]:content-[''] [&_h2]:text-[var(--coral)] [&_h2]:text-[clamp(2.5rem,_4.167vw,_5rem)] [&_h2]:font-normal [&_h2]:tracking-[-0.25em] [&_h2]:leading-[1] min-[1200px]:max-[1599.02px]:[--gusto-about-title-width:320px]! min-[1200px]:max-[1599.02px]:h-[84px]! min-[1200px]:max-[1599.02px]:[&::after]:w-[320px]! min-[1200px]:max-[1599.02px]:[&_h2]:text-[80px]! min-[1200px]:max-[1599.02px]:[&_h2]:leading-[1]! min-[481px]:max-[768.02px]:[--gusto-about-title-width:192px]! min-[481px]:max-[768.02px]:h-[52.000023px]! min-[481px]:max-[768.02px]:[&::after]:h-[2px]! min-[481px]:max-[768.02px]:[&_h2]:text-[60px]! min-[481px]:max-[768.02px]:[&_h2]:h-[48px]! min-[481px]:max-[768.02px]:[&_h2]:leading-[48px]! min-[481px]:max-[768.02px]:[&_h2]:whitespace-nowrap! max-[480.02px]:[--gusto-about-title-width:100%]! max-[480.02px]:self-center! max-[480.02px]:h-[35px]! max-[480.02px]:w-max! max-[480.02px]:[&::after]:h-[2px]! max-[480.02px]:[&::after]:w-[var(--gusto-about-title-width)]! max-[480.02px]:[&_h2]:text-[48px]! max-[480.02px]:[&_h2]:h-[32px]! max-[480.02px]:[&_h2]:leading-[32px]! max-[480.02px]:[&_h2]:whitespace-nowrap!"
            }
          >
            <h2>{d.home.aboutTitle}</h2>
          </div>
          <div
            className={
              "gusto-about-body text-[var(--color-brand-warm-light)] font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] text-[clamp(0.85rem,_1.25vw,_1.5rem)] leading-[1.375] [&_p]:leading-[inherit] [&_p_+_p]:mt-0 min-[1200px]:max-[1599.02px]:w-[612px]! min-[1200px]:max-[1599.02px]:h-[231px]! min-[1200px]:max-[1599.02px]:text-[24px]! min-[1200px]:max-[1599.02px]:leading-[1.36]! min-[481px]:max-[768.02px]:text-[22px]! min-[481px]:max-[768.02px]:h-[144px]! min-[481px]:max-[768.02px]:leading-[24px]! min-[481px]:max-[768.02px]:overflow-hidden! min-[481px]:max-[768.02px]:w-[597.013916px]! max-[480.02px]:text-[18px]! max-[480.02px]:h-[216px]! max-[480.02px]:leading-[24px]! max-[480.02px]:overflow-hidden! max-[480.02px]:w-full!"
            }
          >
            {d.home.aboutBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <AboutMoreLink>{d.home.aboutMore}</AboutMoreLink>
        </div>
        <Image
          src="/images/glasscheese.png"
          alt=""
          width={276}
          height={239}
          className={
            "gusto-about-deco absolute z-[2] top-[min(27.03vw,_519px)] left-0 w-[min(14.355vw,_275.62px)] h-auto opacity-[0.9] min-[1200px]:max-[1599.02px]:top-[507.815918px]! min-[1200px]:max-[1599.02px]:w-[276px]! min-[1200px]:max-[1599.02px]:opacity-[1]! max-[768.02px]:hidden! min-[481px]:max-[768.02px]:hidden! max-[480.02px]:hidden!"
          }
        />
      </div>
      <div
        className={
          "gusto-about-right w-[min(50.68vw,_973px)] min-[1200px]:max-[1599.02px]:w-[612px]! min-[1200px]:max-[1599.02px]:h-[672px]! max-[768.02px]:w-full! max-[768.02px]:h-auto! min-[481px]:max-[768.02px]:h-[670.850098px]! min-[481px]:max-[768.02px]:left-[24px]! min-[481px]:max-[768.02px]:absolute! min-[481px]:max-[768.02px]:top-[calc(56.62664px_+_448px)]! min-[481px]:max-[768.02px]:w-[720px]! min-[481px]:max-[768.02px]:z-[2]! max-[480.02px]:flex-[0_0_100%]! max-[480.02px]:h-[397px]! max-[480.02px]:min-w-0! max-[480.02px]:relative! max-[480.02px]:w-auto! max-[480.02px]:z-[2]!"
        }
      >
        <div
          className={
            "gusto-about-image relative w-full aspect-[973_/_1066] min-[1200px]:max-[1599.02px]:w-[612px]! min-[1200px]:max-[1599.02px]:h-[672px]! min-[1200px]:max-[1599.02px]:aspect-auto! max-[768.02px]:relative! max-[768.02px]:w-full! max-[768.02px]:h-auto! min-[481px]:max-[768.02px]:h-[670.850098px]! min-[481px]:max-[768.02px]:mx-auto! min-[481px]:max-[768.02px]:w-[611.997742px]! max-[480.02px]:h-[397px]! max-[480.02px]:w-full! max-[480.02px]:[&_img]:object-fill!"
          }
        >
          <Image
            src="/images/inside.png"
            alt={d.home.aboutImageAlt}
            fill
            sizes="(max-width: 768px) 92vw, 51vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function WineMoreLink({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/menu`}
      className={
        "gusto-wine-more flex items-center gap-[min(1.6667vw,_32px)] w-max mt-[min(2.5vw,_48px)] text-[var(--color-brand-warm-light)] font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] text-[min(1.25vw,_24px)] leading-[1.36] underline underline-offset-[4px] [&_svg]:flex-[none] [&_svg]:w-[min(5.8021vw,_111.4px)] [&_svg]:h-auto [&_svg]:overflow-visible [&_svg]:fill-none [&_svg]:stroke-[var(--ink)] [&_svg]:stroke-[1] min-[1200px]:max-[1599.02px]:gap-[32px]! min-[1200px]:max-[1599.02px]:h-[60px]! min-[1200px]:max-[1599.02px]:mt-[48px]! min-[1200px]:max-[1599.02px]:text-[24px]! min-[1200px]:max-[1599.02px]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[&_svg]:w-[111.396759px]! max-[768.02px]:gap-[20px]! max-[768.02px]:mt-[32px]! max-[768.02px]:text-[14px]! max-[768.02px]:[&_svg]:w-[72px]! min-[481px]:max-[768.02px]:gap-[32px]! min-[481px]:max-[768.02px]:h-[60px]! min-[481px]:max-[768.02px]:mt-[48px]! min-[481px]:max-[768.02px]:text-[22px]! min-[481px]:max-[768.02px]:leading-[24px]! min-[481px]:max-[768.02px]:[&_svg]:h-[60px]! min-[481px]:max-[768.02px]:[&_svg]:w-[111.396759px]! max-[480.02px]:text-[18px]! max-[480.02px]:gap-[32px]! max-[480.02px]:h-[60px]! max-[480.02px]:justify-start! max-[480.02px]:leading-[24px]! max-[480.02px]:mt-[48px]! max-[480.02px]:no-underline! max-[480.02px]:w-full! max-[480.02px]:[&_span]:flex-[1_1_auto]! max-[480.02px]:[&_span]:min-w-0! max-[480.02px]:[&_svg]:h-[60px]! max-[480.02px]:[&_svg]:w-[111.396759px]!"
      }
    >
      <span>{children}</span>
      <svg aria-hidden="true" viewBox="0 0 111.4 60" focusable="false">
        <circle cx="46" cy="30" r="29.5" />
        <path d="M37 30h73m-22-22 22 22-22 22" />
      </svg>
    </Link>
  );
}

function Wine({ d, locale }: { d: Copy; locale: Locale }) {
  return (
    <section
      id="wine"
      className={
        "gusto-wine relative h-[min(71.5201vw,_1373.187px)] min-h-0 overflow-hidden bg-transparent text-[var(--ink)] [&::before]:absolute [&::before]:inset-[0_0_auto] [&::before]:h-[min(61.6474vw,_1183.629px)] [&::before]:bg-[var(--coral)] [&::before]:content-[''] min-[1200px]:max-[1599.02px]:h-[1068.639893px]! min-[1200px]:max-[1599.02px]:[&::before]:h-[926.471985px]! max-[768.02px]:h-auto! max-[768.02px]:min-h-0! max-[768.02px]:p-0! max-[768.02px]:[&::before]:h-[calc(100%_-_9.8958vw)]! min-[481px]:max-[768.02px]:h-[1097.074585px]! min-[481px]:max-[768.02px]:min-h-[1097.074585px]! min-[481px]:max-[768.02px]:p-0! min-[481px]:max-[768.02px]:[&::before]:h-[1021.251709px]! max-[480.02px]:h-auto! max-[480.02px]:min-h-0! max-[480.02px]:p-0! max-[480.02px]:[&::before]:bottom-[38.800018px]! max-[480.02px]:[&::before]:h-auto!"
      }
    >
      <Image
        src="/images/b-2.png"
        alt=""
        width={3840}
        height={362}
        sizes="100vw"
        className={
          "absolute left-0 z-[1] block w-full h-auto pointer-events-none gusto-wine-brush gusto-wine-brush-top top-0 min-[1200px]:max-[1599.02px]:h-[135.472px]! min-[481px]:max-[768.02px]:h-[72.251732px]! max-[480.02px]:h-[36.972569px]!"
        }
      />
      <div
        className={
          "gusto-wine-inner absolute top-[min(9.8244vw,_188.629px)] left-0 flex justify-center items-start gap-[min(1.6667vw,_32px)] w-full h-[min(51.8229vw,_995px)] p-[min(6.25vw,_120px)_min(12.5vw,_240px)] min-[1200px]:max-[1599.02px]:top-[135.472px]! min-[1200px]:max-[1599.02px]:gap-[32px]! min-[1200px]:max-[1599.02px]:w-full! min-[1200px]:max-[1599.02px]:h-[791px]! min-[1200px]:max-[1599.02px]:p-[60px_96px]! max-[768.02px]:relative! max-[768.02px]:top-auto! max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:w-full! max-[768.02px]:h-auto! max-[768.02px]:p-[8rem_15%_9rem]! max-[768.02px]:gap-[2.5rem]! min-[481px]:max-[768.02px]:items-center! min-[481px]:max-[768.02px]:flex! min-[481px]:max-[768.02px]:flex-col! min-[481px]:max-[768.02px]:gap-[32px]! min-[481px]:max-[768.02px]:h-[941px]! min-[481px]:max-[768.02px]:left-0! min-[481px]:max-[768.02px]:p-[64px_24px]! min-[481px]:max-[768.02px]:absolute! min-[481px]:max-[768.02px]:top-[80.251732px]! min-[481px]:max-[768.02px]:w-full! max-[480.02px]:items-start! max-[480.02px]:flex! max-[480.02px]:flex-row! max-[480.02px]:flex-wrap! max-[480.02px]:gap-[32px_0]! max-[480.02px]:h-auto! max-[480.02px]:p-[calc(36.972569px_+_8px)_16px_calc(38.800018px_+_32px)]! max-[480.02px]:relative! max-[480.02px]:top-auto! max-[480.02px]:w-full!"
        }
      >
        <div
          className={
            "gusto-wine-visual relative flex-[none] w-[min(43.2292vw,_830px)] h-[min(39.3229vw,_755px)] min-[1200px]:max-[1599.02px]:w-[738px]! min-[1200px]:max-[1599.02px]:h-[671px]! max-[768.02px]:w-full! max-[768.02px]:h-auto! max-[768.02px]:aspect-[830_/_755]! min-[481px]:max-[768.02px]:flex-[none]! min-[481px]:max-[768.02px]:h-[382px]! min-[481px]:max-[768.02px]:relative! min-[481px]:max-[768.02px]:w-[720px]! min-[481px]:max-[768.02px]:[&_img]:h-[358.636383px]! min-[481px]:max-[768.02px]:[&_img]:inset-[0_auto_auto_50%]! min-[481px]:max-[768.02px]:[&_img]:translate-x-[-50%]! min-[481px]:max-[768.02px]:[&_img]:w-[394.5px]! max-[480.02px]:aspect-[308_/_280]! max-[480.02px]:flex-[0_0_100%]! max-[480.02px]:h-auto! max-[480.02px]:min-w-0! max-[480.02px]:relative! max-[480.02px]:w-auto! max-[480.02px]:[&_img]:h-full! max-[480.02px]:[&_img]:inset-[0_auto_auto_0]! max-[480.02px]:[&_img]:transform-none! max-[480.02px]:[&_img]:w-full!"
          }
        >
          <Image
            src="/images/bottle-grapes.png"
            alt={d.home.wineArtworkAlt}
            fill
            sizes="(max-width: 768px) 82vw, 43.23vw"
            className="object-contain"
          />
        </div>
        <div
          className={
            "gusto-wine-copy flex-[none] w-[min(30.1042vw,_578px)] h-[min(33.0729vw,_635px)] min-[1200px]:max-[1599.02px]:w-[500px]! min-[1200px]:max-[1599.02px]:h-[635px]! max-[768.02px]:order-[-1]! max-[768.02px]:w-full! max-[768.02px]:h-auto! min-[481px]:max-[768.02px]:items-center! min-[481px]:max-[768.02px]:flex! min-[481px]:max-[768.02px]:flex-[none]! min-[481px]:max-[768.02px]:flex-col! min-[481px]:max-[768.02px]:h-[399.000031px]! min-[481px]:max-[768.02px]:order-[-1]! min-[481px]:max-[768.02px]:w-[720px]! max-[480.02px]:items-start! max-[480.02px]:flex! max-[480.02px]:flex-[0_0_100%]! max-[480.02px]:flex-col! max-[480.02px]:h-auto! max-[480.02px]:min-w-0! max-[480.02px]:order-[-1]! max-[480.02px]:relative! max-[480.02px]:w-auto!"
          }
        >
          <div
            className={
              "gusto-wine-title relative w-[min(19.7917vw,_380px)] h-[min(4.4792vw,_86px)] [&_h2]:text-[var(--ink)] [&_h2]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [&_h2]:text-[min(4.1667vw,_80px)] [&_h2]:font-normal [&_h2]:tracking-[-0.25em] [&_h2]:leading-[1] [&::after]:absolute [&::after]:bottom-0 [&::after]:left-0 [&::after]:w-[min(18.8542vw,_362px)] [&::after]:h-[3px] [&::after]:bg-[repeating-linear-gradient(_90deg,_var(--ink)_0_8px,_transparent_8px_16px_)] [&::after]:content-[''] min-[1200px]:max-[1599.02px]:w-[380px]! min-[1200px]:max-[1599.02px]:h-[83px]! min-[1200px]:max-[1599.02px]:[&_h2]:text-[80px]! min-[1200px]:max-[1599.02px]:[&_h2]:leading-[1]! min-[1200px]:max-[1599.02px]:[&::after]:w-[362px]! min-[1200px]:max-[1599.02px]:[&::after]:h-[2px]! max-[768.02px]:w-[190px]! max-[768.02px]:h-[46px]! max-[768.02px]:[&_h2]:text-[40px]! max-[768.02px]:[&::after]:w-[181px]! min-[481px]:max-[768.02px]:[--gusto-wine-title-width:228px]! min-[481px]:max-[768.02px]:h-[51.000027px]! min-[481px]:max-[768.02px]:w-[var(--gusto-wine-title-width)]! min-[481px]:max-[768.02px]:[&_h2]:text-[60px]! min-[481px]:max-[768.02px]:[&_h2]:h-[48px]! min-[481px]:max-[768.02px]:[&_h2]:leading-[48px]! min-[481px]:max-[768.02px]:[&_h2]:whitespace-nowrap! min-[481px]:max-[768.02px]:[&::after]:h-[2px]! min-[481px]:max-[768.02px]:[&::after]:w-[var(--gusto-wine-title-width)]! max-[480.02px]:[--gusto-wine-title-width:100%]! max-[480.02px]:self-center! max-[480.02px]:h-[35px]! max-[480.02px]:w-max! max-[480.02px]:[&_h2]:text-[48px]! max-[480.02px]:[&_h2]:h-[32px]! max-[480.02px]:[&_h2]:leading-[32px]! max-[480.02px]:[&_h2]:whitespace-nowrap! max-[480.02px]:[&::after]:h-[2px]! max-[480.02px]:[&::after]:w-[var(--gusto-wine-title-width)]!"
            }
          >
            <h2>{d.home.wineTitle}</h2>
          </div>
          <div
            className={
              "gusto-wine-text w-full h-[min(20.625vw,_396px)] mt-[min(2.3438vw,_45px)] text-[var(--color-brand-warm-light)] font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] text-[min(1.25vw,_24px)] leading-[1.36] [&_p]:leading-[inherit] [&_p_+_p]:mt-[min(1.7188vw,_33px)] min-[1200px]:max-[1599.02px]:w-[500px]! min-[1200px]:max-[1599.02px]:h-[396px]! min-[1200px]:max-[1599.02px]:mt-[48px]! min-[1200px]:max-[1599.02px]:text-[24px]! min-[1200px]:max-[1599.02px]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[&_p_+_p]:mt-0! max-[768.02px]:h-auto! max-[768.02px]:mt-[24px]! max-[768.02px]:text-[14px]! max-[768.02px]:[&_p_+_p]:mt-[19px]! min-[481px]:max-[768.02px]:text-[22px]! min-[481px]:max-[768.02px]:h-[192px]! min-[481px]:max-[768.02px]:leading-[24px]! min-[481px]:max-[768.02px]:mt-[48px]! min-[481px]:max-[768.02px]:overflow-hidden! min-[481px]:max-[768.02px]:w-[598px]! min-[481px]:max-[768.02px]:[&_p_+_p]:mt-0! max-[480.02px]:text-[18px]! max-[480.02px]:h-auto! max-[480.02px]:leading-[24px]! max-[480.02px]:mt-[48px]! max-[480.02px]:overflow-visible! max-[480.02px]:w-full! max-[480.02px]:[&_p_+_p]:mt-0!"
            }
          >
            {d.home.wineBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <WineMoreLink locale={locale}>{d.home.wineMenu}</WineMoreLink>
        </div>
      </div>
      <Image
        src="/images/b-3.png"
        alt=""
        width={3840}
        height={380}
        sizes="100vw"
        className={
          "absolute left-0 z-[1] block w-full h-auto pointer-events-none gusto-wine-brush gusto-wine-brush-bottom bottom-0 min-[1200px]:max-[1599.02px]:h-[142.167999px]! min-[481px]:max-[768.02px]:h-[75.822929px]! max-[480.02px]:h-[38.800018px]!"
        }
      />
    </section>
  );
}

function RecommendationMoreLink({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/menu`}
      className={
        "gusto-feature-more flex items-center gap-[min(1.6667vw,_32px)] w-max h-[min(3.125vw,_60px)] mt-[min(1.6667vw,_32px)] text-[var(--ink)] font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] text-[min(1.25vw,_24px)] leading-[1.36] underline underline-offset-[4px] [&_svg]:flex-[none] [&_svg]:w-[min(5.8021vw,_111.4px)] [&_svg]:h-auto [&_svg]:overflow-visible [&_svg]:fill-none [&_svg]:stroke-[var(--ink)] [&_svg]:stroke-[1] min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:gap-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:h-[60px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:mt-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:text-[24px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&_svg]:w-[111.396759px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:gap-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:w-[614.077393px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:h-[60px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:mt-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:text-[24px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&_svg]:w-[111.396759px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:gap-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:w-[504px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:h-[60px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:mt-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:text-[24px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&_svg]:w-[111.396759px]! max-[768.02px]:gap-[20px]! max-[768.02px]:h-[60px]! max-[768.02px]:mt-[24px]! max-[768.02px]:text-[14px]! max-[768.02px]:[&_svg]:w-[72px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:gap-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:h-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:mt-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:w-[323.396759px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:text-[22px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:leading-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&_span]:flex-[none]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&_span]:h-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&_span]:whitespace-nowrap! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&_span]:w-[180px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&_svg]:h-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&_svg]:w-[111.396759px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:gap-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:h-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:mt-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:w-[305.396759px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:text-[22px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:leading-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&_span]:flex-[none]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&_span]:h-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&_span]:whitespace-nowrap! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&_span]:w-[162px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&_svg]:h-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&_svg]:w-[111.396759px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:gap-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:h-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:mt-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:max-w-[596.02063px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:w-[287.396759px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:text-[22px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:leading-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&_span]:flex-[none]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&_span]:h-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&_span]:whitespace-nowrap! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&_span]:w-[144px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&_svg]:h-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&_svg]:w-[111.396759px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:text-[18px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:gap-[32px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:h-[60px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:leading-[24px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:mt-[32px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:no-underline! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:w-full! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&_svg]:h-[60px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&_svg]:w-[111.396759px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:text-[18px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:gap-[32px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:h-[60px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:leading-[24px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:mt-[32px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:no-underline! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:w-full! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&_svg]:h-[60px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&_svg]:w-[111.396759px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:text-[18px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:gap-[32px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:h-[60px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:leading-[24px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:mt-[32px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:no-underline! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:w-full! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&_svg]:h-[60px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&_svg]:w-[111.396759px]! max-[480.02px]:h-[52px]! max-[480.02px]:mt-[20px]! max-[480.02px]:text-[12px]! max-[480.02px]:[&_svg]:w-[60px]!"
      }
    >
      <span>{children}</span>
      <svg aria-hidden="true" viewBox="0 0 111.4 60" focusable="false">
        <circle cx="46" cy="30" r="29.5" />
        <path d="M37 30h73m-22-22 22 22-22 22" />
      </svg>
    </Link>
  );
}

function Feature({
  item,
  index,
  copy,
  locale,
}: {
  item: FeaturedMenu;
  index: number;
  copy: Copy;
  locale: Locale;
}) {
  return (
    <article
      id={`recommendation-${index}`}
      className={
        index === 1
          ? "gusto-feature min-h-[clamp(380px,_43vw,_650px)] flex justify-center items-center relative max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:items-stretch! max-[768.02px]:min-h-0! max-[768.02px]:mb-[3rem]! max-[480.02px]:mb-[1.8rem]! gusto-feature-1 gap-[min(1.25vw,_24px)] w-full h-[min(49.2945vw,_946.454px)] min-h-0 p-[min(3.125vw,_60px)_min(12.5vw,_240px)] min-[1200px]:max-[1599.02px]:gap-[24px]! min-[1200px]:max-[1599.02px]:h-[826px]! min-[1200px]:max-[1599.02px]:p-[60px_0]! max-[768.02px]:w-full! max-[768.02px]:h-auto! max-[768.02px]:p-[60px_15%]! max-[768.02px]:gap-[40px]! max-[768.02px]:m-0! min-[481px]:max-[768.02px]:items-stretch! min-[481px]:max-[768.02px]:block! min-[481px]:max-[768.02px]:gap-0! min-[481px]:max-[768.02px]:h-[994.930908px]! min-[481px]:max-[768.02px]:m-0! min-[481px]:max-[768.02px]:min-h-[994.930908px]! min-[481px]:max-[768.02px]:p-0! min-[481px]:max-[768.02px]:relative! min-[481px]:max-[768.02px]:w-full! max-[480.02px]:gap-[24px]! max-[480.02px]:h-[843.472534px]! max-[480.02px]:m-0! max-[480.02px]:p-[24px_16px]!"
          : index === 2
            ? "gusto-feature min-h-[clamp(380px,_43vw,_650px)] flex justify-center items-center relative max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:items-stretch! max-[768.02px]:min-h-0! max-[768.02px]:mb-[3rem]! max-[480.02px]:mb-[1.8rem]! gusto-feature-2 gap-[min(1.25vw,_24px)] w-full h-[min(53.7383vw,_1031.774px)] min-h-0 p-[min(3.125vw,_60px)_min(12.5vw,_240px)] min-[1200px]:max-[1599.02px]:gap-[24px]! min-[1200px]:max-[1599.02px]:h-[895.717163px]! min-[1200px]:max-[1599.02px]:p-[60px_0]! max-[768.02px]:w-full! max-[768.02px]:h-auto! max-[768.02px]:p-[60px_15%]! max-[768.02px]:gap-[40px]! max-[768.02px]:m-0! min-[481px]:max-[768.02px]:items-stretch! min-[481px]:max-[768.02px]:block! min-[481px]:max-[768.02px]:gap-0! min-[481px]:max-[768.02px]:h-[1091.632813px]! min-[481px]:max-[768.02px]:m-0! min-[481px]:max-[768.02px]:min-h-[1091.632813px]! min-[481px]:max-[768.02px]:p-0! min-[481px]:max-[768.02px]:relative! min-[481px]:max-[768.02px]:w-full! max-[480.02px]:[.gusto-feature&]:gap-[24px]! max-[480.02px]:[.gusto-feature&]:h-[880.692139px]! max-[480.02px]:[.gusto-feature&]:m-0! max-[480.02px]:[.gusto-feature&]:p-[24px_16px]!"
            : "gusto-feature min-h-[clamp(380px,_43vw,_650px)] flex justify-center items-center relative max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:items-stretch! max-[768.02px]:min-h-0! max-[768.02px]:mb-[3rem]! max-[480.02px]:mb-[1.8rem]! gusto-feature-3 gap-[min(1.25vw,_24px)] w-full h-[min(53.7189vw,_1031.403px)] min-h-0 p-[min(3.125vw,_60px)_min(12.5vw,_240px)] min-[1200px]:max-[1599.02px]:gap-[24px]! min-[1200px]:max-[1599.02px]:h-[905.751831px]! min-[1200px]:max-[1599.02px]:p-[60px_0]! max-[768.02px]:w-full! max-[768.02px]:h-auto! max-[768.02px]:p-[60px_15%]! max-[768.02px]:gap-[40px]! max-[768.02px]:m-0! min-[481px]:max-[768.02px]:items-stretch! min-[481px]:max-[768.02px]:block! min-[481px]:max-[768.02px]:gap-0! min-[481px]:max-[768.02px]:h-[1068px]! min-[481px]:max-[768.02px]:m-0! min-[481px]:max-[768.02px]:min-h-[1068px]! min-[481px]:max-[768.02px]:p-0! min-[481px]:max-[768.02px]:relative! min-[481px]:max-[768.02px]:w-full! max-[480.02px]:[.gusto-feature&]:gap-[24px]! max-[480.02px]:[.gusto-feature&]:h-[916.735596px]! max-[480.02px]:[.gusto-feature&]:m-0! max-[480.02px]:[.gusto-feature&]:p-[24px_16px]!"
      }
    >
      <div
        className={
          "gusto-feature-copy [&_p]:text-[clamp(0.72rem,_1.05vw,_1rem)] flex-[none] max-w-[410px] [.gusto-feature-1_&]:w-[min(30.5208vw,_586px)] [.gusto-feature-1_&]:h-[min(31.6146vw,_607px)] [.gusto-feature-1_&]:max-w-none min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:w-[611px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:h-[607px]! [.gusto-feature-2_&]:order-2 [.gusto-feature-2_&]:w-[min(30.5208vw,_586px)] [.gusto-feature-2_&]:h-[min(28.1771vw,_541px)] [.gusto-feature-2_&]:max-w-none min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:w-[614.077393px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:h-[574px]! [.gusto-feature-3_&]:relative [.gusto-feature-3_&]:z-[1] [.gusto-feature-3_&]:w-[min(30.5208vw,_586px)] [.gusto-feature-3_&]:h-[min(28.1771vw,_541px)] [.gusto-feature-3_&]:max-w-none min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:w-[504px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:h-[574px]! max-[768.02px]:[.gusto-feature-1_&]:w-full! max-[768.02px]:[.gusto-feature-1_&]:h-auto! max-[768.02px]:[.gusto-feature-2_&]:w-full! max-[768.02px]:[.gusto-feature-2_&]:h-auto! max-[768.02px]:[.gusto-feature-3_&]:w-full! max-[768.02px]:[.gusto-feature-3_&]:h-auto! max-[768.02px]:max-w-none! max-[768.02px]:[.gusto-feature-2_&]:order-0! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:h-[356.000031px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:left-[86px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:max-w-none! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:top-[64px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:w-[596px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:h-[380px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:left-[86px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:max-w-none! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:order-0! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:top-[64px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:w-[596px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:h-[356px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:left-[86px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:max-w-none! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:top-[64px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:w-[596px]! max-[480.02px]:[&_p]:text-[0.62rem]! max-[480.02px]:[&_p]:leading-[1.75]! max-[480.02px]:[.gusto-feature-1_&]:h-[412.000031px]! max-[480.02px]:[.gusto-feature-1_&]:w-full! max-[480.02px]:[.gusto-feature-2_&]:h-auto! max-[480.02px]:[.gusto-feature-2_&]:w-full! max-[480.02px]:[.gusto-feature-3_&]:h-auto! max-[480.02px]:[.gusto-feature-3_&]:w-full! max-[480.02px]:[&_h3]:text-[0.85rem]! max-[480.02px]:[&_h3]:mb-[0.5rem]!"
        }
      >
        <div
          className={
            "gusto-feature-heading relative w-full h-[min(4.7396vw,_91px)] [&_p]:text-[var(--coral)] [&_p]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [&_p]:text-[min(4.1667vw,_80px)] [&_p]:font-normal [&_p]:tracking-[-0.25em] [&_p]:leading-[1] [&::after]:absolute [&::after]:bottom-0 [&::after]:left-0 [&::after]:w-[min(23.4375vw,_450px)] [&::after]:h-[3px] [&::after]:bg-[repeating-linear-gradient(_90deg,_var(--coral)_0_8px,_transparent_8px_16px_)] [&::after]:content-[''] min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:h-[88px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&_p]:text-[80px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&_p]:leading-[1]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&::after]:w-[450px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&::after]:h-[2px]! [.gusto-feature-2_&::after]:w-[min(24.0104vw,_461px)] min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:h-[88px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&_p]:text-[80px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&_p]:leading-[1]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&::after]:w-[461px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&::after]:h-[2px]! [.gusto-feature-3_&::after]:w-[min(24.0104vw,_461px)] min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:w-[500px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:h-[88px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&_p]:text-[80px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&_p]:leading-[1]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&::after]:w-[461px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&::after]:h-[2px]! max-[768.02px]:h-[46px]! max-[768.02px]:[&_p]:text-[40px]! max-[768.02px]:[&::after]:w-[225px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:h-[56.000034px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_p]:text-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_p]:h-[48px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_p]:leading-[48px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_p]:whitespace-nowrap! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_p]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&::after]:bottom-auto! min-[481px]:max-[768.02px]:[.gusto-feature-1_&::after]:h-[2px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&::after]:top-[56.000013px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&::after]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:h-[56px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_p]:text-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_p]:h-[48px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_p]:leading-[48px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_p]:whitespace-nowrap! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_p]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&::after]:bottom-auto! min-[481px]:max-[768.02px]:[.gusto-feature-2_&::after]:h-[2px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&::after]:top-[56px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&::after]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:h-[56px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_p]:text-[60px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_p]:h-[48px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_p]:leading-[48px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_p]:whitespace-nowrap! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_p]:w-[300px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&::after]:bottom-auto! min-[481px]:max-[768.02px]:[.gusto-feature-3_&::after]:h-[2px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&::after]:top-[56px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&::after]:w-[300px]! max-[480.02px]:[.gusto-feature-1_&]:h-[40.000027px]! max-[480.02px]:[.gusto-feature-1_&]:w-[200px]! max-[480.02px]:[.gusto-feature-1_&_p]:text-[32px]! max-[480.02px]:[.gusto-feature-1_&_p]:h-[32px]! max-[480.02px]:[.gusto-feature-1_&_p]:leading-[32px]! max-[480.02px]:[.gusto-feature-1_&::after]:h-[2px]! max-[480.02px]:[.gusto-feature-1_&::after]:w-[200px]! max-[480.02px]:[.gusto-feature-2_&]:h-[40px]! max-[480.02px]:[.gusto-feature-2_&]:w-[200px]! max-[480.02px]:[.gusto-feature-2_&_p]:text-[32px]! max-[480.02px]:[.gusto-feature-2_&_p]:h-[32px]! max-[480.02px]:[.gusto-feature-2_&_p]:leading-[32px]! max-[480.02px]:[.gusto-feature-2_&::after]:h-[2px]! max-[480.02px]:[.gusto-feature-2_&::after]:w-[200px]! max-[480.02px]:[.gusto-feature-3_&]:h-[32px]! max-[480.02px]:[.gusto-feature-3_&]:w-[200px]! max-[480.02px]:[.gusto-feature-3_&_p]:text-[32px]! max-[480.02px]:[.gusto-feature-3_&_p]:h-[32px]! max-[480.02px]:[.gusto-feature-3_&_p]:leading-[32px]! max-[480.02px]:[.gusto-feature-3_&::after]:bottom-auto! max-[480.02px]:[.gusto-feature-3_&::after]:h-[2px]! max-[480.02px]:[.gusto-feature-3_&::after]:top-[32px]! max-[480.02px]:[.gusto-feature-3_&::after]:w-[200px]! max-[480.02px]:h-[38px]! max-[480.02px]:[&_p]:text-[32px]! max-[480.02px]:[&_p]:leading-[1]! max-[480.02px]:[&::after]:w-[180px]!"
          }
        >
          <p>
            {copy.featured.title}
            {copy.featured.numberLabels[index - 1]}
          </p>
        </div>
        <div
          className={
            "gusto-feature-content [&_h3]:text-[clamp(1rem,_1.7vw,_1.6rem)] [&_h3]:font-extrabold [&_h3]:mb-[1rem] w-full mt-[min(2.3438vw,_45px)] [.gusto-feature-1_&_h3]:h-[min(4.3229vw,_83px)] [.gusto-feature-1_&_h3]:m-0 [.gusto-feature-1_&_h3]:text-[var(--ink)] [.gusto-feature-1_&_h3]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [.gusto-feature-1_&_h3]:text-[min(2.7083vw,_52px)] [.gusto-feature-1_&_h3]:font-normal [.gusto-feature-1_&_h3]:tracking-[-0.25em] [.gusto-feature-1_&_h3]:leading-[1.596] min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:w-[611px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:h-[471px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:mt-[48px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&_h3]:h-[83px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&_h3]:text-[52px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&_h3]:leading-[1.596]! [.gusto-feature-2_&_h3]:h-[min(4.3229vw,_83px)] [.gusto-feature-2_&_h3]:m-0 [.gusto-feature-2_&_h3]:text-[var(--ink)] [.gusto-feature-2_&_h3]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [.gusto-feature-2_&_h3]:text-[min(2.7083vw,_52px)] [.gusto-feature-2_&_h3]:font-normal [.gusto-feature-2_&_h3]:tracking-[-0.25em] [.gusto-feature-2_&_h3]:leading-[1.596] min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:w-[614.077393px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:h-[438px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:mt-[48px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&_h3]:h-[83px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&_h3]:text-[52px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&_h3]:leading-[1.596]! [.gusto-feature-3_&_h3]:h-[min(4.3229vw,_83px)] [.gusto-feature-3_&_h3]:m-0 [.gusto-feature-3_&_h3]:text-[var(--ink)] [.gusto-feature-3_&_h3]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [.gusto-feature-3_&_h3]:text-[min(2.7083vw,_52px)] [.gusto-feature-3_&_h3]:font-normal [.gusto-feature-3_&_h3]:tracking-[-0.25em] [.gusto-feature-3_&_h3]:leading-[1.596] min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:w-[504px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:h-[438px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:mt-[48px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&_h3]:h-[83px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&_h3]:text-[52px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&_h3]:leading-[1.596]! max-[768.02px]:mt-[24px]! max-[768.02px]:[.gusto-feature-1_&_h3]:h-auto! max-[768.02px]:[.gusto-feature-1_&_h3]:text-[26px]! max-[768.02px]:[.gusto-feature-1_&_h3]:leading-[1.4]! max-[768.02px]:[.gusto-feature-2_&_h3]:h-auto! max-[768.02px]:[.gusto-feature-2_&_h3]:text-[26px]! max-[768.02px]:[.gusto-feature-2_&_h3]:leading-[1.4]! max-[768.02px]:[.gusto-feature-3_&_h3]:h-auto! max-[768.02px]:[.gusto-feature-3_&_h3]:text-[26px]! max-[768.02px]:[.gusto-feature-3_&_h3]:leading-[1.4]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:h-[252px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:left-0! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:m-0! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:top-[104.000031px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:w-[596px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_h3]:text-[42px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_h3]:h-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_h3]:leading-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_h3]:overflow-hidden! min-[481px]:max-[768.02px]:[.gusto-feature-1_&_h3]:w-[596px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:h-[276px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:left-0! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:m-0! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:top-[104px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:w-[596px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_h3]:text-[42px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_h3]:h-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_h3]:leading-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_h3]:max-w-full! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_h3]:overflow-visible! min-[481px]:max-[768.02px]:[.gusto-feature-2_&_h3]:w-max! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:h-[252px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:left-0! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:m-0! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:top-[104px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:w-[596.02063px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_h3]:text-[42px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_h3]:h-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_h3]:leading-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_h3]:overflow-hidden! min-[481px]:max-[768.02px]:[.gusto-feature-3_&_h3]:w-[596.02063px]! max-[480.02px]:[.gusto-feature-1_&]:h-[348px]! max-[480.02px]:[.gusto-feature-1_&]:mt-[24px]! max-[480.02px]:[.gusto-feature.gusto-feature-1_&_h3]:text-[32px]! max-[480.02px]:[.gusto-feature.gusto-feature-1_&_h3]:h-[32px]! max-[480.02px]:[.gusto-feature.gusto-feature-1_&_h3]:leading-[32px]! max-[480.02px]:[.gusto-feature-2_&]:h-auto! max-[480.02px]:[.gusto-feature-2_&]:mt-[24px]! max-[480.02px]:[.gusto-feature.gusto-feature-2_&_h3]:text-[32px]! max-[480.02px]:[.gusto-feature.gusto-feature-2_&_h3]:h-[32px]! max-[480.02px]:[.gusto-feature.gusto-feature-2_&_h3]:leading-[32px]! max-[480.02px]:[.gusto-feature-3_&]:h-auto! max-[480.02px]:[.gusto-feature-3_&]:mt-[24px]! max-[480.02px]:[.gusto-feature.gusto-feature-3_&_h3]:text-[32px]! max-[480.02px]:[.gusto-feature.gusto-feature-3_&_h3]:h-[32px]! max-[480.02px]:[.gusto-feature.gusto-feature-3_&_h3]:leading-[32px]! max-[480.02px]:mt-[20px]! max-[480.02px]:[.gusto-feature-1_&_h3]:text-[22px]! max-[480.02px]:[.gusto-feature-1_&_h3]:leading-[1.4]! max-[480.02px]:[.gusto-feature-2_&_h3]:text-[22px]! max-[480.02px]:[.gusto-feature-2_&_h3]:leading-[1.4]! max-[480.02px]:[.gusto-feature-3_&_h3]:text-[22px]! max-[480.02px]:[.gusto-feature-3_&_h3]:leading-[1.4]!"
          }
        >
          <h3>{item.name}</h3>
          {item.description && (
            <p
              className={
                "gusto-feature-description [.gusto-feature-content_&]:w-full [.gusto-feature-content_&]:h-[min(13.75vw,_264px)] [.gusto-feature-content_&]:mt-[min(1.6667vw,_32px)] [.gusto-feature-content_&]:text-[var(--ink)] [.gusto-feature-content_&]:font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] [.gusto-feature-content_&]:text-[min(1.25vw,_24px)] [.gusto-feature-content_&]:leading-[1.36] [.gusto-feature-content_&]:whitespace-pre-line min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:w-[611px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:h-[264px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:mt-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:text-[24px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_.gusto-feature-content_&]:leading-[1.36]! [.gusto-feature-2_.gusto-feature-content_&]:h-[min(10.3125vw,_198px)] min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:w-[614.077393px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:h-[231px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:mt-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:text-[24px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_.gusto-feature-content_&]:leading-[1.36]! [.gusto-feature-3_.gusto-feature-content_&]:h-[min(10.3125vw,_198px)] min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:w-[504px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:h-[231px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:mt-[32px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:text-[24px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_.gusto-feature-content_&]:leading-[1.36]! max-[768.02px]:[.gusto-feature-content_&]:h-auto! max-[768.02px]:[.gusto-feature-content_&]:mt-[16px]! max-[768.02px]:[.gusto-feature-content_&]:text-[14px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:text-[22px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:h-[96px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:leading-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:mt-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:overflow-hidden! min-[481px]:max-[768.02px]:[.gusto-feature-1_.gusto-feature-content_&]:w-[596px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:text-[22px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:h-[120px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:leading-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:mt-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:overflow-hidden! min-[481px]:max-[768.02px]:[.gusto-feature-2_.gusto-feature-content_&]:w-[596px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:text-[22px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:h-[96px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:leading-[24px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:mt-[32px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:overflow-hidden! min-[481px]:max-[768.02px]:[.gusto-feature-3_.gusto-feature-content_&]:w-[596.02063px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:text-[18px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:h-[192px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:leading-[24px]! max-[480.02px]:[.gusto-feature-1_.gusto-feature-content_&]:mt-[32px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:text-[18px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:h-auto! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:leading-[24px]! max-[480.02px]:[.gusto-feature-2_.gusto-feature-content_&]:mt-[32px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:text-[18px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:h-auto! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:leading-[24px]! max-[480.02px]:[.gusto-feature-3_.gusto-feature-content_&]:mt-[32px]! max-[480.02px]:[.gusto-feature-content_&]:mt-[14px]! max-[480.02px]:[.gusto-feature-content_&]:text-[12px]! max-[480.02px]:[.gusto-feature-content_&]:leading-[1.36]!"
              }
            >
              {item.description}
            </p>
          )}
          <RecommendationMoreLink locale={locale}>
            {copy.featured.menuLinks[index - 1]}
          </RecommendationMoreLink>
        </div>
      </div>
      <div
        className={
          "gusto-feature-image relative flex-[none] h-[clamp(330px,_39vw,_620px)] [.gusto-feature-1_&]:w-[min(43.2292vw,_830px)] [.gusto-feature-1_&]:h-[min(43.0445vw,_826.454px)] min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:w-[709px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-1_&]:h-[706px]! [.gusto-feature-2_&]:order-1 [.gusto-feature-2_&]:w-[min(43.2292vw,_830px)] [.gusto-feature-2_&]:h-[min(47.4883vw,_911.774px)] min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:w-[705.922607px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-2_&]:h-[775.717163px]! [.gusto-feature-3_&]:z-[1] [.gusto-feature-3_&]:w-[min(36.8732vw,_707.965px)] [.gusto-feature-3_&]:h-[min(47.4689vw,_911.403px)] min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:w-[610.360779px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&]:h-[785.751831px]! min-[1200px]:max-[1599.02px]:[.gusto-feature-3_&_img]:object-fill! max-[768.02px]:h-[320px]! max-[768.02px]:order-2! max-[768.02px]:[.gusto-feature-1_&]:w-full! max-[768.02px]:[.gusto-feature-1_&]:h-auto! max-[768.02px]:[.gusto-feature-1_&]:aspect-[830_/_826.454]! max-[768.02px]:[.gusto-feature-2_&]:w-full! max-[768.02px]:[.gusto-feature-2_&]:h-auto! max-[768.02px]:[.gusto-feature-2_&]:aspect-[830_/_911.774]! max-[768.02px]:[.gusto-feature-3_&]:w-full! max-[768.02px]:[.gusto-feature-3_&]:h-auto! max-[768.02px]:[.gusto-feature-3_&]:aspect-[707.965_/_911.403]! max-[768.02px]:[.gusto-feature-2_&]:order-2! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:h-[486.930878px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:left-[139.5px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:top-[444.000031px]! min-[481px]:max-[768.02px]:[.gusto-feature-1_&]:w-[489px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:h-[551.632751px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:left-[133px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:order-0! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:top-[476px]! min-[481px]:max-[768.02px]:[.gusto-feature-2_&]:w-[502px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:h-[560px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:left-[166.5px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:absolute! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:top-[444px]! min-[481px]:max-[768.02px]:[.gusto-feature-3_&]:w-[435px]! max-[480.02px]:[.gusto-feature-1_&]:aspect-auto! max-[480.02px]:[.gusto-feature-1_&]:h-[359.472534px]! max-[480.02px]:[.gusto-feature-1_&]:w-full! max-[480.02px]:[.gusto-feature-2_&]:aspect-auto! max-[480.02px]:[.gusto-feature-2_&]:h-[396.692108px]! max-[480.02px]:[.gusto-feature-2_&]:w-full! max-[480.02px]:[.gusto-feature-3_&]:aspect-auto! max-[480.02px]:[.gusto-feature-3_&]:h-[464.735626px]! max-[480.02px]:[.gusto-feature-3_&]:w-full! max-[480.02px]:h-[260px]!"
        }
      >
        <Image
          src={item.image.url}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 80vw, 36vw"
          className="object-contain"
        />
      </div>
      {index === 2 && (
        <Image
          src="/images/two-veggies.png"
          alt=""
          width={535}
          height={445}
          className={
            "gusto-feature-2-deco absolute top-[min(4.0906vw,_78.539px)] left-[min(78.7972vw,_1512.906px)] w-[min(13.9193vw,_267.25px)] h-auto min-[1200px]:max-[1599.02px]:top-0! min-[1200px]:max-[1599.02px]:left-[1172.750366px]! min-[1200px]:max-[1599.02px]:w-[267.249664px]! max-[768.02px]:top-[24px]! max-[768.02px]:right-[4%]! max-[768.02px]:left-auto! max-[768.02px]:w-[110px]! min-[481px]:max-[768.02px]:hidden! max-[480.02px]:[.gusto-feature-2_&]:hidden! max-[480.02px]:top-[14px]! max-[480.02px]:right-[3%]! max-[480.02px]:w-[78px]!"
          }
        />
      )}
      {index === 3 && (
        <Image
          src="/images/olives.png"
          alt=""
          width={996}
          height={872}
          className={
            "gusto-feature-3-deco absolute top-[min(-6.3884vw,_-122.657px)] left-[min(71.8959vw,_1380.401px)] w-[min(22.2244vw,_426.709px)] h-[min(23.0676vw,_442.898px)] pointer-events-none z-0 min-[1200px]:max-[1599.02px]:top-[-126.476285px]! min-[1200px]:max-[1599.02px]:left-[1101.374634px]! min-[1200px]:max-[1599.02px]:w-[426.709015px]! min-[1200px]:max-[1599.02px]:h-[442.898px]! max-[768.02px]:hidden! min-[481px]:max-[768.02px]:hidden! max-[480.02px]:[.gusto-feature-3_&]:hidden!"
          }
        />
      )}
    </article>
  );
}

function Recommendations({
  d,
  featured,
  locale,
}: {
  d: Copy;
  featured: FeaturedMenu[];
  locale: Locale;
}) {
  return (
    <section
      id="recommendations"
      className="gusto-recommendations p-0 max-[768.02px]:p-0! max-[480.02px]:p-0!"
    >
      {featured.slice(0, 3).map((item, index) => (
        <Feature
          item={item}
          index={index + 1}
          copy={d}
          locale={locale}
          key={item.id}
        />
      ))}
    </section>
  );
}

function SocialIcon({ type }: { type: "x" | "instagram" | "drink" }) {
  if (type === "instagram") {
    return <InstagramLogoIcon aria-hidden="true" weight="regular" />;
  }
  if (type === "drink") {
    return <WineIcon aria-hidden="true" weight="regular" />;
  }
  return <XLogoIcon aria-hidden="true" weight="regular" />;
}

function Social({ d }: { d: Copy }) {
  const gallery = [
    "slide-3.jpg",
    "slide-1.jpg",
    "slide-6.jpg",
    "slide-2.jpg",
    "slide-4.jpg",
    "slide-5.jpg",
    "slide-7.jpg",
  ];
  const socialCards = [
    { ...d.home.social.twitter, icon: "x" as const },
    { ...d.home.social.instagram, icon: "instagram" as const },
    { ...d.home.social.blog, icon: "drink" as const },
  ];
  return (
    <section
      id="social"
      className={
        "gusto-social [&::before]:content-[''] [&::before]:absolute [&::before]:inset-[auto_0_-1px] [&::before]:h-[clamp(24px,_4vw,_78px)] [&::before]:bg-[var(--ink)] [&::before]:[clip-path:polygon(_0_24%,_5%_61%,_10%_47%,_16%_85%,_22%_43%,_29%_66%,_35%_28%,_43%_70%,_49%_46%,_56%_88%,_63%_42%,_70%_65%,_77%_30%,_85%_72%,_93%_42%,_100%_67%,_100%_100%,_0_100%_)] [&::before]:z-[3] relative h-[min(55.2083vw,_1060px)] overflow-hidden bg-none text-[var(--color-brand-warm-light)] p-0 [&::before]:content-none [&::after]:absolute [&::after]:inset-[min(7.3733vw,_141.567px)_0_0] [&::after]:z-0 [&::after]:bg-[var(--ink)] [&::after]:content-[''] min-[1200px]:max-[1599.02px]:h-[814.17511px]! min-[1200px]:max-[1599.02px]:[&::after]:inset-[106.174957px_0_0]! max-[768.02px]:h-[500px]! max-[768.02px]:[&::after]:inset-[56px_0_0]! min-[481px]:max-[768.02px]:h-[714.626709px]! min-[481px]:max-[768.02px]:[&::after]:inset-[56.62664px_0_0]! max-[480.02px]:h-[573px]! max-[480.02px]:[&::after]:inset-[38.800018px_0_0]!"
      }
      aria-label={d.home.gallery}
    >
      <Image
        src="/images/b-1.png"
        alt=""
        width={3841}
        height={284}
        sizes="100vw"
        className={
          "gusto-social-brush absolute top-0 left-0 z-[1] w-full h-[calc(min(7.3733vw,_141.567px)_+_2px)] pointer-events-none min-[1200px]:max-[1599.02px]:h-[calc(106.174957px_+_2px)]! max-[768.02px]:h-[58px]! min-[481px]:max-[768.02px]:h-[calc(56.62664px_+_2px)]! max-[480.02px]:h-[calc(38.800018px_+_2px)]!"
        }
      />
      <div
        className={
          "gusto-gallery absolute top-[min(12.5816vw,_241.567px)] left-[50%] flex gap-[min(0.4167vw,_8px)] w-[min(111.875vw,_2148px)] h-[min(10.4167vw,_200px)] translate-x-[-50%] z-[2] min-[1200px]:max-[1599.02px]:top-[156.175087px]! min-[1200px]:max-[1599.02px]:left-[-354px]! min-[1200px]:max-[1599.02px]:gap-[8px]! min-[1200px]:max-[1599.02px]:w-[2148px]! min-[1200px]:max-[1599.02px]:h-[200px]! min-[1200px]:max-[1599.02px]:translate-x-0! max-[768.02px]:top-[80px]! max-[768.02px]:gap-[4px]! max-[768.02px]:w-[1074px]! max-[768.02px]:h-[100px]! min-[481px]:max-[768.02px]:top-[106.626709px]! min-[481px]:max-[768.02px]:left-[-690px]! min-[481px]:max-[768.02px]:gap-[8px]! min-[481px]:max-[768.02px]:w-[2148px]! min-[481px]:max-[768.02px]:h-[200px]! min-[481px]:max-[768.02px]:translate-x-0! max-[480.02px]:gap-[4px]! max-[480.02px]:h-[100px]! max-[480.02px]:left-[-340.5px]! max-[480.02px]:top-[70.800018px]! max-[480.02px]:translate-x-0! max-[480.02px]:w-[1074px]!"
        }
      >
        {gallery.map((image) => (
          <div
            className={
              "gusto-gallery-item flex-[0_0_min(15.625vw,_300px)] w-[min(15.625vw,_300px)] h-[min(10.4167vw,_200px)] p-[min(0.2083vw,_4px)_min(0.3125vw,_6px)] bg-[var(--color-brand-warm-light)] [&_img]:block [&_img]:w-full [&_img]:h-full [&_img]:object-cover min-[1200px]:max-[1599.02px]:basis-[300px]! min-[1200px]:max-[1599.02px]:w-[300px]! min-[1200px]:max-[1599.02px]:h-[200px]! min-[1200px]:max-[1599.02px]:p-[4px_6px]! max-[768.02px]:basis-[150px]! max-[768.02px]:w-[150px]! max-[768.02px]:h-[100px]! max-[768.02px]:p-[2px_3px]! min-[481px]:max-[768.02px]:basis-[300px]! min-[481px]:max-[768.02px]:w-[300px]! min-[481px]:max-[768.02px]:h-[200px]! min-[481px]:max-[768.02px]:p-[4px_6px]! max-[480.02px]:basis-[150px]! max-[480.02px]:h-[100px]! max-[480.02px]:p-[2px_3px]! max-[480.02px]:w-[150px]!"
            }
            key={image}
          >
            <Image
              src={`/images/${image}`}
              alt={d.home.galleryImageAlt}
              width={290}
              height={192}
            />
          </div>
        ))}
      </div>
      <div
        className={
          "gusto-social-links absolute top-[50%] left-[50%] grid grid-cols-[repeat(3,_1fr)] w-[min(61.5625vw,_1182px)] h-[min(14.8958vw,_286px)] m-0 translate-x-[-50%] text-center z-[2] [&_a]:flex [&_a]:flex-col [&_a]:items-center [&_a]:gap-[min(2.5vw,_48px)] [&_a]:w-[min(20.5208vw,_394px)] [&_a]:h-[min(14.8958vw,_286px)] [&_a]:p-[min(1.6667vw,_32px)] [&_a]:border-r-[1px] [&_a]:border-r-[var(--color-brand-warm-light)] [&_a]:text-[inherit] [&_a]:no-underline [&_a:last-child]:border-0 [&_>_a_>_svg]:w-[min(2.5vw,_48px)] [&_>_a_>_svg]:h-[min(2.5vw,_48px)] [&_>_a_>_svg]:text-[currentColor] min-[1200px]:max-[1599.02px]:w-[1182px]! min-[1200px]:max-[1599.02px]:h-[286px]! min-[1200px]:max-[1599.02px]:translate-x-[-50%]! min-[1200px]:max-[1599.02px]:[&_a]:gap-[48px]! min-[1200px]:max-[1599.02px]:[&_a]:w-[394px]! min-[1200px]:max-[1599.02px]:[&_a]:h-[286px]! min-[1200px]:max-[1599.02px]:[&_a]:p-[32px]! min-[1200px]:max-[1599.02px]:[&_>_a_>_svg]:w-[48px]! min-[1200px]:max-[1599.02px]:[&_>_a_>_svg]:h-[48px]! max-[768.02px]:top-[228px]! max-[768.02px]:w-[min(92vw,_361px)]! max-[768.02px]:h-[175px]! max-[768.02px]:[&_a]:gap-[16px]! max-[768.02px]:[&_a]:w-auto! max-[768.02px]:[&_a]:h-[175px]! max-[768.02px]:[&_a]:p-[8px]! max-[768.02px]:[&_>_a_>_svg]:w-[24px]! max-[768.02px]:[&_>_a_>_svg]:h-[24px]! min-[481px]:max-[768.02px]:top-[378.626709px]! min-[481px]:max-[768.02px]:w-[722px]! min-[481px]:max-[768.02px]:h-[286px]! min-[481px]:max-[768.02px]:[&_a]:gap-[48px]! min-[481px]:max-[768.02px]:[&_a]:w-[calc(722px_/_3)]! min-[481px]:max-[768.02px]:[&_a]:h-[286px]! min-[481px]:max-[768.02px]:[&_a]:p-[32px]! min-[481px]:max-[768.02px]:[&_>_a_>_svg]:w-[64px]! min-[481px]:max-[768.02px]:[&_>_a_>_svg]:h-[64px]! max-[480.02px]:h-[286px]! max-[480.02px]:top-[234px]! max-[480.02px]:w-[361px]! max-[480.02px]:[&_a]:gap-[48px]! max-[480.02px]:[&_a]:h-[286px]! max-[480.02px]:[&_a]:min-w-0! max-[480.02px]:[&_a]:p-[32px_8px]! max-[480.02px]:[&_a]:w-[calc(361px_/_3)]! max-[480.02px]:[&_>_a_>_svg]:flex-[0_0_32px]! max-[480.02px]:[&_>_a_>_svg]:h-[32px]! max-[480.02px]:[&_>_a_>_svg]:w-[32px]!"
        }
      >
        {socialCards.map((card) => (
          <a href={siteConfig.socialUrl} key={card.name}>
            <div
              className={
                "gusto-social-copy w-[min(17.1875vw,_330px)] h-[min(6.5625vw,_126px)] [&_p]:h-[min(2.6042vw,_50px)] [&_p]:font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] [&_p]:text-[min(1.1458vw,_22px)] [&_p]:leading-[1.36] [&_p]:text-center min-[1200px]:max-[1599.02px]:w-[330px]! min-[1200px]:max-[1599.02px]:h-[126px]! min-[1200px]:max-[1599.02px]:[&_p]:h-[50px]! min-[1200px]:max-[1599.02px]:[&_p]:text-[22px]! max-[768.02px]:w-full! max-[768.02px]:h-[110px]! max-[768.02px]:[&_p]:h-[42px]! max-[768.02px]:[&_p]:text-[14px]! max-[768.02px]:[&_p]:leading-[1.36]! min-[481px]:max-[768.02px]:w-[calc(722px_/_3_-_64px)]! min-[481px]:max-[768.02px]:h-[110px]! min-[481px]:max-[768.02px]:[&_p]:h-[19px]! min-[481px]:max-[768.02px]:[&_p]:text-[14px]! min-[481px]:max-[768.02px]:[&_p]:leading-[1.36]! max-[480.02px]:h-[110px]! max-[480.02px]:min-w-0! max-[480.02px]:w-full! max-[480.02px]:[&_p]:text-[14px]! max-[480.02px]:[&_p]:h-[38px]! max-[480.02px]:[&_p]:leading-[19px]! max-[480.02px]:[&_p]:overflow-hidden!"
              }
            >
              <div
                className={
                  "gusto-social-heading flex flex-col items-center gap-[min(0.8333vw,_16px)] h-[min(3.9583vw,_76px)] [&_img]:w-[min(3vw,_57.6px)] [&_img]:h-[min(1.6667vw,_32px)] [&_span]:h-[min(1.4583vw,_28px)] [&_span]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [&_span]:text-[min(1.4583vw,_28px)] [&_span]:font-normal [&_span]:tracking-[-8px] [&_span]:leading-[1] min-[1200px]:max-[1599.02px]:gap-[16px]! min-[1200px]:max-[1599.02px]:h-[76px]! min-[1200px]:max-[1599.02px]:[&_img]:w-[57.6px]! min-[1200px]:max-[1599.02px]:[&_img]:h-[32px]! min-[1200px]:max-[1599.02px]:[&_span]:h-[28px]! min-[1200px]:max-[1599.02px]:[&_span]:text-[28px]! max-[768.02px]:gap-[16px]! max-[768.02px]:h-[60px]! max-[768.02px]:[&_img]:w-[43.2px]! max-[768.02px]:[&_img]:h-[24px]! max-[768.02px]:[&_span]:h-[20px]! max-[768.02px]:[&_span]:text-[20px]! max-[768.02px]:[&_span]:tracking-[-0.2em]! min-[481px]:max-[768.02px]:gap-[16px]! min-[481px]:max-[768.02px]:h-[72px]! min-[481px]:max-[768.02px]:[&_img]:w-[57.6px]! min-[481px]:max-[768.02px]:[&_img]:h-[32px]! min-[481px]:max-[768.02px]:[&_span]:h-[24px]! min-[481px]:max-[768.02px]:[&_span]:text-[24px]! min-[481px]:max-[768.02px]:[&_span]:tracking-[-0.25em]! max-[480.02px]:gap-[16px]! max-[480.02px]:h-[72px]! max-[480.02px]:[&_img]:h-[24px]! max-[480.02px]:[&_img]:w-[43.2px]! max-[480.02px]:[&_span]:text-[20px]! max-[480.02px]:[&_span]:h-[24px]! max-[480.02px]:[&_span]:tracking-[-0.2em]! max-[480.02px]:[&_span]:leading-[24px]! max-[480.02px]:[&_span]:whitespace-nowrap!"
                }
              >
                <Image
                  src="/images/deco-1.png"
                  alt=""
                  width={216}
                  height={120}
                />
                <span>{card.name}</span>
              </div>
              <p>{card.description}</p>
            </div>
            <SocialIcon type={card.icon} />
          </a>
        ))}
      </div>
    </section>
  );
}

function Reservation({ d }: { d: Copy }) {
  return (
    <section
      id="reservation"
      className={
        "gusto-reservation relative grid place-items-center h-[min(50vw,_960px)] overflow-hidden isolate text-[var(--color-content-inverse)] [&::after]:content-[''] [&::after]:absolute [&::after]:left-0 [&::after]:bottom-[-2px] [&::after]:inset-0 [&::after]:z-[-1] [&::after]:bg-[rgb(0_0_0_/_70%)] [&::after]:mix-blend-[multiply] min-[1200px]:max-[1599.02px]:block! min-[1200px]:max-[1599.02px]:h-[914px]! max-[1100.02px]:h-[720px]! max-[1100.02px]:min-h-0! max-[1100.02px]:p-[56px_24px]! min-[481px]:max-[768.02px]:block! min-[481px]:max-[768.02px]:h-[832px]! min-[481px]:max-[768.02px]:min-h-0! min-[481px]:max-[768.02px]:p-0! max-[480.02px]:block! max-[480.02px]:h-auto! max-[480.02px]:min-h-0! max-[480.02px]:p-[100px_16px]!"
      }
    >
      <Image
        src="/images/slide-8.jpg"
        alt=""
        fill
        sizes="100vw"
        className={
          "gusto-reservation-image z-[-2] object-cover min-[481px]:max-[768.02px]:object-[center]! max-[480.02px]:object-[center]!"
        }
      />
      <Image
        src="/images/b-5.png"
        alt=""
        width={3849}
        height={72}
        sizes="100vw"
        className={
          "absolute left-0 z-[2] block w-full h-auto pointer-events-none min-[1200px]:max-[1599.02px]:h-[26.691189px]! max-[480.02px]:h-[7.284471px]! gusto-reservation-brush gusto-reservation-brush-top top-0 min-[481px]:max-[768.02px]:hidden!"
        }
      />
      <div
        className={
          "gusto-booking z-[1] flex flex-col items-center justify-start gap-[min(1.25vw,_24px)] w-[min(36.9792vw,_710px)] h-[min(26.7708vw,_514px)] p-[min(0.8333vw,_16px)] bg-[rgb(27_40_27_/_70%)] text-center [&_h2]:text-[var(--coral)] [&_h2]:text-[min(2.7083vw,_52px)] [&_h2]:font-normal [&_h2]:tracking-[-0.288em] [&_h2]:leading-[1] min-[1200px]:max-[1599.02px]:absolute! min-[1200px]:max-[1599.02px]:top-[200px]! min-[1200px]:max-[1599.02px]:left-[414px]! min-[1200px]:max-[1599.02px]:gap-[24px]! min-[1200px]:max-[1599.02px]:w-[710px]! min-[1200px]:max-[1599.02px]:h-[514px]! min-[1200px]:max-[1599.02px]:p-[16px]! min-[1200px]:max-[1599.02px]:[&_h2]:w-[322px]! min-[1200px]:max-[1599.02px]:[&_h2]:h-[52px]! min-[1200px]:max-[1599.02px]:[&_h2]:text-[52px]! min-[1200px]:max-[1599.02px]:[&_h2]:leading-[1]! max-[1100.02px]:w-[min(100%,_568px)]! max-[1100.02px]:h-auto! max-[1100.02px]:min-w-0! max-[1100.02px]:min-h-[500px]! max-[1100.02px]:p-[24px]! max-[1100.02px]:gap-[24px]! max-[1100.02px]:[&_h2]:text-[42px]! min-[481px]:max-[768.02px]:absolute! min-[481px]:max-[768.02px]:top-[76.999969px]! min-[481px]:max-[768.02px]:left-[192px]! min-[481px]:max-[768.02px]:gap-[24px]! min-[481px]:max-[768.02px]:w-[384px]! min-[481px]:max-[768.02px]:h-[678.000061px]! min-[481px]:max-[768.02px]:min-h-0! min-[481px]:max-[768.02px]:p-[16px]! min-[481px]:max-[768.02px]:[&_h2]:w-[297px]! min-[481px]:max-[768.02px]:[&_h2]:h-[48px]! min-[481px]:max-[768.02px]:[&_h2]:text-[48px]! min-[481px]:max-[768.02px]:[&_h2]:tracking-[-0.25em]! min-[481px]:max-[768.02px]:[&_h2]:leading-[48px]! max-[480.02px]:gap-[24px]! max-[480.02px]:h-auto! max-[480.02px]:min-h-0! max-[480.02px]:p-[16px]! max-[480.02px]:relative! max-[480.02px]:left-auto! max-[480.02px]:top-auto! max-[480.02px]:w-[361px]! max-[480.02px]:[&_h2]:text-[32px]! max-[480.02px]:[&_h2]:h-[32px]! max-[480.02px]:[&_h2]:tracking-[-0.25em]! max-[480.02px]:[&_h2]:leading-[32px]! max-[480.02px]:[&_h2]:w-[198px]!"
        }
      >
        <div
          className={
            "gusto-booking-title flex flex-col items-center gap-[min(0.2083vw,_4px)] [&_p]:relative [&_p]:m-0 [&_p]:pb-[min(0.2083vw,_4px)] [&_p]:text-[var(--coral)] [&_p]:font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] [&_p]:text-[min(0.9375vw,_18px)] [&_p]:leading-[1.36] [&_p]:text-center [&_p::after]:absolute [&_p::after]:right-0 [&_p::after]:bottom-0 [&_p::after]:left-0 [&_p::after]:h-[2px] [&_p::after]:bg-[repeating-linear-gradient(_90deg,_var(--coral)_0_8px,_transparent_8px_16px_)] [&_p::after]:content-[''] min-[1200px]:max-[1599.02px]:gap-[4px]! min-[1200px]:max-[1599.02px]:w-[322px]! min-[1200px]:max-[1599.02px]:h-[84px]! min-[1200px]:max-[1599.02px]:[&_p]:w-[234px]! min-[1200px]:max-[1599.02px]:[&_p]:h-[28px]! min-[1200px]:max-[1599.02px]:[&_p]:pb-[4px]! min-[1200px]:max-[1599.02px]:[&_p]:text-[18px]! min-[1200px]:max-[1599.02px]:[&_p]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[&_p]:whitespace-nowrap! max-[1100.02px]:gap-[4px]! max-[1100.02px]:[&_p]:pb-[4px]! max-[1100.02px]:[&_p]:text-[16px]! min-[481px]:max-[768.02px]:gap-[4px]! min-[481px]:max-[768.02px]:w-[297px]! min-[481px]:max-[768.02px]:h-[80.000038px]! min-[481px]:max-[768.02px]:[&_p]:w-[234px]! min-[481px]:max-[768.02px]:[&_p]:h-[28px]! min-[481px]:max-[768.02px]:[&_p]:pb-[4px]! min-[481px]:max-[768.02px]:[&_p]:text-[18px]! min-[481px]:max-[768.02px]:[&_p]:leading-[24px]! min-[481px]:max-[768.02px]:[&_p]:whitespace-nowrap! max-[480.02px]:gap-[4px]! max-[480.02px]:h-[54.000042px]! max-[480.02px]:w-[198px]! max-[480.02px]:[&_p]:text-[14px]! max-[480.02px]:[&_p]:h-[18px]! max-[480.02px]:[&_p]:leading-[14px]! max-[480.02px]:[&_p]:pb-[4px]! max-[480.02px]:[&_p]:whitespace-nowrap! max-[480.02px]:[&_p]:w-[182px]!"
          }
        >
          <h2>{d.home.reservationTitle}</h2>
          <p>{d.home.reservationLabel}</p>
        </div>
        <ul
          className={
            "gusto-booking-notes w-[min(26.9271vw,_517px)] h-[min(15.3125vw,_294px)] m-0 pl-[min(1.25vw,_24px)] text-[var(--color-content-inverse)] text-[min(0.8333vw,_16px)] leading-[min(2.1875vw,_42px)] text-left min-[1200px]:max-[1599.02px]:w-[517px]! min-[1200px]:max-[1599.02px]:h-[294px]! min-[1200px]:max-[1599.02px]:pl-[24px]! min-[1200px]:max-[1599.02px]:text-[16px]! min-[1200px]:max-[1599.02px]:leading-[42px]! max-[1100.02px]:w-[min(100%,_517px)]! max-[1100.02px]:h-auto! max-[1100.02px]:pl-[20px]! max-[1100.02px]:text-[14px]! max-[1100.02px]:leading-[1.75]! max-[1100.02px]:[&_li_+_li]:mt-[8px]! min-[481px]:max-[768.02px]:w-[352px]! min-[481px]:max-[768.02px]:h-[462px]! min-[481px]:max-[768.02px]:pl-[20px]! min-[481px]:max-[768.02px]:text-[14px]! min-[481px]:max-[768.02px]:leading-[27px]! min-[481px]:max-[768.02px]:[&_li_+_li]:mt-0! max-[480.02px]:text-[14px]! max-[480.02px]:h-auto! max-[480.02px]:leading-[27px]! max-[480.02px]:overflow-hidden! max-[480.02px]:pl-[24px]! max-[480.02px]:w-[329px]! max-[480.02px]:[&_li_+_li]:mt-0!"
          }
        >
          {d.home.reservationNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <ReservationLink
          href={siteConfig.reservationUrl}
          className={
            "gusto-booking-button inline-flex items-center justify-center w-[min(18.75vw,_360px)] min-h-[min(2.9167vw,_56px)] rounded-full bg-[var(--coral)] text-[var(--color-content-inverse)] font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] text-[min(0.9375vw,_18px)] leading-[1.36] no-underline transition-[filter_160ms_ease] [&:hover]:brightness-[0.92] min-[1200px]:max-[1599.02px]:w-[360px]! min-[1200px]:max-[1599.02px]:min-h-[56px]! min-[1200px]:max-[1599.02px]:text-[18px]! min-[1200px]:max-[1599.02px]:leading-[1.36]! max-[1100.02px]:w-[min(100%,_360px)]! max-[1100.02px]:min-h-[56px]! max-[1100.02px]:p-[12px_24px]! max-[1100.02px]:text-[16px]! min-[481px]:max-[768.02px]:w-[352px]! min-[481px]:max-[768.02px]:h-[56px]! min-[481px]:max-[768.02px]:min-h-[56px]! min-[481px]:max-[768.02px]:p-[16px_32px]! min-[481px]:max-[768.02px]:text-[18px]! min-[481px]:max-[768.02px]:leading-[24px]! max-[480.02px]:text-[14px]! max-[480.02px]:h-[46px]! max-[480.02px]:leading-[14px]! max-[480.02px]:min-h-[46px]! max-[480.02px]:p-[16px]! max-[480.02px]:w-[329px]!"
          }
          ariaLabel={d.reserve.external}
        >
          {d.home.reservationCta}
        </ReservationLink>
      </div>
      <Image
        src="/images/b-4.png"
        alt=""
        width={3849}
        height={72}
        sizes="100vw"
        className={
          "absolute left-0 z-[2] block w-full h-auto pointer-events-none min-[1200px]:max-[1599.02px]:h-[26.691189px]! max-[480.02px]:h-[7.284471px]! gusto-reservation-brush gusto-reservation-brush-bottom bottom-[-2px] min-[1200px]:max-[1599.02px]:bottom-0! min-[481px]:max-[768.02px]:bottom-0! min-[481px]:max-[768.02px]:h-[14.235302px]! max-[480.02px]:bottom-0!"
        }
      />
    </section>
  );
}

function Access({ d }: { d: Copy }) {
  return (
    <section
      id="access"
      className={
        "gusto-access [&::after]:content-[''] [&::after]:absolute [&::after]:inset-[auto_0_-1px] [&::after]:h-[clamp(24px,_4vw,_78px)] [&::after]:bg-[var(--ink)] [&::after]:[clip-path:polygon(_0_24%,_5%_61%,_10%_47%,_16%_85%,_22%_43%,_29%_66%,_35%_28%,_43%_70%,_49%_46%,_56%_88%,_63%_42%,_70%_65%,_77%_30%,_85%_72%,_93%_42%,_100%_67%,_100%_100%,_0_100%_)] [&::after]:z-[3] relative flex flex-col items-center gap-[min(2.9688vw,_57px)] min-h-[min(38.0729vw,_731px)] p-[min(4.375vw,_84px)_min(12.5vw,_240px)] bg-[var(--coral)] text-[var(--color-content-inverse)] text-center [&::after]:content-none min-[1200px]:max-[1599.02px]:gap-[57px]! min-[1200px]:max-[1599.02px]:w-full! min-[1200px]:max-[1599.02px]:h-[671.248474px]! min-[1200px]:max-[1599.02px]:min-h-[671.248474px]! min-[1200px]:max-[1599.02px]:p-[50px_96px]! max-[1100.02px]:gap-[48px]! max-[1100.02px]:h-auto! max-[1100.02px]:min-h-0! max-[1100.02px]:p-[72px_max(24px,_9vw)]! min-[481px]:max-[768.02px]:gap-[57px]! min-[481px]:max-[768.02px]:w-full! min-[481px]:max-[768.02px]:h-[1137.248535px]! min-[481px]:max-[768.02px]:min-h-[1137.248535px]! min-[481px]:max-[768.02px]:p-[64px_86px]! max-[480.02px]:gap-[16px]! max-[480.02px]:w-full! max-[480.02px]:h-[954.010742px]! max-[480.02px]:min-h-[954.010742px]! max-[480.02px]:p-[32px_16px]!"
      }
    >
      <div
        className={
          "gusto-access-title flex flex-col items-center gap-[min(0.4167vw,_8px)] w-[min(75vw,_1440px)] h-[min(4.7917vw,_92px)] [&_h2]:text-[var(--ink)] [&_h2]:text-[min(2.7083vw,_52px)] [&_h2]:font-normal [&_h2]:tracking-[-0.288em] [&_h2]:leading-[1] [&_p]:relative [&_p]:pb-[min(0.4167vw,_8px)] [&_p]:text-[var(--ink)] [&_p]:font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] [&_p]:text-[min(0.9375vw,_18px)] [&_p]:leading-[1.36] [&_p::after]:absolute [&_p::after]:right-0 [&_p::after]:bottom-0 [&_p::after]:left-0 [&_p::after]:h-[3px] [&_p::after]:bg-[repeating-linear-gradient(_90deg,_var(--ink)_0_8px,_transparent_8px_16px_)] [&_p::after]:content-[''] min-[1200px]:max-[1599.02px]:gap-[8px]! min-[1200px]:max-[1599.02px]:w-[1248px]! min-[1200px]:max-[1599.02px]:h-[94.248497px]! min-[1200px]:max-[1599.02px]:[&_h2]:w-[1248px]! min-[1200px]:max-[1599.02px]:[&_h2]:h-[52px]! min-[1200px]:max-[1599.02px]:[&_h2]:text-[52px]! min-[1200px]:max-[1599.02px]:[&_h2]:leading-[1]! min-[1200px]:max-[1599.02px]:[&_p]:w-[172px]! min-[1200px]:max-[1599.02px]:[&_p]:h-[34.248497px]! min-[1200px]:max-[1599.02px]:[&_p]:p-[0_14px_10.248497px]! min-[1200px]:max-[1599.02px]:[&_p]:text-[18px]! min-[1200px]:max-[1599.02px]:[&_p]:leading-[1.36]! min-[1200px]:max-[1599.02px]:[&_p]:whitespace-nowrap! min-[1200px]:max-[1599.02px]:[&_p::after]:right-[14px]! min-[1200px]:max-[1599.02px]:[&_p::after]:left-[14px]! min-[1200px]:max-[1599.02px]:[&_p::after]:h-[2px]! max-[1100.02px]:gap-[8px]! max-[1100.02px]:w-full! max-[1100.02px]:h-auto! max-[1100.02px]:[&_h2]:text-[46px]! max-[1100.02px]:[&_p]:pb-[8px]! max-[1100.02px]:[&_p]:text-[17px]! min-[481px]:max-[768.02px]:gap-[8px]! min-[481px]:max-[768.02px]:w-[191px]! min-[481px]:max-[768.02px]:h-[94.248497px]! min-[481px]:max-[768.02px]:[&_h2]:w-[191px]! min-[481px]:max-[768.02px]:[&_h2]:h-[52px]! min-[481px]:max-[768.02px]:[&_h2]:text-[52px]! min-[481px]:max-[768.02px]:[&_h2]:tracking-[-15px]! min-[481px]:max-[768.02px]:[&_h2]:leading-[52px]! min-[481px]:max-[768.02px]:[&_p]:w-[144px]! min-[481px]:max-[768.02px]:[&_p]:h-[34.248497px]! min-[481px]:max-[768.02px]:[&_p]:p-[0_0_10.248497px]! min-[481px]:max-[768.02px]:[&_p]:text-[18px]! min-[481px]:max-[768.02px]:[&_p]:leading-[24px]! min-[481px]:max-[768.02px]:[&_p]:whitespace-nowrap! min-[481px]:max-[768.02px]:[&_p::after]:right-0! min-[481px]:max-[768.02px]:[&_p::after]:left-0! min-[481px]:max-[768.02px]:[&_p::after]:h-[2px]! max-[480.02px]:gap-[8px]! max-[480.02px]:w-[191px]! max-[480.02px]:h-[64.010719px]! max-[480.02px]:[&_h2]:w-[191px]! max-[480.02px]:[&_h2]:h-[32px]! max-[480.02px]:[&_h2]:text-[32px]! max-[480.02px]:[&_h2]:tracking-[-0.25em]! max-[480.02px]:[&_h2]:leading-[32px]! max-[480.02px]:[&_p]:w-[191px]! max-[480.02px]:[&_p]:h-[24.010719px]! max-[480.02px]:[&_p]:p-[0_0_10.010719px]! max-[480.02px]:[&_p]:text-[14px]! max-[480.02px]:[&_p]:leading-[14px]! max-[480.02px]:[&_p]:whitespace-nowrap! max-[480.02px]:[&_p::after]:right-[31.1px]! max-[480.02px]:[&_p::after]:left-[31.1px]! max-[480.02px]:[&_p::after]:h-[2px]! max-[480.02px]:[&_p::after]:rotate-[0.895deg]!"
        }
      >
        <h2>{d.home.accessTitle}</h2>
        <p>{d.home.accessLabel}</p>
      </div>
      <div
        className={
          "gusto-access-grid grid grid-cols-[min(25.3023vw,_485.804px)_min(24.9479vw,_479px)] justify-center gap-[min(1.25vw,_24px)] w-[min(75vw,_1440px)] min-h-[min(21.5625vw,_414px)] text-left min-[1200px]:max-[1599.02px]:grid-cols-[481.522461px_479px]! min-[1200px]:max-[1599.02px]:gap-[24px]! min-[1200px]:max-[1599.02px]:w-[1248px]! min-[1200px]:max-[1599.02px]:h-[420px]! min-[1200px]:max-[1599.02px]:min-h-[420px]! max-[1100.02px]:grid-cols-[1fr]! max-[1100.02px]:gap-[36px]! max-[1100.02px]:w-[min(100%,_560px)]! max-[1100.02px]:h-auto! max-[1100.02px]:min-h-0! min-[481px]:max-[768.02px]:grid-cols-[1fr]! min-[481px]:max-[768.02px]:grid-rows-[414px_420px]! min-[481px]:max-[768.02px]:gap-[24px]! min-[481px]:max-[768.02px]:w-[596px]! min-[481px]:max-[768.02px]:h-[858px]! min-[481px]:max-[768.02px]:min-h-[858px]! max-[480.02px]:grid-cols-[1fr]! max-[480.02px]:grid-rows-[414px_372px]! max-[480.02px]:gap-[24px]! max-[480.02px]:w-[361px]! max-[480.02px]:h-[810px]! max-[480.02px]:min-h-[810px]!"
        }
      >
        <div
          className={
            "gusto-map w-[min(25.3023vw,_485.804px)] h-[min(21.5625vw,_414px)] overflow-hidden bg-[var(--color-map-surface)] [&_iframe]:block [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 min-[1200px]:max-[1599.02px]:w-[481.522461px]! min-[1200px]:max-[1599.02px]:h-[414px]! max-[1100.02px]:w-full! max-[1100.02px]:h-auto! max-[1100.02px]:min-h-0! max-[1100.02px]:aspect-[486_/_414]! min-[481px]:max-[768.02px]:w-[596px]! min-[481px]:max-[768.02px]:h-[414px]! min-[481px]:max-[768.02px]:aspect-auto! max-[480.02px]:w-[361px]! max-[480.02px]:h-[414px]! max-[480.02px]:aspect-auto!"
          }
        >
          <iframe
            src={siteConfig.mapEmbedUrl}
            title={d.home.accessMapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <dl
          className={
            "gusto-access-details grid content-start w-[min(24.9479vw,_479px)] min-h-[min(21.5625vw,_414px)] text-[min(0.8333vw,_16px)] leading-[min(2.1875vw,_42px)] min-[1200px]:max-[1599.02px]:w-[479px]! min-[1200px]:max-[1599.02px]:h-[420px]! min-[1200px]:max-[1599.02px]:min-h-[420px]! min-[1200px]:max-[1599.02px]:text-[16px]! min-[1200px]:max-[1599.02px]:leading-[42px]! max-[1100.02px]:w-full! max-[1100.02px]:h-auto! max-[1100.02px]:min-h-0! max-[1100.02px]:text-[15px]! max-[1100.02px]:leading-[2.2]! min-[481px]:max-[768.02px]:w-[596px]! min-[481px]:max-[768.02px]:h-[420px]! min-[481px]:max-[768.02px]:min-h-[420px]! min-[481px]:max-[768.02px]:text-[16px]! min-[481px]:max-[768.02px]:leading-[42px]! max-[480.02px]:grid-rows-[81px_125px_25px_50px_27px]! max-[480.02px]:gap-y-[16px]! max-[480.02px]:w-[361px]! max-[480.02px]:h-[372px]! max-[480.02px]:min-h-[372px]! max-[480.02px]:text-[16px]! max-[480.02px]:leading-[27px]!"
          }
        >
          <div
            className={
              "gusto-access-row grid grid-cols-[min(5.2083vw,_100px)_1fr] [&_dt]:font-normal [&_dd]:m-0 [&_dd]:p-0 [&_dd]:not-italic [&_dd]:list-none [&_address]:m-0 [&_address]:p-0 [&_address]:not-italic [&_address]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_ul]:not-italic [&_ul]:list-none [&_a]:text-[inherit] [&_a]:underline-offset-[4px] min-[1200px]:max-[1599.02px]:grid-cols-[100px_1fr]! max-[1100.02px]:grid-cols-[96px_1fr]! min-[481px]:max-[768.02px]:grid-cols-[100px_1fr]! max-[480.02px]:grid-cols-[79px_1fr]! max-[480.02px]:min-h-0!"
            }
          >
            <dt>{d.info.address}</dt>
            <dd>
              <address>{siteConfig.address}</address>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={d.home.accessMapExternal}
              >
                {d.home.accessMap}
              </a>
            </dd>
          </div>
          <div
            className={
              "gusto-access-row gusto-access-routes grid grid-cols-[min(5.2083vw,_100px)_1fr] [&_dt]:font-normal [&_dd]:m-0 [&_dd]:p-0 [&_dd]:not-italic [&_dd]:list-none [&_address]:m-0 [&_address]:p-0 [&_address]:not-italic [&_address]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_ul]:not-italic [&_ul]:list-none [&_a]:text-[inherit] [&_a]:underline-offset-[4px] min-[1200px]:max-[1599.02px]:grid-cols-[100px_1fr]! max-[1100.02px]:grid-cols-[96px_1fr]! min-[481px]:max-[768.02px]:grid-cols-[100px_1fr]! max-[480.02px]:grid-cols-[79px_1fr]! max-[480.02px]:min-h-0! mb-[min(2.1875vw,_42px)] min-[1200px]:max-[1599.02px]:mb-[42px]! max-[1100.02px]:mb-[24px]! min-[481px]:max-[768.02px]:mb-[42px]! max-[480.02px]:mb-0!"
            }
          >
            <dt>{d.home.accessDetails}</dt>
            <dd>
              <ul>
                {d.home.accessRoutes.map((route) => (
                  <li key={route}>{route}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div
            className={
              "gusto-access-row grid grid-cols-[min(5.2083vw,_100px)_1fr] [&_dt]:font-normal [&_dd]:m-0 [&_dd]:p-0 [&_dd]:not-italic [&_dd]:list-none [&_address]:m-0 [&_address]:p-0 [&_address]:not-italic [&_address]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_ul]:not-italic [&_ul]:list-none [&_a]:text-[inherit] [&_a]:underline-offset-[4px] min-[1200px]:max-[1599.02px]:grid-cols-[100px_1fr]! max-[1100.02px]:grid-cols-[96px_1fr]! min-[481px]:max-[768.02px]:grid-cols-[100px_1fr]! max-[480.02px]:grid-cols-[79px_1fr]! max-[480.02px]:min-h-0!"
            }
          >
            <dt>{d.info.phone}</dt>
            <dd>
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            </dd>
          </div>
          <div
            className={
              "gusto-access-row grid grid-cols-[min(5.2083vw,_100px)_1fr] [&_dt]:font-normal [&_dd]:m-0 [&_dd]:p-0 [&_dd]:not-italic [&_dd]:list-none [&_address]:m-0 [&_address]:p-0 [&_address]:not-italic [&_address]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_ul]:not-italic [&_ul]:list-none [&_a]:text-[inherit] [&_a]:underline-offset-[4px] min-[1200px]:max-[1599.02px]:grid-cols-[100px_1fr]! max-[1100.02px]:grid-cols-[96px_1fr]! min-[481px]:max-[768.02px]:grid-cols-[100px_1fr]! max-[480.02px]:grid-cols-[79px_1fr]! max-[480.02px]:min-h-0!"
            }
          >
            <dt>{d.info.hours}</dt>
            <dd>{siteConfig.hours}</dd>
          </div>
          <div
            className={
              "gusto-access-row grid grid-cols-[min(5.2083vw,_100px)_1fr] [&_dt]:font-normal [&_dd]:m-0 [&_dd]:p-0 [&_dd]:not-italic [&_dd]:list-none [&_address]:m-0 [&_address]:p-0 [&_address]:not-italic [&_address]:list-none [&_ul]:m-0 [&_ul]:p-0 [&_ul]:not-italic [&_ul]:list-none [&_a]:text-[inherit] [&_a]:underline-offset-[4px] min-[1200px]:max-[1599.02px]:grid-cols-[100px_1fr]! max-[1100.02px]:grid-cols-[96px_1fr]! min-[481px]:max-[768.02px]:grid-cols-[100px_1fr]! max-[480.02px]:grid-cols-[79px_1fr]! max-[480.02px]:min-h-0!"
            }
          >
            <dt>{d.home.paymentLabel}</dt>
            <dd>{d.home.paymentMethods}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function SiteFooter({ d, locale }: { d: Copy; locale: Locale }) {
  const socialCards = [
    { ...d.home.social.twitter, icon: "x" as const },
    { ...d.home.social.instagram, icon: "instagram" as const },
    { ...d.home.social.blog, icon: "drink" as const },
  ];
  const footerNav = [
    [d.footer.nav.menu, `/${locale}/menu`],
    [d.footer.nav.story, "#about"],
    [d.footer.nav.access, "#access"],
    [d.footer.nav.reservation, "#reservation"],
  ];
  return (
    <footer
      className={
        "gusto-footer [--footer-ink:var(--color-brand-ink)] [--footer-coral:var(--color-brand-coral)] [--footer-brush-height:min(1.8535vw,_35.588px)] relative overflow-hidden bg-[var(--footer-ink)] text-[var(--color-content-inverse)] min-[1200px]:max-[1599.02px]:[--footer-brush-height:26.691189px]! min-[1200px]:max-[1599.02px]:h-[287.691315px]! min-[481px]:max-[768.02px]:[--footer-brush-height:14.235302px]! min-[481px]:max-[768.02px]:h-[420.235382px]! max-[480.02px]:[--footer-brush-height:7.284471px]! max-[480.02px]:h-[462.284515px]! max-[480.02px]:pt-[7.284471px]!"
      }
    >
      <Image
        src="/images/b-4.png"
        alt=""
        width={3849}
        height={72}
        sizes="100vw"
        className={
          "gusto-footer-brush absolute top-[-2px] left-[-1px] z-[1] block w-[calc(100%_+_2px)] h-[calc(var(--footer-brush-height)_+_3px)] max-w-none object-fill scale-y-[-1] min-[1200px]:max-[1599.02px]:top-0! min-[1200px]:max-[1599.02px]:left-0! min-[1200px]:max-[1599.02px]:w-full! min-[1200px]:max-[1599.02px]:h-[26.691189px]! min-[481px]:max-[768.02px]:top-0! min-[481px]:max-[768.02px]:left-0! min-[481px]:max-[768.02px]:w-full! min-[481px]:max-[768.02px]:h-[14.235302px]! max-[480.02px]:top-0! max-[480.02px]:left-0! max-[480.02px]:w-full! max-[480.02px]:h-[7.284471px]!"
        }
      />
      <div
        className={
          "gusto-footer-content relative bg-[var(--footer-ink)] min-[1200px]:max-[1599.02px]:h-[287.691315px]! min-[481px]:max-[768.02px]:h-[420.235382px]! max-[480.02px]:h-[455px]!"
        }
      >
        <div
          className={
            "gusto-footer-upper flex items-center justify-center h-[calc(197px_+_var(--footer-brush-height))] p-[calc(32px_+_var(--footer-brush-height))_var(--layout-page-padding)_32px] min-[1200px]:max-[1599.02px]:h-[calc(_26.691189px_+_197px_)]! min-[1200px]:max-[1599.02px]:p-[calc(26.691189px_+_32px)_96px_32px]! max-[900.02px]:h-[calc(286px_+_var(--footer-brush-height))]! max-[900.02px]:p-[calc(32px_+_var(--footer-brush-height))_24px_32px]! min-[481px]:max-[768.02px]:h-[calc(_14.235302px_+_286px_)]! min-[481px]:max-[768.02px]:p-[calc(14.235302px_+_32px)_0_32px]! max-[480.02px]:h-[346px]! max-[480.02px]:p-[32px_0]!"
          }
        >
          <div
            className={
              "gusto-footer-upper-inner flex items-center justify-between w-full h-[133px] min-[1200px]:max-[1599.02px]:w-[1248px]! min-[1200px]:max-[1599.02px]:h-[133px]! max-[900.02px]:flex-col! max-[900.02px]:justify-start! max-[900.02px]:gap-[32px]! max-[900.02px]:h-[222px]! min-[481px]:max-[768.02px]:flex-col! min-[481px]:max-[768.02px]:justify-start! min-[481px]:max-[768.02px]:gap-[32px]! min-[481px]:max-[768.02px]:w-[768px]! min-[481px]:max-[768.02px]:h-[222px]! min-[481px]:max-[768.02px]:px-[24px]! max-[480.02px]:gap-[24px]! max-[480.02px]:w-full! max-[480.02px]:h-[282px]! max-[480.02px]:px-[16px]!"
            }
          >
            <Link
              href={`/${locale}`}
              className={
                "gusto-footer-logo block flex-[none] w-[230.709px] h-[100px] [&_img]:block [&_img]:w-full [&_img]:h-full min-[1200px]:max-[1599.02px]:w-[230.708664px]! min-[1200px]:max-[1599.02px]:h-[100px]! max-[900.02px]:w-[207.638px]! max-[900.02px]:h-[90px]! min-[481px]:max-[768.02px]:w-[207.637802px]! min-[481px]:max-[768.02px]:h-[90px]! max-[480.02px]:w-[207.637802px]! max-[480.02px]:h-[90px]!"
              }
            >
              <Image
                src="/images/logo-w@2x.png"
                alt={siteConfig.name}
                width={692}
                height={300}
                sizes="(max-width: 900px) 208px, 231px"
              />
            </Link>
            <nav
              aria-label={d.footer.navigation}
              className={
                "gusto-footer-nav flex items-center [&_a]:px-[16px] [&_a]:border-l-[1px] [&_a]:border-l-[var(--color-content-inverse)] [&_a]:text-[inherit] [&_a]:font-[family-name:var(--font-kalam),_var(--font-noto-sans-jp),_sans-serif] [&_a]:text-[24px] [&_a]:font-bold [&_a]:leading-[22px] [&_a]:no-underline [&_a:last-child]:border-r-[1px] [&_a:last-child]:border-r-[var(--color-content-inverse)] min-[1200px]:max-[1599.02px]:w-[479px]! min-[1200px]:max-[1599.02px]:h-[22px]! min-[1200px]:max-[1599.02px]:[&_a]:h-[22px]! min-[1200px]:max-[1599.02px]:[&_a]:text-[24px]! min-[1200px]:max-[1599.02px]:[&_a]:leading-[22px]! max-[900.02px]:[&_a]:text-[22px]! max-[900.02px]:[&_a]:leading-[20px]! min-[481px]:max-[768.02px]:w-[451px]! min-[481px]:max-[768.02px]:h-[20px]! min-[481px]:max-[768.02px]:[&_a]:h-[20px]! min-[481px]:max-[768.02px]:[&_a]:px-[16px]! min-[481px]:max-[768.02px]:[&_a]:text-[24px]! min-[481px]:max-[768.02px]:[&_a]:leading-[20px]! max-[480.02px]:flex-col! max-[480.02px]:gap-[16px]! max-[480.02px]:w-[124px]! max-[480.02px]:h-[112px]! max-[480.02px]:[&_a]:px-[16px]! max-[480.02px]:[&_a]:border-0! max-[480.02px]:[&_a]:text-[20px]! max-[480.02px]:[&_a]:leading-[16px]! max-[480.02px]:[&_a:last-child]:border-0!"
              }
            >
              {footerNav.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </nav>
            <div
              className={
                "gusto-footer-social flex items-center gap-[52px] [&_a]:block [&_a]:w-[48px] [&_a]:h-[48px] [&_a]:text-[inherit] [&_svg]:block [&_svg]:w-full [&_svg]:h-full min-[1200px]:max-[1599.02px]:gap-[52px]! min-[1200px]:max-[1599.02px]:w-[248px]! min-[1200px]:max-[1599.02px]:h-[48px]! min-[1200px]:max-[1599.02px]:[&_a]:w-[48px]! min-[1200px]:max-[1599.02px]:[&_a]:h-[48px]! min-[481px]:max-[768.02px]:gap-[52px]! min-[481px]:max-[768.02px]:w-[248px]! min-[481px]:max-[768.02px]:h-[48px]! min-[481px]:max-[768.02px]:[&_a]:w-[48px]! min-[481px]:max-[768.02px]:[&_a]:h-[48px]! max-[480.02px]:gap-[52px]! max-[480.02px]:w-[200px]! max-[480.02px]:h-[32px]! max-[480.02px]:[&_a]:w-[32px]! max-[480.02px]:[&_a]:h-[32px]!"
              }
            >
              {socialCards.map((card) => (
                <a
                  href={siteConfig.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={d.footer.socialExternal.replace(
                    "{name}",
                    card.name,
                  )}
                  key={card.name}
                >
                  <SocialIcon type={card.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            "gusto-footer-lower h-[64px] p-[16px_var(--layout-page-padding)] bg-[var(--color-brand-orange)] text-[var(--footer-ink)] min-[1200px]:max-[1599.02px]:h-[64px]! min-[1200px]:max-[1599.02px]:p-[16px_96px]! max-[900.02px]:h-[120px]! max-[900.02px]:p-[16px_24px]! min-[481px]:max-[768.02px]:h-[120px]! min-[481px]:max-[768.02px]:p-[16px_0]! max-[480.02px]:h-[109px]! max-[480.02px]:p-[16px_0]!"
          }
        >
          <div
            className={
              "gusto-footer-lower-inner flex items-center justify-between w-full h-[32px] min-[1200px]:max-[1599.02px]:w-[1248px]! min-[1200px]:max-[1599.02px]:h-[32px]! max-[900.02px]:flex-col! max-[900.02px]:justify-start! max-[900.02px]:gap-[8px]! max-[900.02px]:h-[88px]! min-[481px]:max-[768.02px]:flex-col! min-[481px]:max-[768.02px]:justify-start! min-[481px]:max-[768.02px]:gap-[8px]! min-[481px]:max-[768.02px]:w-[768px]! min-[481px]:max-[768.02px]:h-[88px]! min-[481px]:max-[768.02px]:px-[24px]! max-[480.02px]:gap-[8px]! max-[480.02px]:w-full! max-[480.02px]:h-[77px]! max-[480.02px]:px-[16px]!"
            }
          >
            <a
              className={
                "gusto-footer-phone flex items-center text-[inherit] font-[family-name:var(--font-kalam),_var(--font-noto-sans-jp),_sans-serif] text-[24px] font-bold leading-[22px] no-underline gap-[16px] [&_svg]:flex-[none] [&_svg]:w-[32px] [&_svg]:h-[32px] min-[1200px]:max-[1599.02px]:gap-[16px]! min-[1200px]:max-[1599.02px]:w-[196px]! min-[1200px]:max-[1599.02px]:h-[32px]! min-[1200px]:max-[1599.02px]:text-[24px]! min-[1200px]:max-[1599.02px]:leading-[22px]! min-[1200px]:max-[1599.02px]:[&_svg]:w-[32px]! min-[1200px]:max-[1599.02px]:[&_svg]:h-[32px]! max-[900.02px]:text-[18px]! max-[900.02px]:leading-[24px]! max-[900.02px]:gap-[4px]! max-[900.02px]:[&_svg]:w-[24px]! max-[900.02px]:[&_svg]:h-[24px]! min-[481px]:max-[768.02px]:gap-[4px]! min-[481px]:max-[768.02px]:w-[139px]! min-[481px]:max-[768.02px]:h-[24px]! min-[481px]:max-[768.02px]:text-[24px]! min-[481px]:max-[768.02px]:leading-[16px]! min-[481px]:max-[768.02px]:[&_svg]:w-[24px]! min-[481px]:max-[768.02px]:[&_svg]:h-[24px]! max-[480.02px]:text-[16px]! max-[480.02px]:leading-[16px]! max-[480.02px]:w-[119px]! max-[480.02px]:h-[16px]! max-[480.02px]:[&_svg]:w-[16px]! max-[480.02px]:[&_svg]:h-[16px]!"
              }
              href={siteConfig.phoneHref}
            >
              <PhoneIcon aria-hidden="true" weight="regular" />
              <span>{siteConfig.phone}</span>
            </a>
            <div
              className={
                "gusto-footer-hours flex items-center text-[inherit] font-[family-name:var(--font-kalam),_var(--font-noto-sans-jp),_sans-serif] text-[24px] font-bold leading-[22px] no-underline [&_svg]:flex-[none] [&_svg]:w-[32px] [&_svg]:h-[32px] [&_p]:px-[16px] [&_p]:border-l-[1px] [&_p]:border-l-[var(--footer-ink)] [&_p]:whitespace-nowrap min-[1200px]:max-[1599.02px]:w-[667px]! min-[1200px]:max-[1599.02px]:h-[32px]! min-[1200px]:max-[1599.02px]:text-[24px]! min-[1200px]:max-[1599.02px]:leading-[22px]! min-[1200px]:max-[1599.02px]:[&_svg]:w-[32px]! min-[1200px]:max-[1599.02px]:[&_svg]:h-[32px]! max-[900.02px]:text-[18px]! max-[900.02px]:leading-[24px]! max-[900.02px]:[&_svg]:w-[24px]! max-[900.02px]:[&_svg]:h-[24px]! max-[900.02px]:[&_p]:px-[8px]! min-[481px]:max-[768.02px]:w-[484px]! min-[481px]:max-[768.02px]:h-[24px]! min-[481px]:max-[768.02px]:text-[24px]! min-[481px]:max-[768.02px]:leading-[16px]! min-[481px]:max-[768.02px]:[&_svg]:w-[24px]! min-[481px]:max-[768.02px]:[&_svg]:h-[24px]! min-[481px]:max-[768.02px]:[&_p]:h-[24px]! min-[481px]:max-[768.02px]:[&_p]:px-[8px]! min-[481px]:max-[768.02px]:[&_p]:leading-[16px]! max-[480.02px]:text-[16px]! max-[480.02px]:leading-[16px]! max-[480.02px]:[&_svg]:w-[16px]! max-[480.02px]:[&_svg]:h-[16px]! max-[480.02px]:grid! max-[480.02px]:grid-cols-[16px_auto]! max-[480.02px]:gap-y-[1px]! max-[480.02px]:gap-x-[4px]! max-[480.02px]:w-[272px]! max-[480.02px]:h-[31px]! max-[480.02px]:[&_svg]:col-[1]! max-[480.02px]:[&_svg]:row-[1]! max-[480.02px]:[&_p]:col-[2]! max-[480.02px]:[&_p]:p-0! max-[480.02px]:[&_p]:border-0!"
              }
            >
              <ClockIcon aria-hidden="true" weight="regular" />
              <p>
                {d.footer.lunch}: {siteConfig.lunchHours}
              </p>
              <p>
                {d.footer.dinner}: {siteConfig.dinnerHours}
              </p>
            </div>
            <p
              className={
                "gusto-footer-copyright font-[family-name:var(--font-yamafont),_var(--font-noto-sans-jp),_sans-serif] text-[14px] leading-[1] whitespace-nowrap min-[1200px]:max-[1599.02px]:w-[218px]! min-[1200px]:max-[1599.02px]:h-[14px]! min-[1200px]:max-[1599.02px]:text-[14px]! min-[1200px]:max-[1599.02px]:leading-[14px]! min-[1200px]:max-[1599.02px]:text-right! max-[900.02px]:font-[family-name:var(--font-noto-sans-jp),_sans-serif]! max-[900.02px]:text-[12px]! min-[481px]:max-[768.02px]:w-[218px]! min-[481px]:max-[768.02px]:h-[14px]! min-[481px]:max-[768.02px]:font-[family-name:var(--font-noto-sans-jp),_sans-serif]! min-[481px]:max-[768.02px]:text-[12px]! min-[481px]:max-[768.02px]:leading-[14px]! min-[481px]:max-[768.02px]:text-center! max-[480.02px]:w-[218px]! max-[480.02px]:h-[14px]! max-[480.02px]:text-[12px]! max-[480.02px]:leading-[14px]! max-[480.02px]:text-center!"
              }
            >
              {d.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HomeGusto({
  locale,
  featured,
}: {
  locale: Locale;
  featured: FeaturedMenu[];
}) {
  const d = getDictionary(locale);

  return (
    <>
      <main
        className={
          "gusto-home [--cream:var(--color-brand-paper)] [--ink:var(--color-brand-ink)] [--coral:var(--color-brand-coral)] bg-[var(--cream)_url('/images/cotton01.jpg')_center/cover_fixed] text-[var(--ink)] font-[family-name:var(--font-family-body)] overflow-hidden [&_h1]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [&_h2]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [&_h3]:font-[family-name:var(--font-kirigirisu),_var(--font-noto-sans-jp),_sans-serif] [&_p]:leading-[1.8]"
        }
      >
        <Hero d={d} />
        <About d={d} />
        <Wine d={d} locale={locale} />
        <Recommendations d={d} featured={featured} locale={locale} />
        <Social d={d} />
        <Reservation d={d} />
        <Access d={d} />
      </main>
      <SiteFooter d={d} locale={locale} />
    </>
  );
}
