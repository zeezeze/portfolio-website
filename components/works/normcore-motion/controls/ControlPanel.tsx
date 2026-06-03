"use client";

import { MOTION_THEMES, THEME_IDS } from "../motion/themes";
import type { MotionParams, ThemeId } from "../motion/types";
import { PARAM_SLIDERS } from "./sliderConfig";

type ControlPanelProps = {
  params: MotionParams;
  onChange: (next: MotionParams) => void;
  onReset: () => void;
  visible: boolean;
  onToggle: () => void;
};

function formatValue(value: number, unit?: string): string {
  const rounded =
    Math.abs(value) >= 10 ? value.toFixed(0) : value.toFixed(2).replace(/\.?0+$/, "");
  return unit ? `${rounded}${unit}` : rounded;
}

export function ControlPanel({
  params,
  onChange,
  onReset,
  visible,
  onToggle,
}: ControlPanelProps) {
  const update = (patch: Partial<MotionParams>) => {
    onChange({ ...params, ...patch });
  };

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-[60] rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white/10 md:hidden"
        aria-expanded={visible}
      >
        {visible ? "隐藏面板" : "调参面板"}
      </button>

      <aside
        className={`fixed z-[55] flex flex-col border-white/10 bg-black/75 text-white backdrop-blur-xl transition-transform duration-300 ${
          visible
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full"
        } bottom-0 left-0 right-0 max-h-[70vh] w-full border-t md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-72 md:border-l md:border-t-0`}
        aria-label="Motion parameter controls"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              Playground
            </p>
            <h2 className="text-sm font-medium">Normcore Motion</h2>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="hidden rounded-md px-2 py-1 text-xs text-white/60 hover:bg-white/10 md:inline"
          >
            收起
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
          <div>
            <p className="mb-2 text-xs text-white/50">颜色主题</p>
            <div className="grid grid-cols-2 gap-2">
              {THEME_IDS.map((id) => {
                const theme = MOTION_THEMES[id];
                const active = params.themeId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => update({ themeId: id as ThemeId })}
                    className={`rounded-lg border px-2 py-2 text-left text-xs transition ${
                      active
                        ? "border-white/60 bg-white/10"
                        : "border-white/15 hover:border-white/30"
                    }`}
                  >
                    <div className="mb-1 flex gap-0.5">
                      {theme.swatch.map((color) => (
                        <span
                          key={color}
                          className="h-3 w-3 rounded-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    {theme.label}
                  </button>
                );
              })}
            </div>
          </div>

          {PARAM_SLIDERS.map((slider) => {
            const value = params[slider.key] as number;
            return (
              <label key={slider.key} className="block">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-white/70">{slider.label}</span>
                  <span className="font-mono text-white/90">
                    {formatValue(value, slider.unit)}
                  </span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={value}
                  onChange={(event) =>
                    update({
                      [slider.key]: Number(event.target.value),
                    } as Partial<MotionParams>)
                  }
                  className="h-1 w-full cursor-pointer accent-violet-400"
                />
              </label>
            );
          })}
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-lg border border-white/15 px-3 py-2 text-xs text-white/70 hover:bg-white/5"
          >
            重置默认
          </button>
        </div>
      </aside>
    </>
  );
}
