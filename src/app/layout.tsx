import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import WhatsAppFab from "@/components/WhatsAppFab";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Reflexcam Photography",
  description:
    "Agencia creativa de fotografía profesional, producción audiovisual y diseño gráfico.",
  icons: { icon: "/logo.png" },
  // "./" se resuelve contra la URL de cada página: canónica absoluta en todas.
  alternates: { canonical: "./" },
  openGraph: {
    title: "Reflexcam Photography",
    description:
      "Agencia creativa de fotografía profesional, producción audiovisual y diseño gráfico.",
    images: "/og.jpg",
    url: "./",
    locale: "es_CO",
    type: "website",
  },
};

// Ficha de negocio local para buscadores; el "<" se escapa para que el JSON no cierre el script.
const NEGOCIO_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Reflexcam Photography",
  description:
    "Agencia creativa de fotografía profesional, producción audiovisual y diseño gráfico.",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  telephone: "+57 321 662 1901",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pereira",
    addressCountry: "CO",
  },
  sameAs: [
    "https://instagram.com/Reflexcam01_",
    "https://tiktok.com/@reflexcam01",
  ],
}).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: NEGOCIO_JSON_LD }}
        />
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
