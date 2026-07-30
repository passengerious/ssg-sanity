"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  decorativeDivider,
  sectionPadding,
} from "@/lib/tailwind-patterns";

type FestivalPhoto = {
  slug: string;
  src600: string;
  src1200: string;
  thumbnail: { width: 600; height: number };
  full: { width: 1200; height: number };
  alt: string;
  caption: string;
};

const imageBasePath = "/images/festival/rewind-2014";

const photos = [
  {
    slug: "festival-circle",
    src600: `${imageBasePath}/01-festival-circle-600.webp`,
    src1200: `${imageBasePath}/01-festival-circle-1200.webp`,
    thumbnail: { width: 600, height: 400 },
    full: { width: 1200, height: 800 },
    alt: "Широка фестивальна галявина зі спільним колом, людьми в традиційному вбранні, наметами та сценою.",
    caption: "Спільне коло на фестивальній галявині — музика, традиції та зустрічі просто неба.",
  },
  {
    slug: "community-dance",
    src600: `${imageBasePath}/02-community-dance-600.webp`,
    src1200: `${imageBasePath}/02-community-dance-1200.webp`,
    thumbnail: { width: 600, height: 401 },
    full: { width: 1200, height: 802 },
    alt: "Учасники фестивалю водять коло навколо прикрашеного дерева; на передньому плані дві жінки у традиційному вбранні.",
    caption: "Спільний танець навколо обрядового дерева на фестивальній галявині.",
  },
  {
    slug: "folk-ensemble",
    src600: `${imageBasePath}/03-folk-ensemble-600.webp`,
    src1200: `${imageBasePath}/03-folk-ensemble-1200.webp`,
    thumbnail: { width: 600, height: 400 },
    full: { width: 1200, height: 800 },
    alt: "Сценічний ансамбль із скрипкою, акордеоном і барабаном.",
    caption: "Фольклорний ансамбль на сцені: скрипка, акордеон і барабан.",
  },
  {
    slug: "stage-performance",
    src600: `${imageBasePath}/09-stage-performance-600.webp`,
    src1200: `${imageBasePath}/09-stage-performance-1200.webp`,
    thumbnail: { width: 600, height: 400 },
    full: { width: 1200, height: 800 },
    alt: "Співачка у яскравому сценічному костюмі виступає з музикантами на фестивальній сцені.",
    caption: "Сучасна музика у діалозі з традицією на сцені Країни Мрій.",
  },
  {
    slug: "bandura-ensemble",
    src600: `${imageBasePath}/10-bandura-ensemble-600.webp`,
    src1200: `${imageBasePath}/10-bandura-ensemble-1200.webp`,
    thumbnail: { width: 600, height: 401 },
    full: { width: 1200, height: 801 },
    alt: "Музиканти, серед них військовослужбовець, співають і грають на бандурах та скрипці.",
    caption: "Бандури, скрипка й голоси на фестивальній сцені.",
  },
  {
    slug: "shared-dance",
    src600: `${imageBasePath}/04-craft-vendors-600.webp`,
    src1200: `${imageBasePath}/04-craft-vendors-1200.webp`,
    thumbnail: { width: 600, height: 400 },
    full: { width: 1200, height: 799 },
    alt: "Учасники фестивалю, серед них жінка у традиційному вбранні, тримаються за руки у спільному танці просто неба.",
    caption: "Спільний танець об’єднує учасників фестивалю просто неба.",
  },
  {
    slug: "craft-workshop",
    src600: `${imageBasePath}/05-craft-workshop-600.webp`,
    src1200: `${imageBasePath}/05-craft-workshop-1200.webp`,
    thumbnail: { width: 600, height: 400 },
    full: { width: 1200, height: 800 },
    alt: "Відвідувачка бере участь у майстерні з рослинними та квітковими матеріалами.",
    caption: "Майстерня рослинних і квіткових композицій для відвідувачів фестивалю.",
  },
  {
    slug: "charity-art",
    src600: `${imageBasePath}/06-charity-art-600.webp`,
    src1200: `${imageBasePath}/06-charity-art-1200.webp`,
    thumbnail: { width: 600, height: 401 },
    full: { width: 1200, height: 801 },
    alt: "Чоловік у вишиванці стоїть біля картини з жовтою мапою світу та написом «Світ без русні».",
    caption: "Благодійне мистецтво та громадські ініціативи фестивалю.",
  },
  {
    slug: "community-circle",
    src600: `${imageBasePath}/07-community-circle-600.webp`,
    src1200: `${imageBasePath}/07-community-circle-1200.webp`,
    thumbnail: { width: 600, height: 400 },
    full: { width: 1200, height: 800 },
    alt: "Учасники фестивалю у традиційному вбранні водять велике коло біля сцени у ботанічному саду.",
    caption: "Велике фестивальне коло біля головної сцени.",
  },
  {
    slug: "audience-applause",
    src600: `${imageBasePath}/08-audience-applause-600.webp`,
    src1200: `${imageBasePath}/08-audience-applause-1200.webp`,
    thumbnail: { width: 600, height: 400 },
    full: { width: 1200, height: 800 },
    alt: "Відвідувачка у вишитій блузці аплодує просто неба.",
    caption: "Оплески й вдячність — людський фінал фестивального дня.",
  },
] as const satisfies readonly FestivalPhoto[];

function ResponsivePhoto({
  photo,
  lightbox = false,
}: {
  photo: FestivalPhoto;
  lightbox?: boolean;
}) {
  const source = lightbox ? photo.full : photo.thumbnail;
  const src = lightbox ? photo.src1200 : photo.src600;

  return (
    // Local static derivatives require this explicit width-based srcSet contract.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={photo.alt}
      className={
        lightbox
          ? "max-h-full max-w-full h-auto w-auto object-contain rounded-xl shadow-2xl"
          : "absolute inset-0 size-full object-contain"
      }
      decoding="async"
      height={source.height}
      loading="lazy"
      sizes={
        lightbox
          ? "(min-width: 1024px) 80vw, 94vw"
          : "(min-width: 1024px) 31vw, (min-width: 640px) 52vw, 82vw"
      }
      src={src}
      srcSet={
        lightbox
          ? undefined
          : `${photo.src600} 600w, ${photo.src1200} 1200w`
      }
      width={source.width}
    />
  );
}

/**
 * A small client island: native dialog behavior is used for focus containment
 * and Escape handling, while the gallery itself remains ordinary semantic HTML.
 */
export function FestivalPhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const openingTriggerIndexRef = useRef<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [railEndpoints, setRailEndpoints] = useState({
    atStart: true,
    atEnd: false,
  });

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const scrollport = rail;

    function updateRailEndpoints() {
      const remainingScroll =
        scrollport.scrollWidth - scrollport.clientWidth - scrollport.scrollLeft;
      setRailEndpoints({
        atStart: scrollport.scrollLeft <= 1,
        atEnd: remainingScroll <= 1,
      });
    }

    const resizeObserver = new ResizeObserver(updateRailEndpoints);
    resizeObserver.observe(scrollport);
    scrollport.addEventListener("scroll", updateRailEndpoints, { passive: true });
    window.addEventListener("resize", updateRailEndpoints);
    updateRailEndpoints();

    return () => {
      resizeObserver.disconnect();
      scrollport.removeEventListener("scroll", updateRailEndpoints);
      window.removeEventListener("resize", updateRailEndpoints);
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index === null || index === 0 ? 0 : index - 1));
      } else if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null || index === photos.length - 1 ? photos.length - 1 : index + 1,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  function scrollRail(direction: -1 | 1) {
    const rail = railRef.current;
    const firstCard = rail?.firstElementChild as HTMLLIElement | null;
    if (!rail || !firstCard) return;

    const nextCard = firstCard.nextElementSibling as HTMLLIElement | null;
    const scrollAmount = nextCard
      ? nextCard.offsetLeft - firstCard.offsetLeft
      : firstCard.getBoundingClientRect().width;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    rail.scrollBy({
      left: direction * scrollAmount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function openPhoto(index: number) {
    openingTriggerIndexRef.current = index;
    setActiveIndex(index);
    requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
    });
  }

  function restoreTriggerFocus() {
    const triggerIndex = openingTriggerIndexRef.current;
    const trigger = triggerIndex === null ? null : triggerRefs.current[triggerIndex];
    openingTriggerIndexRef.current = null;
    setActiveIndex(null);
    requestAnimationFrame(() => trigger?.focus());
  }

  function closeOnBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    // Safari does not yet support dialog[closedby]. The full-viewport shell
    // receives only clicks that did not originate inside its content.
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  return (
    <section
      aria-labelledby="photo-gallery-heading"
      className={`${sectionPadding} scroll-mt-32 md:scroll-mt-20`}
      id="photo-rewind"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Київ · 2024
          </span>
          <h2
            className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl"
            id="photo-gallery-heading"
          >
            Ретроспектива: Країна Мрій<br></br>Київ, 21–23 червня 2024
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-4 flex items-center justify-center gap-4"
          >
            <div className={decorativeDivider.start} />
            <div className={decorativeDivider.dot} />
            <div className={decorativeDivider.end} />
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Фестиваль проходив у Національному ботанічному саду імені М. М.
            Гришка. Подія об’єднала виступи кримськотатарських артистів,
            поетичні читання та благодійні збори.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Репортаж про Кримську сцену: {" "}
            <a
              className="rounded-sm font-semibold text-secondary underline decoration-secondary/40 underline-offset-4 transition-colors hover:decoration-2 hover:decoration-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              href="https://suspilne.media/crimea/774365-na-miznarodnomu-etnofestivali-kraina-mrij-vidkrilasa-krimska-scena/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Суспільне Крим — «На міжнародному етнофестивалі “Країна Мрій”
              відкрилася Кримська сцена»
              <span className="sr-only">, відкриється у новій вкладці</span>
            </a>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-secondary">Гортайте фото</p>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              aria-label="Попереднє фото в добірці"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card p-2.5 text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-45 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              disabled={railEndpoints.atStart}
              onClick={() => scrollRail(-1)}
              type="button"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
            </button>
            <button
              aria-label="Наступне фото в добірці"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card p-2.5 text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-45 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
              disabled={railEndpoints.atEnd}
              onClick={() => scrollRail(1)}
              type="button"
            >
              <ChevronRight className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
        <ul
          className="scrollbar-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 mt-3 flex snap-x snap-proximity gap-5 overflow-x-auto pb-1 pr-4"
          ref={railRef}
          role="list"
        >
          {photos.map((photo, index) => (
            <li
              className="w-[82vw] shrink-0 snap-start sm:w-[52vw] lg:w-[31vw]"
              key={photo.slug}
            >
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background">
                <button
                  aria-label={`Відкрити фото ${index + 1}: ${photo.alt}`}
                  className="group relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-muted/30 p-2 focus-visible:outline-none"
                  onClick={() => openPhoto(index)}
                  ref={(element) => {
                    triggerRefs.current[index] = element;
                  }}
                  type="button"
                >
                  <ResponsivePhoto photo={photo} />
                  <span className="sr-only">Відкрити у повному розмірі</span>
                </button>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        aria-labelledby="photo-dialog-heading"
        className="m-0 h-dvh w-dvw max-h-none max-w-none overflow-hidden border-0 bg-transparent p-0 text-foreground backdrop:bg-slate-950/90 backdrop:backdrop-blur-md"
        closedby="any"
        onClick={closeOnBackdropClick}
        onClose={restoreTriggerFocus}
        ref={dialogRef}
      >
        {activePhoto ? (
          <div className="flex h-dvh w-dvw flex-col justify-between gap-3 p-3 sm:gap-4 sm:p-5 overflow-hidden">
            <div className="flex shrink-0 items-center justify-between gap-4 rounded-xl bg-background/95 p-3 shadow-md sm:px-5 sm:py-3.5">
              <div>
                <h2
                  className="font-serif text-xl font-bold leading-tight sm:text-2xl"
                  id="photo-dialog-heading"
                >
                  Фото фестивалю
                </h2>
                <p aria-live="polite" className="mt-0.5 text-xs font-semibold text-secondary sm:text-sm">
                  {activeIndex! + 1} з {photos.length}
                </p>
              </div>
              <form method="dialog">
                <button
                  className="flex items-center gap-1.5 min-h-10 rounded-full border border-border px-3.5 text-xs font-bold transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-11 sm:px-4 sm:text-sm motion-reduce:transition-none"
                  type="submit"
                >
                  <span>Закрити</span>
                  <X className="h-4 w-4 stroke-[2.5]" />
                </button>
              </form>
            </div>

            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-2 sm:gap-3 overflow-hidden">
              <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden px-2 sm:px-14">
                <button
                  aria-label="Попереднє фото"
                  className="absolute left-1 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:left-2 sm:h-12 sm:w-12 motion-reduce:transition-none"
                  disabled={activeIndex === 0}
                  onClick={() => setActiveIndex((index) => (index === null || index === 0 ? 0 : index - 1))}
                  type="button"
                >
                  <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
                </button>

                <ResponsivePhoto lightbox photo={activePhoto} />

                <button
                  aria-label="Наступне фото"
                  className="absolute right-1 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-2 sm:h-12 sm:w-12 motion-reduce:transition-none"
                  disabled={activeIndex === photos.length - 1}
                  onClick={() =>
                    setActiveIndex((index) =>
                      index === null || index === photos.length - 1
                        ? photos.length - 1
                        : index + 1,
                    )
                  }
                  type="button"
                >
                  <ChevronRight className="h-6 w-6 stroke-[2.5]" />
                </button>
              </div>
              <figcaption className="max-w-3xl shrink-0 rounded-xl bg-foreground/90 px-4 py-2 text-center text-xs leading-relaxed text-background sm:text-sm shadow-md">
                {activePhoto.caption}
              </figcaption>
            </figure>

            <div className="flex shrink-0 items-center justify-between gap-4 rounded-xl bg-background/95 p-2.5 shadow-md sm:p-3">
              <button
                className="flex items-center gap-1.5 min-h-10 rounded-md border border-border px-3.5 text-xs font-bold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-11 sm:px-4 sm:text-sm motion-reduce:transition-none"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((index) => (index === null ? 0 : index - 1))}
                type="button"
              >
                <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                <span>Попереднє</span>
              </button>
              <p aria-live="polite" className="text-xs font-semibold text-muted-foreground sm:text-sm">
                {activeIndex! + 1} з {photos.length}
              </p>
              <button
                className="flex items-center gap-1.5 min-h-10 rounded-md border border-border px-3.5 text-xs font-bold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-11 sm:px-4 sm:text-sm motion-reduce:transition-none"
                disabled={activeIndex === photos.length - 1}
                onClick={() =>
                  setActiveIndex((index) =>
                    index === null ? photos.length - 1 : index + 1,
                  )
                }
                type="button"
              >
                <span>Наступне</span>
                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
