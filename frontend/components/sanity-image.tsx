import Image from "next/image";
import { cn } from "@/lib/utils";

export type SanityImageAsset = {
  alt?: string | null;
  asset?: {
    url?: string | null;
  } | null;
} | null | undefined;

type SanityImageProps = {
  image: SanityImageAsset;
  alt: string;
  fallback?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export function SanityImage({
  image,
  alt,
  fallback = "/images/placeholder.svg",
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: SanityImageProps) {
  const src = image?.asset?.url || fallback;
  const imageAlt = image?.asset?.url ? image?.alt || alt : "";

  return (
    <Image
      alt={imageAlt}
      className={className}
      fill={fill}
      height={height}
      priority={priority}
      sizes={sizes}
      src={src}
      width={width}
    />
  );
}

export function SanityImageFill({
  image,
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
    />
  );
}
