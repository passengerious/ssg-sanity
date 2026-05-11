import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Music } from "lucide-react";
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

type LandingCity = LANDING_CITIES_QUERY_RESULT[number];
type LandingArtist = NonNullable<NonNullable<LandingCity["artists"]>[number]>;
type ArtistCard = LandingArtist & {
  cityName?: string | null;
  citySlug?: string | null;
  dateRange?: string | null;
};

function artistImage(artist: ArtistCard) {
  const src = artist.photo?.asset?.url;

  return {
    alt: src ? artist.photo?.alt || `Фото артиста ${artist.name}` : "",
    src: src || "/images/placeholder.svg",
  };
}

function getArtistCards(cities: LANDING_CITIES_QUERY_RESULT): ArtistCard[] {
  const seen = new Set<string>();

  return cities.flatMap((city) => {
    const artists = city.artists?.filter(Boolean) ?? [];

    return artists.flatMap((artist) => {
      if (!artist?._id || !artist.name || seen.has(artist._id)) return [];
      seen.add(artist._id);

      return [
        {
          ...artist,
          cityName: city.cityName,
          citySlug: city.slug,
          dateRange: city.dateRange,
        },
      ];
    });
  });
}

export const ArtistsLineup = ({
  cities,
}: {
  cities: LANDING_CITIES_QUERY_RESULT;
}) => {
  const artists = getArtistCards(cities);

  return (
    <section className="px-4 py-10 md:px-12 md:py-16" id="artists" tabIndex={-1}>
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          <Music aria-hidden="true" className="size-3.5" />
          Line-up
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Артисти Фестивалю
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-4">
          <div className="h-0.5 w-12 bg-secondary" />
          <div className="size-2 rounded-full bg-secondary" />
          <div className="h-0.5 w-6 bg-secondary/50" />
        </div>
      </div>

      {artists.length ? (
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist) => (
            <ArtistCardItem artist={artist} key={artist._id} />
          ))}
        </ul>
      ) : (
        <p className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card px-6 py-8 text-center text-muted-foreground">
          Артистів буде оголошено.
        </p>
      )}
    </section>
  );
};

function ArtistCardItem({ artist }: { artist: ArtistCard }) {
  const image = artistImage(artist);

  return (
    <li className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          alt={image.alt}
          className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, calc(100vw - 32px)"
          src={image.src}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/70">
          {artist.genre || artist.cityName || "Артист фестивалю"}
        </p>
        <h3 className="font-serif text-lg font-bold leading-tight text-white md:text-xl">
          {artist.name}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80">
          {artist.citySlug && artist.cityName ? (
            <Link
              className="rounded-full bg-white/15 px-3 py-1 transition-colors hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
              href={`/${artist.citySlug}`}
            >
              {artist.cityName}
            </Link>
          ) : null}
          {artist.dateRange ? <span>{artist.dateRange}</span> : null}
        </div>
        {artist.externalUrl ? (
          <a
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
            href={artist.externalUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Детальніше
            <span className="sr-only">, відкриється у новій вкладці</span>
            <ExternalLink aria-hidden="true" className="size-3" />
          </a>
        ) : null}
      </div>
    </li>
  );
}
