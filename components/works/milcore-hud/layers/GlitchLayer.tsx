"use client";

import { useEffect, useRef } from "react";
import type { BootPhase } from "../motion/types";
import type { HudParams, HudTheme } from "../motion/types";

type GlitchLayerProps = {
  params: HudParams;
  theme: HudTheme;
  phase: BootPhase;
  reducedMotion: boolean;
};

export function GlitchLayer({
  params,
  theme,
  phase,
  reducedMotion,
}: GlitchLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstFlashRef = useRef(0);

  useEffect(() => {
    if (phase === "burst") {
      burstFlashRef.current = 8;
    }
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) {
      return;
    }

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

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w / dpr, h / dpr);

      const intensity = params.glitchIntensity;
      const burstActive = burstFlashRef.current > 0;
      if (burstActive) {
        burstFlashRef.current -= 1;
      }

      const effectiveIntensity = burstActive
        ? Math.min(1, intensity + 0.45)
        : phase === "micro"
          ? intensity * 0.25
          : intensity * 0.12;

      if (effectiveIntensity <= 0.02) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      sliceTimer +=
        (burstActive ? 0.08 : 0.016) * params.motionSpeed * effectiveIntensity;
      if (sliceTimer > (burstActive ? 0.04 : 0.14)) {
        sliceTimer = 0;
        const count = Math.floor(effectiveIntensity * (burstActive ? 10 : 4));
        slices.length = 0;
        for (let i = 0; i < count; i += 1) {
          slices.push({
            y: Math.random() * (h / dpr),
            h: 2 + Math.random() * 16 * effectiveIntensity,
            offset: (Math.random() - 0.5) * 60 * effectiveIntensity,
          });
        }
      }

      for (const slice of slices) {
        ctx.fillStyle = "rgba(212,212,212,0.04)";
        ctx.fillRect(slice.offset, slice.y, w / dpr, slice.h);
        ctx.fillStyle = `${theme.accent}33`;
        ctx.fillRect(slice.offset * 0.5, slice.y, w / dpr, 1);
      }

      if (burstActive) {
        ctx.fillStyle = `${theme.accent}18`;
        ctx.fillRect(0, h / dpr * 0.38, w / dpr, 3);
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
    phase,
    theme.accent,
    reducedMotion,
  ]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-40 h-full w-full mix-blend-screen"
      aria-hidden
    />
  );
}
