"use client";

import { ConfirmButton } from "./ConfirmButton";

export function ConfirmHoverDemo() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black">
      <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
        <ConfirmButton />
        <p className="text-center text-xs tracking-wide text-zinc-500">
          将鼠标移入按钮体验约 0.5s 动画 · 点击文字回弹
        </p>
      </div>
    </div>
  );
}
