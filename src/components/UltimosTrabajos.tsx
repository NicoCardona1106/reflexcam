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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {TRABAJOS.map((t, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-container-low"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                priority={i === 0}
                className="object-cover transition-transform duration-150 group-hover:scale-105"
              />
              <span className="absolute bottom-unit-sm left-unit-sm text-label-mono uppercase tracking-widest text-primary bg-surface-container-high/80 px-2 py-1 rounded">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
