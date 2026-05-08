"use client";

import Image from "next/image";
import type { LandingTheme } from "@/components/landing/LandingExperience";
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

type HeroProps = {
  cities: LANDING_CITIES_QUERY_RESULT;
  theme: LandingTheme;
  onThemeChange: (theme: LandingTheme) => void;
};

function isLandingTheme(theme: string | null | undefined): theme is LandingTheme {
  return theme === "epic" || theme === "heroic";
}

export const Hero = ({ cities, onThemeChange, theme }: HeroProps) => {
  const cityCards = cities.filter((city) => city.slug && isLandingTheme(city.themeKey));

  return (
    <section className="relative flex min-h-[707px] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center md:px-12">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(currentColor_1px,transparent_0)] bg-[size:24px_24px] text-primary opacity-10" />
      <div className="relative z-10 w-full">
        <span className="mb-2 block text-sm font-bold tracking-[0.2em] text-primary transition-colors duration-300">ЕТНО-ФЕСТИВАЛЬ</span>
        <h1 className="mb-6 font-serif text-5xl font-bold tracking-[-0.02em] text-foreground md:text-7xl">«Країна Мрій» 2026</h1>
        <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Територія свободи, де традиції творять майбутнє.</p>
        <p className="mb-12 font-hand text-2xl text-primary transition-colors duration-300">Автор та засновник — Олег Скрипка</p>

        <div className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2" id="cities">
          {cityCards.map((card) => {
            const cardTheme = card.themeKey as LandingTheme;
            const selected = theme === cardTheme;

            return (
              <button
                aria-pressed={selected}
                className={`group rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background ${selected ? "border-primary ring-2 ring-primary" : "border-border"}`}
                key={card._id || card.slug}
                onClick={() => onThemeChange(cardTheme)}
                onMouseEnter={() => onThemeChange(cardTheme)}
                type="button"
              >
                <div className="relative mb-6 aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    alt={card.heroImage?.alt || card.cityName || card.title || "Місто фестивалю"}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 384px, calc(100vw - 80px)"
                    src={card.heroImage?.asset?.url || "/images/placeholder.svg"}
                  />
                </div>
                <span className="mb-2 block font-serif text-2xl font-bold text-primary transition-colors duration-300">{card.title || card.cityName}</span>
                <p className="text-sm text-muted-foreground">{card.cityName}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
