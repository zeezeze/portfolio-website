import type { HudParams } from "./types";
import type { ShardSpec } from "./types";

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function stepCountFromRatio(ratio: number): number {
  const clamped = Math.max(0, Math.min(1, ratio));
  if (clamped < 0.05) {
    return 1;
  }
  return Math.round(lerp(2, 16, clamped));
}

export function stepsEase(ratio: number): string {
  const count = stepCountFromRatio(ratio);
  return count <= 1 ? "none" : `steps(${count})`;
}

export function burstDistancePx(strength: number): number {
  return lerp(40, 160, strength);
}

export function buildShards(params: HudParams): ShardSpec[] {
  const count = Math.max(6, Math.round(lerp(6, 14, params.shardDensity)));
  const minAngle = -135;
  const maxAngle = 45;
  const shards: ShardSpec[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = count <= 1 ? 0.5 : i / (count - 1);
    const angleDeg = minAngle + (maxAngle - minAngle) * t;
    const lengthVmin = lerp(14, 26, Math.sin(i * 1.7) * 0.5 + 0.5);
    const widthVmin = lerp(2.5, 5, params.shardDensity);
    shards.push({ id: i, angleDeg, lengthVmin, widthVmin });
  }

  return shards;
}

export function angleToBurstOffset(angleDeg: number, distance: number): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
  };
}
