import type { PortableTextProps } from "@portabletext/react";
import { CampaignArtwork } from "@/components/landing/CampaignArtwork";
import PortableTextRenderer from "@/components/portable-text-renderer";

type FestivalAboutContentProps = {
  body: PortableTextProps["value"];
};

const campaignIllustrations = [
  {
    src: "/images/festival/30-07/history-rhythm.webp",
    alt: "Кампанійна ілюстрація з орнаментом та написами «Живи в ритмі традицій» і «Старе стає новим. І звучить по-іншому».",
    caption: "Кампанійна ілюстрація про живий ритм традицій.",
  },
  {
    src: "/images/festival/30-07/lineup-community.webp",
    alt: "Кампанійна ілюстрація з учасниками народного танцю та написами «Тут звучить світ» і «Музика, традиції й культури без кордонів».",
    caption: "Кампанійна ілюстрація про спільність, танець і фестивальну культуру.",
  },
] as const;

/** CMS festival narrative with supporting campaign artwork, not archive photography. */
export function FestivalAboutContent({ body }: FestivalAboutContentProps) {
  return (
    <section
      className="px-4 py-10 md:px-12 md:py-16"
      id="about-content"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-3xl">
        <PortableTextRenderer value={body} />
      </div>

      <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2" role="list">
        {campaignIllustrations.map((illustration) => (
          <li key={illustration.src}>
            <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <CampaignArtwork
                alt={illustration.alt}
                className="h-auto w-full object-cover"
                height={900}
                sizes="(min-width: 768px) 50vw, 100vw"
                src={illustration.src}
                width={720}
              />
              <figcaption className="px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                {illustration.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
