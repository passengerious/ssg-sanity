import React from "react";
import {
  decorativeDivider,
  sectionPadding,
} from "@/lib/tailwind-patterns";
import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

type HistoryMilestone = NonNullable<
  NonNullable<FESTIVAL_CITY_QUERY_RESULT>["history"]
>[number];

/**
 * Extract the first four-digit year from a year string for valid dateTime.
 * Handles formats like "1987", "1991–1996", "2022–2024".
 * Returns null if no valid year is found.
 */
function parseFirstYear(yearStr: string | null | undefined): number | null {
  if (!yearStr) return null;
  const match = yearStr.match(/\b(1\d{3}|2\d{3})\b/);
  return match ? parseInt(match[1], 10) : null;
}

function HistoryMilestoneItem({ milestone }: { milestone: HistoryMilestone }) {
  const firstYear = parseFirstYear(milestone.year);
  const hasSource = Boolean(milestone.sourceUrl);
  const hasLabel = Boolean(milestone.sourceLabel);

  return (
    <li className="relative border-l-2 border-secondary/30 pb-10 pl-6 last:pb-0 md:pl-8">
      {/* Timeline dot — green nature accent */}
      <div
        aria-hidden="true"
        className="absolute -left-[5px] top-0 size-2.5 rounded-full border-2 border-secondary bg-background"
      />

      {/* Year badge — green secondary accent */}
      {milestone.year && (
        <time
          className="mb-2 inline-block rounded-md bg-secondary/10 px-3 py-1 font-mono text-sm font-bold text-secondary"
          dateTime={firstYear ? String(firstYear) : undefined}
        >
          {milestone.year}
        </time>
      )}

      {/* Title — H3 with red primary accent */}
      <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-primary md:text-2xl">
        {milestone.title}
      </h3>

      {/* Description */}
      {milestone.description && (
        <p className="mb-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          {milestone.description}
        </p>
      )}

      {/* Source attribution */}
      {(hasSource || hasLabel) && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {hasSource ? (
            <a
              className="inline-flex items-center gap-1 rounded-sm font-semibold text-secondary underline decoration-secondary/40 underline-offset-2 transition-colors hover:text-secondary/80 hover:decoration-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href={milestone.sourceUrl!}
              rel="noopener noreferrer"
              target="_blank"
            >
              {milestone.sourceLabel || "Джерело"}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(відкривається у новій вкладці)</span>
            </a>
          ) : hasLabel ? (
            <span className="font-semibold text-muted-foreground">
              {milestone.sourceLabel}
            </span>
          ) : null}
        </div>
      )}
    </li>
  );
}

/**
 * Type-narrowing guard: a milestone is renderable only when it has a
 * non-empty title. Entries with null/missing title are malformed and
 * silently excluded; all other fields remain optional.
 */
function isValidMilestone(
  m: HistoryMilestone,
): m is HistoryMilestone & { title: string } {
  return typeof m?.title === "string" && m.title.trim().length > 0;
}

export function HistoryTimeline({
  history,
}: {
  history: HistoryMilestone[] | null | undefined;
}) {
  const milestones = (history ?? []).filter(isValidMilestone);

  // Render nothing when no history exists
  if (milestones.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="history-heading"
      className={`${sectionPadding} scroll-mt-32 md:scroll-mt-20`}
      id="history"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Спадщина
          </span>
          <h2
            className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl"
            id="history-heading"
          >
            Історія фестивалю
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

        {/* Timeline — ordered list for semantic chronology */}
        <ol className="relative">
          {milestones.map((milestone) => (
            <HistoryMilestoneItem key={milestone._key} milestone={milestone} />
          ))}
        </ol>
      </div>
    </section>
  );
}
