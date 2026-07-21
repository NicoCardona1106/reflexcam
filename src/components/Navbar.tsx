import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";

const LINK_CLASS =
  "text-on-surface-variant font-medium hover:text-accent-light transition-colors duration-150 cursor-pointer active:opacity-70 text-label-mono";

export default function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-outline-variant/10 text-primary">
      <div className="flex justify-between items-center gap-unit-md h-16 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Reflex Cam Photography"
            width={256}
            height={256}
            className="h-9 w-9 sm:hidden"
            priority
          />
          <Image
            src="/logo-full.png"
            alt="Reflex Cam Photography"
            width={656}
            height={144}
            className="hidden h-9 w-auto sm:block"
            priority
          />
        </Link>
        <div className="flex gap-unit-sm md:gap-unit-md">
          <Link className={LINK_CLASS} href="/portafolio">
            Portafolio
          </Link>
          <Link className={LINK_CLASS} href="/#equipo">
            Equipo
          </Link>
          <Link className={LINK_CLASS} href="/#contacto">
            Contacto
          </Link>
          <Link className={LINK_CLASS} href="/sobre-mi">
            Sobre mí
          </Link>
        </div>
        {/* ponytail: "Agendar" abre WhatsApp por ahora; en fase posterior será un formulario propio */}
        <a
          href={`${WHATSAPP_URL}?text=Hola%20Reflexcam%2C%20quiero%20agendar%20una%20sesi%C3%B3n`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block text-label-mono uppercase tracking-widest bg-accent-light text-background px-unit-md py-unit-sm rounded-full hover:bg-accent transition-colors duration-150"
        >
          Agendar
        </a>
      </div>
    </nav>
  );
}
