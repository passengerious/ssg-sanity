import React from "react";
import Image from "next/image";
import { ExternalLink, Handshake } from "lucide-react";
import type { LANDING_CITIES_QUERY_RESULT } from "@/sanity.types";

type LandingCity = LANDING_CITIES_QUERY_RESULT[number];
type LandingPartner = NonNullable<NonNullable<LandingCity["partners"]>[number]>;
type PartnerCard = LandingPartner & {
  cityName?: string | null;
};

function getPartnerCards(cities: LANDING_CITIES_QUERY_RESULT): PartnerCard[] {
  const seen = new Set<string>();

  return cities.flatMap((city) => {
    const partners = city.partners?.filter(Boolean) ?? [];

    return partners.flatMap((partner) => {
      if (!partner?._id || !partner.name || seen.has(partner._id)) return [];
      seen.add(partner._id);

      return [{ ...partner, cityName: city.cityName }];
    });
  });
}

function logoUrl(logo: PartnerCard["logo"]) {
  return logo?.asset?.url || null;
}

const partnerLevelLabels: Partial<Record<NonNullable<PartnerCard["level"]>, string>> = {
  title: "Титульний партнер",
  gold: "Золотий партнер",
  silver: "Срібний партнер",
  bronze: "Бронзовий партнер",
  media: "Медіапартнер",
  friend: "Друг фестивалю",
};

function partnerLabel(partner: PartnerCard) {
  const level = partner.level ? partnerLevelLabels[partner.level] || partner.level : null;

  return [level, partner.cityName].filter(Boolean).join(" · ");
}

export function PartnersSection({
  cities,
}: {
  cities: LANDING_CITIES_QUERY_RESULT;
}) {
  const partners = getPartnerCards(cities);

  return (
    <section className="px-4 py-10 md:px-12 md:py-16" id="partners" tabIndex={-1}>
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          <Handshake aria-hidden="true" className="size-3.5" />
          Партнери
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Разом творимо Країну Мрій
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-4">
          <div className="h-0.5 w-12 bg-secondary" />
          <div className="size-2 rounded-full bg-secondary" />
          <div className="h-0.5 w-6 bg-secondary/50" />
        </div>
      </div>

      {partners.length ? (
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => {
            const logo = logoUrl(partner.logo);
            const safeId = partner._id.replace(/[^a-zA-Z0-9_-]/g, "-");
            const headingId = `partner-${safeId}`;
            const descriptionId = `partner-${safeId}-new-tab`;
            const label = partnerLabel(partner);
            const card = (
              <>
                <div className="flex min-h-28 items-center justify-center rounded-2xl bg-background p-6">
                  {logo ? (
                    <Image
                      alt=""
                      className="max-h-16 w-auto object-contain"
                      height={96}
                      src={logo}
                      width={192}
                    />
                  ) : (
                    <span aria-hidden="true" className="font-serif text-2xl font-bold text-primary">
                      {partner.name}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-2xl font-bold text-foreground" id={headingId}>
                    {partner.name}
                  </h3>
                  {label ? (
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                      {label}
                    </p>
                  ) : null}
                </div>
              </>
            );

            return (
              <li key={partner._id}>
                {partner.url ? (
                  <a
                    aria-describedby={descriptionId}
                    aria-labelledby={headingId}
                    className="group block h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                    href={partner.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {card}
                    <span className="sr-only" id={descriptionId}>Відкриється у новій вкладці</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      Перейти до партнера
                      <ExternalLink aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </a>
                ) : (
                  <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
                    {card}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card px-6 py-8 text-center text-muted-foreground">
          Партнерів буде оголошено.
        </p>
      )}
    </section>
  );
}
