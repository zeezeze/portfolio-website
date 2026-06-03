"use client";

import { useEffect, useRef } from "react";
import { getTheme } from "../motion/themes";
import type { MotionParams } from "../motion/types";

type GlitchOverlayProps = {
  params: MotionParams;
  reducedMotion: boolean;
};

export function GlitchOverlay({ params, reducedMotion }: GlitchOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const theme = getTheme(params.themeId);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    let sliceTimer = 0;
    const slices: { y: number; h: number; offset: number }[] = [];

    const spawnSlice = (h: number) => {
      const count = Math.floor(params.glitchIntensity * 6);
      slices.length = 0;
      for (let i = 0; i < count; i += 1) {
        slices.push({
          y: Math.random() * h,
          h: 4 + Math.random() * 28 * params.glitchIntensity,
          offset: (Math.random() - 0.5) * 80 * params.glitchIntensity,
        });
      }
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w / dpr, h / dpr);

      const intensity = params.glitchIntensity;
      if (intensity <= 0.02) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      sliceTimer += reducedMotion ? 0 : params.motionSpeed * 0.016;
      if (sliceTimer > 0.12 / Math.max(0.2, params.motionSpeed)) {
        sliceTimer = 0;
        spawnSlice(h / dpr);
      }

      for (const slice of slices) {
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        ctx.fillRect(slice.offset, slice.y, w / dpr, slice.h);
        ctx.fillStyle = `${theme.colors.teal}44`;
        ctx.fillRect(slice.offset * 0.6, slice.y, w / dpr, 2);
      }

      const lineX = w / dpr * 0.82 + Math.sin(Date.now() * 0.002 * params.motionSpeed) * 12 * intensity;
      ctx.strokeStyle = theme.colors.teal;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lineX, 0);
      ctx.lineTo(lineX + 8 * intensity, h / dpr * 0.4);
      ctx.lineTo(lineX - 6 * intensity, h / dpr * 0.7);
      ctx.lineTo(lineX + 4 * intensity, h / dpr);
      ctx.stroke();

      if (intensity > 0.35 && !reducedMotion) {
        ctx.fillStyle = `${theme.colors.pink}22`;
        ctx.fillRect(lineX - 120 * intensity, 0, 4, h / dpr);
        ctx.fillStyle = `${theme.colors.blue}22`;
        ctx.fillRect(lineX + 118 * intensity, 0, 4, h / dpr);
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [
    params.glitchIntensity,
    params.motionSpeed,
    params.themeId,
    params.hueShift,
    reducedMotion,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
      style={{ filter: `hue-rotate(${params.hueShift}deg)` }}
      aria-hidden
    />
  );
}
