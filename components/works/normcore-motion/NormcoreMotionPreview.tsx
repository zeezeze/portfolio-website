"use client";

import Link from "next/link";

export function NormcoreMotionPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black p-8">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(135deg, #ff2d8a 0%, #2d5bff 40%, #ff6b1a 70%, #39ff14 100%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative z-10">
        <p className="text-sm text-zinc-300">
          Normcore 风格 2D 动态 playground，需在全屏沉浸页调参体验。
        </p>
        <Link
          href="/works/normcore-motion"
          className="mt-4 inline-flex rounded-full bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-400"
        >
          打开全屏 Playground →
        </Link>
      </div>
    </div>
  );
}
