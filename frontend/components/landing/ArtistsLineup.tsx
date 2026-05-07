import React from "react";
import Image from "next/image";

const artists = [
  { stage: "Головна сцена", name: "Артист буде оголошений" },
  { stage: "Епічна сцена", name: "Артист буде оголошений" },
  { stage: "Акустична програма", name: "Артист буде оголошений" },
  { stage: "Спеціальний гість", name: "Артист буде оголошений" },
];

export const ArtistsLineup = () => {
  return (
    <section className="px-4 py-12 md:px-12" id="artists">
      <h2 className="mb-12 text-center font-serif text-4xl font-bold md:text-5xl">Артисти Фестивалю</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {artists.map((artist) => (
          <div key={artist.stage} className="group overflow-hidden rounded-xl bg-card shadow-sm transition-all hover:shadow-xl">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                alt="Візуальний заповнювач фото артиста фестивалю"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, calc(100vw - 32px)"
                src="/images/placeholder.svg"
              />
            </div>
            <div className="p-6 text-center">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">{artist.stage}</p>
              <h3 className="font-serif text-xl font-bold">{artist.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
