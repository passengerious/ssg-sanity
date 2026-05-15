import { urlFor } from "@/sanity/lib/image";
import { absoluteUrl } from "@/lib/site-url";
import type { SanityImageSource } from "@sanity/image-url";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

type MetadataDocument = {
  title?: string | null;
  cityName?: string | null;
  tagline?: string | null;
  description?: string | null;
  excerpt?: string | null;
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
  const description =
    page?.meta?.description || page?.description || page?.excerpt || page?.tagline;
  const canonicalUrl = absoluteUrl(slug === "index" ? "/" : `/${slug}`);
  const metadataImage = page?.meta?.image?.asset ? page.meta.image : null;
  const imageUrl = metadataImage
    ? urlFor(metadataImage).quality(100).url()
    : absoluteUrl("/images/og-image.jpg");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: page?.meta?.image?.asset?.metadata?.dimensions?.width || 1200,
          height: page?.meta?.image?.asset?.metadata?.dimensions?.height || 630,
        },
      ],
      locale: "uk_UA",
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: !isProduction
      ? "noindex, nofollow"
      : page?.meta?.noindex
        ? "noindex"
        : "index, follow",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
