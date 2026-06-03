export type HudThemeId = "teal" | "lime" | "cyan";

export type HudParams = {
  themeId: HudThemeId;
  glitchIntensity: number;
  shardDensity: number;
  motionSpeed: number;
  stepRatio: number;
  burstStrength: number;
  initDuration: number;
  microAmplitude: number;
  corePulse: number;
  accentBrightness: number;
};

export type HudTheme = {
  id: HudThemeId;
  label: string;
  swatch: string[];
  base: string;
  mid: string;
  dim: string;
  line: string;
  accent: string;
};

export type BootPhase = "init" | "burst" | "freeze" | "micro" | "idle";

export type SliderConfig = {
  key: keyof HudParams;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
};

export type ShardSpec = {
  id: number;
  angleDeg: number;
  lengthVmin: number;
  widthVmin: number;
};
