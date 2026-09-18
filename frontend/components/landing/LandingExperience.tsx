import { AboutFestival } from "@/components/landing/AboutFestival";
import {
  Artist,
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

  // Verified 4-artist lineup for 19–20 September 2026
  const haydamakyFromCms = artists.find(
    (a) =>
      a.slug?.current === "haydamaky" ||
      a.name?.toLowerCase().includes("гайдамак")
  );
  const komuVnyzFromCms = artists.find(
    (a) =>
      a.slug?.current === "komu-vnyz" ||
      a.name?.toLowerCase().includes("кому вниз")
  );
  const olegSkrypkaFromCms = artists.find(
    (a) =>
      a.slug?.current === "oleg-skrypka" ||
      a.slug?.current === "oleg-skrypka-ta-vv" ||
      a.name?.toLowerCase().includes("скрипк")
  );
  const losYankoversFromCms = artists.find(
    (a) =>
      a.slug?.current === "los-yankovers" ||
      a.name?.toLowerCase().includes("янковерс")
  );

  const haydamaky: Artist = haydamakyFromCms ?? {
    _id: "artist-haydamaky",
    name: "ГАЙДАМАКИ",
    slug: { _type: "slug", current: "haydamaky" },
    genre: "Козак-рок",
    description:
      "Культовий український рок-гурт, що поєднує автентичний фольклор, козацький драйв, ска, панк та потужну енергетику сучасної рок-музики.",
    externalUrl: null,
    photo: null,
  };

  const losYankovers: Artist = losYankoversFromCms ?? {
    _id: "artist-los-yankovers",
    name: "ЛОС ЯНКОВЕРС",
    slug: { _type: "slug", current: "los-yankovers" },
    genre: "Етно-рок / балкан-фолк",
    description:
      "Запальний етно-рок та балканські мелодії з українським характером. Жива енергія та неповторний драйв на сцені.",
    externalUrl: null,
    photo: null,
  };

  const komuVnyz: Artist = komuVnyzFromCms ?? {
    _id: "artist-komu-vnyz",
    name: "КОМУ ВНИЗ",
    slug: { _type: "slug", current: "komu-vnyz" },
    genre: "Фолк-готика / етно-рок",
    description:
      "Один із найвиразніших гуртів української сцени, що поєднує готичну атмосферу, фольклорні мотиви та впізнавану сценічну мову.",
    externalUrl: null,
    photo: null,
  };

  const olegSkrypka: Artist = {
    ...(olegSkrypkaFromCms ?? {
      _id: "artist-oleg-skrypka",
      genre: "Етно-рок",
      description:
        "Легендарний рок-гурт на чолі з Олегом Скрипкою. Енергія, яка десятиліттями запалює фестивальні сцени та єднає покоління українців.",
      externalUrl: null,
      photo: null,
    }),
    name: "Олег Скрипка та Воплі Відоплясова",
    slug: {
      _type: "slug",
      current: olegSkrypkaFromCms?.slug?.current ?? "oleg-skrypka-ta-vv",
    },
  };

  const days: DayGroup[] = [
    {
      label: "19 вересня, Субота",
      startTime: "12:00",
      artists: [haydamaky, losYankovers],
    },
    {
      label: "20 вересня, Неділя",
      startTime: "12:00",
      artists: [komuVnyz, olegSkrypka],
    },
  ];

  return (
    <FestivalThemeShell
      className="min-h-screen bg-background text-foreground font-sans"
      theme="heroic"
    >
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-2 focus:outline-primary"
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
