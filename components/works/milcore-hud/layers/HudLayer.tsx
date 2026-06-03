"use client";

import { CORE_ANCHOR } from "../motion/defaults";
import type { BootPhase } from "../motion/types";
import type { HudTheme } from "../motion/types";

type HudLayerProps = {
  theme: HudTheme;
  phase: BootPhase;
};

const CALIBRATION_ANGLES = [-120, -90, -60, -30, 0, 30, 60];

const LABELS_BY_PHASE: Record<BootPhase, string[]> = {
  idle: ["STANDBY"],
  init: ["SYS_INIT", "BOOT_SEQ", "CAL_PENDING"],
  burst: ["VECTOR_BURST", "LOCK_AWAY"],
  freeze: ["VECTOR_LOCK", "HOLD_200MS"],
  micro: ["CAL_OK", "RNG_0x4F", "MICRO_DRIFT"],
};

export function HudLayer({ theme, phase }: HudLayerProps) {
  const labels = LABELS_BY_PHASE[phase] ?? LABELS_BY_PHASE.init;
  const accent = theme.accent;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 font-mono" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <marker
            id="milcoreArrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill={accent} />
          </marker>
        </defs>
        {CALIBRATION_ANGLES.map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const len = 28;
          const cx = CORE_ANCHOR.left;
          const cy = CORE_ANCHOR.top;
          const x2 = cx + Math.cos(rad) * len;
          const y2 = cy + Math.sin(rad) * len;
          return (
            <g key={angle}>
              <line
                data-milcore-hud-line
                x1={`${cx}%`}
                y1={`${cy}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke={theme.line}
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.35"
              />
              <line
                data-milcore-hud-tick
                x1={`${x2}%`}
                y1={`${y2}%`}
                x2={`${x2 + Math.cos(rad + Math.PI / 2) * 1.5}%`}
                y2={`${y2 + Math.sin(rad + Math.PI / 2) * 1.5}%`}
                stroke={theme.line}
                strokeWidth="1"
                opacity="0.5"
              />
            </g>
          );
        })}
        <line
          data-milcore-hud-arrow
          x1={`${CORE_ANCHOR.left + 8}%`}
          y1={`${CORE_ANCHOR.top - 12}%`}
          x2={`${CORE_ANCHOR.left + 22}%`}
          y2={`${CORE_ANCHOR.top - 18}%`}
          stroke={accent}
          strokeWidth="1"
          markerEnd="url(#milcoreArrow)"
          opacity="0.7"
        />
        <line
          data-milcore-hud-arrow
          x1={`${CORE_ANCHOR.left - 6}%`}
          y1={`${CORE_ANCHOR.top + 14}%`}
          x2={`${CORE_ANCHOR.left - 18}%`}
          y2={`${CORE_ANCHOR.top + 24}%`}
          stroke={theme.line}
          strokeWidth="1"
          markerEnd="url(#milcoreArrow)"
          opacity="0.5"
        />
      </svg>

      <div
        data-milcore-coords
        className="absolute text-[9px] tracking-widest"
        style={{ left: "8%", top: "12%", color: theme.line }}
      >
        X:048.12 Y:119.07
      </div>
      <div
        data-milcore-coords
        className="absolute text-[9px] tracking-widest"
        style={{ right: "10%", bottom: "14%", color: theme.dim }}
      >
        ALT:+002.4m
      </div>

      <div
        className="absolute left-[58%] top-[28%] space-y-1 text-[9px] uppercase tracking-[0.2em]"
        style={{ color: theme.line }}
      >
        {labels.map((label) => (
          <p key={label} data-milcore-label>
            {label}
          </p>
        ))}
      </div>

      <div
        className="absolute border border-dashed px-2 py-1 text-[8px] uppercase tracking-[0.25em]"
        style={{
          left: "6%",
          bottom: "18%",
          borderColor: `${theme.line}55`,
          color: theme.dim,
        }}
      >
        SEC:VECTOR_04
      </div>

      <div
        data-milcore-hud-frame
        className="absolute left-1/2 top-1/2 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 border border-dashed opacity-30"
        style={{ borderColor: theme.line }}
      />
    </div>
  );
}
