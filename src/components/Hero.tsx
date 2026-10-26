"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// 181 frames a 1920 px (ver scripts/process-hero-frames.mjs): los frames 0..91
// del video 4K de HeyGen (frente del lente → LCD de frente) interpolados a 48 fps
// con compensación de movimiento; el último es el frame 91 original exacto
// (SCREEN_RECT y los rótulos están calibrados sobre él).
const FRAME_COUNT = 181;
const INTRO_DURATION_MS = 7000;
// Dos sets con los mismos 181 frames: 1920 px para escritorio (~11 MB) y
// 1024 px para celular (~4,6 MB), donde la imagen se dibuja a ~600 px de ancho
// y el 1920 solo costaba datos y tiempo de carga.
const MOBILE_MAX_WIDTH = 768;
const FRAME_SRC = (dir: string, i: number) => `${dir}/${String(i).padStart(3, "0")}.webp`;

const POOL_SIZE = 13;
const SLIDE_SRC = (i: number) => `/portfolio/${String(i).padStart(2, "0")}.webp`;

const GRID_COLS = 3;
const GRID_ROWS = 2;
const GRID_CELLS = GRID_COLS * GRID_ROWS;
const GRID_GAP_FRACTION = 0.045; // fracción del ancho de celda
const CELL_CYCLE_MS = 4200;
const CELL_CROSSFADE_MS = 600;
// Entrada del grid: las fotos aparecen suavemente una a una y solo cuando
// el cuadro está completo empieza la rotación (pedido del cliente).
const CELL_APPEAR_MS = 700;
const CELL_APPEAR_STAGGER_MS = 450;

// Recorte del cristal de la pantalla LCD trasera en el frame final (coords
// fraccionales 0-1 sobre el frame, independientes de la resolución servida),
// calibrado el 2026-09-06 dibujando un rectángulo sobre el frame 91 del video
// 4K de HeyGen y ajustándolo al borde del cristal, un pelo por dentro del bisel.
const SCREEN_RECT = { x0: 0.29, y0: 0.535, x1: 0.628, y1: 0.913 };

// Color plano de fondo de la página (--color-background). Los frames del
// video traen su propio fondo de estudio en degradado; se funden los bordes
// de la imagen hacia este color para que el hero se vea de un solo color con
// el resto de la página. Sobra cuando el video propio se grabe sobre fondo
// plano #131313.
const BG_RGB = "19, 19, 19";

// Los rótulos de los botones del video de HeyGen salen deformados por la IA
// ("Q5710", "WIENU"). Sobre el frame final se pintan rótulos limpios: la
// insignia del modelo pasa a ser la marca y el botón MENU vuelve a leerse.
// Coords fraccionales del frente de cada pastilla, medidas sobre el frame 91.
const LABELS = [
  { text: "REFLEXCAM", x0: 0.512, y0: 0.441, x1: 0.557, y1: 0.468 },
  { text: "MENU", x0: 0.582, y0: 0.441, x1: 0.621, y1: 0.468 },
];
// Los dos botones redondos grandes ("AFON" deformado) — centro y radio en
// fracciones del frame (el radio, del ancho). Como en una Sony real: AF-ON y AEL.
const ROUND_LABELS = [
  { text: "AF-ON", cx: 0.671, cy: 0.458, r: 0.016 },
  { text: "AEL", cx: 0.674, cy: 0.545, r: 0.016 },
];
// Botón de reproducción (▶) de la cámara: es el enlace a la galería. Centro y
// radio del frente del botón en fracciones del frame 91; debajo se pinta un
// rótulo pequeño que dice qué hace (pedido de Nicolas 2026-09-06).
const GALLERY_BUTTON = { cx: 0.682, cy: 0.875, r: 0.0125, label: "VER GALERÍA" };

// El giro arranca en cuanto están decodificados los primeros frames; el resto
// sigue bajando mientras la cámara gira (antes se esperaba a los 92 → ~2 s en
// negro). Si un frame aún no llegó, repaint() dibuja el último decodificado.
const START_READY = 24;
// 0 = sin fundido entre frames. Con 181 frames reales el fundido ya no hace
// falta y Nicolas lo veía como blur. (0.5 suaviza; 1 es fundido completo.)
const BLEND = 0;

// En vertical (celular) la franja 16:9 dejaba la cámara diminuta y el botón de
// galería de 5 px. Se acerca un 45 %: el LCD (x 0.29-0.63 del frame) y el botón
// ▶ (x 0.68) siguen dentro de pantalla; solo se recortan los bordes del estudio.
const PORTRAIT_ZOOM = 1.45;
const EDGE_FADE_FRACTION = 0.24; // del lado menor de la imagen dibujada (0.16 con el clip oscuro anterior)
// Velo uniforme sobre el video para acercar su fondo de estudio (más claro)
// al color de la página sin apagar la cámara. Calibrado visualmente.
const DIM_ALPHA = 0.3; // 0.22 con el clip anterior; el de HeyGen tiene el foco de estudio más claro

// Cuadrático, no cúbico: con el cúbico el primer segundo del giro era casi
// estático (frame 0-1) y se sentía como retraso de carga.
function easeInOutQuad(progress: number) {
  return progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

type BaseTransform = { dx: number; dy: number; drawW: number; drawH: number };

function coverTransform(
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number
): BaseTransform {
  const canvasRatio = canvasW / canvasH;
  const imgRatio = imgW / imgH;
  let drawW = canvasW;
  let drawH = canvasH;
  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = drawH * imgRatio;
  } else {
    drawW = canvasW;
    drawH = drawW / imgRatio;
  }
  return { dx: (canvasW - drawW) / 2, dy: (canvasH - drawH) / 2, drawW, drawH };
}

// La foto base de la cámara siempre se ve completa (nunca recortada) para
// que el grid de la pantalla LCD no quede cortado en viewports muy angostos
// (ej. mobile en vertical, donde el aspect ratio difiere mucho del 16:9
// nativo de los frames).
function containTransform(
  canvasW: number,
  canvasH: number,
  imgW: number,
  imgH: number
): BaseTransform {
  const canvasRatio = canvasW / canvasH;
  const imgRatio = imgW / imgH;
  let drawW = canvasW;
  let drawH = canvasH;
  if (imgRatio > canvasRatio) {
    drawW = canvasW;
    drawH = drawW / imgRatio;
  } else {
    drawH = canvasH;
    drawW = drawH * imgRatio;
  }
  return { dx: (canvasW - drawW) / 2, dy: (canvasH - drawH) / 2, drawW, drawH };
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galleryLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Las funciones declaradas más abajo se hoistean por encima de estos
    // guards, así que TS no propaga el narrowing a sus cuerpos; se re-asigna
    // a constantes ya no-nulas para que todo el closure las vea tipadas.
    const canvasMaybe = canvasRef.current;
    const ctxMaybe = canvasMaybe?.getContext("2d");
    if (!canvasMaybe || !ctxMaybe) return;
    const canvas = canvasMaybe;
    const ctx = ctxMaybe;

    let cancelled = false;
    let rafId = 0;
    const frames: HTMLImageElement[] = [];
    const slides: HTMLImageElement[] = [];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cells = Array.from({ length: GRID_CELLS }, (_, i) => ({
      currentImage: i % POOL_SIZE,
      nextImage: (i + GRID_CELLS) % POOL_SIZE,
      alpha: 0,
      appearAlpha: 0, // 0→1 durante la entrada una-a-una del grid
      phaseOffset: (CELL_CYCLE_MS / GRID_CELLS) * i,
    }));

    const state = {
      baseFrame: 0,
      // posición fraccional (0..FRAME_COUNT-1) durante el giro: la parte
      // decimal funde el frame siguiente sobre el actual para que los ~13
      // frames/s de la secuencia se vean continuos en vez de a saltos
      framePos: 0,
      showSlide: false,
    };

    // Los fundidos de borde y la viñeta son 5 degradados a pantalla completa:
    // pintarlos en cada tick era lo más caro del giro. Se dibujan una vez por
    // tamaño de canvas en un canvas aparte y luego es un solo drawImage.
    let overlay: HTMLCanvasElement | null = null;
    let overlayKey = "";

    function resizeCanvasIfNeeded() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
      }
    }

    function repaint() {
      // el frame pedido o, si aún no bajó, el último anterior ya decodificado
      let f = state.baseFrame;
      while (f > 0 && !decoded[f]) f--;
      const baseImg = frames[f];
      if (!decoded[f] || !baseImg) return;

      resizeCanvasIfNeeded();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = containTransform(
        canvas.width,
        canvas.height,
        baseImg.naturalWidth,
        baseImg.naturalHeight
      );
      if (canvas.width < canvas.height) {
        t.drawW *= PORTRAIT_ZOOM;
        t.drawH *= PORTRAIT_ZOOM;
        t.dx = (canvas.width - t.drawW) / 2;
        t.dy = (canvas.height - t.drawH) / 2;
      }
      ctx.drawImage(baseImg, t.dx, t.dy, t.drawW, t.drawH);

      // Fundido con el frame siguiente según la parte decimal de framePos. Con
      // frames interpolados a 48 fps la mezcla va a la mitad: suaviza el paso sin
      // que se vea la estela que tenía a plena intensidad con 92 frames.
      if (!state.showSlide) {
        const frac = (state.framePos - f) * BLEND;
        const next = frames[f + 1];
        if (frac > 0.02 && decoded[f + 1] && next) {
          ctx.globalAlpha = frac;
          ctx.drawImage(next, t.dx, t.dy, t.drawW, t.drawH);
          ctx.globalAlpha = 1;
        }
      }

      // Velo antes del grid del LCD: atenúa el fondo de estudio del video
      // sin apagar las fotos del portafolio.
      ctx.fillStyle = `rgba(${BG_RGB}, ${DIM_ALPHA})`;
      ctx.fillRect(t.dx, t.dy, t.drawW, t.drawH);

      if (state.showSlide) {
        const rectX = t.dx + SCREEN_RECT.x0 * t.drawW;
        const rectY = t.dy + SCREEN_RECT.y0 * t.drawH;
        const rectW = (SCREEN_RECT.x1 - SCREEN_RECT.x0) * t.drawW;
        const rectH = (SCREEN_RECT.y1 - SCREEN_RECT.y0) * t.drawH;

        const gap = rectW * (GRID_GAP_FRACTION / GRID_COLS);
        const cellW = (rectW - gap * (GRID_COLS - 1)) / GRID_COLS;
        const cellH = (rectH - gap * (GRID_ROWS - 1)) / GRID_ROWS;

        cells.forEach((cell, i) => {
          const col = i % GRID_COLS;
          const row = Math.floor(i / GRID_COLS);
          const cx = rectX + col * (cellW + gap);
          const cy = rectY + row * (cellH + gap);

          ctx.save();
          ctx.beginPath();
          ctx.rect(cx, cy, cellW, cellH);
          ctx.clip();

          const current = slides[cell.currentImage];
          const next = slides[cell.nextImage];

          if (cell.appearAlpha > 0 && current && current.complete) {
            const ct = coverTransform(cellW, cellH, current.naturalWidth, current.naturalHeight);
            ctx.globalAlpha = cell.appearAlpha;
            ctx.drawImage(current, cx + ct.dx, cy + ct.dy, ct.drawW, ct.drawH);
            ctx.globalAlpha = 1;
          }
          if (cell.alpha > 0 && next && next.complete) {
            const nt = coverTransform(cellW, cellH, next.naturalWidth, next.naturalHeight);
            ctx.globalAlpha = cell.alpha;
            ctx.drawImage(next, cx + nt.dx, cy + nt.dy, nt.drawW, nt.drawH);
            ctx.globalAlpha = 1;
          }

          ctx.restore();
        });

        paintLabels(t, cells[0].appearAlpha);

        // El botón ▶ es un enlace al portafolio: el <a> (círculo) se coloca
        // encima en píxeles CSS (el canvas trabaja en píxeles físicos).
        const link = galleryLinkRef.current;
        if (link) {
          const dpr = canvas.width / canvas.clientWidth;
          // nunca menor de 44 px CSS: área táctil mínima en celular
          const r = Math.max(22, (GALLERY_BUTTON.r * t.drawW * 1.6) / dpr);
          const cx = (t.dx + GALLERY_BUTTON.cx * t.drawW) / dpr;
          const cy = (t.dy + GALLERY_BUTTON.cy * t.drawH) / dpr;
          link.style.left = `${cx - r}px`;
          link.style.top = `${cy - r}px`;
          link.style.width = `${r * 2}px`;
          link.style.height = `${r * 2}px`;
          link.hidden = false;
        }
      }

      fadeImageEdges(t);
      // Después de la viñeta: el botón está cerca del borde inferior y el aro y
      // el rótulo quedaban apagados si se pintaban antes.
      if (state.showSlide) paintGalleryHint(t, cells[0].appearAlpha);
    }

    function paintLabels(t: BaseTransform, alpha: number) {
      if (alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      for (const l of LABELS) {
        const x = t.dx + l.x0 * t.drawW;
        const y = t.dy + l.y0 * t.drawH;
        const w = (l.x1 - l.x0) * t.drawW;
        const h = (l.y1 - l.y0) * t.drawH;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, h / 2);
        ctx.fillStyle = "rgb(30, 30, 30)";
        ctx.fill();
        ctx.lineWidth = Math.max(1, h * 0.06);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
        ctx.stroke();
        ctx.fillStyle = "rgba(232, 232, 232, 0.92)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // La fuente se ajusta al ancho de la pastilla (REFLEXCAM es más largo que MENU).
        let size = h * 0.55;
        ctx.font = `700 ${size}px Montserrat, Arial, sans-serif`;
        const maxW = w * 0.8;
        if (ctx.measureText(l.text).width > maxW) {
          size *= maxW / ctx.measureText(l.text).width;
          ctx.font = `700 ${size}px Montserrat, Arial, sans-serif`;
        }
        ctx.fillText(l.text, x + w / 2, y + h / 2 + size * 0.05);
      }
      for (const l of ROUND_LABELS) {
        const cx = t.dx + l.cx * t.drawW;
        const cy = t.dy + l.cy * t.drawH;
        const r = l.r * t.drawW;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(26, 26, 26)";
        ctx.fill();
        ctx.lineWidth = Math.max(1, r * 0.08);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
        ctx.stroke();
        ctx.fillStyle = "rgba(232, 232, 232, 0.92)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const size = r * 0.5;
        ctx.font = `700 ${size}px Montserrat, Arial, sans-serif`;
        ctx.fillText(l.text, cx, cy + size * 0.05);
      }
      ctx.restore();
    }

    // Aro alrededor del botón ▶ y rótulo "VER GALERÍA" debajo, para que se
    // entienda que es clicable sin explicarlo en ningún otro sitio.
    function paintGalleryHint(t: BaseTransform, alpha: number) {
      if (alpha <= 0) return;
      const cx = t.dx + GALLERY_BUTTON.cx * t.drawW;
      const cy = t.dy + GALLERY_BUTTON.cy * t.drawH;
      const r = GALLERY_BUTTON.r * t.drawW;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.45, 0, Math.PI * 2);
      ctx.lineWidth = Math.max(1, r * 0.12);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      ctx.stroke();
      const size = Math.max(9, r * 0.62);
      ctx.font = `600 ${size}px Montserrat, Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.fillText(GALLERY_BUTTON.label, cx, cy + r * 1.9);
      ctx.restore();
    }

    // Degradados desde cada borde de la imagen hacia adentro, en el color
    // plano de la página, para eliminar la costura entre el fondo de estudio
    // del video y el fondo del sitio.
    function fadeImageEdges(t: BaseTransform) {
      const key = `${canvas.width}x${canvas.height}:${t.dx},${t.dy},${t.drawW},${t.drawH}`;
      if (!overlay || overlayKey !== key) {
        overlay = document.createElement("canvas");
        overlay.width = canvas.width;
        overlay.height = canvas.height;
        const octx = overlay.getContext("2d");
        if (octx) paintEdgesInto(octx, t);
        overlayKey = key;
      }
      ctx.drawImage(overlay, 0, 0);
    }

    function paintEdgesInto(ctx: CanvasRenderingContext2D, t: BaseTransform) {
      const fade = Math.min(t.drawW, t.drawH) * EDGE_FADE_FRACTION;
      const edges: [number, number, number, number][] = [
        [t.dx, t.dy, t.dx, t.dy + fade], // superior
        [t.dx, t.dy + t.drawH, t.dx, t.dy + t.drawH - fade], // inferior
        [t.dx, t.dy, t.dx + fade, t.dy], // izquierdo
        [t.dx + t.drawW, t.dy, t.dx + t.drawW - fade, t.dy], // derecho
      ];
      for (const [x0, y0, x1, y1] of edges) {
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, `rgba(${BG_RGB}, 1)`);
        g.addColorStop(1, `rgba(${BG_RGB}, 0)`);
        ctx.fillStyle = g;
        const horizontal = y0 === y1;
        if (horizontal) {
          ctx.fillRect(Math.min(x0, x1), t.dy, fade, t.drawH);
        } else {
          ctx.fillRect(t.dx, Math.min(y0, y1), t.drawW, fade);
        }
      }
      // Viñeta radial: el foco de estudio del video de HeyGen es más claro que
      // la página y en pantallas angostas la franja 16:9 se notaba como un
      // rectángulo; con la viñeta las esquinas se funden al fondo y el foco
      // queda como luz natural sobre la cámara.
      const cx = t.dx + t.drawW / 2;
      const cy = t.dy + t.drawH / 2;
      const r = Math.hypot(t.drawW, t.drawH) / 2;
      const v = ctx.createRadialGradient(cx, cy, r * 0.42, cx, cy, r);
      v.addColorStop(0, `rgba(${BG_RGB}, 0)`);
      v.addColorStop(1, `rgba(${BG_RGB}, 0.9)`);
      ctx.fillStyle = v;
      ctx.fillRect(t.dx, t.dy, t.drawW, t.drawH);
    }

    function runIntro() {
      let startTime: number | null = null;
      let prevTime = 0;
      // tiempo acumulado en pausa esperando frames: se descuenta del progreso
      // para que, en una conexión lenta, el giro se detenga y siga desde donde
      // iba en vez de saltar varios frames de golpe
      let stalled = 0;
      function tick(time: number) {
        if (cancelled) return;
        if (startTime === null) {
          startTime = time;
          prevTime = time;
        }
        let progress = Math.min((time - startTime - stalled) / INTRO_DURATION_MS, 1);
        let target = easeInOutQuad(progress) * (FRAME_COUNT - 1);
        if (Math.ceil(target) > readyUpTo) {
          stalled += time - prevTime;
          progress = Math.min((time - startTime - stalled) / INTRO_DURATION_MS, 1);
          target = Math.min(easeInOutQuad(progress) * (FRAME_COUNT - 1), readyUpTo);
        }
        prevTime = time;
        state.framePos = target;
        state.baseFrame = Math.floor(target);
        repaint();
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          state.showSlide = true;
          // Espera a que el portafolio esté decodificado para que la entrada
          // una-a-una nunca muestre celdas vacías.
          slidesReady.then(() => {
            if (!cancelled) runFillIn();
          });
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    // Entrada del grid: cada foto aparece con un fundido suave, en orden,
    // y solo cuando el cuadro está completo arranca la rotación.
    function runFillIn() {
      const total = CELL_APPEAR_STAGGER_MS * (GRID_CELLS - 1) + CELL_APPEAR_MS;
      let start: number | null = null;
      function tick(time: number) {
        if (cancelled) return;
        if (start === null) start = time;
        const t0 = time - start;
        cells.forEach((cell, i) => {
          cell.appearAlpha = Math.min(
            Math.max((t0 - i * CELL_APPEAR_STAGGER_MS) / CELL_APPEAR_MS, 0),
            1
          );
        });
        repaint();
        if (t0 < total) {
          rafId = requestAnimationFrame(tick);
        } else {
          runSlideshow();
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    function runSlideshow() {
      let start: number | null = null;
      function tick(time: number) {
        if (cancelled) return;
        if (start === null) start = time;
        const t0 = time - start;

        cells.forEach((cell, i) => {
          const elapsed = t0 + cell.phaseOffset;
          const within = elapsed % CELL_CYCLE_MS;
          const cycleNumber = Math.floor(elapsed / CELL_CYCLE_MS);

          cell.currentImage = (i + cycleNumber * GRID_CELLS) % POOL_SIZE;
          cell.nextImage = (i + (cycleNumber + 1) * GRID_CELLS) % POOL_SIZE;
          cell.alpha =
            within > CELL_CYCLE_MS - CELL_CROSSFADE_MS
              ? (within - (CELL_CYCLE_MS - CELL_CROSSFADE_MS)) / CELL_CROSSFADE_MS
              : 0;
        });

        repaint();
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    function handleResize() {
      repaint();
    }

    // decode() fuerza la decodificación completa de cada frame antes de
    // usarlo. Sin esto, el navegador decodifica "sobre la marcha" la primera
    // vez que cada imagen se dibuja en el canvas, lo que produce el stutter
    // (~2fps) que se ve apenas arranca el giro hasta que el cache de
    // decodificación se calienta.
    const decoded: boolean[] = [];
    // último frame tal que 0..readyUpTo están todos decodificados
    let readyUpTo = -1;
    const dir = window.innerWidth < MOBILE_MAX_WIDTH ? "/frames/m" : "/frames";
    const framePromises: Promise<void>[] = [];
    // Con movimiento reducido solo se baja el último cuadro (la imagen fija).
    for (let i = reducedMotion ? FRAME_COUNT - 1 : 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_SRC(dir, i);
      frames[i] = img;
      framePromises.push(
        img
          .decode()
          .then(() => {
            decoded[i] = true;
            while (decoded[readyUpTo + 1]) readyUpTo++;
            if (i === 0) repaint();
          })
          .catch(() => {})
      );
    }

    // Las miniaturas del portafolio recién hacen falta cuando termina el giro
    // (7s después), así que se empiezan a pedir DESPUÉS de que los 120 frames
    // terminen de cargar/decodificar — si se piden todas a la vez (133
    // imágenes en paralelo) compiten por ancho de banda con los frames justo
    // en el arranque, que es cuando más importa que vayan fluidos.
    let resolveSlides: () => void = () => {};
    const slidesReady = new Promise<void>((resolve) => {
      resolveSlides = resolve;
    });
    function loadSlides() {
      const slidePromises: Promise<void>[] = [];
      // la imagen fija solo muestra las fotos de la primera tanda del grid
      const count = reducedMotion ? GRID_CELLS : POOL_SIZE;
      for (let i = 0; i < count; i++) {
        const img = new Image();
        img.src = SLIDE_SRC(i);
        slides.push(img);
        slidePromises.push(img.decode().catch(() => {}));
      }
      Promise.all(slidePromises).then(() => {
        if (!cancelled && reducedMotion) showStill();
        resolveSlides();
      });
    }

    // Arranque: con los primeros frames listos ya gira; el resto sigue bajando.
    Promise.all(framePromises.slice(0, START_READY)).then(() => {
      if (cancelled || reducedMotion) return;
      runIntro();
    });
    Promise.all(framePromises).then(() => {
      if (cancelled) return;
      loadSlides();
    });

    // Movimiento reducido: una sola imagen fija (último cuadro + grid) que entra
    // con un fundido de opacidad de 300 ms, sin giro ni desplazamientos.
    function showStill() {
      state.baseFrame = FRAME_COUNT - 1;
      state.showSlide = true;
      cells.forEach((cell) => {
        cell.appearAlpha = 1;
      });
      repaint();
      canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        aria-label="Cámara rotando hasta mostrar su pantalla LCD trasera, donde se proyecta una muestra del portafolio"
      />
      {/* El botón ▶ de la cámara lleva a la galería; se posiciona desde repaint() */}
      <Link
        ref={galleryLinkRef}
        href="/portafolio"
        hidden
        aria-label="Ver la galería del portafolio"
        title="Ver galería"
        className="absolute z-20 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between px-margin-mobile md:px-margin-desktop pt-margin-mobile md:pt-margin-desktop pb-24 md:pb-margin-desktop">
        <div className="mt-16" />
        <div className="flex justify-between items-end w-full max-w-container-max mx-auto">
          <div className="space-y-unit-sm opacity-80">
            <div className="flex items-center gap-unit-xs">
              <span className="bg-surface-container-high px-2 py-1 rounded text-label-mono border border-outline-variant/30">
                FOTO + VIDEO
              </span>
              <span className="bg-surface-container-high px-2 py-1 rounded text-label-mono border border-outline-variant/30">
                DRON 5.1K
              </span>
            </div>
            <p className="text-caption text-on-surface-variant max-w-sm hidden sm:block">
              Fotografía profesional, producción audiovisual y tomas aéreas
              para marcas y negocios.
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-headline-md tracking-tight text-primary">REFLEXCAM</h1>
            <p className="text-label-mono text-outline uppercase tracking-widest mt-1">
              Nunca pierdas un momento
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
