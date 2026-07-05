import Image from "next/image";

// Imágenes: portadas oficiales de producto (DJI ya venían con fondo
// transparente; a Godox y Nikon se les removió el fondo con sharp).
// La foto de la Nikon D5600 es de Michael Kramer (retoque de Ubcule),
// Wikimedia Commons, licencia CC BY-SA 3.0 — la atribución visible que
// exige la licencia está en la línea de créditos del Footer.
const EQUIPO = [
  { nombre: "Nikon D5600", tipo: "Cámara", img: "/equipo/nikond5600.webp" },
  { nombre: "DJI RS 3 Mini", tipo: "Estabilizador", img: "/equipo/rs3mini.webp" },
  { nombre: "Godox MS300", tipo: "Flash de estudio", img: "/equipo/godoxms300.webp" },
  { nombre: "DJI Mic Mini", tipo: "Micrófonos", img: "/equipo/micmini.webp" },
  { nombre: "DJI Mavic 3 Pro", tipo: "Dron", img: "/equipo/mavic3pro.webp" },
];

export default function Equipo() {
  return (
    <section id="equipo" className="bg-background py-unit-xl border-t border-outline-variant/10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <p className="text-center text-label-mono text-accent uppercase tracking-widest">
          Tecnología
        </p>
        <h2 className="text-center text-headline-lg-mobile md:text-headline-lg text-primary mt-unit-xs mb-unit-lg">
          Equipo
        </h2>

        <div className="grid grid-cols-2 gap-unit-sm sm:grid-cols-3 lg:grid-cols-5">
          {EQUIPO.map((item) => (
            <div
              key={item.nombre}
              className="flex flex-col rounded-xl bg-surface-container-low border border-outline-variant/20 p-unit-md transition-transform duration-150 hover:-translate-y-1"
            >
              <div className="relative h-36 w-full">
                <Image
                  src={item.img}
                  alt={item.nombre}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                  className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                />
              </div>
              <p className="mt-unit-md text-label-mono uppercase tracking-widest text-on-surface-variant">
                {item.tipo}
              </p>
              <p className="mt-1 text-body-md font-bold text-primary">{item.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
