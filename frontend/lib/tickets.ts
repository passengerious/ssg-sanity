import type {
  FESTIVAL_CITY_QUERY_RESULT,
  TICKET_INFO_QUERY_RESULT,
} from "@/sanity.types";

type CityTicketSource = Pick<
  NonNullable<FESTIVAL_CITY_QUERY_RESULT>,
  "ticketUrlOverride"
> | null;

export function resolveTicketUrl(
  city: CityTicketSource,
  ticketInfo: TICKET_INFO_QUERY_RESULT | null,
) {
  return city?.ticketUrlOverride || ticketInfo?.boxOfficeUrl || null;
}
