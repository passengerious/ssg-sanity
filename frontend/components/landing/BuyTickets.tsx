import React from "react";
import Link from "next/link";

export const BuyTickets = () => {
  return (
    <section className="px-4 py-12 md:px-12" id="tickets">
      <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-primary p-8 text-primary-foreground shadow-lg md:flex-row md:p-12">
        <div className="text-center md:text-left">
          <h2 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Схопи свій шанс!</h2>
          <p className="text-lg opacity-90" id="tickets-note">Перші 300 квитків за ціною 999 грн на 2 дні!</p>
        </div>
        <Link
          aria-describedby="tickets-note"
          className="rounded-lg bg-background px-12 py-4 font-serif text-xl font-bold text-primary shadow-md transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href="/tickets"
        >
          ДЕТАЛІ КВИТКІВ
        </Link>
      </div>
    </section>
  );
};
