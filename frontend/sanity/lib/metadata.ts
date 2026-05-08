import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

type MetadataDocument = {
  title?: string | null;
  cityName?: string | null;
  tagline?: string | null;
  description?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    noindex?: boolean | null;
    image?: SanityImageSource & {
      asset?: {
        metadata?: {
          dimensions?: {
            width?: number | null;
            height?: number | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
} | null;

export function generatePageMetadata({
  page,
  slug,
}: {
  page: MetadataDocument;
  slug: string;
}) {
  const title = page?.meta?.title || page?.title || page?.cityName;
  const description = page?.meta?.description || page?.description || page?.tagline;

  return {
    title,
    description,
    openGraph: {
      images: [
        {
          url: page?.meta?.image
            ? urlFor(page?.meta?.image).quality(100).url()
            : `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
          width: page?.meta?.image?.asset?.metadata?.dimensions?.width || 1200,
          height: page?.meta?.image?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : page?.meta?.noindex
        ? "noindex"
        : "index, follow",
    alternates: {
      canonical:
        process.env.NEXT_PUBLIC_SITE_URL + `/${slug === "index" ? "" : slug}`,
    },
  };
}
