import React from "react";
import Image from "next/image";

export const Founder = () => {
  return (
    <section className="mx-4 my-10 flex flex-col-reverse items-center gap-12 rounded-3xl bg-muted/20 px-4 py-10 md:mx-12 md:flex-row md:gap-16 md:px-12 md:py-16">
      {/* Text side */}
      <div className="flex-1 space-y-6 md:space-y-8">
        <div>
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Засновник
          </span>
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Олег Скрипка
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          Візіонер та засновник фестивалю, який вже понад 35 років невтомно працює над утвердженням української ідентичності. Його місія — відкрити світові та самим українцям неймовірну глибину та красу нашої культури через сучасну інтерпретацію традицій.
        </p>
        {/* Accent quote */}
        <blockquote className="border-l-2 border-primary pl-5">
          <p className="font-hand text-xl italic text-primary md:text-2xl">
            Культурна місія, що об&apos;єднує покоління.
          </p>
        </blockquote>
      </div>

      {/* Image side */}
      <div className="flex-1">
        <div className="group relative mx-auto max-w-sm">
          {/* Decorative border frame */}
          <div
            className="absolute -inset-3 rounded-2xl border-2 border-primary/20 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-lg motion-reduce:transition-none"
            aria-hidden="true"
          />
          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image
              alt="Візуальний заповнювач портрета Олега Скрипки — засновника фестивалю"
              className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              fill
              sizes="(min-width: 768px) 320px, calc(100vw - 80px)"
              src="/images/placeholder.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
