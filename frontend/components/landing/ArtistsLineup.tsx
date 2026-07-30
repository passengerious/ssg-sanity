import React from "react";
import { ExternalLink, Music } from "lucide-react";
import { SanityImageFill } from "@/components/sanity-image";
import {
  decorativeDivider,
  sectionPadding,
} from "@/lib/tailwind-patterns";
import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

export type Artist = NonNullable<
  NonNullable<FESTIVAL_CITY_QUERY_RESULT>["artists"]
>[number];

export type DayGroup = {
  label: string;
  artists: Artist[];
};

/** Truncate text at the nearest word boundary before maxChars. */
function truncateWords(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const slice = text.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice) + "…";
}

/** Slug-based highlight contract — see docs/plans/lineup.md. */
const HIGHLIGHT_SLUG = "oleg-skrypka-ta-vv";

export function ArtistsLineup({ days }: { days: DayGroup[] }) {
  const hasArtists = days.some((d) => d.artists.length > 0);

  return (
    <section
      aria-labelledby="artists-heading"
      className={`${sectionPadding} scroll-mt-32 md:scroll-mt-20`}
      id="artists"
      tabIndex={-1}
    >
      {/* Section header */}
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          <Music aria-hidden="true" className="size-3.5" />
          Line-up
        </span>
        <h2
          className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
          id="artists-heading"
        >
          Артисти Фестивалю
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-4 flex items-center justify-center gap-4"
        >
          <div className={decorativeDivider.start} />
          <div className={decorativeDivider.dot} />
          <div className={decorativeDivider.end} />
        </div>
      </div>

      {hasArtists ? (
        <div className="mx-auto mt-12 max-w-5xl space-y-12">
          {days.map((day, index) => {
            const headingId = `artists-day-${index + 1}-heading`;

            return (
              <section aria-labelledby={headingId} key={day.label}>
                <h3
                  className="mb-6 font-serif text-2xl font-semibold text-foreground md:text-3xl"
                  id={headingId}
                >
                  {day.label}
                </h3>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {day.artists.map((artist) => (
                    <ArtistCard artist={artist} key={artist._id} />
                  ))}
                </ul>
              </section>
            );
          })}

          {/* Announcement banner — exact copy from docs/plans/lineup.md §2 */}
          <p className="rounded-2xl border border-border bg-card px-6 py-5 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            І це лише перша частина програми! Незабаром ми оголосимо нових
            артистів, музичні гурти та спеціальних гостей фестивалю.
          </p>
        </div>
      ) : (
        <p className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card px-6 py-8 text-center text-muted-foreground">
          Артистів буде оголошено.
        </p>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Artist Card                                                        */
/* ------------------------------------------------------------------ */

function ArtistCard({ artist }: { artist: Artist }) {
  const slug = artist.slug?.current;
  const isHighlight = slug === HIGHLIGHT_SLUG;
  const hasPhoto = Boolean(artist.photo?.asset?.url);
  const description = artist.description
    ? truncateWords(artist.description, 140)
    : null;

  return (
    <li
      className={`overflow-hidden rounded-2xl bg-card shadow-sm ${
        isHighlight ? "border-2 border-primary" : "border border-border"
      }`}
    >
      {/* Image area (~60 % of card height) */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
        {hasPhoto ? (
          <SanityImageFill
            alt={`Фото артиста ${artist.name || "фестивалю"}`}
            className="object-cover"
            image={artist.photo}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 32px)"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center"
          >
            <Music
              className="size-12 text-muted-foreground/60"
              strokeWidth={1}
            />
          </div>
        )}

        {isHighlight ? (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            20 років Країні Мрій
          </span>
        ) : null}
      </div>

      {/* Content area (~40 % of card height) */}
      <div className="p-4 md:p-5">
        {artist.genre ? (
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {artist.genre}
          </p>
        ) : null}

        <h4 className="font-serif text-lg font-bold leading-tight text-foreground md:text-xl">
          {artist.name || "Артист"}
        </h4>

        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}

        {artist.externalUrl ? (
          <a
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-secondary transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none"
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
