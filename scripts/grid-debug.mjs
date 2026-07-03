import sharp from "sharp";
import path from "node:path";

const SRC_DIR = path.resolve("..", "Contenido Visual", "Frames Camara");
const frameNum = process.argv[2] ?? "0";
const file = `Video web Reflexcam (1)${String(frameNum).padStart(3, "0")}.png`;
const W = 1280;
const H = 720;

let svg = `<svg width="${W}" height="${H}">`;
for (let x = 0; x <= 10; x++) {
  const px = (x / 10) * W;
  svg += `<line x1="${px}" y1="0" x2="${px}" y2="${H}" stroke="red" stroke-width="1" opacity="0.6"/>`;
  svg += `<text x="${px + 2}" y="14" fill="yellow" font-size="14">${x / 10}</text>`;
}
for (let y = 0; y <= 10; y++) {
  const py = (y / 10) * H;
  svg += `<line x1="0" y1="${py}" x2="${W}" y2="${py}" stroke="red" stroke-width="1" opacity="0.6"/>`;
  svg += `<text x="2" y="${py + 14}" fill="yellow" font-size="14">${y / 10}</text>`;
}
svg += `</svg>`;

await sharp(path.join(SRC_DIR, file))
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .toFile(path.resolve("public", `_grid_${frameNum}.webp`));

console.log("wrote", `public/_grid_${frameNum}.webp`);
