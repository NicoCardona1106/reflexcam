import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GaleriaPortafolio from "@/components/GaleriaPortafolio";

export const metadata: Metadata = {
  title: "Portafolio — Reflexcam Photography",
  description:
    "Portafolio completo de Reflexcam Photography: retratos, sesiones urbanas, lifestyle, fotografía de producto y comercial.",
};

export default function PortafolioPage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <p className="text-label-mono text-accent uppercase tracking-widest">
          Reflexcam Photography
        </p>
        <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-unit-xs mb-unit-sm">
          Portafolio
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mb-unit-lg">
          Una selección de nuestro trabajo en retrato, fotografía urbana,
          lifestyle, producto y comercial.
        </p>

        <GaleriaPortafolio />
      </main>

      <Footer />
    </div>
  );
}
