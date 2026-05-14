import Image from "next/image";
import { cn } from "@/lib/utils";

export type SanityImageAsset = {
  alt?: string | null;
  asset?: {
    url?: string | null;
    metadata?: {
      lqip?: string | null;
      dimensions?: {
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
  } | null;
} | null | undefined;

type SanityImageProps = {
  image?: SanityImageAsset;
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur";
  blurDataURL?: string;
  quality?: number;
  style?: React.CSSProperties;
  title?: string;
};

export function SanityImage({
  image,
  src,
  alt,
  fallback = "/images/placeholder.svg",
  className,
  fill,
  width,
  height,
  sizes,
  priority,
  placeholder,
  blurDataURL,
  quality,
  style,
  title,
}: SanityImageProps) {
  const imageSrc = src || image?.asset?.url || fallback;
  const isFallback = !src && !image?.asset?.url;
  const imageAlt = isFallback ? "" : image?.alt || alt;

  const isSvg = (image?.asset as { mimeType?: string } | undefined)?.mimeType === "image/svg+xml";
  const metadataLqip = isSvg ? undefined : image?.asset?.metadata?.lqip;
  const resolvedBlurDataURL = blurDataURL || (metadataLqip ? metadataLqip : undefined);
  const resolvedPlaceholder = placeholder || (resolvedBlurDataURL ? "blur" : undefined);

  const metadataWidth = image?.asset?.metadata?.dimensions?.width;
  const metadataHeight = image?.asset?.metadata?.dimensions?.height;
  const resolvedWidth = fill ? undefined : width || (metadataWidth ? metadataWidth : undefined);
  const resolvedHeight = fill ? undefined : height || (metadataHeight ? metadataHeight : undefined);

  return (
    <Image
      alt={imageAlt}
      blurDataURL={resolvedBlurDataURL}
      className={className}
      fill={fill}
      height={resolvedHeight}
      placeholder={resolvedPlaceholder}
      priority={priority}
      quality={quality}
      sizes={sizes}
      src={imageSrc}
      style={style}
      title={title}
      width={resolvedWidth}
    />
  );
}

export function SanityImageFill({
  image,
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
}: Omit<SanityImageProps, "fill" | "width" | "height">) {
  return (
    <SanityImage
      alt={alt}
      className={cn("object-cover", className)}
      fill
      image={image}
      priority={priority}
      sizes={sizes}
      src={src}
    />
  );
}
