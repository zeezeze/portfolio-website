"use client";

import { CORE_ANCHOR } from "../motion/defaults";
import type { HudTheme } from "../motion/types";

type CoreLayerProps = {
  theme: HudTheme;
  accentAlpha: number;
};

export function CoreLayer({ theme, accentAlpha }: CoreLayerProps) {
  const accent = theme.accent;

  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{
        left: `${CORE_ANCHOR.left}%`,
        top: `${CORE_ANCHOR.top}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        data-milcore-core
        className="relative flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div
          data-milcore-ring
          className="absolute rounded-full border"
          style={{
            width: "22vmin",
            height: "22vmin",
            borderColor: `${theme.line}44`,
          }}
        />
        <div
          data-milcore-ring
          className="absolute rounded-full border"
          style={{
            width: "16vmin",
            height: "16vmin",
            borderColor: `${accent}${Math.round(accentAlpha * 255)
              .toString(16)
              .padStart(2, "0")}`,
          }}
        />
        <svg
          width="12vmin"
          height="12vmin"
          viewBox="0 0 100 100"
          className="relative z-10"
          aria-hidden
        >
          <defs>
            <radialGradient id="milcoreCoreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={theme.line} />
              <stop offset="45%" stopColor={theme.dim} />
              <stop offset="100%" stopColor={theme.mid} />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="url(#milcoreCoreGrad)" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            opacity={accentAlpha}
          />
          <rect x="46" y="46" width="8" height="8" fill={theme.base} />
        </svg>
      </div>
    </div>
  );
}
