"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ControlPanel } from "./controls/ControlPanel";
import { MilcoreHudStage } from "./MilcoreHudStage";
import { DEFAULT_HUD_PARAMS } from "./motion/defaults";
import {
  loadStoredParams,
  mergeHudParams,
  saveStoredParams,
} from "./motion/storage";
import type { HudParams } from "./motion/types";

type MilcoreHudLabProps = {
  showPanel?: boolean;
};

export function MilcoreHudLab({ showPanel = true }: MilcoreHudLabProps) {
  const [params, setParams] = useState<HudParams>(DEFAULT_HUD_PARAMS);
  const [panelOpen, setPanelOpen] = useState(showPanel);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [stageKey, setStageKey] = useState(0);

  useEffect(() => {
    const stored = loadStoredParams();
    if (stored) {
      setParams(stored);
    }
    setHydrated(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);
    return () => mq.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleReset = () => {
    const defaults = mergeHudParams(DEFAULT_HUD_PARAMS);
    setParams(defaults);
    saveStoredParams(defaults);
    setStageKey((k) => k + 1);
  };

  const handleChange = (next: HudParams) => {
    const merged = mergeHudParams(next);
    setParams(merged);
    saveStoredParams(merged);
  };

  if (!hydrated) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
    <>
      <MilcoreHudStage
        key={stageKey}
        params={params}
        reducedMotion={reducedMotion}
      />

      <Link
        href="/works"
        className="fixed left-4 top-4 z-[60] rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
      >
        ← 作品
      </Link>

      {reducedMotion && (
        <p className="fixed left-4 top-14 z-[60] max-w-xs text-[10px] text-white/50">
          已检测到「减少动态效果」，显示静态 HUD 构图。
        </p>
      )}

      {showPanel && (
        <ControlPanel
          params={params}
          onChange={handleChange}
          onReset={handleReset}
          visible={panelOpen}
          onToggle={() => setPanelOpen((open) => !open)}
        />
      )}

      {showPanel && !panelOpen && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="fixed right-4 top-4 z-[60] hidden rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-md hover:bg-white/10 md:inline"
        >
          打开面板
        </button>
      )}
    </>
  );
}
