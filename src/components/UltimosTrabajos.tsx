import Image from "next/image";

const TRABAJOS = [
  {
    src: "/trabajos/00.webp",
    label: "Aérea · Arquitectura",
    alt: "Toma aérea con dron de una casa moderna con piscina en medio de montañas verdes",
  },
  {
    src: "/trabajos/01.webp",
    label: "Aérea · Glamping",
    alt: "Toma aérea con dron de un domo geodésico de glamping junto a una cabaña",
  },
  {
    src: "/trabajos/02.webp",
    label: "Aérea · Glamping",
    alt: "Toma aérea con dron de un domo geodésico verde sobre terraza de madera",
  },
  {
    src: "/trabajos/03.webp",
    label: "Aérea · Glamping",
    alt: "Toma aérea con dron de un domo geodésico azul con jacuzzi en la terraza",
  },
  {
    src: "/trabajos/04.webp",
    label: "Aérea · Glamping",
    alt: "Toma aérea con dron de un domo geodésico verde en una pradera",
  },
  {
    src: "/trabajos/05.webp",
    label: "Interior",
    alt: "Interior de domo de glamping con cama decorada con pétalos y globos",
  },
  {
    src: "/trabajos/06.webp",
    label: "Interior",
    alt: "Interior de domo de glamping con cama y decoración romántica",
  },
  {
    src: "/trabajos/07.webp",
    label: "Detalle",
    alt: "Detalle de toallas decoradas y pétalos de rosa sobre una cama",
  },
];

export default function UltimosTrabajos() {
  return (
    <section id="trabajos" className="bg-background py-unit-xl">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <p className="text-label-mono text-outline uppercase tracking-widest">
          Portafolio
        </p>
        <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary mt-unit-xs mb-unit-lg">
          Últimos Trabajos
        </h2>

        <div className="overflow-hidden motion-reduce:overflow-x-auto">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
            {/* Lista duplicada para el loop infinito; la copia es decorativa */}
            {[false, true].map((esCopia) =>
              TRABAJOS.map((t, i) => (
                <div
                  key={`${esCopia}-${i}`}
                  aria-hidden={esCopia || undefined}
                  className="group relative aspect-[4/3] w-[70vw] sm:w-[45vw] md:w-[22rem] shrink-0 mr-gutter overflow-hidden rounded-lg bg-surface-container-low"
                >
                  <Image
                    src={t.src}
                    alt={esCopia ? "" : t.alt}
                    fill
                    sizes="(min-width: 768px) 352px, 70vw"
                    priority={!esCopia && i === 0}
                    className="object-cover transition-transform duration-150 group-hover:scale-105"
                  />
                  <span className="absolute bottom-unit-sm left-unit-sm text-label-mono uppercase tracking-widest text-primary bg-surface-container-high/80 px-2 py-1 rounded">
                    {t.label}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
