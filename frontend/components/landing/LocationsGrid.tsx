import React from "react";
import { Castle, ChefHat, Hammer, Heart, Paintbrush, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const locations: Array<{
  Icon: LucideIcon;
  title: string;
  desc: string;
  tone: "primary" | "secondary" | "neutral";
}> = [
  { Icon: Sprout, title: "Головна сцена Мрій", desc: "Епіцентр великої музики та найгучніших прем'єр року.", tone: "primary" },
  { Icon: Castle, title: "Епічна сцена", desc: "Простір відкриттів і нової української хвилі.", tone: "secondary" },
  { Icon: Paintbrush, title: "Алея Майстрів", desc: "Територія крафтових брендів, дизайнерів і живої традиції.", tone: "neutral" },
  { Icon: Heart, title: "Весільна локація", desc: "Живі обряди, що поєднують покоління.", tone: "primary" },
  { Icon: ChefHat, title: "Український фудкорт", desc: "Гастрономічна подорож регіонами України.", tone: "secondary" },
  { Icon: Hammer, title: "Простори ремесел", desc: "Майстер-класи з кераміки, ковальства та ручної роботи.", tone: "neutral" },
];

export const LocationsGrid = () => {
  return (
    <section className="px-4 py-12 md:px-12" id="program">
      <h2 className="mb-12 text-center font-serif text-4xl font-bold md:text-5xl">Простір Мрій</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <div
            className={`rounded-xl border-b-4 bg-card p-6 shadow-sm transition-all hover:shadow-md ${
              loc.tone === "primary"
                ? "border-primary"
                : loc.tone === "secondary"
                  ? "border-secondary"
                  : "border-border"
            }`}
            key={loc.title}
          >
            <loc.Icon
              aria-hidden="true"
              className={`mb-4 size-10 ${
                loc.tone === "primary"
                  ? "text-primary"
                  : loc.tone === "secondary"
                    ? "text-secondary"
                    : "text-muted-foreground"
              }`}
              strokeWidth={1.8}
            />
            <h3 className="mb-2 font-serif text-2xl font-bold">{loc.title}</h3>
            <p className="text-muted-foreground">{loc.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
