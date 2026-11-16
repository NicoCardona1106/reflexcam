<div align="center">

<img src="public/og.jpg" alt="Reflexcam Photography" width="720">

# Reflexcam Photography

**Fotografía, video y diseño que hacen que tu marca se recuerde.**

[reflexcamph.com](https://reflexcamph.com) · Pereira, Colombia

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-desplegado-000?logo=vercel)

</div>

---

## Qué hay en el sitio

| Ruta | Qué muestra |
|---|---|
| `/` | Portada con la cámara que gira (secuencia de fotogramas), últimos trabajos, equipo y contacto |
| `/portafolio` | Galería completa, filtrable por categoría (`/portafolio/retratos`, `/urbano`, `/lifestyle`…) |
| `/sobre-mi` | Quién está detrás de Reflexcam, servicios y contacto directo por WhatsApp |
| `/privacidad` · `/terminos` | Política de tratamiento de datos (Ley 1581) y términos |

Todo es estático: no hay base de datos ni variables de entorno obligatorias.

## Correrlo en tu equipo

Necesitas Node.js 20 o superior.

```bash
npm ci        # instala las dependencias exactas del package-lock
npm run dev   # http://localhost:3000
```

Antes de subir cambios, comprueba que compile:

```bash
npm run build
```

## Cambios frecuentes

### Agregar fotos al portafolio

1. Convierte la foto a **WebP de máximo 1600 px** y guárdala en `public/portafolio/` (por ejemplo `retratos-05.webp`).
2. Agrega su entrada en [`src/lib/portafolio.ts`](src/lib/portafolio.ts):

   ```ts
   {
     src: "/portafolio/retratos-05.webp",
     width: 1600,
     height: 1067,
     categoria: "retratos",
     alt: "Describe lo que se ve en la foto",
     fecha: "2026-11-20", // día en que se entregó; las 10 más recientes salen en «Últimos trabajos»
   },
   ```

Las categorías disponibles están al inicio del mismo archivo.

### Cambiar la foto de «Sobre mí»

Reemplaza `public/sobre-mi/juan.webp` por la nueva, con el mismo nombre. Funciona mejor una foto vertical; la página la pasa a blanco y negro con el degradado.

### Número de WhatsApp y dominio

Ambos viven en [`src/lib/site.ts`](src/lib/site.ts). Todos los botones de contacto del sitio salen de ahí.

### Textos y servicios

- Portada: componentes en [`src/components/`](src/components/) (`Hero`, `UltimosTrabajos`, `Equipo`, `Footer`…).
- Sobre mí y servicios: [`src/app/sobre-mi/page.tsx`](src/app/sobre-mi/page.tsx).
- Colores, tipografía y espaciados: tokens en [`src/app/globals.css`](src/app/globals.css).

## Estructura

```
public/
  frames/       fotogramas de la cámara del hero (escritorio y móvil)
  portafolio/   fotos de la galería (WebP)
  sobre-mi/     foto de la página Sobre mí
  equipo/       fotos del equipo fotográfico (cámara, dron, estabilizador…)
scripts/        herramientas para procesar fotos y fotogramas (ffmpeg / sharp)
src/
  app/          páginas (App Router de Next.js)
  components/   piezas de la interfaz
  lib/          datos del sitio: fotos del portafolio, WhatsApp y dominio
```

## Publicar

Cada push a `master` se despliega solo en Vercel. Para probar algo sin publicarlo, súbelo a otra rama: Vercel genera una vista previa con su propio enlace.

## Créditos

Este sitio es un trabajo en colaboración entre:

- **Juan Esteban Hurtado** ([@Juanes3324](https://github.com/Juanes3324)): fotografía, video y dirección creativa.
- **Nicolas Cardona** ([@NicoCardona1106](https://github.com/NicoCardona1106)): diseño y desarrollo web.

Además de ser el sitio oficial de Reflexcam, el proyecto hace parte del trabajo final universitario de Juan Esteban Hurtado.

© 2026 Reflexcam Photography. Las fotos del portafolio y de «Sobre mí» son de Reflexcam y no se pueden usar sin permiso.
