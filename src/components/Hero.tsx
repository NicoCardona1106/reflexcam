"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 120;
const INTRO_DURATION_MS = 7000;
const FRAME_SRC = (i: number) => `/frames/${String(i).padStart(3, "0")}.webp`;

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

// Recorte de la pantalla LCD trasera en el frame final (coords fraccionales
// 0-1 sobre el frame fuente 1280x720), calibrado visualmente comparando un
// rectángulo de overlay contra el borde real de la pantalla en el frame
// servido (web/public/frames/119.webp).
const SCREEN_RECT = { x0: 0.286, y0: 0.41, x1: 0.597, y1: 0.763 };

// Color plano de fondo de la página (--color-background). Los frames del
// video traen su propio fondo de estudio en degradado; se funden los bordes
// de la imagen hacia este color para que el hero se vea de un solo color con
// el resto de la página. Sobra cuando el video propio se grabe sobre fondo
// plano #131313.
const BG_RGB = "19, 19, 19";
const EDGE_FADE_FRACTION = 0.16; // del lado menor de la imagen dibujada
// Velo uniforme sobre el video para acercar su fondo de estudio (más claro)
// al color de la página sin apagar la cámara. Calibrado visualmente.
const DIM_ALPHA = 0.22;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
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
      showSlide: false,
    };

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
      const baseImg = frames[state.baseFrame];
      if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) return;

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
      ctx.drawImage(baseImg, t.dx, t.dy, t.drawW, t.drawH);

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
      }

      fadeImageEdges(t);
    }

    // Degradados desde cada borde de la imagen hacia adentro, en el color
    // plano de la página, para eliminar la costura entre el fondo de estudio
    // del video y el fondo del sitio.
    function fadeImageEdges(t: BaseTransform) {
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
    }

    function runIntro() {
      let startTime: number | null = null;
      function tick(time: number) {
        if (cancelled) return;
        if (startTime === null) startTime = time;
        const progress = Math.min((time - startTime) / INTRO_DURATION_MS, 1);
        const eased = easeInOutCubic(progress);
        state.baseFrame = Math.round(eased * (FRAME_COUNT - 1));
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
    const framePromises: Promise<void>[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_SRC(i);
      frames.push(img);
      if (i === 0) {
        img.decode().then(() => repaint()).catch(() => {});
      }
      framePromises.push(img.decode().catch(() => {}));
    }

    // Las miniaturas del portafolio recién hacen falta cuando termina el giro
    // (7s después), así que se empiezan a pedir DESPUÉS de que los 120 frames
    // terminen de cargar/decodificar — si se piden todas a la vez (133
    // imágenes en paralelo) compiten por ancho de banda con los frames justo
    // en el arranque, que es cuando más importa que vayan fluidos.
    let slidesReady: Promise<void> = Promise.resolve();
    function loadSlides() {
      const slidePromises: Promise<void>[] = [];
      for (let i = 0; i < POOL_SIZE; i++) {
        const img = new Image();
        img.src = SLIDE_SRC(i);
        slides.push(img);
        slidePromises.push(img.decode().catch(() => {}));
      }
      slidesReady = Promise.all(slidePromises).then(() => {
        if (cancelled) return;
        if (reducedMotion) repaint();
      });
    }

    Promise.all(framePromises).then(() => {
      if (cancelled) return;
      if (reducedMotion) {
        state.baseFrame = FRAME_COUNT - 1;
        state.showSlide = true;
        cells.forEach((cell) => {
          cell.appearAlpha = 1;
        });
        loadSlides();
        repaint();
      } else {
        loadSlides();
        runIntro();
      }
    });

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
            <p className="text-headline-md tracking-tight text-primary">REFLEXCAM</p>
            <p className="text-label-mono text-outline uppercase tracking-widest mt-1">
              Nunca pierdas un momento
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
