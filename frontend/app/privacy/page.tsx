import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description:
    "Політика конфіденційності та захисту персональних даних Міжнародного етно-фестивалю Країна Мрій.",
  alternates: {
    canonical: "/privacy/",
  },
  openGraph: {
    title: "Політика конфіденційності — Країна Мрій",
    description:
      "Інформація про обробку та захист персональних даних відвідувачів фестивалю Країна Мрій.",
    url: "/privacy/",
    locale: "uk_UA",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
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
              <ShieldCheck aria-hidden="true" className="size-4" />
              Захист даних
            </div>
            <h1 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
              Політика конфіденційності
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Дата останнього оновлення: 3 серпня 2026 року
            </p>
          </header>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              1. Загальні положення
            </h2>
            <p>
              Ця Політика конфіденційності визначає порядок отримання, зберігання, обробки та захисту персональних даних відвідувачів вебсайту Міжнародного етно-фестивалю «Країна Мрій» (далі — Festival) відповідно до Закону України «Про захист персональних даних» та міжнародних стандартів.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              2. Збір та використання даних
            </h2>
            <p>
              Ми можемо збирати наступну інформацію, коли ви користуєтеся нашим вебсайтом, звертаєтеся до нас або купуєте квитки через партнерські сервіси:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Технічні дані браузера, IP-адреса, файли Cookie та параметри сесії.</li>
              <li>Контактні дані (ім’я, електронна пошта, телефон), які ви добровільно надаєте для зворотного зв’язку.</li>
              <li>Інформація про взаємодію з інтерфейсом для поліпшення продуктивності та безпеки сайту.</li>
            </ul>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              3. Файли Cookie та аналітика
            </h2>
            <p>
              Вебсайт використовує файли Cookie для забезпечення коректної навігації, збереження налаштувань теми та аналізу відвідуваності. Ви можете вимкнути збереження Cookie у налаштуваннях вашого браузера, проте це може вплинути на функціональність окремих розділів.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              4. Захист персональних даних
            </h2>
            <p>
              Ми застосовуємо сучасні технічні та організаційні заходи безпеки (HTTPS-шифрування, захищені статичні сервери) для запобігання несанкціонованому доступу, зміні або розголошенню вашої інформації. Ми не передаємо ваші дані третім особам, крім випадків, передбачених законодавством України.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              5. Права користувачів
            </h2>
            <p>
              Ви маєте право знати про джерела збору, місцезнаходження своїх персональних даних, вимагати їх зміну або видалення, а також відкликати згоду на обробку персональних даних.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              6. Зворотний зв’язок
            </h2>
            <p>
              З усіх питань щодо Політики конфіденційності звертайтеся до оргкомітету фестивалю через офіційні соціальні канали або електронну пошту.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
