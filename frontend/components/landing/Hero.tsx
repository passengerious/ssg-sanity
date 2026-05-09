"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { isFestivalTheme, type FestivalTheme } from "@/lib/festival-themes";
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

type HeroProps = {
  cities: LANDING_CITIES_QUERY_RESULT;
  theme: FestivalTheme;
  onThemeChange: (theme: FestivalTheme) => void;
  onThemeReset: () => void;
};

export const Hero = ({ cities, onThemeChange, onThemeReset, theme }: HeroProps) => {
  const cityGridRef = useRef<HTMLUListElement>(null);
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
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              onThemeReset();
            }
          }}
          onMouseLeave={() => {
            if (!cityGridRef.current?.contains(document.activeElement)) {
              onThemeReset();
            }
          }}
          ref={cityGridRef}
        >
          {cityCards.map((card) => {
            const cardTheme = card.themeKey;
            const selected = theme === cardTheme;

            return (
              <li key={card._id || card.slug}>
                <Link
                  className={`group relative block overflow-hidden rounded-2xl border bg-card p-0 text-left shadow-sm transition-all duration-300 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transition-none ${
                    selected
                      ? "border-primary ring-2 ring-primary shadow-lg"
                      : "border-border hover:border-primary/40"
                  }`}
                  data-selected={selected ? "true" : undefined}
                  href={`/${card.slug}`}
                  onMouseEnter={() => onThemeChange(cardTheme)}
                >
                  {/* Image is decorative; visible text below supplies the link label. */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      alt=""
                      className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                      fill
                      sizes="(min-width: 768px) 384px, calc(100vw - 80px)"
                      src={card.heroImage?.asset?.url || "/images/placeholder.svg"}
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" aria-hidden="true" />
                  </div>

                  {/* Text overlay on image bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="block font-serif text-2xl font-bold leading-tight text-white drop-shadow-lg md:text-3xl">
                      {card.title || card.cityName}
                    </span>
                    <p className="mt-1 text-sm font-medium text-white/80">{card.cityName}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
