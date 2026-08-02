import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Умови використання",
  description:
    "Умови використання сайту та правила відвідування Міжнародного етно-фестивалю Країна Мрій.",
  alternates: {
    canonical: "/terms/",
  },
  openGraph: {
    title: "Умови використання — Країна Мрій",
    description:
      "Правила відвідування фестивалю та умови користування офіційним вебсайтом Країна Мрій.",
    url: "/terms/",
    locale: "uk_UA",
    type: "website",
  },
};

export default function TermsPage() {
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
              <FileText aria-hidden="true" className="size-4" />
              Правила та умови
            </div>
            <h1 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
              Умови використання
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Дата останнього оновлення: 3 серпня 2026 року
            </p>
          </header>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              1. Правила користування вебсайтом
            </h2>
            <p>
              Цей вебсайт є офіційною інформаційною платформою Міжнародного етно-фестивалю «Країна Мрій». Користуючись сайтом, ви погоджуєтеся з цими Умовами та зобов’язуєтеся використовувати ресурси сайту виключно із законною метою.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              2. Інтелектуальна власність
            </h2>
            <p>
              Усі графічні матеріали, логотипи, постерні фотографії, афіші, тексти та програмний код сайту є об’єктами інтелектуальної власності фестивалю «Країна Мрій» або надані за відповідними ліцензіями. Будь-яке копіювання чи комерційне використання матеріалів без письмової згоди правовласників заборонено.
            </p>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              3. Правила перебування на фестивалі
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Вхід на територію фестивалю здійснюється за наявності дійсного квитка або браслета відвідувача.</li>
              <li>Відвідувачі зобов’язані дотримуватися правил громадського порядку, пожежної безпеки та вказівок служби безпеки локації.</li>
              <li>Забороняється проносити небезпечні предмети, зброю, легкозаймисті речовини.</li>
            </ul>
          </section>

          <section className="space-y-4 leading-relaxed text-muted-foreground">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              4. Відповідальність та обмеження
            </h2>
            <p>
              Організатори фестивалю роблять усе можливе для забезпечення безпеки та комфорту відвідувачів, проте не несуть відповідальності за втрату особистих речей, залишених без нагляду на території проведення заходу.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
