import React from "react";

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center gap-6 border-t bg-muted/50 px-4 py-12 md:px-12" id="partners">
      <div className="flex flex-col items-center gap-4">
        <span className="font-serif text-2xl font-bold text-primary">КРАЇНА МРІЙ</span>
        <p className="max-w-xl text-center text-sm text-muted-foreground">
          Посилання на партнерів і соціальні мережі будуть додані після затвердження офіційних каналів.
        </p>
        <div aria-label="Майбутні соціальні канали" className="flex flex-wrap justify-center gap-6" role="list">
          {['Facebook', 'Instagram', 'YouTube', 'Telegram'].map((label) => (
            <span className="text-sm text-muted-foreground" key={label} role="listitem">
              {label}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        © 2026 Країна Мрій. Усі права захищено.
      </p>
    </footer>
  );
};
