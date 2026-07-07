// Fuente única de fotos del sitio: página /portafolio y carrusel "Últimos Trabajos"
// (el carrusel muestra las 10 más recientes por fecha).
// Para agregar fotos: convertir a WebP (máx 1600px) en public/portafolio/ y añadir
// la entrada aquí con fecha = día en que el cliente entregó/subió la foto.

export const CATEGORIAS = {
  retratos: 'Retratos',
  urbano: 'Urbano',
  lifestyle: 'Lifestyle',
  producto: 'Producto',
  comercial: 'Comercial',
  aerea: 'Aérea',
} as const;

export type Categoria = keyof typeof CATEGORIAS;

export interface Foto {
  src: string;
  width: number;
  height: number;
  categoria: Categoria;
  alt: string;
  /** Fecha de subida (YYYY-MM-DD) — ordena el carrusel de últimos trabajos */
  fecha: string;
}

export const FOTOS: Foto[] = [
  {
    src: "/portafolio/retratos-01.webp",
    width: 1600,
    height: 902,
    categoria: "retratos",
    alt: "Retrato de estudio de una mujer joven con camiseta blanca y tatuaje floral en el brazo",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-02.webp",
    width: 1600,
    height: 944,
    categoria: "retratos",
    alt: "Primer plano de estudio de una mujer joven con cabello rojizo sobre fondo claro",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-03.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Detalle de tatuaje de manga floral y lencería roja en sesión de estudio",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-04.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Sesión de estudio con luz natural de una mujer con tatuaje de manga",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/lifestyle-01.webp",
    width: 1600,
    height: 1600,
    categoria: "lifestyle",
    alt: "Mujer con casco posando sobre una motocicleta deportiva entre árboles",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/lifestyle-02.webp",
    width: 1066,
    height: 1600,
    categoria: "lifestyle",
    alt: "Retrato con casco sobre una moto deportiva en exterior",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/lifestyle-03.webp",
    width: 1051,
    height: 1600,
    categoria: "lifestyle",
    alt: "Motociclista con casco sentada en una moto deportiva con el faro encendido en carretera",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/lifestyle-04.webp",
    width: 1600,
    height: 1600,
    categoria: "lifestyle",
    alt: "Mujer posando de pie junto a una motocicleta en una carretera rural",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-05.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato exterior de una mujer con vestido floral entre árboles",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-06.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Mujer con vestido floral mirando hacia el cielo en un bosque",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-01.webp",
    width: 1013,
    height: 1600,
    categoria: "urbano",
    alt: "Retrato urbano de una joven con gafas de sol y guantes largos",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-02.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Retrato urbano en contrapicado de una joven con gorra entre palmeras",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-03.webp",
    width: 1600,
    height: 607,
    categoria: "urbano",
    alt: "Primer plano de una joven con gorra y gafas de sol",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-04.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Joven con gorra y jeans anchos posando en un sendero arbolado",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-05.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Joven con gorra posando en un sendero de concreto entre jardines",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-07.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato artístico con maquillaje de catrina y corona de rosas",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/lifestyle-05.webp",
    width: 1066,
    height: 1600,
    categoria: "lifestyle",
    alt: "Hombre con ropa camuflada posando frente a un automóvil bajo un cielo nublado",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/lifestyle-06.webp",
    width: 1066,
    height: 1600,
    categoria: "lifestyle",
    alt: "Joven sentado junto a un automóvil en una calle con palmeras",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-08.webp",
    width: 1600,
    height: 955,
    categoria: "retratos",
    alt: "Retrato de un hombre sonriente sentado en una banca de jardín",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-09.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato de un hombre con camisa apoyado en una baranda de madera",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/comercial-01.webp",
    width: 1067,
    height: 1600,
    categoria: "comercial",
    alt: "Detalle de máquina delineando la barba en una barbería",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/comercial-02.webp",
    width: 1067,
    height: 1600,
    categoria: "comercial",
    alt: "Barbero perfilando la ceja de un cliente con navaja",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/comercial-03.webp",
    width: 1067,
    height: 1600,
    categoria: "comercial",
    alt: "Retrato de perfil de un cliente de barbería frente a un aro de luz",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-10.webp",
    width: 1067,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato exterior de una mujer con corset blanco y tatuajes",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-11.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Mujer con corset blanco posando con montañas de fondo",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/retratos-12.webp",
    width: 1067,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato de cuerpo medio de una mujer con corset blanco y jeans",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-01.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Fotografía de producto de una pulsera roja con medalla dorada de San Benito y circones",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-02.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle de pulseras rojas tejidas con medallas doradas de San Benito",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-03.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Dos pulseras rojas con medallas doradas exhibidas sobre una almohadilla blanca",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-04.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Pulseras rojas con medallas de San Benito en oro sobre fondo blanco",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-05.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Aretes de zafiro azul en una caja de joyería roja",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-06.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle macro de aretes con piedras azules sobre una superficie blanca",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-07.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Anillo de oro con esmeraldas y diamantes en caja de terciopelo rojo",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-08.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Anillo de esmeraldas en una caja de joyería de terciopelo rojo",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-09.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle lateral de un anillo de oro con esmeraldas y circones",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-10.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Collar de oro con dijes de flor exhibido en un busto de joyería",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/producto-11.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle de una pulsera de oro con dije de flor y nácar",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-06.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Sesión urbana nocturna de dos artistas junto a un carro deportivo",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-07.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Dos jóvenes con ropa oscura posando frente a un carro deportivo de noche",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-08.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Sesión nocturna de estilo urbano junto a un carro deportivo blanco",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-09.webp",
    width: 1067,
    height: 1600,
    categoria: "urbano",
    alt: "Retrato nocturno de una mujer con gorra y chaqueta oscura",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-10.webp",
    width: 1067,
    height: 1600,
    categoria: "urbano",
    alt: "Mujer con gorra posando de perfil en sesión urbana nocturna",
    fecha: "2026-06-24"
  },
  {
    src: "/portafolio/urbano-11.webp",
    width: 1600,
    height: 818,
    categoria: "urbano",
    alt: "Retrato nocturno con flash de una mujer con gorra y cadena dorada",
    fecha: "2026-06-24"
  },
  {
    src: "/trabajos/00.webp",
    width: 3840,
    height: 2877,
    categoria: "aerea",
    alt: "Toma aérea con dron de una casa moderna con piscina en medio de montañas verdes",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/01.webp",
    width: 3840,
    height: 2778,
    categoria: "aerea",
    alt: "Toma aérea con dron de un domo geodésico de glamping junto a una cabaña",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/02.webp",
    width: 3840,
    height: 2875,
    categoria: "aerea",
    alt: "Toma aérea con dron de un domo geodésico verde sobre terraza de madera",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/03.webp",
    width: 3840,
    height: 2152,
    categoria: "aerea",
    alt: "Toma aérea con dron de un domo geodésico azul con jacuzzi en la terraza",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/04.webp",
    width: 3667,
    height: 2750,
    categoria: "aerea",
    alt: "Toma aérea con dron de un domo geodésico verde en una pradera",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/05.webp",
    width: 3840,
    height: 2560,
    categoria: "comercial",
    alt: "Interior de domo de glamping con cama decorada con pétalos y globos",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/06.webp",
    width: 3840,
    height: 2560,
    categoria: "comercial",
    alt: "Interior de domo de glamping con cama y decoración romántica",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/07.webp",
    width: 3840,
    height: 2560,
    categoria: "comercial",
    alt: "Detalle de toallas decoradas y pétalos de rosa sobre una cama",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/08.webp",
    width: 3840,
    height: 2042,
    categoria: "retratos",
    alt: "Pareja en cama decorada con globos rojos que forman la frase Te Amo",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/09.webp",
    width: 3840,
    height: 5761,
    categoria: "retratos",
    alt: "Retrato cercano de una pareja sonriendo con globos rojos de fondo",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/10.webp",
    width: 3840,
    height: 2880,
    categoria: "aerea",
    alt: "Toma aérea con dron de una cabaña de bambú con techo rojo entre vegetación",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/11.webp",
    width: 3840,
    height: 2478,
    categoria: "aerea",
    alt: "Toma aérea con dron de una cabaña con techo azul y rojo en una pradera",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/12.webp",
    width: 3840,
    height: 2549,
    categoria: "aerea",
    alt: "Toma aérea con dron de una piscina turquesa rodeada de vegetación tropical",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/13.webp",
    width: 3840,
    height: 2214,
    categoria: "aerea",
    alt: "Toma aérea con dron de una cabaña de madera con jacuzzi en la terraza",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/14.webp",
    width: 3840,
    height: 2200,
    categoria: "aerea",
    alt: "Toma aérea con dron de una cabaña de madera con terraza y jacuzzi entre platanales",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/15.webp",
    width: 3840,
    height: 2100,
    categoria: "comercial",
    alt: "Domo geodésico rojo decorado con globos, jacuzzi y zona de comedor",
    fecha: "2026-07-03"
  },
  {
    src: "/trabajos/16.webp",
    width: 3632,
    height: 2724,
    categoria: "aerea",
    alt: "Toma aérea con dron de un domo geodésico blanco sobre terraza roja",
    fecha: "2026-07-03"
  }
];

/** Las N fotos más recientes por fecha (a igual fecha, las últimas del listado). */
export function ultimasFotos(n: number): Foto[] {
  return FOTOS.map((f, i) => ({ f, i }))
    .sort((a, b) => b.f.fecha.localeCompare(a.f.fecha) || b.i - a.i)
    .slice(0, n)
    .map(({ f }) => f);
}
