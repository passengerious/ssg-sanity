import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Heart, PenTool } from "lucide-react";
import { CampaignArtwork } from "@/components/landing/CampaignArtwork";
import { DEFAULT_TICKETS_URL } from "@/lib/tickets";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const navLinks: NavLink[] = [
  { href: "/#history", label: "Історія" },
  { href: "/#program", label: "Програма" },
  { href: "/#artists", label: "Артисти" },
  { href: "/#partners", label: "Партнери" },
  { href: DEFAULT_TICKETS_URL, label: "Квитки", external: true },
];

const participationLinks: (NavLink & { icon?: React.ElementType })[] = [
  {
    href: "https://forms.uspa.cy/6a48be6c93e20d4fe70bdab8",
    label: "Реєстрація учасників",
    external: true,
    icon: PenTool,
  },
  {
    href: "https://prt.mn/tSOuiqnjHI",
    label: `Благодійни внесок у БФ \"Країна Мрій\"`,
    external: true,
    icon: Heart,
  },
];

const socialLinks = [
  { href: "https://www.facebook.com/krainamriy", label: "Facebook" },
  { href: "https://www.instagram.com/kraina_mriy_fest", label: "Instagram" },
];

const policyLinks = [
  { href: "/privacy/", label: "Політика конфіденційності" },
  { href: "/terms/", label: "Умови використання" },
  { href: "/public-offer/", label: "Публічна оферта" },
];

export const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t border-border/50 bg-muted/30">
      {/* Decorative ethnic motif background covering the whole footer */}
      <div aria-hidden="true" className="absolute inset-0 size-full pointer-events-none opacity-15">
        <CampaignArtwork
          alt="Декоративний етно-орнамент підвалу сайту"
          className="size-full object-cover"
          height={600}
          src="/images/festival/30-07/motif-border.webp"
          width={1400}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:px-12 md:py-16">
        <div className="flex flex-col items-center gap-10 text-center">
          {/* Logo / brand */}
          <div className="space-y-3">
            <Link
              aria-label="Країна Мрій — на головну сторінку"
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
            <p className="text-sm text-muted-foreground font-hand text-lg">
              Територія свободи, де традиції творять майбутнє української культури.
            </p>
          </div>

          {/* Participation / Action Badges */}
          <div aria-label="Участь та підтримка" className="flex flex-wrap justify-center gap-4">
            {participationLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-5 py-2.5 text-sm font-semibold text-secondary shadow-xs transition-all duration-300 hover:border-secondary hover:bg-secondary/20 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                  href={item.href}
                  key={item.label}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  {Icon ? <Icon aria-hidden="true" className="size-4" /> : null}
                  <span>{item.label}</span>
                  <span className="sr-only">, відкриється у новій вкладці</span>
                  <ExternalLink aria-hidden="true" className="size-3.5 opacity-70" />
                </a>
              );
            })}
          </div>

          {/* Navigation Links */}
          <nav aria-label="Навігація у підвалі" className="w-full">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>{link.label}</span>
                      <span className="sr-only">, відкриється у новій вкладці</span>
                      <ExternalLink aria-hidden="true" className="size-3 text-secondary" />
                    </a>
                  ) : (
                    <Link
                      className="text-sm font-semibold text-foreground transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Соціальні мережі
            </p>
            <ul aria-label="Офіційні соціальні канали" className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>{social.label}</span>
                    <span className="sr-only">, відкриється в новій вкладці</span>
                    <ExternalLink aria-hidden="true" className="size-3 text-secondary" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative divider — green nature accent */}
          <div aria-hidden="true" className="flex items-center gap-4">
            <div className="h-px w-24 bg-secondary/30" />
            <div className="size-1.5 rounded-full bg-secondary/50" />
            <div className="h-px w-24 bg-secondary/30" />
          </div>

          {/* Legal / Policy Links */}
          <div className="space-y-4">
            <ul aria-label="Юридичні документи" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {policyLinks.map((policy) => (
                <li key={policy.href}>
                  <Link
                    className="text-xs text-muted-foreground transition-colors hover:text-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href={policy.href}
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground">
              &copy; 2026 Країна Мрій. Усі права захищено.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
