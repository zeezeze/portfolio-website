import { DEFAULT_HUD_PARAMS, STORAGE_KEY } from "./defaults";
import type { HudParams, HudThemeId } from "./types";
import { HUD_THEME_IDS } from "./themes";

function isThemeId(value: unknown): value is HudThemeId {
  return typeof value === "string" && HUD_THEME_IDS.includes(value as HudThemeId);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function mergeHudParams(partial: Partial<HudParams>): HudParams {
  const base = { ...DEFAULT_HUD_PARAMS, ...partial };
  return {
    ...base,
    themeId: isThemeId(base.themeId) ? base.themeId : DEFAULT_HUD_PARAMS.themeId,
    glitchIntensity: clamp(base.glitchIntensity, 0, 1),
    shardDensity: clamp(base.shardDensity, 0.2, 1),
    motionSpeed: clamp(base.motionSpeed, 0.2, 3),
    stepRatio: clamp(base.stepRatio, 0, 1),
    burstStrength: clamp(base.burstStrength, 0.2, 1),
    initDuration: clamp(base.initDuration, 1, 4),
    microAmplitude: clamp(base.microAmplitude, 0, 1),
    corePulse: clamp(base.corePulse, 0, 1),
    accentBrightness: clamp(base.accentBrightness, 0.2, 1),
  };
}

export function loadStoredParams(): HudParams | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return mergeHudParams(JSON.parse(raw) as Partial<HudParams>);
  } catch {
    return null;
  }
}

export function saveStoredParams(params: HudParams): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
}
