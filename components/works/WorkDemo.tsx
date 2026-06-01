"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const workComponents: Record<string, ComponentType> = {
  "sample-demo": dynamic(() =>
    import("./SampleDemo").then((mod) => mod.SampleDemo),
  ),
  "cursor-dot-scale": dynamic(() =>
    import("./CursorDotScaleDemo").then((mod) => mod.CursorDotScaleDemo),
  ),
};

type WorkDemoProps = {
  slug: string;
};

export function WorkDemo({ slug }: WorkDemoProps) {
  const Demo = workComponents[slug];

  if (!Demo) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-10 text-center text-zinc-400">
        该作品尚未注册交互组件。请在{" "}
        <code className="text-zinc-300">components/works/WorkDemo.tsx</code>{" "}
        中添加映射。
      </div>
    );
  }

  return <Demo />;
}
