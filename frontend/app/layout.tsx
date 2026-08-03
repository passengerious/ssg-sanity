import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: "%s | Країна Мрій 2026",
    default: "Країна Мрій 2026 — Етно-фестиваль у Львові",
  },
  description:
    "Міжнародний етно-фестиваль Країна Мрій 2026 у Львові (15–16 серпня 2026). Територія свободи, музика, ремесла та українська традиція у парку ім. Богдана Хмельницького.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/images/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Країна Мрій 2026 — Етно-фестиваль у Львові",
    description:
      "Міжнародний етно-фестиваль Країна Мрій 2026 (15–16 серпня 2026 у Львові). Музика, традиції, майстер-класи та сучасна українська культура.",
    url: getSiteUrl(),
    siteName: "Країна Мрій",
    images: [
      {
        url: absoluteUrl("/images/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: "Країна Мрій 2026 — Етно-фестиваль у Львові",
        type: "image/jpeg",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Країна Мрій 2026 — Етно-фестиваль у Львові",
    description:
      "Міжнародний етно-фестиваль Країна Мрій 2026 (15–16 серпня 2026 у Львові). Музика, традиції та сучасна українська культура.",
    images: [
      {
        url: absoluteUrl("/images/og-image.jpg"),
        alt: "Країна Мрій 2026 — Етно-фестиваль у Львові",
      },
    ],
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
