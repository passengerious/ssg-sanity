import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scroll } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Публічна оферта",
  description:
    "Договір публічної оферти про продаж квитків та участь у Міжнародному етно-фестивалі Країна Мрій.",
  alternates: {
    canonical: "/public-offer/",
  },
  openGraph: {
    title: "Публічна оферта — Країна Мрій",
    description:
      "Офіційний договір публічної оферти щодо придбання квитків та участі у фестивалі Країна Мрій.",
    url: "/public-offer/",
    locale: "uk_UA",
    type: "website",
  },
};

export default function PublicOfferPage() {
  return (
    <div className="festival-theme min-h-screen bg-background text-foreground" data-theme="heroic">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <nav aria-label="Хлібні крихти" className="mb-8">
          <Link
            className="inline-flex items-center gap-2 rounded-md text-sm font-bold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="/"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            На головну
          </Link>
        </nav>

        <article className="space-y-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-12">
          <header className="border-b border-border pb-6">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              <Scroll aria-hidden="true" className="size-4" />
              Договір оферти
            </div>
            <h1 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
              Публічна оферта
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Договір про надання послуг з відвідування фестивалю
            </p>
          </header>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              1. Предмет договору
            </h2>
            <p>
              Цей Договір є публічною офертою (пропозицією) Організатора Міжнародного етно-фестивалю «Країна Мрій» укласти договір надання послуг з відвідування культурно-мистецького заходу на умовах, визначених нижче.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              2. Придбання та обмін квитків
            </h2>
            <p>
              Придбання квитків здійснюється через уповноважені квиткові оператори. Квиток надає право одноразового або багаторазового входу (залежно від категорії квитка) на територію проведення фестивалю «Країна Мрій 2026» у визначені дати (15–16 серпня 2026 року).
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              3. Повернення квитків та форс-мажор
            </h2>
            <p>
              Повернення квитків у разі скасування або перенесення заходу здійснюється відповідно до вимог чинного законодавства України та правил відповідного квиткового оператора. У разі настання обставин непереборної сили (форс-мажор) організатор діє згідно з офіційними розпорядженнями органів державної влади.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              4. Акцепт оферти
            </h2>
            <p>
              Оплата квитка або фактичне відвідування території фестивалю є повним і беззастережним прийняттям (акцептом) умов цієї Публічної оферти.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
