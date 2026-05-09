import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Ticket } from "lucide-react";
import { fetchSanityTicketInfo } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Квитки",
  description:
    "Інформація про квитки на етно-фестиваль Країна Мрій 2026 та посилання на зовнішній сервіс продажу.",
  openGraph: {
    title: "Квитки — Країна Мрій 2026",
    description:
      "Дізнайтеся актуальну ціну та перейдіть до зовнішнього сервісу продажу квитків.",
    locale: "uk_UA",
  },
};

function getServicePartnerLabel(url?: string | null) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== "https:") return null;

    return parsedUrl.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default async function TicketsPage() {
  const ticketInfo = await fetchSanityTicketInfo();
  const partnerLabel = getServicePartnerLabel(ticketInfo?.boxOfficeUrl);
  const canBuy = Boolean(ticketInfo?.boxOfficeUrl && partnerLabel);

  return (
    <div className="festival-theme min-h-screen bg-background text-foreground" data-theme="heroic">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 md:px-12">
        <Link className="rounded-md font-serif text-xl font-bold text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" href="/">
          КРАЇНА МРІЙ
        </Link>
        <nav aria-label="Навігація сторінки квитків">
          <Link
            className="inline-flex items-center gap-2 rounded-md text-sm font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            href="/"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Назад до фестивалю
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl flex-col justify-center px-4 pb-16 pt-6 md:px-12">

        <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card/80 p-6 shadow-2xl md:grid-cols-[1fr_0.85fr] md:p-12">
          <div className="space-y-7">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Квитки
            </p>
            <div className="space-y-4">
              <h1 className="font-serif text-5xl font-bold tracking-[-0.02em] md:text-7xl">
                Країна Мрій 2026
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Тут буде актуальна інформація про квитки та зовнішній сервіс продажу.
              </p>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-background p-5">
                <dt className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Ціна
                </dt>
                <dd className="font-serif text-3xl font-bold text-primary">
                  {ticketInfo?.price || "Буде оголошено"}
                </dd>
              </div>
              <div className="rounded-2xl bg-background p-5">
                <dt className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Доступність
                </dt>
                <dd className="font-serif text-3xl font-bold text-foreground">
                  {ticketInfo?.ticketsLeft || "Буде оголошено"}
                </dd>
              </div>
            </dl>

            {canBuy ? (
              <a
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 font-serif text-xl font-bold text-primary-foreground shadow-lg transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href={ticketInfo?.boxOfficeUrl || "#"}
                rel="noopener noreferrer"
                target="_blank"
              >
                Купити квитки на {partnerLabel}
                <span className="sr-only">, відкриється у новій вкладці</span>
                <ExternalLink aria-hidden="true" className="size-5" />
              </a>
            ) : (
              <p
                className="inline-flex items-center justify-center rounded-xl bg-muted px-8 py-4 font-serif text-xl font-bold text-muted-foreground"
                role="status"
              >
                Сервіс продажу буде оголошено
              </p>
            )}
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] bg-primary p-8 text-primary-foreground">
            <div className="absolute -right-8 -top-8 size-36 rounded-full border border-primary-foreground/30" />
            <div className="absolute -bottom-12 -left-12 size-44 rounded-full border border-primary-foreground/20" />
            <Ticket aria-hidden="true" className="mb-10 size-16" strokeWidth={1.5} />
            <p className="font-hand text-3xl leading-tight">
              Один клік — і ти ближче до простору, де традиції творять майбутнє.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
