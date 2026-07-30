"use client";

import Image from "next/image";
import { SanityImage } from "@/components/sanity-image";
import { urlFor } from "@/sanity/lib/image";
import { SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo({
  settings,
}: {
  settings?: SETTINGS_QUERY_RESULT;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeToUse = mounted ? resolvedTheme : "light";

  const selectedLogo =
    settings?.logo?.[themeToUse === "dark" ? "dark" : "light"];
  const fallbackLogo =
    settings?.logo?.[themeToUse === "dark" ? "light" : "dark"];
  const logoToUse = selectedLogo || fallbackLogo;

  if (logoToUse?.asset?.url) {
    return (
      <SanityImage
        alt={settings?.siteName || "Країна Мрій"}
        image={logoToUse}
        priority
        quality={100}
        src={urlFor(logoToUse).url()}
        title={settings?.siteName || "Країна Мрій"}
        width={
          (settings?.logo?.width as number) ??
          logoToUse?.asset?.metadata?.dimensions?.width ??
          120
        }
      />
    );
  }

  return (
    <Image
      alt={settings?.siteName || "Країна Мрій"}
      className="h-10 w-auto object-contain"
      height={40}
      priority
      src="/images/logo.svg"
      width={120}
    />
  );
}
