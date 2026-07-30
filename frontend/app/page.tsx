import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/LandingExperience";
import { absoluteUrl } from "@/lib/site-url";
import { fetchSanityHomepageFestivalCity } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Країна Мрій 2026 — Львів",
  description:
    "Країна Мрій 2026 — етно-фестиваль у Львові. 15–16 серпня 2026 року, парк культури та відпочинку імені Богдана Хмельницького.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Країна Мрій 2026 — Львів",
    description:
      "Територія свободи, де традиції творять майбутнє української культури. 15–16 серпня 2026 року у Львові.",
    images: [
      {
        url: absoluteUrl("/images/og-image.jpg"),
        width: 1200,
        height: 630,
      },
    ],
    locale: "uk_UA",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Країна Мрій 2026 — Львів",
    description:
      "Країна Мрій 2026 — етно-фестиваль у Львові. 15–16 серпня 2026 року.",
    images: [absoluteUrl("/images/og-image.jpg")],
  },
};

export default async function HomePage() {
  const city = await fetchSanityHomepageFestivalCity();

  return <LandingExperience city={city} />;
}
