import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GaleriaPortafolio from "@/components/GaleriaPortafolio";
import { CATEGORIAS, FOTOS, type Categoria } from "@/lib/portafolio";

interface Props {
  params: Promise<{ categoria: string }>;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIAS).map((categoria) => ({ categoria }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const nombre = CATEGORIAS[categoria as Categoria];
  if (!nombre) return {};
  return {
    title: `${nombre} — Portafolio Reflexcam Photography`,
    description: `Fotografías de ${nombre.toLowerCase()} del portafolio de Reflexcam Photography.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  if (!(categoria in CATEGORIAS)) notFound();
  const cat = categoria as Categoria;
  const fotos = FOTOS.filter((f) => f.categoria === cat);

  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <Link
          href="/portafolio"
          className="text-label-mono text-accent uppercase tracking-widest hover:text-accent-light transition-colors duration-150"
        >
          ← Portafolio
        </Link>
        <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-unit-xs mb-unit-md">
          {CATEGORIAS[cat]}
        </h1>

        {/* Navegación entre categorías */}
        <div className="flex flex-wrap gap-unit-xs mb-unit-lg">
          {(Object.entries(CATEGORIAS) as [Categoria, string][]).map(
            ([id, label]) => (
              <Link
                key={id}
                href={`/portafolio/${id}`}
                aria-current={id === cat ? "page" : undefined}
                className={`text-label-mono uppercase tracking-widest px-unit-md py-unit-sm rounded-full border transition-colors duration-150 ${
                  id === cat
                    ? "bg-accent-light text-background border-accent-light"
                    : "border-outline-variant/40 text-on-surface-variant hover:border-outline hover:text-primary"
                }`}
              >
                {label}
              </Link>
            )
          )}
        </div>

        <GaleriaPortafolio fotos={fotos} />
      </main>

      <Footer />
    </div>
  );
}
