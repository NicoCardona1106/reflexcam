const EQUIPO = [
  { nombre: "Nikon D5600", tipo: "Cámara" },
  { nombre: "DJI RS 3 Mini", tipo: "Estabilizador" },
  { nombre: "Godox MS300", tipo: "Flash de estudio" },
  { nombre: "DJI Mini", tipo: "Micrófonos" },
  { nombre: "DJI Mavic 3 Pro", tipo: "Dron" },
];

export default function Equipo() {
  return (
    <section id="equipo" className="bg-background py-unit-xl border-t border-outline-variant/10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <p className="text-label-mono text-outline uppercase tracking-widest">
          Tecnología
        </p>
        <h2 className="text-headline-lg-mobile md:text-headline-lg text-primary mt-unit-xs mb-unit-lg">
          Equipo
        </h2>

        <div className="flex flex-wrap gap-unit-sm">
          {EQUIPO.map((item) => (
            <div
              key={item.nombre}
              className="flex items-center gap-unit-sm bg-surface-container-low border border-outline-variant/20 rounded px-unit-md py-unit-sm"
            >
              <span className="text-label-mono uppercase tracking-widest text-on-surface-variant">
                {item.tipo}
              </span>
              <span className="text-body-md text-primary">{item.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
