import React from "react";
import Image from "next/image";
import { Music } from "lucide-react";

const artists = [
  { stage: "Головна сцена", name: "Артист буде оголошений" },
  { stage: "Епічна сцена", name: "Артист буде оголошений" },
  { stage: "Акустична програма", name: "Артист буде оголошений" },
  { stage: "Спеціальний гість", name: "Артист буде оголошений" },
];

export const ArtistsLineup = () => {
  return (
    <section className="px-4 py-16 md:px-12 md:py-24" id="artists">
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          <Music aria-hidden="true" className="size-3.5" />
          Line-up
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          Артисти Фестивалю
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-4">
          <div className="h-0.5 w-12 bg-secondary" />
          <div className="size-2 rounded-full bg-secondary" />
          <div className="h-0.5 w-6 bg-secondary/50" />
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {artists.map((artist) => (
          <div
            key={artist.stage}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                alt=""
                className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, calc(100vw - 32px)"
                src="/images/placeholder.svg"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" aria-hidden="true" />
            </div>

            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/70">
                {artist.stage}
              </p>
              <h3 className="font-serif text-lg font-bold leading-tight text-white md:text-xl">
                {artist.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
