import { client } from "@/sanity/lib/client";
import {
  PAGE_QUERY,
  PAGES_SLUGS_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
  NAVIGATION_QUERY,
  SETTINGS_QUERY,
  TICKET_INFO_QUERY,
  FESTIVAL_CITIES_SLUGS_QUERY,
  FESTIVAL_CITY_QUERY,
  LANDING_CITIES_QUERY,
} from "@/sanity/queries";
import {
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POSTS_SLUGS_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
  TICKET_INFO_QUERY_RESULT,
  FESTIVAL_CITIES_SLUGS_QUERY_RESULT,
  FESTIVAL_CITY_QUERY_RESULT,
  LANDING_CITIES_QUERY_RESULT,
} from "@/sanity.types";

function warn(label: string, error: unknown) {
  console.warn(`[Sanity] ${label}`, error);
}

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERY_RESULT> => {
  try {
    return await client.fetch(PAGE_QUERY, { slug });
  } catch (error) {
    warn(`Failed to fetch page by slug: ${slug}`, error);
    return null;
  }
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERY_RESULT> => {
    try {
      return await client.fetch(PAGES_SLUGS_QUERY);
    } catch (error) {
      warn("Failed to fetch page slugs", error);
      return [];
    }
  };

export const fetchSanityFestivalCityBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<FESTIVAL_CITY_QUERY_RESULT> => {
  try {
    return await client.fetch(FESTIVAL_CITY_QUERY, { slug });
  } catch (error) {
    warn(`Failed to fetch festival city by slug: ${slug}`, error);
    return null;
  }
};

export const fetchSanityFestivalCitiesStaticParams =
  async (): Promise<FESTIVAL_CITIES_SLUGS_QUERY_RESULT> => {
    try {
      return await client.fetch(FESTIVAL_CITIES_SLUGS_QUERY);
    } catch (error) {
      warn("Failed to fetch festival city slugs", error);
      return [];
    }
  };

export const fetchSanityLandingCities =
  async (): Promise<LANDING_CITIES_QUERY_RESULT> => {
    try {
      return await client.fetch(LANDING_CITIES_QUERY);
    } catch (error) {
      warn("Failed to fetch landing cities", error);
      return [];
    }
  };

export const fetchSanityPosts = async (): Promise<POSTS_QUERY_RESULT> => {
  try {
    return await client.fetch(POSTS_QUERY);
  } catch (error) {
    warn("Failed to fetch posts", error);
    return [];
  }
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERY_RESULT> => {
  try {
    return await client.fetch(POST_QUERY, { slug });
  } catch (error) {
    warn(`Failed to fetch post by slug: ${slug}`, error);
    return null;
  }
};

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERY_RESULT> => {
    try {
      return await client.fetch(POSTS_SLUGS_QUERY);
    } catch (error) {
      warn("Failed to fetch post slugs", error);
      return [];
    }
  };

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERY_RESULT> => {
    try {
      return await client.fetch(NAVIGATION_QUERY);
    } catch (error) {
      warn("Failed to fetch navigation", error);
      return [];
    }
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERY_RESULT> => {
  try {
    return await client.fetch(SETTINGS_QUERY);
  } catch (error) {
    warn("Failed to fetch settings", error);
    return null;
  }
};

export const fetchSanityTicketInfo = async (): Promise<TICKET_INFO_QUERY_RESULT> => {
  try {
    const ticketInfo = await client.withConfig({ stega: false }).fetch(
      TICKET_INFO_QUERY,
    );

    return ticketInfo ?? null;
  } catch (error) {
    warn("Failed to fetch ticket info", error);
    return null;
  }
};
