"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { GradientLayer } from "./layers/GradientLayer";
import { PixelGridLayer } from "./layers/PixelGridLayer";
import { GeometryLayer } from "./layers/GeometryLayer";
import { GlitchOverlay } from "./layers/GlitchOverlay";
import { NoiseLayer } from "./layers/NoiseLayer";
import { useDebouncedValue } from "./motion/useDebouncedValue";
import type { MotionParams } from "./motion/types";

type MotionStageProps = {
  params: MotionParams;
  reducedMotion: boolean;
};

export function MotionStage({ params, reducedMotion }: MotionStageProps) {
  const structuralParams = useDebouncedValue(
    {
      pixelSize: params.pixelSize,
      density: params.density,
      themeId: params.themeId,
    },
    150,
  );

  useEffect(() => {
    gsap.globalTimeline.timeScale(reducedMotion ? 0 : params.motionSpeed);
    return () => {
      gsap.globalTimeline.timeScale(1);
    };
  }, [params.motionSpeed, reducedMotion]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <GradientLayer params={params} reducedMotion={reducedMotion} />
      <PixelGridLayer
        params={params}
        structuralParams={structuralParams}
        reducedMotion={reducedMotion}
      />
      <GeometryLayer params={params} reducedMotion={reducedMotion} />
      <NoiseLayer params={params} />
      <GlitchOverlay params={params} reducedMotion={reducedMotion} />
    </div>
  );
}
