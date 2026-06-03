function drawNoise(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  intensity: number,
) {
  const count = Math.floor(w * h * 0.04 * intensity);
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const v = Math.random() * 255;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.25 * intensity})`;
    ctx.fillRect(x, y, 1, 1);
  }
}

export type FilterGlitchClassNames = {
  sourceActive: string;
  scanlines: string;
};

export function playFilterGlitchBurst(
  sourceEl: HTMLElement,
  zoneEl: HTMLElement,
  noiseCanvas: HTMLCanvasElement | null,
  classNames: FilterGlitchClassNames,
  durationMs = 200,
): () => void {
  const rect = zoneEl.getBoundingClientRect();
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);

  sourceEl.classList.add(classNames.sourceActive);

  const scanlines = document.createElement("div");
  scanlines.className = classNames.scanlines;
  scanlines.setAttribute("aria-hidden", "true");
  zoneEl.appendChild(scanlines);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let ctx: CanvasRenderingContext2D | null = null;
  if (noiseCanvas) {
    noiseCanvas.width = Math.floor(w * dpr);
    noiseCanvas.height = Math.floor(h * dpr);
    noiseCanvas.style.width = `${w}px`;
    noiseCanvas.style.height = `${h}px`;
    ctx = noiseCanvas.getContext("2d");
  }

  const start = performance.now();
  let rafId = 0;
  let done = false;

  const cleanup = () => {
    if (done) {
      return;
    }
    done = true;
    cancelAnimationFrame(rafId);
    sourceEl.classList.remove(classNames.sourceActive);
    scanlines.remove();
    if (ctx && noiseCanvas) {
      ctx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);
    }
  };

  const frame = (now: number) => {
    const elapsed = now - start;
    if (elapsed >= durationMs) {
      cleanup();
      return;
    }

    const intensity = 1 - elapsed / durationMs;

    if (ctx && noiseCanvas) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawNoise(ctx, w, h, intensity);
    }

    rafId = requestAnimationFrame(frame);
  };

  rafId = requestAnimationFrame(frame);

  return cleanup;
}
