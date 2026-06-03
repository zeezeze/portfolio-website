"use client";

import { useRef, useState } from "react";
import { BackgroundLayer } from "./layers/BackgroundLayer";
import { CoreLayer } from "./layers/CoreLayer";
import { GlitchLayer } from "./layers/GlitchLayer";
import { HudLayer } from "./layers/HudLayer";
import { ShardLayer } from "./layers/ShardLayer";
import { getHudTheme } from "./motion/themes";
import { useBootTimeline } from "./motion/useBootTimeline";
import type { BootPhase, HudParams } from "./motion/types";

type MilcoreHudStageProps = {
  params: HudParams;
  reducedMotion: boolean;
};

export function MilcoreHudStage({ params, reducedMotion }: MilcoreHudStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<BootPhase>("init");
  const theme = getHudTheme(params.themeId);

  useBootTimeline({
    scopeRef: stageRef,
    params,
    reducedMotion,
    onPhaseChange: setPhase,
  });

  return (
    <div ref={stageRef} className="fixed inset-0 z-0 overflow-hidden bg-black">
      <BackgroundLayer theme={theme} />
      <ShardLayer params={params} theme={theme} />
      <CoreLayer theme={theme} accentAlpha={params.accentBrightness} />
      <HudLayer theme={theme} phase={phase} />
      <GlitchLayer
        params={params}
        theme={theme}
        phase={phase}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
