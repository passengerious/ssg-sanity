import React from "react";
import { ExternalLink, Handshake } from "lucide-react";
import { SanityImage } from "@/components/sanity-image";
import {
  cardHover,
  decorativeDivider,
  sectionPadding,
} from "@/lib/tailwind-patterns";
import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

type Partner = NonNullable<
  NonNullable<FESTIVAL_CITY_QUERY_RESULT>["partners"]
>[number];

type PartnerCard = {
  id: string;
  name: string;
  url: string | null;
  label: string | null;
  logo?: { src: string; width: number; height: number };
};

const fallbackPartners: PartnerCard[] = [
  {
    id: "concert-ua",
    name: "Concert.ua",
    url: null,
    label: null,
    logo: {
      src: "/images/festival/30-07/partners/concert-ua.webp",
      width: 168,
      height: 128,
    },
  },
  {
    id: "radio-lvivska-khvylia",
    name: "Радіо Львівська хвиля",
    url: null,
    label: null,
    logo: {
      src: "/images/festival/30-07/partners/radio-lvivska-khvylia.webp",
      width: 384,
      height: 93,
    },
  },
  {
    id: "so-good-company",
    name: "So Good Company",
    url: null,
    label: null,
    logo: {
      src: "/images/festival/30-07/partners/so-good-company.webp",
      width: 169,
      height: 128,
    },
  },
  {
    id: "work-ua",
    name: "Work.ua",
    url: null,
    label: null,
    logo: {
      src: "/images/festival/30-07/partners/work-ua.webp",
      width: 120,
      height: 102,
    },
  },
  {
    id: "novosad-and-company",
    name: "Новосад і Компанія",
    url: null,
    label: null,
    logo: {
      src: "/images/festival/30-07/partners/novosad-and-company.webp",
      width: 283,
      height: 78,
    },
  },
];

const partnerLevelLabels: Partial<Record<NonNullable<Partner["level"]>, string>> = {
  title: "Титульний партнер",
  gold: "Золотий партнер",
  silver: "Срібний партнер",
  bronze: "Бронзовий партнер",
  media: "Медіапартнер",
  friend: "Друг фестивалю",
};

function partnerLabel(partner: Partner) {
  return partner.level ? partnerLevelLabels[partner.level] || partner.level : null;
}

function partnerCards(partners: Partner[]): PartnerCard[] {
  if (!partners.length) {
    return fallbackPartners;
  }

  return partners.map((partner) => ({
    id: partner._id,
    name: partner.name?.trim() || "Партнер",
    url: partner.url,
    label: partnerLabel(partner),
    logo: partner.logo?.asset?.url
      ? {
          src: partner.logo.asset.url,
          width: partner.logo.asset.metadata?.dimensions?.width || 192,
          height: partner.logo.asset.metadata?.dimensions?.height || 96,
        }
      : undefined,
  }));
}

export function PartnersSection({
  partners,
}: {
  partners: Partner[];
}) {
  const cards = partnerCards(partners);

  return (
    <section
      aria-labelledby="partners-heading"
      className={`${sectionPadding} scroll-mt-32 md:scroll-mt-20`}
      id="partners"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          <Handshake aria-hidden="true" className="size-3.5" />
          Партнери
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl" id="partners-heading">
          Разом творимо Країну Мрій
        </h2>
        <div aria-hidden="true" className="mx-auto mt-4 flex items-center justify-center gap-4">
          <div className={decorativeDivider.start} />
          <div className={decorativeDivider.dot} />
          <div className={decorativeDivider.end} />
        </div>
      </div>

      {cards.length ? (
        <ul
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {cards.map((partner) => {
            const safeId = partner.id.replace(/[^a-zA-Z0-9_-]/g, "-");
            const headingId = `partner-${safeId}`;
            const descriptionId = `partner-${safeId}-new-tab`;
            const card = (
              <>
                <div className="flex min-h-28 items-center justify-center rounded-2xl bg-background p-6">
                  {partner.logo ? (
                    <SanityImage
                      alt=""
                      className="max-h-16 max-w-full w-auto object-contain"
                      height={partner.logo.height}
                      sizes="(min-width: 1024px) 288px, (min-width: 640px) calc((100vw - 4.25rem) / 2), calc(100vw - 4rem)"
                      src={partner.logo.src}
                      width={partner.logo.width}
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
                  {partner.label ? (
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                      {partner.label}
                    </p>
                  ) : null}
                </div>
              </>
            );

            return (
              <li key={partner.id}>
                {partner.url ? (
                  <a
                    aria-describedby={descriptionId}
                    aria-labelledby={headingId}
                    className={`group block h-full rounded-2xl border border-border bg-card p-5 shadow-sm ${cardHover}`}
                    href={partner.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {card}
                    <span className="sr-only" id={descriptionId}>Відкриється у новій вкладці</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-secondary">
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
      ) : null}
    </section>
  );
}
