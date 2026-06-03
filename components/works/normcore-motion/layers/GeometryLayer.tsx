"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { getTheme } from "../motion/themes";
import type { MotionParams } from "../motion/types";
import { stepsEase } from "../motion/utils";

gsap.registerPlugin(useGSAP);

type GeometryLayerProps = {
  params: MotionParams;
  reducedMotion: boolean;
};

export function GeometryLayer({ params, reducedMotion }: GeometryLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const theme = getTheme(params.themeId);
  const shapeCount = Math.max(2, Math.floor(params.density * 5));

  useGSAP(
    () => {
      if (reducedMotion || !rootRef.current) {
        return;
      }
      const shapes = gsap.utils.toArray<HTMLElement>("[data-shape]", rootRef.current);
      shapes.forEach((shape, index) => {
        const scaleRange = 1 + params.scaleAmplitude * 0.45;
        gsap.to(shape, {
          x: `random(-24, 24)`,
          y: `random(-20, 20)`,
          scale: `random(${1 / scaleRange}, ${scaleRange})`,
          rotation: `random(-${params.rotationAmplitude}, ${params.rotationAmplitude})`,
          duration: 3.2 + index * 0.6,
          ease: stepsEase(params.stepRatio),
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      });

      const lines = gsap.utils.toArray<HTMLElement>("[data-hud-line]", rootRef.current);
      lines.forEach((line, index) => {
        gsap.to(line, { opacity: 0.25, duration: 0.6, repeat: -1, yoyo: true, delay: index * 0.15 });
      });
    },
    {
      scope: rootRef,
      dependencies: [
        params.density,
        params.stepRatio,
        params.scaleAmplitude,
        params.rotationAmplitude,
        reducedMotion,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0"
      style={{ filter: `hue-rotate(${params.hueShift}deg)` }}
    >
      <div
        data-shape
        className="absolute left-[6%] top-[10%] h-[28vmin] w-[28vmin] bg-black"
        style={{ willChange: "transform" }}
      />
      <div
        data-shape
        className="absolute left-[22%] top-[18%] h-[14vmin] w-[14vmin] rounded-full"
        style={{
          backgroundColor: theme.colors.blue,
          willChange: "transform",
        }}
      />
      {shapeCount >= 3 && (
        <div
          data-shape
          className="absolute right-[18%] top-[22%] h-[10vmin] w-[18vmin]"
          style={{
            backgroundColor: theme.colors.orange,
            willChange: "transform",
          }}
        />
      )}
      {shapeCount >= 4 && (
        <div
          data-shape
          className="absolute bottom-[20%] left-[40%] h-[8vmin] w-[8vmin] rotate-45"
          style={{
            backgroundColor: theme.colors.green,
            willChange: "transform",
          }}
        />
      )}
      {shapeCount >= 5 && (
        <div
          data-shape
          className="absolute bottom-[28%] right-[12%] h-[16vmin] w-[6vmin]"
          style={{
            backgroundColor: theme.colors.pink,
            willChange: "transform",
          }}
        />
      )}

      <div className="absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2">
        <div data-hud-line className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/50" />
        <div data-hud-line className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/50" />
        <div className="absolute left-2 top-2 h-6 w-6 border-l border-t border-white/70" />
        <div className="absolute right-2 top-2 h-6 w-6 border-r border-t border-white/70" />
        <div className="absolute bottom-2 left-2 h-6 w-6 border-b border-l border-white/70" />
        <div className="absolute right-2 bottom-2 h-6 w-6 border-b border-r border-white/70" />
      </div>
    </div>
  );
}
