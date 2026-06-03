"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { getTheme } from "../motion/themes";
import type { MotionParams } from "../motion/types";
import { stepsEase } from "../motion/utils";

gsap.registerPlugin(useGSAP);

type GradientLayerProps = {
  params: MotionParams;
  reducedMotion: boolean;
};

const BLOBS = [
  { className: "left-[8%] top-[12%] h-[42vh] w-[38vw]", colorKey: "pink" as const },
  { className: "right-[5%] top-[18%] h-[50vh] w-[44vw]", colorKey: "orange" as const },
  { className: "left-[25%] bottom-[8%] h-[38vh] w-[50vw]", colorKey: "blue" as const },
  { className: "right-[20%] bottom-[15%] h-[30vh] w-[28vw]", colorKey: "green" as const },
];

export function GradientLayer({ params, reducedMotion }: GradientLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const theme = getTheme(params.themeId);

  useGSAP(
    () => {
      if (reducedMotion || !rootRef.current) {
        return;
      }
      const blobs = gsap.utils.toArray<HTMLElement>("[data-blob]", rootRef.current);
      blobs.forEach((blob, index) => {
        gsap.to(blob, {
          x: `random(-40, 40)`,
          y: `random(-30, 30)`,
          scale: `random(${1 - params.scaleAmplitude * 0.35}, ${1 + params.scaleAmplitude * 0.5})`,
          rotation: `random(-${params.rotationAmplitude * 0.4}, ${params.rotationAmplitude * 0.4})`,
          duration: 4 + index * 0.8,
          ease: stepsEase(params.stepRatio),
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });
      });
    },
    {
      scope: rootRef,
      dependencies: [
        params.themeId,
        params.stepRatio,
        params.scaleAmplitude,
        params.rotationAmplitude,
        reducedMotion,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0"
      style={{
        filter: `blur(${params.blurAmount}px) hue-rotate(${params.hueShift}deg)`,
      }}
    >
      {BLOBS.map((blob) => (
        <div
          key={blob.colorKey}
          data-blob
          className={`absolute rounded-3xl mix-blend-screen opacity-90 ${blob.className}`}
          style={{
            backgroundColor: theme.colors[blob.colorKey],
            willChange: "transform",
          }}
        />
      ))}
      <div
        className="absolute left-[12%] top-[8%] h-[22vh] w-[22vh] rounded-full mix-blend-screen"
        style={{ backgroundColor: theme.colors.blue }}
      />
    </div>
  );
}
