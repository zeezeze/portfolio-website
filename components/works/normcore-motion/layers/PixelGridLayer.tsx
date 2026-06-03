"use client";

import { useEffect, useRef } from "react";
import { getTheme } from "../motion/themes";
import type { MotionParams } from "../motion/types";
import { hash2D } from "../motion/utils";

type PixelGridLayerProps = {
  params: MotionParams;
  structuralParams: Pick<MotionParams, "pixelSize" | "density" | "themeId">;
  reducedMotion: boolean;
};

const MAX_CELLS = 10000;

type Cell = {
  gx: number;
  gy: number;
  color: string;
  phase: number;
};

export function PixelGridLayer({
  params,
  structuralParams,
  reducedMotion,
}: PixelGridLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const theme = getTheme(structuralParams.themeId);
    const cellSize = structuralParams.pixelSize;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const { width, height } = canvas;
    const cols = Math.floor(width / dpr / cellSize);
    const rows = Math.floor(height / dpr / cellSize);
    const totalSlots = cols * rows;
    const targetCount = Math.min(
      MAX_CELLS,
      Math.floor(totalSlots * structuralParams.density * 0.35),
    );

    const palette = [
      theme.colors.yellow,
      theme.colors.orange,
      theme.colors.blue,
      theme.colors.teal,
      theme.colors.pink,
    ];

    const cells: Cell[] = [];
    let attempts = 0;
    while (cells.length < targetCount && attempts < targetCount * 12) {
      attempts += 1;
      const gx = Math.floor(Math.random() * cols);
      const gy = Math.floor(Math.random() * rows);
      const nx = gx / cols;
      const ny = gy / rows;
      const regionWeight =
        (nx > 0.55 ? 1.4 : 0.5) * (ny > 0.2 && ny < 0.75 ? 1.2 : 0.7);
      if (hash2D(gx, gy) > structuralParams.density * regionWeight) {
        continue;
      }
      const color =
        palette[Math.floor(hash2D(gx + 7, gy + 3) * palette.length)] ??
        theme.colors.yellow;
      cells.push({ gx, gy, color, phase: hash2D(gx, gy) * Math.PI * 2 });
    }
    cellsRef.current = cells;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return () => window.removeEventListener("resize", resize);
    }

    let rafId = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!reducedMotion) {
        timeRef.current += dt * params.motionSpeed;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w / dpr, h / dpr);

      const size = cellSize;
      const t = timeRef.current;

      for (const cell of cellsRef.current) {
        const pulse =
          0.55 +
          0.45 *
            Math.sin(t * 2.2 + cell.phase + cell.gx * 0.15 + cell.gy * 0.12);
        if (pulse < 0.35) {
          continue;
        }
        ctx.fillStyle = cell.color;
        ctx.globalAlpha = Math.min(1, pulse * structuralParams.density + 0.2);
        ctx.fillRect(cell.gx * size, cell.gy * size, size - 1, size - 1);
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [
    structuralParams.pixelSize,
    structuralParams.density,
    structuralParams.themeId,
    params.motionSpeed,
    reducedMotion,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
      style={{ filter: `hue-rotate(${params.hueShift}deg)` }}
      aria-hidden
    />
  );
}
