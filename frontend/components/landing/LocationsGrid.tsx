import React from "react";
import { Castle, ChefHat, Hammer, Heart, Paintbrush, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  cardHover,
  decorativeDivider,
  sectionPadding,
} from "@/lib/tailwind-patterns";

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

function toneClasses(tone: "primary" | "secondary" | "neutral") {
  switch (tone) {
    case "primary":
      return {
        border: "border-b-primary",
        icon: "text-primary",
        bg: "bg-primary/5",
      };
    case "secondary":
      return {
        border: "border-b-secondary",
        icon: "text-secondary",
        bg: "bg-secondary/5",
      };
    default:
      return {
        border: "border-b-border",
        icon: "text-muted-foreground",
        bg: "bg-muted/30",
      };
  }
}

export const LocationsGrid = () => {
  return (
    <section className={sectionPadding} id="program" tabIndex={-1}>
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Програма
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Простір Мрій
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-4">
          <div className={decorativeDivider.start} />
          <div className={decorativeDivider.dot} />
          <div className={decorativeDivider.end} />
        </div>
      </div>

      <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => {
          const tc = toneClasses(loc.tone);
          return (
            <li
              className={`group rounded-2xl border border-border bg-card p-6 shadow-sm ${cardHover} hover:shadow-lg ${tc.border} border-b-4`}
              key={loc.title}
            >
              {/* Icon with background */}
              <div className={`mb-5 inline-flex size-14 items-center justify-center rounded-xl ${tc.bg} transition-colors duration-300 group-hover:bg-primary/10 motion-reduce:transition-none`}>
                <loc.Icon
                  aria-hidden="true"
                  className={`size-7 ${tc.icon} transition-colors duration-300 group-hover:text-primary motion-reduce:transition-none`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-foreground md:text-2xl">
                {loc.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{loc.desc}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
