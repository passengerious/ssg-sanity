import React from "react";
import Image from "next/image";

export const AboutFestival = () => {
  return (
    <section className="flex flex-col items-center gap-12 px-4 py-16 md:flex-row md:gap-16 md:px-12 md:py-24">
      {/* Image side */}
      <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-2xl shadow-2xl">
        <Image
          alt="Візуальний заповнювач сцени фестивалю Країна Мрій"
          className="object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transition-none"
          fill
          sizes="(min-width: 768px) 50vw, calc(100vw - 32px)"
          src="/images/placeholder.svg"
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" aria-hidden="true" />
      </div>

      {/* Text side */}
      <div className="flex-1 space-y-6 md:space-y-8">
        <div>
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Про фестиваль
          </span>
          <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Дух Нації
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          «Країна Мрій» — це не просто фестиваль, це простір, де фольклор оживає та стає актуальним. Ми створюємо середовище, де жива музика, традиційні ремесла та спільний досвід єднають покоління, перетворюючи давню спадщину на сучасний культурний код.
        </p>
        {/* Decorative divider */}
        <div className="flex items-center gap-4">
          <div className="h-0.5 w-16 bg-secondary" />
          <div className="size-2 rounded-full bg-secondary" />
          <div className="h-0.5 w-8 bg-secondary/50" />
        </div>
      </div>
    </section>
  );
};
