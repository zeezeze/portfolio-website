"use client";

import Link from "next/link";

export function MilcoreHudPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black p-8">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(#1a1a1a 1px, transparent 1px),
            linear-gradient(90deg, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 font-mono text-xs text-zinc-400">
        <p className="text-[10px] uppercase tracking-[0.25em] text-teal-400/90">
          SYS_INIT
        </p>
        <p className="mt-2 text-sm text-zinc-300">
          军工工业 HUD：偏心能量核心、三角碎片矢量爆发与分层校准界面。
        </p>
        <Link
          href="/works/milcore-hud"
          className="mt-4 inline-flex rounded-full border border-zinc-600 px-5 py-2.5 text-sm text-zinc-200 transition hover:border-teal-500/50 hover:text-teal-300"
        >
          打开全屏 HUD →
        </Link>
      </div>
    </div>
  );
}
