import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve(
  "..",
  "Contenido Visual",
  "Frames Camara"
);
const OUT_DIR = path.resolve("public", "frames");
// Fuente nativa: 1280x720 (HD). No hay material en mayor resolución disponible
// (el .mp4 origen también es 1280x720), así que no tiene sentido "upscalear":
// se sirve al tamaño nativo con un leve afilado para maximizar nitidez real.
const STEP = 2; // toma 1 de cada 2 frames -> 120 frames, mismo recorrido en 7s
const SRC_W = 1280;
const SRC_H = 720;

// Desactivado a pedido del cliente (2026-06-24): por ahora se deja visible
// el logo SONY de los frames de stock. Las zonas de difuminado calibradas
// quedan abajo por si se quiere reactivar más adelante — solo poner en true.
const BLUR_ENABLED = false;

// Zonas donde aparece texto de marca ("SONY", logo alfa, nombre de modelo)
// a lo largo del giro. Coordenadas fraccionales (0-1) sobre el frame 1280x720,
// con keyframes por número de frame ORIGINAL (0-239) interpolados linealmente
// entre ellos. Estimadas visualmente — se sobredimensionan un poco para
// garantizar cobertura total del texto.
const BLUR_ZONES = [
  {
    // Insignia superior (wordmark SONY + logo α + badge "X") — vista 3/4 frontal
    name: "top-badge",
    keyframes: [
      { frame: 0, box: [0.41, 0.11, 0.7, 0.41] },
      { frame: 60, box: [0.43, 0.12, 0.71, 0.34] },
      { frame: 100, box: [0.44, 0.12, 0.58, 0.22] },
      { frame: 110, box: [0.44, 0.12, 0.58, 0.22] },
    ],
  },
  {
    // Texto SONY pequeño en el aro de montura del lente
    name: "lens-ring",
    keyframes: [
      { frame: 40, box: [0.39, 0.49, 0.5, 0.6] },
      { frame: 60, box: [0.39, 0.49, 0.5, 0.6] },
      { frame: 100, box: [0.4, 0.47, 0.51, 0.58] },
      { frame: 105, box: [0.4, 0.47, 0.51, 0.58] },
    ],
  },
  {
    // SONY en el borde inferior de la pantalla LCD trasera
    name: "lcd-bezel",
    keyframes: [
      { frame: 180, box: [0.26, 0.73, 0.42, 0.81] },
      { frame: 220, box: [0.37, 0.73, 0.51, 0.81] },
      { frame: 238, box: [0.4, 0.73, 0.53, 0.81] },
    ],
  },
  {
    // Insignia de modelo junto al visor, visible en vistas traseras
    name: "model-badge",
    keyframes: [
      { frame: 195, box: [0.2, 0.25, 0.33, 0.34] },
      { frame: 238, box: [0.2, 0.25, 0.33, 0.34] },
    ],
  },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function boxForZone(zone, frameNum) {
  const kfs = zone.keyframes;
  if (frameNum < kfs[0].frame || frameNum > kfs[kfs.length - 1].frame) {
    return null;
  }
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i];
    const b = kfs[i + 1];
    if (frameNum >= a.frame && frameNum <= b.frame) {
      const t = b.frame === a.frame ? 0 : (frameNum - a.frame) / (b.frame - a.frame);
      return a.box.map((v, idx) => lerp(v, b.box[idx], t));
    }
  }
  return null;
}

function boxToPixels([x0, y0, x1, y1]) {
  const left = Math.max(0, Math.round(x0 * SRC_W));
  const top = Math.max(0, Math.round(y0 * SRC_H));
  const right = Math.min(SRC_W, Math.round(x1 * SRC_W));
  const bottom = Math.min(SRC_H, Math.round(y1 * SRC_H));
  return { left, top, width: right - left, height: bottom - top };
}

async function blurRegions(image, frameNum) {
  if (!BLUR_ENABLED) return image;

  const regions = BLUR_ZONES.map((zone) => boxForZone(zone, frameNum))
    .filter(Boolean)
    .map(boxToPixels)
    .filter((r) => r.width > 0 && r.height > 0);

  if (regions.length === 0) return image;

  const composites = await Promise.all(
    regions.map(async (r) => ({
      input: await sharp(await image.clone().extract(r).toBuffer())
        .blur(18)
        .toBuffer(),
      left: r.left,
      top: r.top,
    }))
  );

  return image.composite(composites);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs
  .readdirSync(SRC_DIR)
  .filter((f) => f.toLowerCase().endsWith(".png"))
  .sort();

const selected = files
  .map((file, idx) => ({ file, idx }))
  .filter(({ idx }) => idx % STEP === 0);

console.log(`Source frames: ${files.length}, selected: ${selected.length}`);

let i = 0;
for (const { file, idx } of selected) {
  const outName = String(i).padStart(3, "0") + ".webp";
  let image = sharp(path.join(SRC_DIR, file)).sharpen({ sigma: 0.8 });
  image = await blurRegions(image, idx);
  await image.webp({ quality: 86 }).toFile(path.join(OUT_DIR, outName));
  i++;
}

console.log(`Wrote ${i} frames to ${OUT_DIR}`);
