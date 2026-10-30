// Borrador 2026-10-29 para revisión de abogado.
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones de uso — Reflexcam Photography",
  description:
    "Condiciones de uso del sitio de Reflexcam Photography: contenido informativo, propiedad del portafolio y ley aplicable.",
};

const H2 = "text-headline-md text-primary mt-unit-xl mb-unit-md";
const LISTA = "list-disc pl-6 space-y-unit-xs";
const ENLACE = "text-accent-light underline hover:text-primary";

export default function TerminosPage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <p className="text-label-mono text-accent uppercase tracking-widest">
          Reflexcam Photography
        </p>
        <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-unit-xs mb-unit-lg max-w-3xl">
          Términos y condiciones de uso
        </h1>

        <div className="max-w-2xl text-body-lg text-on-surface-variant">
          <p>
            Estos términos regulan el uso del sitio reflexcamph.com. Al
            navegarlo usted los acepta; si no está de acuerdo, le pedimos no
            usarlo.
          </p>

          <h2 className={H2}>1. Quién opera el sitio</h2>
          <p>
            El sitio lo opera Juan Esteban Hurtado, persona natural, cédula de
            ciudadanía 1.004.753.715, quien actúa bajo la marca Reflexcam
            Photography, con domicilio en Pereira, Colombia. Contacto:
            WhatsApp{" "}
            <a
              className={ENLACE}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              +57 321 662 1901
            </a>{" "}
            o correo reflexcamphotography@gmail.com.
          </p>

          <h2 className={H2}>2. El sitio es informativo</h2>
          <p>
            Aquí mostramos nuestro portafolio y describimos en general los
            servicios de fotografía, producción audiovisual y diseño gráfico.
            En el sitio no se venden productos, no se reciben pagos y no hay
            cuentas de usuario.
          </p>
          <p className="mt-unit-md">
            Cada servicio se acuerda aparte, en la cotización o el contrato del
            proyecto, donde quedan el alcance, el precio, las fechas, las
            entregas y los usos permitidos de las imágenes. Si algo de lo que
            dice este sitio no coincide con lo acordado, prevalece la
            cotización o el contrato.
          </p>

          <h2 className={H2}>3. Propiedad del contenido</h2>
          <p>
            Las fotografías, videos, diseños, textos, el logo y la marca
            Reflexcam Photography que aparecen en el sitio están protegidos por
            las normas de derechos de autor y de propiedad industrial. Sin
            permiso escrito no se permite:
          </p>
          <ul className={`${LISTA} mt-unit-sm`}>
            <li>Copiar, descargar o reproducir el contenido para otro uso.</li>
            <li>Editarlo, recortarlo o quitarle la autoría.</li>
            <li>Usarlo con fines comerciales o publicitarios.</li>
            <li>Usarlo para entrenar sistemas de inteligencia artificial.</li>
          </ul>
          <p className="mt-unit-md">
            El contenido de terceros conserva su propia licencia; por ejemplo,
            la foto de la cámara Nikon D5600 es de Michael Kramer y se usa bajo
            la licencia CC BY-SA 3.0 indicada en el pie de página. Las personas
            que aparecen en el portafolio conservan sus derechos sobre su
            imagen. Los derechos de uso del material que entregamos a cada
            cliente se rigen por su contrato.
          </p>

          <h2 className={H2}>4. Enlaces a otras plataformas</h2>
          <p>
            Los botones de WhatsApp, Instagram y TikTok lo llevan a servicios de
            terceros que tienen sus propios términos y políticas. No
            controlamos esas plataformas ni respondemos por su funcionamiento.
          </p>

          <h2 className={H2}>5. Uso correcto del sitio</h2>
          <p>
            Le pedimos no intentar dañar el sitio, alterar su funcionamiento,
            acceder a partes no públicas ni extraer su contenido de forma
            automática o masiva.
          </p>

          <h2 className={H2}>6. Responsabilidad</h2>
          <p>
            Procuramos que la información esté al día y que el sitio funcione
            sin interrupciones, pero puede tener errores, cambios o caídas
            temporales. No respondemos por daños derivados de esas fallas, del
            uso que se haga de la información del sitio ni de las plataformas
            de terceros, salvo en los casos de dolo o culpa grave. Nada de lo
            anterior limita los derechos que la Ley 1480 de 2011 (Estatuto del
            Consumidor) le reconoce cuando sea aplicable.
          </p>

          <h2 className={H2}>7. Datos personales</h2>
          <p>
            El uso de los datos que nos entrega al escribirnos se explica en la{" "}
            <Link className={ENLACE} href="/privacidad">
              Política de tratamiento de datos personales
            </Link>
            .
          </p>

          <h2 className={H2}>8. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de la República de Colombia.
            Si surge un desacuerdo, primero buscaremos resolverlo de forma
            directa con usted; si no es posible, lo decidirán los jueces
            competentes de Colombia.
          </p>

          <h2 className={H2}>9. Vigencia y cambios</h2>
          <p>
            Estos términos rigen desde el 29 de octubre de 2026. Si los
            cambiamos, publicaremos la nueva versión en esta página con su
            fecha.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
