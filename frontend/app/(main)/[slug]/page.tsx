import { Blocks } from "@/components/blocks";
import { FestivalCityPage } from "@/components/festival-city/festival-city-page";
import { resolveTicketUrl } from "@/lib/tickets";
import {
  fetchSanityFestivalCitiesStaticParams,
  fetchSanityFestivalCityBySlug,
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
  fetchSanityTicketInfo,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

const EMPTY_ROOT_SLUG_PLACEHOLDER = "__static-export-placeholder";

export async function generateStaticParams() {
  const [cities, pages] = await Promise.all([
    fetchSanityFestivalCitiesStaticParams(),
    fetchSanityPagesStaticParams(),
  ]);

  const slugs = new Set<string>();

  cities.forEach((city) => {
    if (city.slug) slugs.add(city.slug);
  });

  pages.forEach((page) => {
    const slug = page.slug?.current;
    if (slug && slug !== "index") slugs.add(slug);
  });

  if (!slugs.size) {
    return [{ slug: EMPTY_ROOT_SLUG_PLACEHOLDER }];
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const city = await fetchSanityFestivalCityBySlug({ slug: params.slug });

  if (city) {
    return generatePageMetadata({ page: city, slug: params.slug });
  }

  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    return {
      title: `Missing Sanity page: ${params.slug}`,
      robots: "noindex, nofollow",
    };
  }

  return generatePageMetadata({ page, slug: params.slug });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const city = await fetchSanityFestivalCityBySlug({ slug: params.slug });

  if (city) {
    const ticketInfo = await fetchSanityTicketInfo();
    return (
      <FestivalCityPage
        city={city}
        ticketUrl={resolveTicketUrl(city, ticketInfo)}
      />
    );
  }

  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return <Blocks blocks={page?.blocks ?? []} />;
}
