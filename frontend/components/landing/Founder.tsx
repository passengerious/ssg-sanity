import React from "react";
import Image from "next/image";

export const Founder = () => {
  return (
    <section className="mx-4 my-12 flex flex-col-reverse items-center gap-12 rounded-3xl bg-muted/30 px-4 py-12 md:mx-12 md:flex-row md:px-12">
      <div className="flex-1 space-y-6 p-6 md:p-12">
        <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl">Олег Скрипка</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Візіонер та засновник фестивалю, який вже понад 35 років невтомно працює над утвердженням української ідентичності. Його місія — відкрити світові та самим українцям неймовірну глибину та красу нашої культури через сучасну інтерпретацію традицій.
        </p>
        <p className="font-hand text-2xl text-primary">Культурна місія, що об&rsquo;єднує покоління.</p>
      </div>
      <div className="flex-1 p-6">
        <div className="relative group max-w-sm mx-auto">
          <div className="absolute -inset-4 rounded-xl border-2 border-primary opacity-20 transition-opacity group-hover:opacity-40" />
          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
            <Image
              alt="Візуальний заповнювач портрета Олега Скрипки — засновника фестивалю"
              className="object-cover"
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
