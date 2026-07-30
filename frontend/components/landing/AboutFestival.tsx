import React from "react";
import { CampaignArtwork } from "@/components/landing/CampaignArtwork";

export const AboutFestival = () => {
  return (
    <section
      aria-labelledby="about-heading"
      className="flex flex-col items-center gap-12 px-4 py-10 scroll-mt-32 md:flex-row md:gap-16 md:px-12 md:py-16 md:scroll-mt-20"
      id="about"
      tabIndex={-1}
    >
      {/* Image side */}
      <div className="relative w-full flex-1">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
          <CampaignArtwork
            alt="Багатополінна родина в українському традиційному вбранні — фестиваль Країна Мрій об'єднує покоління"
            className="size-full object-cover transition-transform duration-700 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
            height={900}
            src="/images/festival/30-07/about-family.webp"
            width={720}
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" aria-hidden="true" />
        </div>
        {/* Ethnic folk border ornament strip */}
        <div aria-hidden="true" className="relative mt-3 h-3 w-full overflow-hidden rounded-sm opacity-60">
          <CampaignArtwork
            alt=""
            className="size-full object-cover"
            height={300}
            src="/images/festival/30-07/motif-border.webp"
            width={1150}
          />
        </div>
      </div>

      {/* Text side */}
      <div className="flex-1 space-y-6 md:space-y-8">
        <div>
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Про фестиваль
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl" id="about-heading">
            Територія мрій
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          «Країна Мрій» — це місце, де традиція і сучасність співіснують органічно. Ми створюємо простір, де люди різного віку та світогляду збираються разом, щоб відчути силу української культури.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          Наша мета — об’єднати, надихнути та нагадати, що українська ідентичність жива, сучасна та глибока. Ми показуємо багатство фольклору через:
        </p>
        <ul className="grid gap-2 text-lg leading-relaxed text-muted-foreground md:text-xl">
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
            <span>живу музику та автентичні голоси;</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
            <span>традиційні ремесла та майстер-класи;</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
            <span>українську кухню та святковий настрій;</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
            <span>живий спільний досвід, що єднає покоління.</span>
          </li>
        </ul>
        {/* Decorative divider — green nature accent */}
        <div aria-hidden="true" className="flex items-center gap-4">
          <div className="h-0.5 w-16 bg-secondary" />
          <div className="size-2 rounded-full bg-secondary" />
          <div className="h-0.5 w-8 bg-secondary/50" />
        </div>
      </div>
    </section>
  );
};
