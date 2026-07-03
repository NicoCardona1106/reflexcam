import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const CONTENIDO = path.resolve("..", "Contenido Visual");
const OUT_DIR = path.resolve("public", "portfolio");
const SIZE = 480;

const SOURCES = [
  { src: path.join(CONTENIDO, "Galería de fotos", "1.png") },
  { src: path.join(CONTENIDO, "Galería de fotos", "2.png") },
  // attention-crop centra el torso/floral y corta la cabeza en esta foto
  // (retrato vertical, rostro de perfil cerca del borde superior) — forzamos
  // gravity "top" para mantener la cara en cuadro.
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_0286.png"), position: "top" },
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_2014.jpg") },
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_0517.png") },
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_8966.jpg") },
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_0379.png") },
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_0463.png") },
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_2021.jpg") },
  { src: path.join(CONTENIDO, "Galería de fotos", "DSC_0125.jpg") },
  {
    src: path.join(
      CONTENIDO,
      "Ultimas sesiones",
      "dji_fly_20260217_140318_0396_1771522434763_photo.jpg"
    ),
  },
  { src: path.join(CONTENIDO, "Ultimas sesiones", "Gamping azul.jpg") },
  { src: path.join(CONTENIDO, "Ultimas sesiones", "DSC_2269.jpg") },
];

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const f of fs.readdirSync(OUT_DIR)) fs.unlinkSync(path.join(OUT_DIR, f));

let i = 0;
for (const { src, position } of SOURCES) {
  const outName = String(i).padStart(2, "0") + ".webp";
  await sharp(src)
    .resize({
      width: SIZE,
      height: SIZE,
      fit: "cover",
      position: position ?? sharp.strategy.attention,
    })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_DIR, outName));
  console.log(`${src} -> ${outName}`);
  i++;
}

console.log(`Wrote ${i} portfolio teaser thumbnails to ${OUT_DIR}`);
