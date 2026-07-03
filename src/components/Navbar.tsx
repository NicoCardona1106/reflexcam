import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site";

export default function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-outline-variant/10 text-primary">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <div className="flex items-center gap-unit-sm">
          <Image src="/logo.png" alt="Reflexcam" width={36} height={36} className="rounded-full" priority />
          <span className="hidden sm:inline text-label-mono tracking-widest text-primary uppercase">
            REFLEXCAM
          </span>
        </div>
        <div className="flex gap-unit-sm md:gap-unit-md">
          <Link
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-150 cursor-pointer active:opacity-70 text-label-mono"
            href="/#trabajos"
          >
            Trabajos
          </Link>
          <Link
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-150 cursor-pointer active:opacity-70 text-label-mono"
            href="/#equipo"
          >
            Equipo
          </Link>
          <Link
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-150 cursor-pointer active:opacity-70 text-label-mono"
            href="/#contacto"
          >
            Contacto
          </Link>
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-block text-label-mono uppercase tracking-widest border border-primary px-unit-md py-unit-xs rounded hover:bg-primary hover:text-on-primary transition-colors duration-150"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
