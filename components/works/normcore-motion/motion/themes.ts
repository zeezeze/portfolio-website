import type { MotionTheme, ThemeId } from "./types";

export const MOTION_THEMES: Record<ThemeId, MotionTheme> = {
  normcore: {
    id: "normcore",
    label: "Normcore",
    swatch: ["#ff2d8a", "#2d5bff", "#ff6b1a", "#39ff14", "#ffd60a"],
    colors: {
      pink: "#ff2d8a",
      blue: "#2d5bff",
      orange: "#ff6b1a",
      green: "#39ff14",
      yellow: "#ffd60a",
      teal: "#00f5d4",
      black: "#0a0a0a",
    },
  },
  acid: {
    id: "acid",
    label: "Acid",
    swatch: ["#bfff00", "#ff00ff", "#00ffff", "#ffff00", "#ff3366"],
    colors: {
      pink: "#ff00ff",
      blue: "#00ffff",
      orange: "#ffff00",
      green: "#bfff00",
      yellow: "#ffe600",
      teal: "#00ffcc",
      black: "#050505",
    },
  },
  signal: {
    id: "signal",
    label: "Signal",
    swatch: ["#ff0040", "#0080ff", "#ff8000", "#00ff80", "#e0e0e0"],
    colors: {
      pink: "#ff0040",
      blue: "#0080ff",
      orange: "#ff8000",
      green: "#00ff80",
      yellow: "#ffcc00",
      teal: "#00e5ff",
      black: "#111111",
    },
  },
  mono: {
    id: "mono",
    label: "Mono",
    swatch: ["#ffffff", "#cccccc", "#888888", "#444444", "#000000"],
    colors: {
      pink: "#f0f0f0",
      blue: "#c0c0c0",
      orange: "#909090",
      green: "#707070",
      yellow: "#e8e8e8",
      teal: "#a0a0a0",
      black: "#000000",
    },
  },
};

export const THEME_IDS = Object.keys(MOTION_THEMES) as ThemeId[];

export function getTheme(themeId: ThemeId): MotionTheme {
  return MOTION_THEMES[themeId];
}
