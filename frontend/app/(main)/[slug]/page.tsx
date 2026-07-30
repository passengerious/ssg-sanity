import { Blocks } from "@/components/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import { isReservedRootSlug } from "@/lib/reserved-root-slugs";

export const dynamic = "force-static";
export const dynamicParams = false;

const EMPTY_ROOT_SLUG_PLACEHOLDER = "__static-export-placeholder";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  const slugs = new Set<string>();

  pages.forEach((page) => {
    const slug = page.slug?.current;
    if (slug && !isReservedRootSlug(slug)) slugs.add(slug);
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
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
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
