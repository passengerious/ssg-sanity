import React from "react";
import Image from "next/image";

export const AboutFestival = () => {
  return (
    <section className="flex flex-col items-center gap-12 px-4 py-12 md:flex-row md:px-12">
      <div className="relative h-96 flex-1 overflow-hidden rounded-xl shadow-2xl">
        <Image
          alt="Візуальний заповнювач сцени фестивалю Країна Мрій"
          className="object-cover"
          fill
          sizes="(min-width: 768px) 50vw, calc(100vw - 32px)"
          src="/images/placeholder.svg"
        />
      </div>
      <div className="flex-1 space-y-6">
        <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">Дух Нації</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          «Країна Мрій» — це не просто фестиваль, це простір, де фольклор оживає та стає актуальним. Ми створюємо середовище, де жива музика, традиційні ремесла та спільний досвід єднають покоління, перетворюючи давню спадщину на сучасний культурний код.
        </p>
        <div className="h-1 w-24 bg-secondary" />
      </div>
    </section>
  );
};
