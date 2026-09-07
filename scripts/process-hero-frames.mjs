// Genera los frames del hero (public/frames) a partir del video 4K de HeyGen.
//
// Fuente: ../HeyGen_Video.mp4 (3840x2160, 24 fps, 121 frames = una vuelta
// completa de la cámara; frame 0 = frente, frame 91 = pantalla LCD de frente).
// El hero usa los frames 0..91: arranca en el lente y termina en la trasera,
// donde se proyecta la galería (SCREEN_RECT en Hero.tsx está calibrado sobre
// el frame 91 de ESTE video).
//
// Se sirven a 1920 px de ancho, no a 4K: 92 frames a 4K pesan ~35 MB y el hero
// los precarga todos antes de arrancar; a 1920 pesan ~8 MB y en pantallas
// 1440 con DPR 2 el canvas es de 2880 px, así que el escalado es de 1.5x
// (contra 2.25x del 720p anterior). Si algún día se quiere 4K real: subir los
// frames a Supabase Storage/CDN y elegir el set por devicePixelRatio.
//
// Requiere ffmpeg en el PATH. Uso: node scripts/process-hero-frames.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("..", "HeyGen_Video.mp4");
const OUT_DIR = path.resolve("public", "frames");
const LAST_FRAME = 91; // 0..91 → 92 frames; FRAME_COUNT en Hero.tsx debe ser 92
const WIDTH = 1920;
const QUALITY = 84;

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

execFileSync(
  "ffmpeg",
  [
    "-v", "error", "-y", "-i", SRC,
    "-vf", `select='between(n,0,${LAST_FRAME})',scale=${WIDTH}:-2:flags=lanczos`,
    "-vsync", "0", "-start_number", "0",
    "-c:v", "libwebp", "-quality", String(QUALITY),
    path.join(OUT_DIR, "%03d.webp"),
  ],
  { stdio: "inherit" }
);

const n = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".webp")).length;
console.log(`${n} frames en ${OUT_DIR} (esperados ${LAST_FRAME + 1})`);
