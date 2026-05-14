// Shared Tailwind CSS class combinations used across landing and city pages.
// These are plain strings so Tailwind JIT can still discover them.

export const sectionPadding = "px-4 py-10 md:px-12 md:py-16";

export const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none";

export const focusRing =
  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const decorativeDivider = {
  start: "h-0.5 w-12 bg-secondary",
  dot: "size-2 rounded-full bg-secondary",
  end: "h-0.5 w-6 bg-secondary/50",
};
