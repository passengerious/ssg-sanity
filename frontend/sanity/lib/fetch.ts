import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import {
  TICKET_INFO_QUERY,
} from "@/sanity/queries/ticket-info";
import { client } from "@/sanity/lib/client";
import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from "@/sanity/queries/post";
import {
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POSTS_SLUGS_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
  TICKET_INFO_QUERY_RESULT,
} from "@/sanity.types";

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERY_RESULT> => {
  return client.fetch(PAGE_QUERY, { slug });
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERY_RESULT> => {
    return client.fetch(PAGES_SLUGS_QUERY);
  };

export const fetchSanityPosts = async (): Promise<POSTS_QUERY_RESULT> => {
  return client.fetch(POSTS_QUERY);
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERY_RESULT> => {
  return client.fetch(POST_QUERY, { slug });
};

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERY_RESULT> => {
    return client.fetch(POSTS_SLUGS_QUERY);
  };

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERY_RESULT> => {
    return client.fetch(NAVIGATION_QUERY);
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERY_RESULT> => {
  return client.fetch(SETTINGS_QUERY);
};

export const fetchSanityTicketInfo = async (): Promise<TICKET_INFO_QUERY_RESULT> => {
  try {
    const ticketInfo = await client.withConfig({ stega: false }).fetch(
      TICKET_INFO_QUERY,
    );

    return ticketInfo ?? null;
  } catch (error) {
    console.warn("Failed to fetch ticket info from Sanity", error);
    return null;
  }
};
