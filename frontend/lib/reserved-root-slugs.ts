export const RESERVED_ROOT_SLUGS = ["index", "lviv", "kamianets"] as const;

export function isReservedRootSlug(slug: string): boolean {
  return RESERVED_ROOT_SLUGS.some((reservedSlug) => reservedSlug === slug);
}
