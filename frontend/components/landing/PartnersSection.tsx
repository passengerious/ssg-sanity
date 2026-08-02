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

function partnerCards(partners: Partner[]): PartnerCard[] {
  if (!partners.length) {
    return fallbackPartners;
  }

  return partners.map((partner) => ({
    id: partner._id,
    name: partner.name?.trim() || "Партнер",
    url: partner.url,
    label: null,
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
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {cards.map((partner) => {
            const safeId = partner.id.replace(/[^a-zA-Z0-9_-]/g, "-");
            const headingId = `partner-${safeId}`;
            const descriptionId = `partner-${safeId}-new-tab`;

            const cardContent = (
              <>
                {partner.logo ? (
                  <SanityImage
                    alt={`Логотип партнера ${partner.name}`}
                    className="max-h-16 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 md:max-h-20"
                    height={partner.logo.height}
                    sizes="(min-width: 1024px) 288px, (min-width: 640px) calc((100vw - 4.25rem) / 2), calc(100vw - 4rem)"
                    src={partner.logo.src}
                    width={partner.logo.width}
                  />
                ) : (
                  <span aria-hidden="true" className="font-serif text-2xl font-bold text-primary transition-transform duration-300 group-hover:scale-105">
                    {partner.name}
                  </span>
                )}
                <h3 className="sr-only" id={headingId}>
                  {partner.name}
                </h3>
              </>
            );

            const cardClasses =
              "group relative flex h-36 w-full items-center justify-center rounded-2xl border border-secondary/15 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/35 hover:shadow-lg";

            return (
              <li key={partner.id}>
                {partner.url ? (
                  <a
                    aria-describedby={descriptionId}
                    aria-labelledby={headingId}
                    className={cardClasses}
                    href={partner.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {cardContent}
                    <span className="sr-only" id={descriptionId}>
                      Відкриється у новій вкладці
                    </span>
                    <ExternalLink
                      aria-hidden="true"
                      className="absolute right-3.5 top-3.5 size-4 text-muted-foreground/40 transition-colors group-hover:text-secondary"
                    />
                  </a>
                ) : (
                  <div className={cardClasses}>{cardContent}</div>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
