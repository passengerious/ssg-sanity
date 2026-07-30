import React from "react";
import { CampaignArtwork } from "@/components/landing/CampaignArtwork";

export const Founder = () => {
  return (
    <section
      aria-labelledby="founder-heading"
      className="mx-4 my-10 flex flex-col-reverse items-center gap-12 rounded-3xl bg-muted/20 px-4 py-10 scroll-mt-32 md:mx-12 md:flex-row md:gap-16 md:px-12 md:py-16 md:scroll-mt-20"
      id="founder"
      tabIndex={-1}
    >
      {/* Text side */}
      <div className="flex-1 space-y-6 md:space-y-8">
        <div>
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Засновник
          </span>
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl" id="founder-heading">
            Олег Скрипка
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          Засновник фестивалю та лідер гурту «Воплі Відоплясова». Понад 35 років Олег Скрипка разом із гуртом утверджує українську самобутність, перетворюючи народну традицію на сучасний культурний код.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          Його місія — відкрити світові та самим українцям глибину й красу нашої культури через живу музику, ремесла та спільний досвід, що єднає покоління.
        </p>
        {/* Accent quote — green legacy/nature accent on large decorative text */}
        <blockquote className="border-l-2 border-secondary pl-5">
          <p className="font-hand text-xl italic text-secondary md:text-2xl">
            Культурна місія, що об&apos;єднує покоління.
          </p>
        </blockquote>
      </div>

      {/* Image side — Oleg Skrypka campaign portrait artwork */}
      <div className="flex-1">
        <div className="group relative mx-auto max-w-sm">
          {/* Decorative border frame — green nature accent */}
          <div
            className="absolute -inset-3 rounded-2xl border-2 border-secondary/25 transition-all duration-500 group-hover:border-secondary/50 group-hover:shadow-lg motion-reduce:transition-none"
            aria-hidden="true"
          />
          <div className="relative z-10 aspect-[9/16] overflow-hidden rounded-2xl bg-background shadow-xl">
            <CampaignArtwork
              alt="Олег Скрипка — засновник фестивалю Країна Мрій, кампанійна ілюстрація з етно-мотивами"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              height={1067}
              src="/images/festival/30-07/founder-oleg-skrypka.webp"
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
