import { DEFAULT_MOTION_PARAMS, STORAGE_KEY } from "./defaults";
import type { MotionParams, ThemeId } from "./types";
import { THEME_IDS } from "./themes";

function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && THEME_IDS.includes(value as ThemeId);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function mergeMotionParams(
  partial: Partial<MotionParams>,
): MotionParams {
  const base = { ...DEFAULT_MOTION_PARAMS, ...partial };
  return {
    ...base,
    themeId: isThemeId(base.themeId) ? base.themeId : DEFAULT_MOTION_PARAMS.themeId,
    hueShift: clamp(base.hueShift, 0, 360),
    glitchIntensity: clamp(base.glitchIntensity, 0, 1),
    pixelSize: clamp(base.pixelSize, 4, 40),
    motionSpeed: clamp(base.motionSpeed, 0.2, 3),
    stepRatio: clamp(base.stepRatio, 0, 1),
    blurAmount: clamp(base.blurAmount, 0, 120),
    density: clamp(base.density, 0, 1),
    scaleAmplitude: clamp(base.scaleAmplitude, 0, 1),
    rotationAmplitude: clamp(base.rotationAmplitude, 0, 90),
  };
}

export function loadStoredParams(): MotionParams | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<MotionParams>;
    return mergeMotionParams(parsed);
  } catch {
    return null;
  }
}

export function saveStoredParams(params: MotionParams): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
}
