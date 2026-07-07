"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  {
    src: "/trabajos/08.webp",
    label: "Sesión de pareja",
    alt: "Pareja en cama decorada con globos rojos que forman la frase Te Amo",
  },
  {
    src: "/trabajos/09.webp",
    label: "Sesión de pareja",
    alt: "Retrato cercano de una pareja sonriendo con globos rojos de fondo",
  },
  {
    src: "/trabajos/10.webp",
    label: "Aérea · Cabañas",
    alt: "Toma aérea con dron de una cabaña de bambú con techo rojo entre vegetación",
  },
  {
    src: "/trabajos/11.webp",
    label: "Aérea · Cabañas",
    alt: "Toma aérea con dron de una cabaña con techo azul y rojo en una pradera",
  },
  {
    src: "/trabajos/12.webp",
    label: "Aérea · Piscina",
    alt: "Toma aérea con dron de una piscina turquesa rodeada de vegetación tropical",
  },
  {
    src: "/trabajos/13.webp",
    label: "Aérea · Cabañas",
    alt: "Toma aérea con dron de una cabaña de madera con jacuzzi en la terraza",
  },
  {
    src: "/trabajos/14.webp",
    label: "Aérea · Cabañas",
    alt: "Toma aérea con dron de una cabaña de madera con terraza y jacuzzi entre platanales",
  },
  {
    src: "/trabajos/15.webp",
    label: "Glamping",
    alt: "Domo geodésico rojo decorado con globos, jacuzzi y zona de comedor",
  },
  {
    src: "/trabajos/16.webp",
    label: "Aérea · Glamping",
    alt: "Toma aérea con dron de un domo geodésico blanco sobre terraza roja",
  },
];

const INTERVALO_MS = 6500; // tiempo que cada foto queda en pantalla
// El difuminado lento (2.5s) vive en la clase duration-[2500ms] de cada slide.

export default function UltimosTrabajos() {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActivo((a) => (a + 1) % TRABAJOS.length),
      INTERVALO_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="trabajos" className="bg-background py-unit-xl">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <p className="text-label-mono text-accent uppercase tracking-widest">
          Portafolio
        </p>
        <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary mt-unit-xs mb-unit-lg">
          Últimos Trabajos
        </h2>
      </div>

      {/* Carrusel estilo "Idea carrusel" (referencia del cliente): la imagen
          cubre todo el ancho y una franja del alto, con fundido lento. */}
      <div className="relative h-[70svh] w-full md:h-[88svh]">
        {TRABAJOS.map((t, i) => (
          <div
            key={t.src}
            aria-hidden={i !== activo || undefined}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out motion-reduce:transition-none ${
              i === activo ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={t.src}
              alt={i === activo ? t.alt : ""}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
            <span className="absolute bottom-unit-md left-margin-mobile md:left-margin-desktop text-label-mono uppercase tracking-widest text-primary bg-surface-container-high/80 px-2 py-1 rounded-full">
              {t.label}
            </span>
          </div>
        ))}

        {/* Puntos de navegación */}
        <div className="absolute bottom-unit-md right-margin-mobile md:right-margin-desktop flex gap-unit-xs">
          {TRABAJOS.map((t, i) => (
            <button
              key={t.src}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === activo || undefined}
              onClick={() => setActivo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${
                i === activo ? "bg-accent-light" : "bg-outline-variant hover:bg-outline"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-unit-lg">
        <Link
          href="/portafolio"
          className="inline-block text-label-mono uppercase tracking-widest border border-primary text-primary px-unit-lg py-unit-sm rounded-full hover:bg-primary hover:text-background transition-colors duration-150"
        >
          Ver portafolio completo
        </Link>
      </div>
    </section>
  );
}
