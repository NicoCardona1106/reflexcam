import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sobre mí — Reflexcam Photography",
  description:
    "Agencia creativa especializada en fotografía profesional, producción audiovisual y diseño gráfico.",
};

const SERVICIOS = [
  "Fotografía Profesional",
  "Producción Audiovisual",
  "Diseño Gráfico y Branding",
  "Contenido para Redes Sociales",
  "Fotografía de Producto y Publicidad",
  "Soluciones Creativas para Empresas y Emprendedores",
];

export default function SobreMiPage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <p className="text-label-mono text-accent uppercase tracking-widest">
          Reflexcam Photography
        </p>
        <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-unit-xs mb-unit-lg max-w-3xl">
          Sobre mí
        </h1>

        <div className="max-w-2xl space-y-unit-md text-body-lg text-on-surface-variant">
          <p>
            En Reflexcam Photography convertimos ideas en experiencias visuales
            que conectan, inspiran y generan impacto. Somos una agencia
            creativa especializada en fotografía profesional, producción
            audiovisual y diseño gráfico, dedicada a ayudar a marcas,
            emprendedores y empresas a destacar en un entorno cada vez más
            visual y competitivo.
          </p>
          <p>
            Nos apasiona capturar la esencia de cada proyecto a través de
            imágenes de alta calidad, videos dinámicos y diseños estratégicos
            que comunican mensajes de forma efectiva. Combinamos creatividad,
            técnica y atención al detalle para desarrollar contenido que
            fortalezca la identidad de marca y genere una conexión auténtica
            con el público.
          </p>
          <p>
            Nuestros servicios abarcan desde fotografía de producto,
            fotografía comercial y cobertura de eventos, hasta la creación de
            videos promocionales, contenido para redes sociales, identidad
            visual, piezas publicitarias y diseño gráfico profesional. Cada
            proyecto es una oportunidad para crear contenido único que refleje
            la personalidad y los valores de nuestros clientes.
          </p>
          <p>
            En Reflexcam Photography creemos que una imagen poderosa y un
            diseño bien pensado pueden marcar la diferencia entre ser visto y
            ser recordado.
          </p>
        </div>

        <h2 className="text-headline-md text-primary mt-unit-xl mb-unit-md">
          Nuestros servicios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-unit-sm max-w-3xl">
          {SERVICIOS.map((servicio) => (
            <div
              key={servicio}
              className="border border-outline-variant/20 bg-surface-container-low rounded px-unit-md py-unit-sm text-body-md text-primary"
            >
              {servicio}
            </div>
          ))}
        </div>

        <p className="text-label-mono text-outline uppercase tracking-widest mt-unit-xl max-w-2xl">
          Capturamos momentos, diseñamos experiencias y creamos contenido que
          impulsa tu marca.
        </p>
      </main>

      <Footer />
    </div>
  );
}
