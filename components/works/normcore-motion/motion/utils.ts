export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function stepCountFromRatio(ratio: number): number {
  const clamped = Math.max(0, Math.min(1, ratio));
  if (clamped < 0.05) {
    return 1;
  }
  return Math.round(lerp(2, 24, clamped));
}

export function stepsEase(ratio: number): string {
  const count = stepCountFromRatio(ratio);
  return count <= 1 ? "none" : `steps(${count})`;
}

export function hash2D(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}
