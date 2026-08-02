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

type CampaignImage = {
  src: string;
  previewSrc?: string;
  width: number;
  height: number;
  description: string;
};

const COMMUNITY_IMAGE: CampaignImage = {
  src: "/images/festival/30-07/lineup-community.webp",
  width: 720,
  height: 900,
  description:
    "Плакат «Тут звучить світ»: люди танцюють просто неба в традиційному українському вбранні; «Музика, традиції й культури без кордонів. В ритмі це магічно».",
};

const POSTER_IMAGE: CampaignImage = {
  src: "/images/festival/30-07/post-poster-2.webp",
  previewSrc: "/images/festival/30-07/post-poster-2-preview.webp",
  width: 1440,
  height: 1800,
  description:
    "Плакат «Традиції, що звучать сьогодні»: червоний птах летить над горами; «Сучасний ритм, народжений з коріння. Країна Мрій».",
};

export const Hero = ({ content }: HeroProps) => {
  const [isSwapped, setIsSwapped] = useState(false);
  const rawTitle = content?.title || FALLBACK_TITLE;
  const title = rawTitle.replace(/героїчна/gi, "").replace(/\s+/g, " ").trim();
  const tagline = content?.tagline || FALLBACK_TAGLINE;
  const cityName = content?.cityName || FALLBACK_CITY;
  const dates = content?.dateRange || FALLBACK_DATES;

  const primaryImage = isSwapped ? POSTER_IMAGE : COMMUNITY_IMAGE;
  const secondaryImage = isSwapped ? COMMUNITY_IMAGE : POSTER_IMAGE;

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

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        {/* Text column — centered on mobile, left-aligned at md+ */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <span className="mb-3 inline-block w-fit self-center rounded-full border border-secondary/40 bg-secondary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-secondary transition-colors duration-300 md:mb-4 md:self-start md:text-sm">
            Етно-фестиваль
          </span>

          <h1
            className="mb-3 font-serif text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-5xl md:text-6xl lg:text-7xl"
            id="hero-heading"
          >
            {title}
          </h1>

          <p className="mb-4 font-hand text-xl text-secondary transition-colors duration-300 sm:text-2xl md:text-2xl lg:text-3xl">
            {tagline}
          </p>

          {/* Place & Date highlight card */}
          <div className="mb-5 flex flex-col gap-1 rounded-2xl border border-secondary/25 bg-secondary/5 p-3.5 text-base shadow-sm md:self-start md:text-lg">
            <div className="flex flex-wrap items-center justify-center gap-2 font-bold md:justify-start">
              <span className="text-secondary">{cityName}</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-primary">{dates}</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground sm:text-sm">{FALLBACK_VENUE}</p>
          </div>

          <p className="mb-6 font-serif text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground md:text-sm">
            {FALLBACK_FOUNDER}
          </p>

          <a
            className="self-center rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:opacity-90 hover:shadow-md hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none md:self-start md:px-8 md:py-4 md:text-lg"
            href="https://novosad.tibox.me/krayina-mrii"
            rel="noopener noreferrer"
            target="_blank"
          >
            Купити квитки
            <span className="sr-only"> — відкриється в новій вкладці</span>
          </a>
        </div>

        {/* Art column — one accessible control for the dual-poster composition */}
        <div className="flex items-center justify-center p-2 sm:p-4">
          <button
            type="button"
            onClick={() => setIsSwapped((previous) => !previous)}
            aria-describedby="hero-artwork-description"
            aria-label="Поміняти плакати місцями"
            className="group relative aspect-[4/5] w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:w-11/12 md:max-w-[360px] lg:max-w-[400px]"
          >
            <span className="sr-only" id="hero-artwork-description">
              Попереду: {primaryImage.description} Позаду: {secondaryImage.description}
            </span>

            {/* Secondary poster layered behind */}
            <div
              aria-hidden="true"
              className="absolute top-1 -right-3 sm:top-2 sm:-right-5 aspect-[4/5] w-3/4 overflow-hidden rounded-2xl border-2 border-primary/25 bg-card shadow-xl rotate-6 opacity-95 transition-all duration-500 group-hover:rotate-3 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:rotate-6 motion-reduce:group-hover:opacity-95"
            >
              <CampaignArtwork
                alt=""
                className="size-full object-cover"
                fetchPriority="low"
                height={secondaryImage.height}
                loading="lazy"
                src={secondaryImage.previewSrc ?? secondaryImage.src}
                width={secondaryImage.width}
              />
            </div>

            {/* Primary artwork card in foreground */}
            <div
              aria-hidden="true"
              className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-500 group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            >
              <CampaignArtwork
                alt=""
                className="size-full object-contain"
                fetchPriority={!isSwapped ? "high" : "low"}
                height={primaryImage.height}
                loading={!isSwapped ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 768px, calc(100vw - 32px)"
                src={primaryImage.src}
                width={primaryImage.width}
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
