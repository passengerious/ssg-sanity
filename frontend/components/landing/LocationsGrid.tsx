import React from "react";
import {
  Baby,
  BookOpen,
  ChefHat,
  Drum,
  Hammer,
  Heart,
  Music,
  Paintbrush,
  Sparkles,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  decorativeDivider,
  sectionPadding,
} from "@/lib/tailwind-patterns";
import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

type Location = NonNullable<
  NonNullable<FESTIVAL_CITY_QUERY_RESULT>["locations"]
>[number];

/**
 * Deterministic presentation category resolved from CMS data.
 *
 * Resolution order:
 *   1. Structured `stageType` field, with a bounded craft refinement
 *      for the approved workshops.
 *   2. Bounded Ukrainian name-keyword fallback covering the nine
 *      approved Lviv location categories.
 *   3. `default` when nothing matches.
 */
type CategoryKey =
  | "main"
  | "workshop"
  | "craft"
  | "book"
  | "wedding"
  | "mystical"
  | "folk"
  | "children"
  | "food"
  | "default";

function resolveCategory(location: Location): CategoryKey {
  const name = (location.name || "").toLowerCase();

  // 1. Structured stageType resolution.
  const stageType = location.stageType;
  if (stageType === "main") return "main";
  if (stageType === "epic") return "default";
  if (stageType === "workshop") {
    return name.includes("алея майстр") ? "craft" : "workshop";
  }
  if (stageType === "acoustic") return "workshop";

  // 2. Bounded Ukrainian name-keyword fallback for 'other' or unset stageType
  if (name.includes("сцен") || name.includes("stage")) return "main";
  if (name.includes("книж") || name.includes("поет")) return "book";
  if (name.includes("весіл") || name.includes("весільн")) return "wedding";
  if (name.includes("містичн") || name.includes("йога") || name.includes("медитац")) return "mystical";
  if (name.includes("гулянь") || name.includes("обряд")) return "folk";
  if (name.includes("дитяч")) return "children";
  if (name.includes("фуд") || name.includes("гастро")) return "food";
  if (name.includes("майстр") || name.includes("ремесл")) return "craft";

  return "default";
}

const categoryIcon: Record<CategoryKey, LucideIcon> = {
  main: Music,
  workshop: Hammer,
  craft: Paintbrush,
  book: BookOpen,
  wedding: Heart,
  mystical: Sparkles,
  folk: Drum,
  children: Baby,
  food: ChefHat,
  default: Sprout,
};

/**
 * Three-tier tone system aligned to the Heroic design tokens:
 *   - primary  (Brand Red)    → headline experiences
 *   - secondary (Natural Green) → experiential / traditional locations
 *   - muted                     → contemplative / functional locations
 */
const categoryTone: Record<
  CategoryKey,
  { border: string; icon: string; bg: string }
> = {
  main: { border: "border-b-primary", icon: "text-primary", bg: "bg-primary/5" },
  workshop: { border: "border-b-secondary", icon: "text-secondary", bg: "bg-secondary/5" },
  craft: { border: "border-b-secondary", icon: "text-secondary", bg: "bg-secondary/5" },
  folk: { border: "border-b-primary", icon: "text-primary", bg: "bg-primary/5" },
  wedding: { border: "border-b-secondary", icon: "text-secondary", bg: "bg-secondary/5" },
  children: { border: "border-b-secondary", icon: "text-secondary", bg: "bg-secondary/5" },
  book: { border: "border-b-border", icon: "text-muted-foreground", bg: "bg-muted/30" },
  mystical: { border: "border-b-border", icon: "text-muted-foreground", bg: "bg-muted/30" },
  food: { border: "border-b-border", icon: "text-muted-foreground", bg: "bg-muted/30" },
  default: { border: "border-b-border", icon: "text-muted-foreground", bg: "bg-muted/30" },
};

export const LocationsGrid = ({
  locations,
}: {
  locations: Location[];
}) => {
  return (
    <section
      aria-labelledby="program-heading"
      className={`${sectionPadding} scroll-mt-32 md:scroll-mt-20`}
      id="program"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Програма
        </span>
        <h2
          className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
          id="program-heading"
        >
          Простір Мрій
        </h2>
        <div
          aria-hidden="true"
          className="mx-auto mt-4 flex items-center justify-center gap-4"
        >
          <div className={decorativeDivider.start} />
          <div className={decorativeDivider.dot} />
          <div className={decorativeDivider.end} />
        </div>
      </div>

      {locations.length > 0 ? (
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => {
            const category = resolveCategory(loc);
            const tone = categoryTone[category];
            const Icon = categoryIcon[category];
            return (
              <li
                className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${tone.border} border-b-4`}
                key={loc._id}
              >
                {/* Icon with background */}
                <div className={`mb-5 inline-flex size-14 items-center justify-center rounded-xl ${tone.bg}`}>
                  <Icon
                    aria-hidden="true"
                    className={`size-7 ${tone.icon}`}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-foreground md:text-2xl">
                  {loc.name || "Локація"}
                </h3>
                {loc.description ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">{loc.description}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card px-6 py-8 text-center text-muted-foreground">
          Програму буде оголошено.
        </p>
      )}
    </section>
  );
};
