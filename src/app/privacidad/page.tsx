// Borrador 2026-10-29 para revisión de abogado.
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales — Reflexcam Photography",
  description:
    "Cómo Reflexcam Photography recoge, usa y protege los datos personales de quienes la contactan, y cómo ejercer sus derechos.",
};

const H2 = "text-headline-md text-primary mt-unit-xl mb-unit-md";
const LISTA = "list-disc pl-6 space-y-unit-xs";
const ENLACE = "text-accent-light underline hover:text-primary";

export default function PrivacidadPage() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-unit-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <p className="text-label-mono text-accent uppercase tracking-widest">
          Reflexcam Photography
        </p>
        <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-unit-xs mb-unit-lg max-w-3xl">
          Política de tratamiento de datos personales
        </h1>

        <div className="max-w-2xl text-body-lg text-on-surface-variant">
          <p>
            Esta política explica qué datos personales recibimos cuando usted
            visita este sitio o nos escribe, para qué los usamos y cómo puede
            consultarlos, corregirlos o pedir que los borremos. Se rige por la
            Ley 1581 de 2012 y el Decreto 1377 de 2013 (hoy compilado en el
            Decreto 1074 de 2015).
          </p>

          <h2 className={H2}>1. Quién es el responsable</h2>
          <ul className={LISTA}>
            <li>
              Responsable: Juan Esteban Hurtado, persona natural, cédula de
              ciudadanía 1.004.753.715, quien actúa bajo la marca Reflexcam
              Photography.
            </li>
            <li>Domicilio: Pereira, Colombia.</li>
            <li>Dirección para notificaciones: San Nicolás, Pereira.</li>
            <li>
              WhatsApp:{" "}
              <a
                className={ENLACE}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                +57 321 662 1901
              </a>
            </li>
            <li>Correo electrónico: reflexcamphotography@gmail.com o juanchoshu34@gmail.com.</li>
            <li>Sitio web: reflexcamph.com</li>
          </ul>

          <h2 className={H2}>2. Qué datos recibimos y por dónde</h2>
          <p>
            Este sitio no tiene formularios, no pide registro ni cuentas y no
            recoge datos por sí mismo. Recibimos datos personales solo por
            estos caminos:
          </p>
          <ul className={`${LISTA} mt-unit-sm`}>
            <li>
              <strong className="text-primary font-semibold">WhatsApp.</strong>{" "}
              Cuando usted nos escribe desde los botones del sitio recibimos su
              número de teléfono, el nombre de su perfil y lo que decida
              contarnos o enviarnos: su nombre, el tipo de sesión o proyecto,
              fechas, lugar, empresa o archivos de referencia.
            </li>
            <li>
              <strong className="text-primary font-semibold">
                Cuando contrata un servicio.
              </strong>{" "}
              Los datos necesarios para la cotización, el contrato, la
              coordinación, la entrega del material y el cobro.
            </li>
            <li>
              <strong className="text-primary font-semibold">
                Fotografías y videos.
              </strong>{" "}
              La imagen de las personas que fotografiamos o grabamos durante un
              trabajo.
            </li>
            <li>
              <strong className="text-primary font-semibold">
                Registros técnicos del alojamiento.
              </strong>{" "}
              Como cualquier página web, el proveedor que aloja el sitio
              (Vercel) procesa la dirección IP y datos básicos del navegador
              para entregar la página y protegerla de ataques. No usamos esos
              registros para identificar a nadie.
            </li>
          </ul>
          <p className="mt-unit-md">
            No pedimos datos sensibles. Si una imagen suya llegara a
            considerarse un dato sensible, entregar la autorización para
            publicarla es siempre facultativo: puede negarse sin que eso afecte
            el servicio contratado.
          </p>

          <h2 className={H2}>3. Para qué usamos los datos</h2>
          <ul className={LISTA}>
            <li>Responder sus mensajes y enviarle cotizaciones.</li>
            <li>Agendar, coordinar y realizar las sesiones o proyectos.</li>
            <li>Entregarle el material y atender ajustes o garantías.</li>
            <li>
              Cobrar, facturar y cumplir las obligaciones legales y contables.
            </li>
            <li>
              Mostrar fotos o videos en el portafolio y en nuestras redes
              sociales, solo si la persona que aparece lo autorizó de forma
              expresa.
            </li>
            <li>
              Enviarle novedades o promociones, solo si usted lo pidió o lo
              autorizó.
            </li>
          </ul>
          <p className="mt-unit-md">
            No vendemos ni alquilamos sus datos, y no los usamos para fines
            distintos a los de esta lista sin pedirle permiso antes.
          </p>

          <h2 className={H2}>4. Autorización</h2>
          <p>
            Al escribirnos por WhatsApp usted nos entrega sus datos de forma
            voluntaria para que le respondamos; esa conducta es su autorización
            para las finalidades de responder, cotizar y coordinar. Para
            publicar su imagen en el portafolio o en redes le pedimos una
            autorización expresa aparte, por escrito o por mensaje. Puede
            revocar cualquier autorización en cualquier momento, salvo cuando
            la ley o un contrato vigente nos obliguen a conservar los datos.
          </p>
          <p className="mt-unit-md">
            Si la sesión incluye a menores de edad, la autorización la da su
            padre, madre o representante legal, y el tratamiento respeta
            siempre el interés superior del menor.
          </p>

          <h2 className={H2}>5. Sus derechos</h2>
          <p>Como titular de los datos usted puede:</p>
          <ul className={`${LISTA} mt-unit-sm`}>
            <li>Conocer los datos que tenemos sobre usted.</li>
            <li>Actualizarlos o corregirlos si son inexactos o incompletos.</li>
            <li>
              Pedir que los borremos, cuando no exista un deber legal o
              contractual de conservarlos.
            </li>
            <li>Revocar la autorización que nos dio.</li>
            <li>Pedir prueba de la autorización y saber cómo usamos sus datos.</li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio
              (SIC) después de haber hecho su consulta o reclamo ante nosotros.
            </li>
          </ul>
          <p className="mt-unit-md">Ejercer estos derechos no tiene costo.</p>

          <h2 className={H2}>6. Cómo hacer una consulta o un reclamo</h2>
          <p>
            Escríbanos por WhatsApp al +57 321 662 1901 o al correo reflexcamphotography@gmail.com con:
          </p>
          <ul className={`${LISTA} mt-unit-sm`}>
            <li>Su nombre y número de identificación.</li>
            <li>Qué necesita: consultar, corregir, borrar o revocar.</li>
            <li>Si es un reclamo, los hechos y los documentos que lo apoyen.</li>
            <li>El medio por el que quiere recibir la respuesta.</li>
          </ul>
          <p className="mt-unit-md">
            Podemos pedirle que confirme su identidad antes de entregar o
            cambiar información. Los plazos de respuesta son:
          </p>
          <ul className={`${LISTA} mt-unit-sm`}>
            <li>
              Consultas: máximo 10 días hábiles. Si no alcanzamos, le avisamos
              el motivo y respondemos en máximo 5 días hábiles más.
            </li>
            <li>
              Reclamos: máximo 15 días hábiles. Si no alcanzamos, le avisamos
              el motivo y respondemos en máximo 8 días hábiles más.
            </li>
          </ul>

          <h2 className={H2}>7. Quién más procesa los datos</h2>
          <p>
            Para operar usamos proveedores que procesan datos por nuestra
            cuenta. Algunos tienen servidores fuera de Colombia, así que sus
            datos pueden ser transmitidos o transferidos a otros países:
          </p>
          <ul className={`${LISTA} mt-unit-sm`}>
            <li>
              WhatsApp, de Meta Platforms, por donde recibimos y respondemos
              sus mensajes. WhatsApp trata además datos por su propia cuenta,
              según sus condiciones y su política de privacidad.
            </li>
            <li>Vercel, que aloja este sitio web en servidores de Estados Unidos.</li>
            <li>
              Los servicios de almacenamiento en la nube con los que guardamos
              y entregamos el material de cada trabajo.
            </li>
          </ul>
          <p className="mt-unit-md">
            Solo compartimos con ellos lo necesario para cada finalidad.
          </p>

          <h2 className={H2}>8. Seguridad y conservación</h2>
          <p>
            El sitio funciona solo con conexión cifrada (HTTPS) y el acceso a
            los mensajes y al material de los clientes está limitado a quienes
            trabajan en cada proyecto. Conservamos los datos mientras sean
            necesarios para las finalidades de esta política o mientras la ley
            nos obligue (por ejemplo, para soportes contables); después los
            borramos.
          </p>

          <h2 className={H2}>9. Cookies</h2>
          <p>
            Este sitio no instala cookies, ni propias ni de terceros. Tampoco
            usa herramientas de analítica, píxeles de publicidad, videos o
            mapas incrustados, y la tipografía se sirve desde el mismo sitio.
            Los enlaces a WhatsApp, Instagram y TikTok solo lo llevan a esas
            plataformas; al abrirlas aplican sus propias políticas. Si algún
            día agregamos herramientas que usen cookies, actualizaremos esta
            política y le pediremos permiso antes de activarlas.
          </p>

          <h2 className={H2}>10. Vigencia y cambios</h2>
          <p>
            Esta política rige desde el 29 de octubre de 2026 y las bases de
            datos estarán vigentes mientras Reflexcam Photography preste sus
            servicios. Si cambiamos algo importante lo publicaremos en esta
            página, con la nueva fecha, antes de aplicarlo.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
