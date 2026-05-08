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
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

export type LandingTheme = "epic" | "heroic";

function isLandingTheme(theme: string | null | undefined): theme is LandingTheme {
  return theme === "epic" || theme === "heroic";
}

export function LandingExperience({
  cities,
}: {
  cities: LANDING_CITIES_QUERY_RESULT;
}) {
  const initialTheme = cities.find((city) => isLandingTheme(city.themeKey))?.themeKey ?? "epic";
  const [theme, setTheme] = useState<LandingTheme>(initialTheme);

  return (
    <div
      className="festival-theme min-h-screen bg-background text-foreground font-sans"
      data-theme={theme}
    >
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
        href="#main-content"
      >
        Перейти до основного вмісту
      </a>
      <Header />
      <main className="mx-auto max-w-7xl" id="main-content">
        <Hero cities={cities} onThemeChange={setTheme} theme={theme} />
        <BuyTickets />
        <AboutFestival />
        <Founder />
        <LocationsGrid />
        <ArtistsLineup />
      </main>
      <Footer />
    </div>
  );
}
