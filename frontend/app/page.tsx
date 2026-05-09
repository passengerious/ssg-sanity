import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/LandingExperience";
import { fetchSanityLandingCities } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Лендинг фестивалю",
  description:
    "Країна Мрій 2026 — етно-фестиваль у Кам'янці-Подільському та Львові.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Країна Мрій 2026",
    description:
      "Територія свободи, де традиції творять майбутнє української культури.",
    locale: "uk_UA",
    url: "/",
  },
};

export default async function HomePage() {
  const cities = await fetchSanityLandingCities();

  return <LandingExperience cities={cities} />;
}
