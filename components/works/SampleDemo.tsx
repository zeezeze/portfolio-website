"use client";

import { useEffect, useRef } from "react";

export function SampleDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      glow.style.transform = `translate(${x - 160}px, ${y - 160}px)`;
    };

    container.addEventListener("mousemove", handleMove);
    return () => container.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-80 w-80 rounded-full opacity-80 blur-3xl transition-transform duration-100 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.55) 0%, rgba(59,130,246,0.35) 45%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">
          Interactive Demo
        </p>
        <h3 className="text-2xl font-medium text-zinc-100">移动鼠标试试</h3>
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          这是一个可嵌入作品详情页的 live 组件。后续你的 UI 概念、代码视觉、小工具都可以按同样方式挂载。
        </p>
      </div>
    </div>
  );
}
