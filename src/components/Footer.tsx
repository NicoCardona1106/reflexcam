import { WHATSAPP_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="bg-background w-full py-unit-lg border-t border-outline-variant/10 text-primary text-label-mono relative z-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-unit-md max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start gap-unit-xs">
          <a
            className="text-primary hover:text-on-surface-variant transition-colors duration-150"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            WHATSAPP +57 311 791 8439
          </a>
          <div className="text-on-surface-variant">
            © 2026 REFLEXCAM PHOTOGRAPHY. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </div>
        <div className="flex gap-unit-md">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-150"
            href="/sobre-mi"
          >
            Sobre mí
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-150"
            href="https://instagram.com/Reflexcam01_"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-150"
            href="https://tiktok.com/@reflexcam01"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
