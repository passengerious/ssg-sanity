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
  const cityGridRef = useRef<HTMLDivElement>(null);
  const cityCards = cities.flatMap((city) => {
    if (!city.slug || !isFestivalTheme(city.themeKey)) return [];
    return [{ ...city, slug: city.slug, themeKey: city.themeKey }];
  });

  return (
    <section className="relative flex min-h-[707px] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center md:px-12">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(currentColor_1px,transparent_0)] bg-[size:24px_24px] text-primary opacity-10" />
      <div className="relative z-10 w-full">
        <span className="mb-2 block text-sm font-bold tracking-[0.2em] text-primary transition-colors duration-300">ЕТНО-ФЕСТИВАЛЬ</span>
        <h1 className="mb-6 font-serif text-5xl font-bold tracking-[-0.02em] text-foreground md:text-7xl">«Країна Мрій» 2026</h1>
        <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Територія свободи, де традиції творять майбутнє.</p>
        <p className="mb-12 font-hand text-2xl text-primary transition-colors duration-300">Автор та засновник — Олег Скрипка</p>

        <div
          className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"
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
              <Link
                className={`group rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background ${selected ? "border-primary ring-2 ring-primary" : "border-border"}`}
                data-selected={selected ? "true" : undefined}
                href={`/${card.slug}`}
                key={card._id || card.slug}
                onMouseEnter={() => onThemeChange(cardTheme)}
              >
                <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    alt=""
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 384px, calc(100vw - 80px)"
                    src={card.heroImage?.asset?.url || "/images/placeholder.svg"}
                  />
                </div>
                <span className="mb-2 block font-serif text-2xl font-bold text-primary transition-colors duration-300">{card.title || card.cityName}</span>
                <p className="text-sm text-muted-foreground">{card.cityName}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
