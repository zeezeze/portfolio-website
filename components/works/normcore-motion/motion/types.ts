export type ThemeId = "normcore" | "acid" | "signal" | "mono";

export type MotionParams = {
  themeId: ThemeId;
  hueShift: number;
  glitchIntensity: number;
  pixelSize: number;
  motionSpeed: number;
  stepRatio: number;
  blurAmount: number;
  density: number;
  scaleAmplitude: number;
  rotationAmplitude: number;
};

export type ThemeColors = {
  pink: string;
  blue: string;
  orange: string;
  green: string;
  yellow: string;
  teal: string;
  black: string;
};

export type MotionTheme = {
  id: ThemeId;
  label: string;
  swatch: string[];
  colors: ThemeColors;
};

export type SliderConfig = {
  key: keyof MotionParams;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
};
