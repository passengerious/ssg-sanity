import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Music, Ticket, Users } from "lucide-react";
import { FestivalThemeShell } from "@/components/festival-theme-shell";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { SanityImageFill } from "@/components/sanity-image";
import { isFestivalTheme, resolveFestivalTheme } from "@/lib/festival-themes";
import type { FESTIVAL_CITY_QUERY_RESULT, LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

type FestivalCity = NonNullable<FESTIVAL_CITY_QUERY_RESULT>;
type FestivalCityNavItem = LANDING_CITIES_QUERY_RESULT[number] & {
  slug: string;
};

function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function FestivalCityPage({
  city,
  festivalCities = [],
  ticketUrl,
}: {
  city: FestivalCity;
  festivalCities?: LANDING_CITIES_QUERY_RESULT;
  ticketUrl: string | null;
}) {
  const locations = city.locations?.filter(isDefined) ?? [];
  const artists = city.artists?.filter(isDefined) ?? [];
  const partners = city.partners?.filter(isDefined) ?? [];
  const themeKey = resolveFestivalTheme(city.themeKey);
  const currentSlug = city.slug?.current;
  const cityNavItems = festivalCities.flatMap((item): FestivalCityNavItem[] => {
    if (!item.slug || !item.cityName || !isFestivalTheme(item.themeKey)) return [];

    return [{ ...item, slug: item.slug }];
  });

  return (
    <FestivalThemeShell
      className="min-h-screen bg-background text-foreground"
      theme={themeKey}
    >
      <article>
        {/* ===== HERO ===== */}
        <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:px-12 md:py-16">
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 z-0 bg-[radial-gradient(currentColor_1px,transparent_0)] bg-[size:32px_32px] text-primary opacity-[0.05]"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {city.cityName || "Місто фестивалю"}
              </p>
              {city.dateRange ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold shadow-sm">
                  <MapPin aria-hidden="true" className="size-3.5 text-primary" />
                  {city.dateRange}
                </span>
              ) : null}
            </div>
            <div className="space-y-4">
              <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">
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

            {/* CTA */}
            {ticketUrl ? (
              <a
                className="group inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-serif text-xl font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                href={ticketUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Ticket aria-hidden="true" className="size-5" />
                Купити квитки
                <span className="sr-only">, відкриється у новій вкладці</span>
                <ExternalLink aria-hidden="true" className="size-4 opacity-70" />
              </a>
            ) : (
              <Link
                className="group inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-serif text-xl font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                href="/tickets/"
              >
                <Ticket aria-hidden="true" className="size-5" />
                Деталі квитків
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            )}

            {cityNavItems.length > 1 ? (
              <nav aria-label="Міста фестивалю">
                <ul className="flex flex-wrap gap-2">
                  {cityNavItems.map((item) => {
                    const isCurrent = item.slug === currentSlug;

                    return (
                      <li key={item._id}>
                        {isCurrent ? (
                          <span
                            aria-current="page"
                            className="inline-flex rounded-full border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                          >
                            {item.cityName}
                            <span className="sr-only"> — поточна сторінка</span>
                          </span>
                        ) : (
                          <Link
                            className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-primary hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            href={`/${item.slug}/`}
                            prefetch
                          >
                            {item.cityName}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : null}
          </div>

          {/* Hero image */}
          <div className="relative z-10 aspect-square overflow-hidden rounded-[2rem] border border-border/50 bg-muted shadow-2xl">
            <SanityImageFill
              alt={city.cityName || city.title || "Місто фестивалю"}
              className="transition-transform duration-700 hover:scale-105 motion-reduce:transition-none"
              image={city.heroImage}
              priority
              sizes="(min-width: 768px) 50vw, calc(100vw - 32px)"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" aria-hidden="true" />
          </div>
        </section>

        {/* ===== BODY (Portable Text) ===== */}
        {city.body?.length ? (
          <section className="mx-auto max-w-3xl px-4 py-10 text-lg leading-relaxed md:px-12 md:py-16">
            <PortableTextRenderer value={city.body} />
          </section>
        ) : null}

        {/* ===== LOCATIONS / ARTISTS / PARTNERS CARDS ===== */}
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-12 md:py-16">
          {/* Section header */}
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Деталі
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Що вас чекає
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-4">
              <div className="h-0.5 w-12 bg-secondary" />
              <div className="size-2 rounded-full bg-secondary" />
              <div className="h-0.5 w-6 bg-secondary/50" />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Locations card */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none">
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin aria-hidden="true" className="size-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Локації</h3>
              </div>
              <div className="space-y-5">
                {locations.length ? (
                  locations.map((location) => (
                    <div key={location._id} className="rounded-lg border-l-2 border-primary/30 pl-4 transition-colors hover:border-primary">
                      <h4 className="font-serif text-lg font-bold text-foreground">{location.name}</h4>
                      {location.stageType ? (
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                          {location.stageType}
                        </p>
                      ) : null}
                      {location.description ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{location.description}</p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Локації буде оголошено.</p>
                )}
              </div>
            </div>

            {/* Artists card */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none">
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Music aria-hidden="true" className="size-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Артисти</h3>
              </div>
              <div className="space-y-5">
                {artists.length ? (
                  artists.map((artist) => (
                    <div key={artist._id} className="rounded-lg border-l-2 border-secondary/30 pl-4 transition-colors hover:border-secondary">
                      <h4 className="font-serif text-lg font-bold text-foreground">{artist.name}</h4>
                      {artist.genre ? (
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">{artist.genre}</p>
                      ) : null}
                      {artist.description ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{artist.description}</p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Артистів буде оголошено.</p>
                )}
              </div>
            </div>

            {/* Partners card */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none">
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Users aria-hidden="true" className="size-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Партнери</h3>
              </div>
              <div className="space-y-5">
                {partners.length ? (
                  partners.map((partner) => (
                    <div key={partner._id} className="rounded-lg border-l-2 border-border/50 pl-4 transition-colors hover:border-primary">
                      <h4 className="font-serif text-lg font-bold text-foreground">{partner.name}</h4>
                      {partner.level ? (
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                          {partner.level}
                        </p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Партнерів буде оголошено.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </article>
    </FestivalThemeShell>
  );
}
