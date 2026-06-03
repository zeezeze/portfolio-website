"use client";

import type { HudTheme } from "../motion/types";

type BackgroundLayerProps = {
  theme: HudTheme;
};

export function BackgroundLayer({ theme }: BackgroundLayerProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundColor: theme.base,
        backgroundImage: `
          linear-gradient(${theme.mid} 1px, transparent 1px),
          linear-gradient(90deg, ${theme.mid} 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        opacity: 0.35,
      }}
      aria-hidden
    />
  );
}
