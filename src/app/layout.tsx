import type { Metadata } from "next";
import { Geist } from "next/font/google";
import WhatsAppFab from "@/components/WhatsAppFab";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
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
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
