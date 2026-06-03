"use client";

import { useMemo } from "react";
import { CORE_ANCHOR } from "../motion/defaults";
import { buildShards } from "../motion/utils";
import type { HudParams, HudTheme } from "../motion/types";

type ShardLayerProps = {
  params: HudParams;
  theme: HudTheme;
};

export function ShardLayer({ params, theme }: ShardLayerProps) {
  const shards = useMemo(
    () => buildShards(params),
    [params.shardDensity],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden
    >
      {shards.map((shard) => (
        <div
          key={shard.id}
          data-milcore-shard
          data-angle={shard.angleDeg}
          className="absolute"
          style={{
            left: `${CORE_ANCHOR.left}%`,
            top: `${CORE_ANCHOR.top}%`,
            width: `${shard.widthVmin}vmin`,
            height: `${shard.lengthVmin}vmin`,
            transform: `translate(-50%, -100%) rotate(${shard.angleDeg}deg)`,
            transformOrigin: "50% 100%",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            backgroundColor: theme.dim,
            borderBottom: `1px solid ${theme.line}66`,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
