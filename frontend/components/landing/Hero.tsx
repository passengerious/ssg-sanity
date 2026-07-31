"use client";

import { useState } from "react";
import { CampaignArtwork } from "@/components/landing/CampaignArtwork";

export type HeroContent = {
  title?: string | null;
  tagline?: string | null;
  cityName?: string | null;
  dateRange?: string | null;
};

type HeroProps = {
  content: HeroContent | null;
};

const FALLBACK_TITLE = "«Країна Мрій» 2026";
const FALLBACK_TAGLINE = "Територія свободи, де традиції формують майбутнє.";
const FALLBACK_CITY = "Львів";
const FALLBACK_DATES = "15–16 серпня 2026";
const FALLBACK_VENUE = "Парк культури ім. Богдана Хмельницького";
const FALLBACK_FOUNDER = "Автор та засновник — Олег Скрипка";

export const Hero = ({ content }: HeroProps) => {
  const [isSwapped, setIsSwapped] = useState(false);
  const rawTitle = content?.title || FALLBACK_TITLE;
  const title = rawTitle.replace(/героїчна/gi, "").replace(/\s+/g, " ").trim();
  const tagline = content?.tagline || FALLBACK_TAGLINE;
  const cityName = content?.cityName || FALLBACK_CITY;
  const dates = content?.dateRange || FALLBACK_DATES;

  const primaryImage = isSwapped
    ? {
      src: "/images/festival/30-07/post-poster-2.webp",
      alt: "Кампанійне плакатне мистецтво Країна Мрій 2026",
      width: 1440,
      height: 1800,
    }
    : {
      src: "/images/festival/30-07/lineup-community.webp",
      alt: "Люди танцюють просто неба в традиційному українському вбранні",
      width: 720,
      height: 900,
    };

  const secondaryImage = isSwapped
    ? {
      src: "/images/festival/30-07/lineup-community.webp",
      alt: "Люди танцюють просто неба в традиційному українському вбранні",
      width: 720,
      height: 900,
    }
    : {
      src: "/images/festival/30-07/post-poster-2.webp",
      alt: "Кампанійне плакатне мистецтво Країна Мрій 2026",
      width: 1440,
      height: 1800,
    };

  return (
    <section
      className="relative flex flex-col items-center justify-start overflow-hidden px-4 pt-2 pb-6 md:px-12 md:pt-4 md:pb-8"
      aria-labelledby="hero-heading"
    >
      {/* Subtle radial dot pattern — green contextual accent */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(currentColor_1px,transparent_0)] bg-[size:32px_32px] text-secondary opacity-[0.07]"
        aria-hidden="true"
      />
      {/* Soft gradient overlay at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
        {/* Text column — centered on mobile, left-aligned at md+ */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <span className="mb-3 inline-block rounded-full border border-secondary/40 bg-secondary/5 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-secondary transition-colors duration-300 md:mb-4 md:text-sm md:self-start">
            Етно-фестиваль
          </span>

          <h1
            className="mb-3 font-serif text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-5xl md:text-6xl lg:text-7xl"
            id="hero-heading"
          >
            {title}
          </h1>

          <p className="mb-4 font-hand text-lg text-secondary transition-colors duration-300 md:mb-6 md:text-xl lg:text-2xl">
            {tagline}
          </p>

          {/* Place & Date highlight card */}
          <div className="mb-4 flex flex-col gap-1 rounded-xl border border-secondary/20 bg-secondary/5 p-3 text-sm md:self-start md:text-base">
            <div className="flex flex-wrap items-center justify-center gap-2 font-bold md:justify-start">
              <span className="text-secondary">{cityName}</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-primary">{dates}</span>
            </div>
            <p className="text-xs text-muted-foreground">{FALLBACK_VENUE}</p>
          </div>

          {/* <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-secondary sm:text-sm md:text-base">
            {FALLBACK_FOUNDER}
          </p> */}

          <a
            className="self-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:opacity-90 hover:shadow-md hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none md:self-start md:px-7 md:py-3.5"
            href="https://novosad.tibox.me/krayina-mrii"
            rel="noopener noreferrer"
            target="_blank"
          >
            Купити квитки
            <span className="sr-only"> — відкриється в новій вкладці</span>
          </a>
        </div>

        {/* Art column — interactive dual-poster campaign artwork composition */}
        <div className="relative flex items-center justify-center p-2 sm:p-4">
          {/* Secondary poster layered behind */}
          <button
            type="button"
            onClick={() => setIsSwapped((prev) => !prev)}
            aria-label={`Поміняти плакати місцями. ${secondaryImage.alt}`}
            className="absolute -right-1 -top-1 aspect-[4/5] w-3/4 overflow-hidden rounded-2xl border border-secondary/20 bg-card/60 shadow-md rotate-3 opacity-80 transition-all duration-500 hover:rotate-1 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:rotate-3 motion-reduce:hover:opacity-80 sm:-right-2 sm:-top-2"
          >
            <CampaignArtwork
              alt={secondaryImage.alt}
              className="size-full object-cover"
              fetchPriority="low"
              height={secondaryImage.height}
              src={secondaryImage.src}
              width={secondaryImage.width}
            />
          </button>

          {/* Primary artwork card in foreground */}
          <button
            type="button"
            onClick={() => setIsSwapped((prev) => !prev)}
            aria-label={`Поміняти плакати місцями. ${primaryImage.alt}`}
            className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-background text-left shadow-2xl transition-all duration-500 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none motion-reduce:hover:scale-100 sm:w-11/12"
          >
            <CampaignArtwork
              alt={primaryImage.alt}
              className="size-full object-contain"
              fetchPriority="high"
              height={primaryImage.height}
              loading="eager"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 768px, calc(100vw - 32px)"
              src={primaryImage.src}
              width={primaryImage.width}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
