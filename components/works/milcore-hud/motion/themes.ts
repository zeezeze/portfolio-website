import type { HudTheme, HudThemeId } from "./types";

export const HUD_THEMES: Record<HudThemeId, HudTheme> = {
  teal: {
    id: "teal",
    label: "Teal Signal",
    swatch: ["#0b0b0b", "#6b6b6b", "#d4d4d4", "#00f5d4"],
    base: "#0b0b0b",
    mid: "#1a1a1a",
    dim: "#6b6b6b",
    line: "#d4d4d4",
    accent: "#00f5d4",
  },
  lime: {
    id: "lime",
    label: "Lime Vector",
    swatch: ["#0b0b0b", "#6b6b6b", "#d4d4d4", "#39ff14"],
    base: "#0b0b0b",
    mid: "#141414",
    dim: "#707070",
    line: "#c8c8c8",
    accent: "#39ff14",
  },
  cyan: {
    id: "cyan",
    label: "Cyan Lock",
    swatch: ["#0b0b0b", "#5a5a5a", "#e0e0e0", "#00e5ff"],
    base: "#080808",
    mid: "#161616",
    dim: "#5a5a5a",
    line: "#e0e0e0",
    accent: "#00e5ff",
  },
};

export const HUD_THEME_IDS = Object.keys(HUD_THEMES) as HudThemeId[];

export function getHudTheme(themeId: HudThemeId): HudTheme {
  return HUD_THEMES[themeId];
}
