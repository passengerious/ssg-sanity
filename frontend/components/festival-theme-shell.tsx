import { cn } from "@/lib/utils";
import type { FestivalTheme } from "@/lib/festival-themes";

export function FestivalThemeShell({
  children,
  className,
  theme,
}: {
  children: React.ReactNode;
  className?: string;
  theme: FestivalTheme;
}) {
  return (
    <div className={cn("festival-theme", className)} data-theme={theme}>
      {children}
    </div>
  );
}
