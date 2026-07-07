import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CATEGORIAS } from "@/lib/portafolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/portafolio`, priority: 0.9 },
    ...Object.keys(CATEGORIAS).map((categoria) => ({
      url: `${SITE_URL}/portafolio/${categoria}`,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/sobre-mi`, priority: 0.8 },
  ];
}
