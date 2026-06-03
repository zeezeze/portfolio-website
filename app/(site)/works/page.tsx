import type { Metadata } from "next";
import { WorkCard } from "@/components/WorkCard";
import { works } from "@/content/works";

export const metadata: Metadata = {
  title: "作品",
  description: "全部视觉与交互作品列表。",
};

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Works</p>
        <h1 className="mt-2 text-4xl font-medium text-zinc-100">全部作品</h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          每个作品都有独立详情页，可嵌入可交互 demo，方便直接展示 UI 与代码视觉效果。
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
}
