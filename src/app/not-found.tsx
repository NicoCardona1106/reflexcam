import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Página no encontrada — Reflexcam Photography",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <p className="text-label-mono text-accent uppercase tracking-widest">
          Error 404
        </p>
        <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-unit-xs mb-unit-lg max-w-3xl">
          Esta página no existe
        </h1>
        <p className="max-w-2xl text-body-lg text-on-surface-variant mb-unit-lg">
          Puede que el enlace esté mal escrito o que la página ya no esté. Vuelve
          al inicio o mira el portafolio de Reflexcam Photography.
        </p>
        <div className="flex gap-unit-md text-label-mono uppercase tracking-widest">
          <Link
            href="/"
            className="text-primary hover:text-accent-light transition-colors duration-150"
          >
            Ir al inicio
          </Link>
          <Link
            href="/portafolio"
            className="text-accent hover:text-accent-light transition-colors duration-150"
          >
            Ver portafolio
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
