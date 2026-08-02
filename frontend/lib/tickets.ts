import type { FESTIVAL_CITY_QUERY_RESULT } from "@/sanity.types";

type CityTicketSource = Pick<
  NonNullable<FESTIVAL_CITY_QUERY_RESULT>,
  "ticketUrlOverride"
> | null;

export const DEFAULT_TICKETS_URL = "https://novosad.tibox.me/krayina-mrii";

export function resolveTicketUrl(city?: CityTicketSource) {
  return city?.ticketUrlOverride || DEFAULT_TICKETS_URL;
}
