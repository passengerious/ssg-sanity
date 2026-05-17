import React from "react";
import Link from "next/link";
import { ExternalLink, Music } from "lucide-react";
import { SanityImageFill } from "@/components/sanity-image";
import {
  cardHover,
  decorativeDivider,
  sectionPadding,
} from "@/lib/tailwind-patterns";
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

type LandingCity = LANDING_CITIES_QUERY_RESULT[number];
type LandingArtist = NonNullable<NonNullable<LandingCity["artists"]>[number]>;
type ArtistCard = LandingArtist & {
  cityName?: string | null;
  citySlug?: string | null;
  dateRange?: string | null;
};

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
    <section className={sectionPadding} id="artists" tabIndex={-1}>
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          <Music aria-hidden="true" className="size-3.5" />
          Line-up
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Артисти Фестивалю
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-4">
          <div className={decorativeDivider.start} />
          <div className={decorativeDivider.dot} />
          <div className={decorativeDivider.end} />
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
  return (
    <li
      className={`group relative overflow-hidden rounded-2xl bg-card shadow-sm ${cardHover}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <SanityImageFill
          alt={`Фото артиста ${artist.name}`}
          className="transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
          image={artist.photo}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, calc(100vw - 32px)"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          aria-hidden="true"
        />
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
              href={`/${artist.citySlug}/`}
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
