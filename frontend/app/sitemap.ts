import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { getSiteUrl } from "@/lib/site-url";
import { client } from "@/sanity/lib/client";

const VIEWABLE_TYPES = ["page", "post", "festivalCity"] as const;

export const dynamic = "force-static";

const urlQuery = `
  'url': select(
    _type == "post" => $baseUrl + "/blog/" + slug.current + "/",
    _type == "festivalCity" => $baseUrl + "/" + slug.current + "/",
    $baseUrl + "/" + slug.current + "/"
  )
`;

/** A single query that fetches all documents with a viewable url/page */
const SITEMAP_QUERY = groq`
  *[
    _type in $viewableTypes
    && meta.noindex != true
    && defined(slug.current)
    && !(_type == "page" && slug.current == "index")
    && !(_type == "page" && slug.current in *[_type == "festivalCity" && defined(slug.current)].slug.current)
  ] {
    ${urlQuery},
    "lastModified": _updatedAt,
    "changeFrequency": select(_type == "page" => "daily", "weekly"),
    "priority": select(
      _type == "festivalCity" => 0.8,
      _type == "page" => 0.5,
      0.7
    )
  } | order(priority desc, url asc)
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const data = await client.withConfig({ stega: false }).fetch(SITEMAP_QUERY, {
    baseUrl,
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
    ...(data || []),
  ];
}
