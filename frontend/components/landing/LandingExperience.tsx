"use client";

import { useState } from "react";
import { AboutFestival } from "@/components/landing/AboutFestival";
import { ArtistsLineup } from "@/components/landing/ArtistsLineup";
import { BuyTickets } from "@/components/landing/BuyTickets";
import { Footer } from "@/components/landing/Footer";
import { Founder } from "@/components/landing/Founder";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { LocationsGrid } from "@/components/landing/LocationsGrid";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { FestivalThemeShell } from "@/components/festival-theme-shell";
import {
  DEFAULT_FESTIVAL_THEME,
  isFestivalTheme,
  type FestivalTheme,
} from "@/lib/festival-themes";
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

export function LandingExperience({
  cities,
}: {
  cities: LANDING_CITIES_QUERY_RESULT;
}) {
  const initialTheme =
    cities.find((city) => isFestivalTheme(city.themeKey))?.themeKey ??
    DEFAULT_FESTIVAL_THEME;
  const [theme, setTheme] = useState<FestivalTheme>(initialTheme);

  return (
    <FestivalThemeShell
      className="min-h-screen bg-background text-foreground font-sans"
      theme={theme}
    >
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-2 focus:outline-primary"
        href="#main-content"
      >
        Перейти до основного вмісту
      </a>
      <Header />
      <main className="mx-auto max-w-7xl" id="main-content" tabIndex={-1}>
        <Hero
          cities={cities}
          onThemeChange={setTheme}
          onThemeReset={() => setTheme(initialTheme)}
          theme={theme}
        />
        <BuyTickets />
        <AboutFestival />
        <Founder />
        <LocationsGrid />
        <ArtistsLineup cities={cities} />
        <PartnersSection cities={cities} />
      </main>
      <Footer />
    </FestivalThemeShell>
  );
}
