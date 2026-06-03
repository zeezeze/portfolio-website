import type { HudParams } from "./types";

export const CORE_ANCHOR = { left: 38, top: 42 };

export const DEFAULT_HUD_PARAMS: HudParams = {
  themeId: "teal",
  glitchIntensity: 0.45,
  shardDensity: 0.65,
  motionSpeed: 1,
  stepRatio: 0.55,
  burstStrength: 0.72,
  initDuration: 2.1,
  microAmplitude: 0.35,
  corePulse: 0.22,
  accentBrightness: 0.85,
};

export const STORAGE_KEY = "milcore-hud-params";

export const BURST_DURATION_S = 0.2;
export const FREEZE_DURATION_S = 0.6;
