"use client";

import { SanityImageFill } from "@/components/sanity-image";
import { isFestivalTheme, type FestivalTheme } from "@/lib/festival-themes";
import { cn } from "@/lib/utils";
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

type HeroProps = {
  cities: LANDING_CITIES_QUERY_RESULT;
};

const cityCardTheme: Record<
  FestivalTheme,
  {
    border: string;
    glow: string;
    overlay: string;
    text: string;
  }
> = {
  epic: {
    border: "border-[#8C9B5C]/70 hover:border-[#8C9B5C] focus-visible:ring-[#8C9B5C]",
    glow: "after:bg-[#8C9B5C]/20 group-hover:after:bg-[#8C9B5C]/30",
    overlay: "from-[#1f2a16]/90 via-[#8C9B5C]/45 to-transparent",
    text: "text-[#dce7b0]",
  },
  heroic: {
    border: "border-[#BF2A26]/70 hover:border-[#BF2A26] focus-visible:ring-[#BF2A26]",
    glow: "after:bg-[#BF2A26]/20 group-hover:after:bg-[#BF2A26]/30",
    overlay: "from-[#32100e]/90 via-[#BF2A26]/45 to-transparent",
    text: "text-[#ffd1c8]",
  },
};

export const Hero = ({ cities }: HeroProps) => {
  const cityCards = cities.flatMap((city) => {
    if (!city.slug || !isFestivalTheme(city.themeKey)) return [];
    return [{ ...city, slug: city.slug, themeKey: city.themeKey }];
  });

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-10 text-center md:px-12 md:py-16">
      {/* Subtle radial dot pattern */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(currentColor_1px,transparent_0)] bg-[size:32px_32px] text-primary opacity-[0.07]"
        aria-hidden="true"
      />
      {/* Soft gradient overlay at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Overline */}
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary transition-colors duration-300 md:mb-6 md:text-sm">
          Етно-фестиваль
        </span>

        {/* Main heading */}
        <h1 className="mb-6 font-serif text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">
          «Країна Мрій» 2026
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
          Територія свободи, де традиції творять майбутнє.
        </p>

        {/* Founder credit */}
        <p className="mb-14 font-hand text-xl text-primary transition-colors duration-300 md:text-2xl lg:text-3xl">
          Автор та засновник — Олег Скрипка
        </p>

        {/* City selection cards */}
        <ul
          className="mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
          id="cities"
        >
          {cityCards.map((card, index) => {
            const cardTheme = card.themeKey;
            const accent = cityCardTheme[cardTheme];

            return (
              <li key={card._id || card.slug}>
                <a
                  className={cn(
                    "group relative block overflow-hidden rounded-2xl border bg-card p-0 text-left shadow-sm transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300 hover:-translate-y-1 hover:shadow-2xl hover:after:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    accent.border,
                    accent.glow,
                  )}
                  href={`/${card.slug}/`}
                >
                  {/* Image is decorative; visible text below supplies the link label. */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SanityImageFill
                      alt=""
                      className="transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                      image={card.heroImage}
                      priority={index < 2}
                      sizes="(min-width: 768px) 384px, calc(100vw - 80px)"
                    />
                    {/* Gradient overlay on image */}
                    <div className={cn("absolute inset-0 bg-gradient-to-t", accent.overlay)} aria-hidden="true" />
                  </div>

                  {/* Text overlay on image bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="block font-serif text-2xl font-bold leading-tight text-white drop-shadow-lg md:text-3xl">
                      {card.title || card.cityName}
                    </span>
                    <p className={cn("mt-1 text-sm font-bold", accent.text)}>{card.cityName}</p>
                    <span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-[0.16em] text-white/85 transition-colors group-hover:text-white">
                      Відкрити місто
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
