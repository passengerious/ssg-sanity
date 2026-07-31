"use client";

import Image from "next/image";
import { SETTINGS_QUERY_RESULT } from "@/sanity.types";

export default function Logo({
  settings,
  className = "h-10 w-auto shrink-0 object-contain sm:h-12",
}: {
  settings?: SETTINGS_QUERY_RESULT;
  className?: string;
}) {
  return (
    <Image
      alt={settings?.siteName || "Країна Мрій"}
      className={className}
      height={48}
      priority
      src="/images/logo.svg"
      width={110}
    />
  );
}
