import type { MotionParams } from "./types";

export const DEFAULT_MOTION_PARAMS: MotionParams = {
  themeId: "normcore",
  hueShift: 0,
  glitchIntensity: 0.55,
  pixelSize: 14,
  motionSpeed: 1,
  stepRatio: 0.35,
  blurAmount: 48,
  density: 0.62,
  scaleAmplitude: 0.28,
  rotationAmplitude: 18,
};

export const STORAGE_KEY = "normcore-motion-params";
