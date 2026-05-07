import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/LandingExperience";

export const metadata: Metadata = {
  title: "Лендинг фестивалю",
  description:
    "Країна Мрій 2026 — етно-фестиваль у Кам'янці-Подільському та Львові.",
  openGraph: {
    title: "Країна Мрій 2026",
    description:
      "Територія свободи, де традиції творять майбутнє української культури.",
    locale: "uk_UA",
  },
};

export default function LandingPage() {
  return <LandingExperience />;
}
