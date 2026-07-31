import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CampaignArtwork } from "@/components/landing/CampaignArtwork";

export const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-border/50 bg-muted/30">
      {/* Decorative ethnic motif background covering the whole footer */}
      <div aria-hidden="true" className="absolute inset-0 size-full pointer-events-none opacity-15">
        <CampaignArtwork
          alt=""
          className="size-full object-cover"
          height={600}
          src="/images/festival/30-07/motif-border.webp"
          width={1400}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:px-12 md:py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo / brand */}
          <Link
            href="/"
            className="group inline-flex items-center rounded-md transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

          {/* Decorative divider — green nature accent */}
          <div aria-hidden="true" className="mt-2 flex items-center gap-4">
            <div className="h-px w-16 bg-secondary/30" />
            <div className="size-1.5 rounded-full bg-secondary/50" />
            <div className="h-px w-16 bg-secondary/30" />
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
