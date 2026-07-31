import { AboutFestival } from "@/components/landing/AboutFestival";
import {
  ArtistsLineup,
  type DayGroup,
} from "@/components/landing/ArtistsLineup";
import { BuyTickets } from "@/components/landing/BuyTickets";
import { Footer } from "@/components/landing/Footer";
import { Founder } from "@/components/landing/Founder";
import { FestivalPhotoGallery } from "@/components/landing/FestivalPhotoGallery";
import { Header } from "@/components/landing/Header";
import { Hero, type HeroContent } from "@/components/landing/Hero";
import { HistoryTimeline } from "@/components/landing/HistoryTimeline";
import { LocationsGrid } from "@/components/landing/LocationsGrid";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { FestivalThemeShell } from "@/components/festival-theme-shell";
import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

/**
 * First N artists in the CMS-ordered array belong to Day 1 (15 Aug).
 * Remaining artists belong to Day 2 (16 Aug).
 * See the day-group convention in docs/plans/lineup.md.
 */
export const DAY_1_ARTIST_COUNT = 3;

export function LandingExperience({
  city,
}: {
  city: FESTIVAL_CITY_QUERY_RESULT | null;
}) {
  const locations = city?.locations?.filter(Boolean) ?? [];
  const artists = city?.artists?.filter(Boolean) ?? [];
  const partners = city?.partners?.filter(Boolean) ?? [];
  const history = city?.history?.filter(Boolean) ?? [];
  const heroContent: HeroContent | null = city
    ? {
        title: city.title,
        tagline: city.tagline,
        cityName: city.cityName,
        dateRange: city.dateRange,
      }
    : null;
  const hasHistory = history.length > 0;

  const days: DayGroup[] = [
    { label: "15 серпня, Субота", artists: artists.slice(0, DAY_1_ARTIST_COUNT) },
    { label: "16 серпня, Неділя", artists: artists.slice(DAY_1_ARTIST_COUNT) },
  ].filter((d) => d.artists.length > 0);

  return (
    <FestivalThemeShell
      className="min-h-screen bg-background text-foreground font-sans"
      theme="heroic"
    >
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-2 focus:outline-primary"
        href="#main-content"
      >
        Перейти до основного вмісту
      </a>
      <Header hasHistory={hasHistory} />
      <main className="mx-auto max-w-7xl" id="main-content" tabIndex={-1}>
        <Hero content={heroContent} />
        <AboutFestival />
        <Founder />
        <ArtistsLineup days={days} />
        <BuyTickets />
        <LocationsGrid locations={locations} />
        <HistoryTimeline history={history} />
        <FestivalPhotoGallery />
        <PartnersSection partners={partners} />
      </main>
      <Footer />
    </FestivalThemeShell>
  );
}
