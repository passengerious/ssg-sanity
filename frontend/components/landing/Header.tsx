import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = ({ hasHistory }: { hasHistory?: boolean } = {}) => {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-wrap items-center justify-between gap-3 bg-background/95 px-4 py-3 shadow-sm backdrop-blur-md md:h-16 md:flex-nowrap md:px-12 md:py-0">
      <Link
        aria-label="Країна Мрій — на початок лендингу"
        className="group flex items-center rounded-md transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        href="/"
      >
        <Image
          alt="Логотип Країна Мрій"
          className="h-10 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none sm:h-12"
          height={48}
          priority
          src="/images/logo.svg"
          width={110}
        />
      </Link>
      <nav aria-label="Головна навігація" className="order-3 flex w-full justify-center gap-3 overflow-x-auto pb-1 md:order-none md:w-auto md:gap-6 md:overflow-visible md:pb-0">
        {hasHistory ? (
          <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#history">
            ІСТОРІЯ
          </Link>
        ) : null}
        <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#program">
          ПРОГРАМА
        </Link>
        <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#artists">
          АРТИСТИ
        </Link>
        <Link className="shrink-0 rounded-sm text-xs text-muted-foreground transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm" href="#partners">
          ПАРТНЕРИ
        </Link>
      </nav>
      <a className="rounded-lg bg-secondary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/20 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none md:px-6" href="https://novosad.tibox.me/krayina-mrii" rel="noopener noreferrer" target="_blank">
        КУПИТИ КВИТКИ
      </a>
    </header>
  );
};
