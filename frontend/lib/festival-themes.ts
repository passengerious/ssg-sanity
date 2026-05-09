export const FESTIVAL_THEMES = ["epic", "heroic"] as const;

export type FestivalTheme = (typeof FESTIVAL_THEMES)[number];

export const DEFAULT_FESTIVAL_THEME: FestivalTheme = "epic";

export function isFestivalTheme(value: unknown): value is FestivalTheme {
  return value === "epic" || value === "heroic";
}

export function resolveFestivalTheme(value: unknown): FestivalTheme {
  return isFestivalTheme(value) ? value : DEFAULT_FESTIVAL_THEME;
}
