import { groq } from "next-sanity";

export const TICKET_INFO_QUERY = groq`*[_type == "ticketInfo" && _id == "ticketInfo"][0]{
  price,
  ticketsLeft,
  boxOfficeUrl
}`;
