import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin, Music, Ticket, Users } from "lucide-react";
import PortableTextRenderer from "@/components/portable-text-renderer";
import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

type FestivalCity = NonNullable<FESTIVAL_CITY_QUERY_RESULT>;
type ImageLike = {
  alt?: string | null;
  asset?: {
    url?: string | null;
  } | null;
} | null | undefined;

function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

function getThemeKey(themeKey: FestivalCity["themeKey"]) {
  return themeKey === "heroic" ? "heroic" : "epic";
}

function imageUrl(image: ImageLike) {
  return image?.asset?.url || "/images/placeholder.svg";
}

function imageAlt(image: ImageLike, fallback: string) {
  return image?.alt || fallback;
}

export function FestivalCityPage({
  city,
  ticketUrl,
}: {
  city: FestivalCity;
  ticketUrl: string | null;
}) {
  const locations = city.locations?.filter(isDefined) ?? [];
  const artists = city.artists?.filter(isDefined) ?? [];
  const partners = city.partners?.filter(isDefined) ?? [];
  const themeKey = getThemeKey(city.themeKey);

  return (
    <article
      className="festival-theme min-h-screen bg-background text-foreground"
      data-theme={themeKey}
    >
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-12 md:py-24">
        <div className="space-y-7">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {city.cityName || "Місто фестивалю"}
          </p>
          <div className="space-y-4">
            <h1 className="font-serif text-5xl font-bold tracking-[-0.02em] md:text-7xl">
              {city.title || city.cityName || "Країна Мрій"}
            </h1>
            {city.tagline ? (
              <p className="max-w-2xl text-xl leading-relaxed text-primary md:text-2xl">
                {city.tagline}
              </p>
            ) : null}
            {city.description ? (
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {city.description}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            {city.dateRange ? (
              <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">
                {city.dateRange}
              </span>
            ) : null}
          </div>
          {ticketUrl ? (
            <a
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-serif text-xl font-bold text-primary-foreground shadow-lg transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href={ticketUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Ticket aria-hidden="true" className="size-5" />
              Купити квитки
              <span className="sr-only">, відкриється у новій вкладці</span>
              <ExternalLink aria-hidden="true" className="size-5" />
            </a>
          ) : (
            <Link
              className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-serif text-xl font-bold text-primary-foreground shadow-lg transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="/tickets"
            >
              <Ticket aria-hidden="true" className="size-5" />
              Деталі квитків
            </Link>
          )}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl">
          <Image
            alt={imageAlt(city.heroImage, city.cityName || city.title || "Місто фестивалю")}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 768px) 50vw, calc(100vw - 32px)"
            src={imageUrl(city.heroImage)}
          />
        </div>
      </section>

      {city.body?.length ? (
        <section className="mx-auto max-w-3xl px-4 py-10 text-lg leading-relaxed md:px-12">
          <PortableTextRenderer value={city.body} />
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-12 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5 flex items-center gap-3 text-primary">
            <MapPin aria-hidden="true" className="size-6" />
            <h2 className="font-serif text-3xl font-bold">Локації</h2>
          </div>
          <div className="space-y-4">
            {locations.length ? locations.map((location) => (
              <div key={location._id}>
                <h3 className="font-serif text-xl font-bold">{location.name}</h3>
                <p className="text-sm uppercase tracking-[0.12em] text-primary">
                  {location.stageType || "stage"}
                </p>
                {location.description ? (
                  <p className="mt-2 text-sm text-muted-foreground">{location.description}</p>
                ) : null}
              </div>
            )) : <p className="text-muted-foreground">Локації буде оголошено.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5 flex items-center gap-3 text-primary">
            <Music aria-hidden="true" className="size-6" />
            <h2 className="font-serif text-3xl font-bold">Артисти</h2>
          </div>
          <div className="space-y-4">
            {artists.length ? artists.map((artist) => (
              <div key={artist._id}>
                <h3 className="font-serif text-xl font-bold">{artist.name}</h3>
                {artist.genre ? (
                  <p className="text-sm uppercase tracking-[0.12em] text-primary">{artist.genre}</p>
                ) : null}
                {artist.description ? (
                  <p className="mt-2 text-sm text-muted-foreground">{artist.description}</p>
                ) : null}
              </div>
            )) : <p className="text-muted-foreground">Артистів буде оголошено.</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5 flex items-center gap-3 text-primary">
            <Users aria-hidden="true" className="size-6" />
            <h2 className="font-serif text-3xl font-bold">Партнери</h2>
          </div>
          <div className="space-y-4">
            {partners.length ? partners.map((partner) => (
              <div key={partner._id}>
                <h3 className="font-serif text-xl font-bold">{partner.name}</h3>
                <p className="text-sm uppercase tracking-[0.12em] text-primary">
                  {partner.level || "partner"}
                </p>
              </div>
            )) : <p className="text-muted-foreground">Партнерів буде оголошено.</p>}
          </div>
        </div>
      </section>
    </article>
  );
}
