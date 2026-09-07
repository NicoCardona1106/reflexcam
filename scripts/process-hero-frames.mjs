// Genera los frames del hero (public/frames) a partir del video 4K de HeyGen.
//
// Fuente: ../HeyGen_Video.mp4 (3840x2160, 24 fps, 121 frames = una vuelta
// completa de la cámara; frame 0 = frente, frame 91 = pantalla LCD de frente).
// El hero usa los frames 0..91: arranca en el lente y termina en la trasera,
// donde se proyecta la galería.
//
// A 24 fps repartidos en 7 s el giro iba a ~13 frames/s y se veía a saltos, así
// que se interpola a 48 fps con compensación de movimiento (minterpolate mci):
// 92 frames → 181. El último se sobrescribe con el frame 91 ORIGINAL exacto,
// porque SCREEN_RECT y los rótulos de Hero.tsx están calibrados sobre él.
//
// Dos sets: public/frames (1920 px, escritorio, ~11 MB) y public/frames/m
// (1024 px, celular, ~4 MB). Hero.tsx elige por ancho de ventana. Si algún día
// se quiere 4K: Supabase Storage/CDN y set por devicePixelRatio.
//
// Requiere ffmpeg en el PATH. Uso: node scripts/process-hero-frames.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("..", "HeyGen_Video.mp4");
const LAST_SRC_FRAME = 91; // frames 0..91 del video
const FPS_OUT = 48; // 24 → 48: un frame interpolado entre cada dos originales
const QUALITY = 80;
const SETS = [
  { dir: path.resolve("public", "frames"), width: 1920 },
  { dir: path.resolve("public", "frames", "m"), width: 1024 },
];

const ffmpeg = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });

// el set de escritorio contiene la carpeta m/: se limpian solo los .webp
for (const { dir } of SETS) {
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) if (f.endsWith(".webp")) fs.rmSync(path.join(dir, f));
}

for (const { dir, width } of SETS) {
  // escalar ANTES de interpolar: minterpolate sobre 4K tarda minutos, sobre 1920 ~40 s
  ffmpeg([
    "-i", SRC,
    "-vf", `trim=end_frame=${LAST_SRC_FRAME + 1},setpts=PTS-STARTPTS,scale=${width}:-2:flags=lanczos,minterpolate=fps=${FPS_OUT}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`,
    "-vsync", "0", "-start_number", "0",
    "-c:v", "libwebp", "-quality", String(QUALITY),
    path.join(dir, "%03d.webp"),
  ]);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".webp")).sort();
  const last = files[files.length - 1];
  ffmpeg([
    "-i", SRC,
    "-vf", `select='eq(n,${LAST_SRC_FRAME})',scale=${width}:-2:flags=lanczos`,
    "-vsync", "0", "-frames:v", "1",
    "-c:v", "libwebp", "-quality", String(QUALITY),
    path.join(dir, last),
  ]);
  console.log(`${files.length} frames a ${width} px en ${dir}`);
}
console.log("FRAME_COUNT en Hero.tsx debe coincidir con el número de frames de cada set");
