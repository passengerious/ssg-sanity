import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/LandingExperience";
import { absoluteUrl } from "@/lib/site-url";
import { fetchSanityHomepageFestivalCity } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Країна Мрій 2026 — Львів | Етно-фестиваль",
  description:
    "Міжнародний етно-фестиваль Країна Мрій 2026 у Львові (15–16 серпня 2026). Музика, ремесла, ярмарок та сучасна українська культура в Парку культури ім. Б. Хмельницького.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Країна Мрій 2026 — Львів | Етно-фестиваль",
    description:
      "Територія свободи, де традиції творять майбутнє української культури. 15–16 серпня 2026 року у Львові.",
    images: [
      {
        url: absoluteUrl("/images/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: "Країна Мрій 2026 — Етно-фестиваль у Львові",
        type: "image/jpeg",
      },
    ],
    locale: "uk_UA",
    siteName: "Країна Мрій",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Країна Мрій 2026 — Львів | Етно-фестиваль",
    description:
      "Країна Мрій 2026 — етно-фестиваль у Львові. 15–16 серпня 2026 року.",
    images: [
      {
        url: absoluteUrl("/images/og-image.jpg"),
        alt: "Країна Мрій 2026 — Етно-фестиваль у Львові",
      },
    ],
  },
};

export default async function HomePage() {
  const city = await fetchSanityHomepageFestivalCity();

  const siteUrl = absoluteUrl("/");

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: "Країна Мрій 2026 — Львів",
    description:
      "Міжнародний етно-фестиваль сучасної української культури, традицій та живої музики.",
    startDate: "2026-08-15T10:00:00+03:00",
    endDate: "2026-08-16T22:00:00+03:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Парк культури та відпочинку ім. Богдана Хмельницького",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Львів",
        addressCountry: "UA",
      },
    },
    image: [absoluteUrl("/images/og-image.jpg")],
    organizer: {
      "@type": "Organization",
      name: "Країна Мрій",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/tickets/"),
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
    },
    performer: [
      {
        "@type": "PerformingGroup",
        name: "Олег Скрипка та ВВ",
      },
    ],
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Країна Мрій",
    url: siteUrl,
    logo: absoluteUrl("/images/logo.svg"),
    sameAs: [
      "https://facebook.com/krainamriy",
      "https://instagram.com/krainamriy",
      "https://youtube.com/user/KrainaMriyFest",
      "https://t.me/krainamriyfest",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <LandingExperience city={city} />
    </>
  );
}
