"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CATEGORIAS, type Foto } from "@/lib/portafolio";

/** Grilla masonry + lightbox para un listado de fotos ya filtrado. */
export default function GaleriaPortafolio({ fotos }: { fotos: Foto[] }) {
  // índice dentro de `fotos` de la foto ampliada; null = lightbox cerrado
  const [ampliada, setAmpliada] = useState<number | null>(null);

  const cerrar = useCallback(() => setAmpliada(null), []);
  const mover = useCallback(
    (delta: number) =>
      setAmpliada((a) =>
        a === null ? a : (a + delta + fotos.length) % fotos.length
      ),
    [fotos.length]
  );

  useEffect(() => {
    if (ampliada === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [ampliada, cerrar, mover]);

  const foto = ampliada === null ? null : fotos[ampliada];

  return (
    <div>
      {/* Masonry con CSS columns (sin dependencias) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-unit-md">
        {fotos.map((f, i) => (
          <button
            key={f.src}
            onClick={() => setAmpliada(i)}
            className="group relative block w-full mb-unit-md break-inside-avoid rounded-lg overflow-hidden border border-outline-variant/20 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-accent-light"
            aria-label={`Ampliar: ${f.alt}`}
          >
            <Image
              src={f.src}
              alt={f.alt}
              width={f.width}
              height={f.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {foto && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={foto.alt}
          onClick={cerrar}
        >
          <div
            className="relative max-w-[92vw] max-h-[86vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              width={foto.width}
              height={foto.height}
              sizes="92vw"
              className="w-auto h-auto max-w-[92vw] max-h-[86vh] object-contain rounded"
            />
            <p className="absolute -bottom-8 left-0 right-0 text-center text-label-mono uppercase tracking-widest text-on-surface-variant">
              {CATEGORIAS[foto.categoria]} · {ampliada! + 1} / {fotos.length}
            </p>
          </div>

          <button
            onClick={cerrar}
            aria-label="Cerrar"
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-surface-container-high text-primary text-xl hover:bg-surface-container-highest transition-colors duration-150 cursor-pointer"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              mover(-1);
            }}
            aria-label="Foto anterior"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-surface-container-high text-primary text-xl hover:bg-surface-container-highest transition-colors duration-150 cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              mover(1);
            }}
            aria-label="Foto siguiente"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-surface-container-high text-primary text-xl hover:bg-surface-container-highest transition-colors duration-150 cursor-pointer"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
