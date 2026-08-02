import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { getSiteUrl } from "@/lib/site-url";
import { RESERVED_ROOT_SLUGS } from "@/lib/reserved-root-slugs";
import { client } from "@/sanity/lib/client";

const VIEWABLE_TYPES = ["page", "post"] as const;

export const dynamic = "force-static";

const urlQuery = `
  'url': select(
    _type == "post" => $baseUrl + "/blog/" + slug.current + "/",
    $baseUrl + "/" + slug.current + "/"
  )
`;

/** A single query that fetches all documents with a viewable url/page */
const SITEMAP_QUERY = groq`
  *[
    _type in $viewableTypes
    && meta.noindex != true
    && defined(slug.current)
    && !(_type == "page" && slug.current in $reservedRootSlugs)
  ] {
    ${urlQuery},
    "lastModified": _updatedAt,
    "changeFrequency": select(_type == "page" => "daily", "weekly"),
    "priority": select(
      _type == "page" => 0.5,
      0.7
    )
  } | order(priority desc, url asc)
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const data = await client.withConfig({ stega: false }).fetch(SITEMAP_QUERY, {
    baseUrl,
    reservedRootSlugs: [...RESERVED_ROOT_SLUGS],
    viewableTypes: [...VIEWABLE_TYPES],
  });

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tickets/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/public-offer/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...(data || []),
  ];
}
