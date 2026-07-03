import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve("..", "Contenido Visual", "Ultimas sesiones");
const OUT_DIR = path.resolve("public", "trabajos");
const WIDTH = 800;
const HEIGHT = 600; // 4:3

const SOURCES = [
  { file: "dji_fly_20260217_124724_0331_1771522191642_photo.jpg", label: "Aérea" },
  { file: "Glamping negro.jpg", label: "Aérea" },
  { file: "Glamping verde.jpg", label: "Aérea" },
  { file: "Gamping azul.jpg", label: "Aérea" },
  { file: "dji_fly_20260217_141650_0437_1771522523042_photo.jpg", label: "Aérea" },
  { file: "DSC_2269.jpg", label: "Interior" },
  { file: "DSC_2271.jpg", label: "Interior" },
  { file: "DSC_2270.jpg", label: "Detalle" },
];

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const f of fs.readdirSync(OUT_DIR)) fs.unlinkSync(path.join(OUT_DIR, f));

let i = 0;
for (const { file } of SOURCES) {
  const outName = String(i).padStart(2, "0") + ".webp";
  await sharp(path.join(SRC_DIR, file))
    .resize({
      width: WIDTH,
      height: HEIGHT,
      fit: "cover",
      position: sharp.strategy.attention,
    })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_DIR, outName));
  console.log(`${file} -> ${outName}`);
  i++;
}

console.log(`Wrote ${i} images to ${OUT_DIR}`);
