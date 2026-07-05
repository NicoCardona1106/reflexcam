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
  openGraph: {
    title: "Reflexcam Photography",
    description:
      "Agencia creativa de fotografía profesional, producción audiovisual y diseño gráfico.",
    images: "/og.jpg",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
