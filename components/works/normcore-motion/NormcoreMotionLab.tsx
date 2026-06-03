"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ControlPanel } from "./controls/ControlPanel";
import { MotionStage } from "./MotionStage";
import { DEFAULT_MOTION_PARAMS } from "./motion/defaults";
import {
  loadStoredParams,
  mergeMotionParams,
  saveStoredParams,
} from "./motion/storage";
import type { MotionParams } from "./motion/types";

type NormcoreMotionLabProps = {
  showPanel?: boolean;
};

export function NormcoreMotionLab({ showPanel = true }: NormcoreMotionLabProps) {
  const [params, setParams] = useState<MotionParams>(DEFAULT_MOTION_PARAMS);
  const [panelOpen, setPanelOpen] = useState(showPanel);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);

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
    const defaults = mergeMotionParams(DEFAULT_MOTION_PARAMS);
    setParams(defaults);
    saveStoredParams(defaults);
  };

  const handleChange = (next: MotionParams) => {
    const merged = mergeMotionParams(next);
    setParams(merged);
    saveStoredParams(merged);
  };

  if (!hydrated) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return (
    <>
      <MotionStage params={params} reducedMotion={reducedMotion} />

      <Link
        href="/works"
        className="fixed left-4 top-4 z-[60] rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
      >
        ← 作品
      </Link>

      {reducedMotion && (
        <p className="fixed left-4 top-14 z-[60] max-w-xs text-[10px] text-white/50">
          已检测到「减少动态效果」，动画已暂停，仍可调整参数预览配色。
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
