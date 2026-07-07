"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORIAS, ultimasFotos } from "@/lib/portafolio";

// Las 10 fotos más recientes por fecha de subida (ver src/lib/portafolio.ts)
const TRABAJOS = ultimasFotos(10);

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

  const siguiente = (activo + 1) % TRABAJOS.length;

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
              // el slide activo y el siguiente se descargan de inmediato para
              // que el fundido nunca muestre una foto a medio cargar
              loading={i === activo || i === siguiente ? "eager" : "lazy"}
              preload={i === 0}
              className="object-cover"
            />
            <span className="absolute bottom-unit-md left-margin-mobile md:left-margin-desktop text-label-mono uppercase tracking-widest text-primary bg-surface-container-high/80 px-2 py-1 rounded-full">
              {CATEGORIAS[t.categoria]}
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
