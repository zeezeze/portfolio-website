"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type RefObject } from "react";
import {
  BURST_DURATION_S,
  FREEZE_DURATION_S,
} from "./defaults";
import type { BootPhase } from "./types";
import type { HudParams } from "./types";
import {
  angleToBurstOffset,
  burstDistancePx,
  stepsEase,
} from "./utils";

gsap.registerPlugin(useGSAP);

type UseBootTimelineOptions = {
  scopeRef: RefObject<HTMLElement | null>;
  params: HudParams;
  reducedMotion: boolean;
  onPhaseChange: (phase: BootPhase) => void;
};

export function useBootTimeline({
  scopeRef,
  params,
  reducedMotion,
  onPhaseChange,
}: UseBootTimelineOptions) {
  const microTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) {
        return;
      }

      if (reducedMotion) {
        const root = scopeRef.current;
        const core = root.querySelector("[data-milcore-core]");
        const shards = gsap.utils.toArray<HTMLElement>("[data-milcore-shard]", root);
        const burstDist = burstDistancePx(params.burstStrength);
        gsap.set(core, { scale: 1, opacity: 1 });
        shards.forEach((shard) => {
          const angle = Number(shard.dataset.angle ?? 0);
          const offset = angleToBurstOffset(angle, burstDist);
          gsap.set(shard, { opacity: 1, x: offset.x, y: offset.y });
        });
        onPhaseChange("freeze");
        return;
      }

      const root = scopeRef.current;
      const core = root.querySelector("[data-milcore-core]");
      const shards = gsap.utils.toArray<HTMLElement>("[data-milcore-shard]", root);
      const hudLines = gsap.utils.toArray<SVGElement>("[data-milcore-hud-line]", root);
      const labels = gsap.utils.toArray<HTMLElement>("[data-milcore-label]", root);
      const rings = gsap.utils.toArray<HTMLElement>("[data-milcore-ring]", root);

      const ease = stepsEase(params.stepRatio);
      const burstDist = burstDistancePx(params.burstStrength);

      gsap.set(core, { scale: 0, opacity: 0 });
      gsap.set(shards, { opacity: 0, x: 0, y: 0 });
      gsap.set(hudLines, { opacity: 0.15 });
      gsap.set(labels, { opacity: 0 });

      onPhaseChange("init");

      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseChange("micro");
          startMicroLoop();
        },
      });

      tl.eventCallback("onStart", () => onPhaseChange("init"));

      tl.to(core, {
        scale: 1,
        opacity: 1,
        duration: params.initDuration,
        ease,
      });

      tl.to(
        hudLines,
        {
          opacity: 0.55,
          duration: params.initDuration * 0.7,
          stagger: 0.08,
          ease,
        },
        0,
      );

      tl.to(
        labels,
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.06,
          ease: stepsEase(Math.min(1, params.stepRatio + 0.2)),
        },
        params.initDuration * 0.5,
      );

      tl.add(() => onPhaseChange("burst"), params.initDuration);

      shards.forEach((shard, index) => {
        const angle = Number(shard.dataset.angle ?? 0);
        const offset = angleToBurstOffset(angle, burstDist);
        tl.to(
          shard,
          {
            opacity: 1,
            x: offset.x,
            y: offset.y,
            duration: BURST_DURATION_S,
            ease: stepsEase(Math.min(1, params.stepRatio + 0.15)),
          },
          params.initDuration + index * 0.008,
        );
      });

      tl.to(
        rings,
        {
          scale: 1.08,
          duration: BURST_DURATION_S,
          ease: "steps(3)",
          yoyo: true,
          repeat: 1,
        },
        params.initDuration,
      );

      tl.add(() => onPhaseChange("freeze"), params.initDuration + BURST_DURATION_S);
      tl.to({}, { duration: FREEZE_DURATION_S });

      function startMicroLoop() {
        if (microTweenRef.current) {
          microTweenRef.current.kill();
        }

        const pulse = 1 + params.corePulse * 0.04;
        microTweenRef.current = gsap.to(core, {
          scale: pulse,
          duration: 4 / params.motionSpeed,
          ease: stepsEase(params.stepRatio * 0.6),
          repeat: -1,
          yoyo: true,
        });

        shards.forEach((shard, index) => {
          const angle = Number(shard.dataset.angle ?? 0);
          const base = angleToBurstOffset(angle, burstDist);
          const jitter = params.microAmplitude * 4;
          gsap.to(shard, {
            x: base.x + jitter,
            y: base.y + jitter,
            duration: 2.8 / params.motionSpeed + index * 0.1,
            ease: stepsEase(params.stepRatio * 0.5),
            repeat: -1,
            yoyo: true,
            delay: index * 0.05,
          });
        });

        gsap.to(labels, {
          opacity: 0.35,
          duration: 0.12,
          ease: "steps(2)",
          repeat: -1,
          yoyo: true,
          stagger: 0.04,
        });
      }

      return () => {
        tl.kill();
        microTweenRef.current?.kill();
        gsap.killTweensOf([core, ...shards, ...hudLines, ...labels, ...rings]);
      };
    },
    {
      scope: scopeRef,
      dependencies: [
        params.initDuration,
        params.burstStrength,
        params.stepRatio,
        params.shardDensity,
        params.motionSpeed,
        params.microAmplitude,
        params.corePulse,
        reducedMotion,
      ],
      revertOnUpdate: true,
    },
  );
}
