import React from "react";
import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";

export const BuyTickets = () => {
  return (
    <section className="px-4 py-10 md:px-12 md:py-16" id="tickets">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary shadow-2xl">
        {/* Decorative corner accent */}
        <div
          className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -left-20 size-72 rounded-full bg-black/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 px-8 py-12 text-primary-foreground md:flex-row md:px-16 md:py-16">
          <div className="max-w-xl text-center md:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em]">
              <Ticket aria-hidden="true" className="size-3.5" />
              Квитки
            </div>
            <h2 className="mb-3 font-serif text-3xl font-bold leading-tight md:text-5xl">
              Схопи свій шанс!
            </h2>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl" id="tickets-note">
              Перші 300 квитків за ціною <span className="font-bold">999 грн</span> на 2 дні!
            </p>
          </div>
          <Link
            aria-describedby="tickets-note"
            className="group inline-flex items-center gap-3 rounded-xl bg-background px-10 py-4 font-serif text-xl font-bold text-primary shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-black/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary motion-reduce:transition-none md:px-12 md:py-5 md:text-2xl"
            href="/tickets/"
          >
            ДЕТАЛІ КВИТКІВ
            <ArrowRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none md:size-6"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
