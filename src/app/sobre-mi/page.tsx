import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre mí — Reflexcam Photography",
  description:
    "Juan Esteban Hurtado, fotógrafo, filmmaker y creador visual detrás de Reflexcam Photography.",
};

const wa = (texto: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(texto)}`;

// Trazos de 24×24 al estilo lucide; sin librería de iconos para seis dibujos.
const ICONOS = {
  camara: (
    <>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  claqueta: (
    <>
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </>
  ),
  pincel: (
    <>
      <path d="m14.622 17.897-10.68-2.913" />
      <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
      <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8 6 4-6 4V8z" />
    </>
  ),
  caja: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  bombillo: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </>
  ),
};

const SERVICIOS: { nombre: string; icono: keyof typeof ICONOS }[] = [
  { nombre: "Fotografía Profesional", icono: "camara" },
  { nombre: "Producción Audiovisual", icono: "claqueta" },
  { nombre: "Diseño Gráfico y Branding", icono: "pincel" },
  { nombre: "Contenido para Redes Sociales", icono: "play" },
  { nombre: "Fotografía de Producto y Publicidad", icono: "caja" },
  { nombre: "Soluciones Creativas", icono: "bombillo" },
];

function Icono({ nombre, className }: { nombre: keyof typeof ICONOS; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONOS[nombre]}
    </svg>
  );
}

function Flecha({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const ETIQUETA = "text-label-mono uppercase tracking-[0.35em] text-on-surface-variant";

export default function SobreMiPage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Portada: foto a la derecha que se funde con el fondo */}
        <section className="relative overflow-hidden border-b border-outline-variant/30 pt-16">
          <div className="absolute inset-0 md:left-auto md:w-[58%]">
            <Image
              src="/sobre-mi/juan.webp"
              alt="Juan Esteban Hurtado, fundador de Reflexcam Photography"
              fill
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-[50%_0%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10 md:bg-gradient-to-r md:from-background md:via-background/40 md:to-transparent" />
          </div>

          <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-64 pb-unit-xl md:py-28 lg:py-32">
            <p className={ETIQUETA}>Conoce más sobre</p>
            <h1 className="text-headline-lg-mobile text-[44px] md:text-headline-xl md:text-[88px] text-primary uppercase mt-unit-sm">
              Sobre mí
            </h1>
            <div className="h-px w-14 bg-primary/70 my-unit-lg" />
            <p className="text-body-lg text-on-surface max-w-md">
              Soy Juan Esteban Hurtado, fotógrafo, filmmaker y creador visual.
              Detrás de Reflexcam Photography está la pasión por contar
              historias a través de la imagen.
            </p>
            <Link
              href="/portafolio"
              className="group inline-flex items-center gap-unit-md mt-unit-lg text-label-mono uppercase tracking-[0.25em] text-primary"
            >
              <span className="grid place-items-center size-11 rounded-full border border-primary/70 group-hover:bg-primary group-hover:text-background transition-colors duration-150">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5 translate-x-px">
                  <path d="M7 4.5v15l12-7.5z" />
                </svg>
              </span>
              Ver mi trabajo
            </Link>
          </div>
        </section>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl">
          {/* Quiénes somos / Qué hacemos */}
          <section className="grid gap-unit-lg lg:grid-cols-[1fr_1.15fr_1fr_1.15fr] lg:gap-0">
            <div className="lg:pr-unit-lg">
              <p className={ETIQUETA}>Quiénes somos</p>
              <h2 className="text-headline-md md:text-[30px] md:leading-tight font-medium text-primary mt-unit-md">
                Una mirada creativa para grandes ideas
              </h2>
            </div>
            <div className="space-y-unit-sm text-caption text-on-surface-variant lg:border-l lg:border-outline-variant/60 lg:px-unit-lg">
              <p>
                En Reflexcam Photography combinamos experiencia, tecnología y
                creatividad para transformar proyectos en contenidos visuales
                que conectan, inspiran y perduran.
              </p>
              <p>
                Mi enfoque es entender tu visión y llevarla al siguiente nivel,
                ya sea a través de la fotografía, el video o el diseño.
              </p>
            </div>
            <div className="lg:border-l lg:border-outline-variant/60 lg:px-unit-lg">
              <p className={ETIQUETA}>Qué hacemos</p>
              <h2 className="text-headline-md md:text-[30px] md:leading-tight font-medium text-primary mt-unit-md">
                Creamos contenido con propósito
              </h2>
            </div>
            <p className="text-caption text-on-surface-variant lg:border-l lg:border-outline-variant/60 lg:pl-unit-lg">
              Ofrecemos soluciones audiovisuales y gráficas para marcas,
              empresas y personas que buscan destacar. Desde una sesión
              fotográfica hasta una estrategia visual completa, trabajamos
              contigo en cada detalle.
            </p>
          </section>

          {/* Servicios */}
          <section className="mt-unit-xl">
            <div className="flex items-center gap-unit-lg">
              <h2 className={ETIQUETA}>Nuestros servicios</h2>
              <div className="h-px flex-1 bg-outline-variant/60" />
            </div>
            <ul className="grid gap-unit-md sm:grid-cols-2 lg:grid-cols-3 mt-unit-lg">
              {SERVICIOS.map((s) => (
                <li key={s.nombre}>
                  <a
                    href={wa(`Hola Reflexcam, me interesa: ${s.nombre}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-unit-md h-full border border-outline-variant/60 bg-surface-container-lowest px-unit-lg py-5 text-body-md text-primary hover:border-primary/60 transition-colors duration-150"
                  >
                    <Icono nombre={s.icono} className="size-7 shrink-0 text-on-surface" />
                    <span className="flex-1">{s.nombre}</span>
                    <Flecha className="size-4 shrink-0 text-on-surface-variant group-hover:translate-x-1 group-hover:text-primary transition duration-150" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Llamado final */}
          <section className="relative overflow-hidden mt-unit-xl border border-outline-variant/40 bg-surface-container-lowest">
            <div className="absolute inset-y-0 left-0 hidden md:block w-1/2">
              <Image
                src="/equipo/nikond5600.webp"
                alt=""
                fill
                sizes="50vw"
                className="object-cover grayscale opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container-lowest/60 to-surface-container-lowest" />
            </div>
            <div className="relative flex flex-col md:flex-row md:items-center gap-unit-lg px-unit-lg py-unit-lg md:py-10 md:pl-[46%] md:pr-unit-lg lg:pr-unit-xl">
              <div className="flex-1">
                <p className="text-label-mono leading-relaxed uppercase tracking-[0.25em] text-on-surface-variant">
                  ¿Tienes un proyecto en mente?
                </p>
                <p className="text-headline-md md:text-[30px] md:leading-tight font-medium text-primary mt-unit-sm">
                  Hablemos y hagámoslo realidad.
                </p>
              </div>
              <a
                href={wa("Hola Reflexcam, tengo un proyecto en mente")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-unit-md self-start md:self-auto border border-primary/70 px-unit-lg py-unit-md text-label-mono uppercase tracking-widest text-primary hover:bg-primary hover:text-background transition-colors duration-150"
              >
                Contactar ahora
                <Flecha className="size-4 group-hover:translate-x-1 transition-transform duration-150" />
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
