import type { Metadata } from "next";
import { Mulish as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Країна Мрій",
    default: "Країна Мрій 2026",
  },
  description:
    "Країна Мрій 2026 — етно-фестиваль традиції, свободи та сучасної української культури.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Країна Мрій 2026",
    description:
      "Етно-фестиваль, де традиції творять майбутнє української культури.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  robots: !isProduction ? "noindex, nofollow" : "index, follow",
};

const fontSans = FontSans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mulish",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          fontSans.variable
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
