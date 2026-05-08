import Blocks from "@/components/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

const FALLBACK_STATIC_PAGE_SLUGS = ["kamianets", "lviv"];

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  if (!pages.length) {
    return FALLBACK_STATIC_PAGE_SLUGS.map((slug) => ({ slug }));
  }

  return pages
    .filter((page) => page.slug?.current)
    .map((page) => ({
      slug: page.slug!.current,
    }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
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
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return <Blocks blocks={page?.blocks ?? []} />;
}
