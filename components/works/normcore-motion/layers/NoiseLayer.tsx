"use client";

import { useMemo } from "react";
import type { MotionParams } from "../motion/types";
import { hash2D } from "../motion/utils";

type NoiseLayerProps = {
  params: MotionParams;
};

type Dot = { left: string; top: string; size: number; char: "+" | "·" };

export function NoiseLayer({ params }: NoiseLayerProps) {
  const dots = useMemo(() => {
    const count = Math.floor(params.density * 120);
    const items: Dot[] = [];
    for (let i = 0; i < count; i += 1) {
      const x = hash2D(i, 1.3);
      const y = hash2D(i, 4.7);
      items.push({
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        size: hash2D(i, 9.1) > 0.7 ? 10 : 6,
        char: hash2D(i, 2.2) > 0.55 ? "+" : "·",
      });
    }
    return items;
  }, [params.density]);

  return (
    <div
      className="pointer-events-none absolute inset-0 font-mono text-white/40"
      style={{ filter: `hue-rotate(${params.hueShift}deg)` }}
      aria-hidden
    >
      {dots.map((dot, index) => (
        <span
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: dot.left,
            top: dot.top,
            fontSize: dot.size,
            opacity: 0.25 + params.density * 0.5,
          }}
        >
          {dot.char}
        </span>
      ))}
    </div>
  );
}
