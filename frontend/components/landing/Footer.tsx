import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border/50 bg-muted/30 px-4 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo / brand */}
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg
              aria-hidden="true"
              className="size-8 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
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
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              КРАЇНА МРІЙ
            </span>
          </Link>

          {/* Description */}
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            Посилання на партнерів і соціальні мережі будуть додані після затвердження офіційних каналів.
          </p>

          {/* Social placeholders */}
          <ul aria-label="Майбутні соціальні канали" className="flex flex-wrap justify-center gap-6">
            {["Facebook", "Instagram", "YouTube", "Telegram"].map((label) => (
              <li
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground"
                key={label}
              >
                {label}
              </li>
            ))}
          </ul>

          {/* Decorative divider */}
          <div className="mt-2 flex items-center gap-4">
            <div className="h-px w-16 bg-border/50" />
            <div className="size-1.5 rounded-full bg-border/50" />
            <div className="h-px w-16 bg-border/50" />
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Країна Мрій. Усі права захищено.
          </p>
        </div>
      </div>
    </footer>
  );
};
