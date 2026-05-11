import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-wrap items-center justify-between gap-3 bg-background/95 px-4 py-3 shadow-sm backdrop-blur-md md:h-16 md:flex-nowrap md:px-12 md:py-0">
      <Link
        aria-label="Країна Мрій — на початок лендингу"
        className="group flex items-center gap-3 rounded-md text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        href="/"
      >
        <svg
          aria-hidden="true"
          className="size-8 shrink-0 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
          fill="none"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4C9.8 8.2 6.6 13 6.6 18.2c0 5.2 4 9.1 9.4 9.1s9.4-3.9 9.4-9.1C25.4 13 22.2 8.2 16 4Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
          />
          <path
            d="M16 9v18M10.8 16.4 16 20.8l5.2-4.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.2"
          />
        </svg>
        <span className="text-xl font-bold tracking-tight font-serif md:text-2xl">
          КРАЇНА МРІЙ
        </span>
      </Link>
      <nav aria-label="Головна навігація" className="order-3 flex w-full gap-3 overflow-x-auto pb-1 md:order-none md:w-auto md:gap-6 md:overflow-visible md:pb-0">
        <Link className="shrink-0 rounded-sm text-xs font-bold text-primary transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="/">
          ГОЛОВНА
        </Link>
        <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#cities">
          МІСТА
        </Link>
        <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#program">
          ПРОГРАМА
        </Link>
        <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#artists">
          АРТИСТИ
        </Link>
        <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#partners">
          ПАРТНЕРИ
        </Link>
      </nav>
      <Link className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none md:px-6" href="/tickets">
        КВИТКИ
      </Link>
    </header>
  );
};
