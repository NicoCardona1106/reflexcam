// Generado a partir de Contenido Visual/Galería de fotos (43 fotos del cliente).
// Para agregar fotos: convertir a WebP (máx 1600px) en public/portafolio/ y añadir la entrada aquí.

export const CATEGORIAS = {
  retratos: 'Retratos',
  urbano: 'Urbano',
  lifestyle: 'Lifestyle',
  producto: 'Producto',
  comercial: 'Comercial',
} as const;

export type Categoria = keyof typeof CATEGORIAS;

export interface Foto {
  src: string;
  width: number;
  height: number;
  categoria: Categoria;
  alt: string;
}

export const FOTOS: Foto[] = [
  {
    src: "/portafolio/retratos-01.webp",
    width: 1600,
    height: 902,
    categoria: "retratos",
    alt: "Retrato de estudio de una mujer joven con camiseta blanca y tatuaje floral en el brazo"
  },
  {
    src: "/portafolio/retratos-02.webp",
    width: 1600,
    height: 944,
    categoria: "retratos",
    alt: "Primer plano de estudio de una mujer joven con cabello rojizo sobre fondo claro"
  },
  {
    src: "/portafolio/retratos-03.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Detalle de tatuaje de manga floral y lencería roja en sesión de estudio"
  },
  {
    src: "/portafolio/retratos-04.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Sesión de estudio con luz natural de una mujer con tatuaje de manga"
  },
  {
    src: "/portafolio/lifestyle-01.webp",
    width: 1600,
    height: 1600,
    categoria: "lifestyle",
    alt: "Mujer con casco posando sobre una motocicleta deportiva entre árboles"
  },
  {
    src: "/portafolio/lifestyle-02.webp",
    width: 1066,
    height: 1600,
    categoria: "lifestyle",
    alt: "Retrato con casco sobre una moto deportiva en exterior"
  },
  {
    src: "/portafolio/lifestyle-03.webp",
    width: 1051,
    height: 1600,
    categoria: "lifestyle",
    alt: "Motociclista con casco sentada en una moto deportiva con el faro encendido en carretera"
  },
  {
    src: "/portafolio/lifestyle-04.webp",
    width: 1600,
    height: 1600,
    categoria: "lifestyle",
    alt: "Mujer posando de pie junto a una motocicleta en una carretera rural"
  },
  {
    src: "/portafolio/retratos-05.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato exterior de una mujer con vestido floral entre árboles"
  },
  {
    src: "/portafolio/retratos-06.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Mujer con vestido floral mirando hacia el cielo en un bosque"
  },
  {
    src: "/portafolio/urbano-01.webp",
    width: 1013,
    height: 1600,
    categoria: "urbano",
    alt: "Retrato urbano de una joven con gafas de sol y guantes largos"
  },
  {
    src: "/portafolio/urbano-02.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Retrato urbano en contrapicado de una joven con gorra entre palmeras"
  },
  {
    src: "/portafolio/urbano-03.webp",
    width: 1600,
    height: 607,
    categoria: "urbano",
    alt: "Primer plano de una joven con gorra y gafas de sol"
  },
  {
    src: "/portafolio/urbano-04.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Joven con gorra y jeans anchos posando en un sendero arbolado"
  },
  {
    src: "/portafolio/urbano-05.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Joven con gorra posando en un sendero de concreto entre jardines"
  },
  {
    src: "/portafolio/retratos-07.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato artístico con maquillaje de catrina y corona de rosas"
  },
  {
    src: "/portafolio/lifestyle-05.webp",
    width: 1066,
    height: 1600,
    categoria: "lifestyle",
    alt: "Hombre con ropa camuflada posando frente a un automóvil bajo un cielo nublado"
  },
  {
    src: "/portafolio/lifestyle-06.webp",
    width: 1066,
    height: 1600,
    categoria: "lifestyle",
    alt: "Joven sentado junto a un automóvil en una calle con palmeras"
  },
  {
    src: "/portafolio/retratos-08.webp",
    width: 1600,
    height: 955,
    categoria: "retratos",
    alt: "Retrato de un hombre sonriente sentado en una banca de jardín"
  },
  {
    src: "/portafolio/retratos-09.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato de un hombre con camisa apoyado en una baranda de madera"
  },
  {
    src: "/portafolio/comercial-01.webp",
    width: 1067,
    height: 1600,
    categoria: "comercial",
    alt: "Detalle de máquina delineando la barba en una barbería"
  },
  {
    src: "/portafolio/comercial-02.webp",
    width: 1067,
    height: 1600,
    categoria: "comercial",
    alt: "Barbero perfilando la ceja de un cliente con navaja"
  },
  {
    src: "/portafolio/comercial-03.webp",
    width: 1067,
    height: 1600,
    categoria: "comercial",
    alt: "Retrato de perfil de un cliente de barbería frente a un aro de luz"
  },
  {
    src: "/portafolio/retratos-10.webp",
    width: 1067,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato exterior de una mujer con corset blanco y tatuajes"
  },
  {
    src: "/portafolio/retratos-11.webp",
    width: 1066,
    height: 1600,
    categoria: "retratos",
    alt: "Mujer con corset blanco posando con montañas de fondo"
  },
  {
    src: "/portafolio/retratos-12.webp",
    width: 1067,
    height: 1600,
    categoria: "retratos",
    alt: "Retrato de cuerpo medio de una mujer con corset blanco y jeans"
  },
  {
    src: "/portafolio/producto-01.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Fotografía de producto de una pulsera roja con medalla dorada de San Benito y circones"
  },
  {
    src: "/portafolio/producto-02.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle de pulseras rojas tejidas con medallas doradas de San Benito"
  },
  {
    src: "/portafolio/producto-03.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Dos pulseras rojas con medallas doradas exhibidas sobre una almohadilla blanca"
  },
  {
    src: "/portafolio/producto-04.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Pulseras rojas con medallas de San Benito en oro sobre fondo blanco"
  },
  {
    src: "/portafolio/producto-05.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Aretes de zafiro azul en una caja de joyería roja"
  },
  {
    src: "/portafolio/producto-06.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle macro de aretes con piedras azules sobre una superficie blanca"
  },
  {
    src: "/portafolio/producto-07.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Anillo de oro con esmeraldas y diamantes en caja de terciopelo rojo"
  },
  {
    src: "/portafolio/producto-08.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Anillo de esmeraldas en una caja de joyería de terciopelo rojo"
  },
  {
    src: "/portafolio/producto-09.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle lateral de un anillo de oro con esmeraldas y circones"
  },
  {
    src: "/portafolio/producto-10.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Collar de oro con dijes de flor exhibido en un busto de joyería"
  },
  {
    src: "/portafolio/producto-11.webp",
    width: 1600,
    height: 1600,
    categoria: "producto",
    alt: "Detalle de una pulsera de oro con dije de flor y nácar"
  },
  {
    src: "/portafolio/urbano-06.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Sesión urbana nocturna de dos artistas junto a un carro deportivo"
  },
  {
    src: "/portafolio/urbano-07.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Dos jóvenes con ropa oscura posando frente a un carro deportivo de noche"
  },
  {
    src: "/portafolio/urbano-08.webp",
    width: 1066,
    height: 1600,
    categoria: "urbano",
    alt: "Sesión nocturna de estilo urbano junto a un carro deportivo blanco"
  },
  {
    src: "/portafolio/urbano-09.webp",
    width: 1067,
    height: 1600,
    categoria: "urbano",
    alt: "Retrato nocturno de una mujer con gorra y chaqueta oscura"
  },
  {
    src: "/portafolio/urbano-10.webp",
    width: 1067,
    height: 1600,
    categoria: "urbano",
    alt: "Mujer con gorra posando de perfil en sesión urbana nocturna"
  },
  {
    src: "/portafolio/urbano-11.webp",
    width: 1600,
    height: 818,
    categoria: "urbano",
    alt: "Retrato nocturno con flash de una mujer con gorra y cadena dorada"
  }
];
