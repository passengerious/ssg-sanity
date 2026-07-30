import Link from "next/link";
import { SanityImageFill } from "@/components/sanity-image";
import { CampaignArtwork } from "@/components/landing/CampaignArtwork";
import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

type HeroProps = {
  city: FESTIVAL_CITY_QUERY_RESULT | null;
};

const FALLBACK_TITLE = "«Країна Мрій» 2026";
const FALLBACK_TAGLINE = "Територія свободи, де традиції творять майбутнє.";
const FALLBACK_CITY = "Львів";
const FALLBACK_DATES = "15–16 серпня 2026";
const FALLBACK_VENUE = "Парк культури ім. Богдана Хмельницького";
const FALLBACK_FOUNDER = "Автор та засновник — Олег Скрипка";

export const Hero = ({ city }: HeroProps) => {
  const title = city?.title || FALLBACK_TITLE;
  const tagline = city?.tagline || FALLBACK_TAGLINE;
  const cityName = city?.cityName || FALLBACK_CITY;
  const dates = city?.dateRange || FALLBACK_DATES;
  const heroImage = city?.heroImage ?? null;
  const hasSanityHero = Boolean(heroImage?.asset?.url);

  return (
    <section
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-10 md:px-12 md:py-16"
      aria-labelledby="hero-heading"
    >
      {/* Subtle radial dot pattern — green contextual accent */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(currentColor_1px,transparent_0)] bg-[size:32px_32px] text-secondary opacity-[0.07]"
        aria-hidden="true"
      />
      {/* Soft gradient overlay at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      {hasSanityHero ? (
        /* ── Sanity branch: centered stacked layout with priority LCP image ── */
        <div className="relative z-10 w-full max-w-5xl text-center">
          <span className="mb-4 inline-block rounded-full border border-secondary/40 bg-secondary/5 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-secondary transition-colors duration-300 md:mb-6 md:text-sm">
            Етно-фестиваль
          </span>

          <h1
            className="mb-6 font-serif text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl"
            id="hero-heading"
          >
            {title}
          </h1>

          <p className="mx-auto mb-2 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
            {tagline}
          </p>

          <div className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            <p className="font-semibold text-foreground">
              {cityName}
              {dates ? ` · ${dates}` : null}
            </p>
            <p>{FALLBACK_VENUE}</p>
          </div>

          <p className="mb-10 font-hand text-xl text-primary transition-colors duration-300 md:text-2xl lg:text-3xl">
            {FALLBACK_FOUNDER}
          </p>

          <Link
            className="mb-10 inline-flex rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:opacity-90 hover:shadow-md hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none md:px-7 md:py-3.5"
            href="/tickets/"
          >
            Купити квитки
          </Link>

          <div className="relative mx-auto mt-4 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg">
            <SanityImageFill
              alt={heroImage!.alt || `Панорама фестивалю Країна Мрій у місті ${cityName}`}
              className="transition-transform duration-700 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
              image={heroImage}
              priority
              sizes="(min-width: 1024px) 896px, (min-width: 768px) 768px, calc(100vw - 32px)"
            />
          </div>
        </div>
      ) : (
        /* ── Fallback branch: responsive split grid (text + campaign art) ── */
        <div className="relative z-10 grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Text column — centered on mobile, left-aligned at md+ */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <span className="mb-4 inline-block rounded-full border border-secondary/40 bg-secondary/5 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-secondary transition-colors duration-300 md:mb-6 md:text-sm md:self-start">
              Етно-фестиваль
            </span>

            <h1
              className="mb-6 font-serif text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-6xl lg:text-7xl"
              id="hero-heading"
            >
              {title}
            </h1>

            <p className="mb-2 text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
              {tagline}
            </p>

            <div className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p className="font-semibold text-foreground">
                {cityName}
                {dates ? ` · ${dates}` : null}
              </p>
              <p>{FALLBACK_VENUE}</p>
            </div>

            <p className="mb-6 font-hand text-xl text-primary transition-colors duration-300 md:mb-8 md:text-2xl lg:text-3xl">
              {FALLBACK_FOUNDER}
            </p>

            <Link
              className="self-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:opacity-90 hover:shadow-md hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none md:self-start md:px-7 md:py-3.5"
              href="/tickets/"
            >
              Купити квитки
            </Link>
          </div>

          {/* Art column — eager/high-priority campaign artwork */}
          <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-background shadow-lg md:aspect-[4/5]">
            <CampaignArtwork
              alt="Кампанійна ілюстрація Країна Мрій — птах серед гір, традиції та етно-мотиви"
              className="size-full object-contain transition-transform duration-700 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
              fetchPriority="high"
              height={1800}
              loading="eager"
              mobileHeight={1280}
              mobileSrc="/images/festival/30-07/hero-traditions-mobile.webp"
              mobileWidth={720}
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, calc(100vw - 32px)"
              src="/images/festival/30-07/hero-traditions-desktop.webp"
              width={1440}
            />
          </div>
        </div>
      )}
    </section>
  );
};
