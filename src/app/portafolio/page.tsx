import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIAS, FOTOS, type Categoria } from "@/lib/portafolio";

export const metadata: Metadata = {
  title: "Portafolio — Reflexcam Photography",
  description:
    "Portafolio completo de Reflexcam Photography: retratos, sesiones urbanas, fotografía aérea, producto, comercial y lifestyle.",
};

// Franjas por categoría al estilo de la referencia del cliente ("Idea carrusel"):
// foto a ancho completo, nombre espaciado y botón ver. Orden y portada curados.
const PORTADAS: { categoria: Categoria; src: string }[] = [
  { categoria: "retratos", src: "/portafolio/retratos-07.webp" },
  { categoria: "urbano", src: "/portafolio/urbano-02.webp" },
  { categoria: "aerea", src: "/trabajos/00.webp" },
  { categoria: "producto", src: "/portafolio/producto-01.webp" },
  { categoria: "comercial", src: "/portafolio/comercial-03.webp" },
  { categoria: "lifestyle", src: "/portafolio/lifestyle-03.webp" },
];

export default function PortafolioPage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1 pt-16">
        <div className="text-center pt-unit-xl pb-unit-lg px-margin-mobile">
          <p className="text-label-mono text-accent uppercase tracking-widest">
            Reflexcam Photography
          </p>
          <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-unit-xs">
            Portafolio
          </h1>
        </div>

        {PORTADAS.map(({ categoria, src }, i) => {
          const total = FOTOS.filter((f) => f.categoria === categoria).length;
          return (
            <Link
              key={categoria}
              href={`/portafolio/${categoria}`}
              className="group relative block h-[40svh] md:h-[52svh] overflow-hidden"
            >
              <Image
                src={src}
                alt={`Categoría ${CATEGORIAS[categoria]}`}
                fill
                sizes="100vw"
                // son solo 6 portadas: cargan todas de una para que el
                // scroll nunca encuentre una franja vacía
                loading="eager"
                preload={i === 0}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-background/45 group-hover:bg-background/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-unit-sm">
                <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary uppercase tracking-[0.35em] pl-[0.35em] text-center">
                  {CATEGORIAS[categoria]}
                </h2>
                <span className="text-label-mono uppercase tracking-widest text-primary border border-primary/70 px-unit-md py-1.5 rounded-full group-hover:bg-primary group-hover:text-background transition-colors duration-150">
                  Ver · {total}
                </span>
              </div>
            </Link>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
