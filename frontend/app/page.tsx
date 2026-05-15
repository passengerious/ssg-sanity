import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/LandingExperience";
import { absoluteUrl } from "@/lib/site-url";
import { fetchSanityLandingCities } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Країна Мрій 2026",
  description:
    "Країна Мрій 2026 — етно-фестиваль у Кам'янці-Подільському та Львові.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Країна Мрій 2026",
    description:
      "Територія свободи, де традиції творять майбутнє української культури.",
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
    title: "Країна Мрій 2026",
    description:
      "Країна Мрій 2026 — етно-фестиваль у Кам'янці-Подільському та Львові.",
    images: [absoluteUrl("/images/og-image.jpg")],
  },
};

export default async function HomePage() {
  const cities = await fetchSanityLandingCities();

  return <LandingExperience cities={cities} />;
}
