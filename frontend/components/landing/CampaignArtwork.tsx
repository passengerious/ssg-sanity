/**
 * CampaignArtwork — Server-rendered art-directed image component.
 *
 * Uses HTML <picture> with optional mobile <source> for art direction,
 * ensuring only the viewport-appropriate image downloads. No client JS.
 *
 * @example
 * ```tsx
 * <CampaignArtwork
 *   src="/images/festival/30-07/lineup-community.webp"
 *   alt="Люди танцюють просто неба"
 *   width={720}
 *   height={900}
 *   sizes="(max-width: 767px) 100vw, (min-width: 1024px) 896px, 768px"
 *   loading="eager"
 *   fetchPriority="high"
 * />
 * ```
 */

interface CampaignArtworkProps {
  /** Desktop image path (fallback for viewports > 767px) */
  src: string;
  /** Accessible alt text (required; empty string for decorative images) */
  alt: string;
  /** Desktop intrinsic width in pixels */
  width: number;
  /** Desktop intrinsic height in pixels */
  height: number;
  /** Optional mobile image path for art direction (viewports ≤ 767px) */
  mobileSrc?: string;
  /** Mobile intrinsic width (required when mobileSrc is provided) */
  mobileWidth?: number;
  /** Mobile intrinsic height (required when mobileSrc is provided) */
  mobileHeight?: number;
  /** Responsive sizes attribute for intrinsic sizing */
  sizes?: string;
  /** Loading strategy: 'lazy' (default) or 'eager' for above-fold images */
  loading?: 'lazy' | 'eager';
  /** Fetch priority hint: 'auto' (default), 'high', or 'low' */
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Decoding hint: 'async' (default), 'sync', or 'auto' */
  decoding?: 'async' | 'sync' | 'auto';
  /** Optional className for styling */
  className?: string;
}

export function CampaignArtwork({
  src,
  alt,
  width,
  height,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  sizes,
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
  className,
}: CampaignArtworkProps) {
  const hasMobileSource = Boolean(mobileSrc && mobileWidth && mobileHeight);

  return (
    <picture>
      {hasMobileSource && (
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrc}
          width={mobileWidth}
          height={mobileHeight}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={className}
      />
    </picture>
  );
}
