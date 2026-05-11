// Barrel file for all Sanity GROQ queries
// Import from here instead of individual query files for centralized access

export {
  FESTIVAL_CITIES_SLUGS_QUERY,
  FESTIVAL_CITY_QUERY,
  LANDING_CITIES_QUERY,
} from "./festival-city";
export { PAGE_QUERY, PAGES_SLUGS_QUERY } from "./page";
export {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from "./post";
export { NAVIGATION_QUERY } from "./navigation";
export { SETTINGS_QUERY } from "./settings";
export { TICKET_INFO_QUERY } from "./ticket-info";
