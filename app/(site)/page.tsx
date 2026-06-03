import Link from "next/link";
import { WorkCard } from "@/components/WorkCard";
import { getFeaturedWorks } from "@/content/works";

export default function HomePage() {
  const featuredWorks = getFeaturedWorks();

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="flex min-h-[70vh] flex-col justify-center py-20">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-violet-300/80">
          Visual Portfolio
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
          用代码与视觉，记录每一次创作
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          这里是我的作品集站点。UI 概念、交互视觉、小项目都会在这里 live
          展示，访客点开链接即可直接体验。
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/works"
            className="rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
          >
            浏览全部作品
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            关于我
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-medium text-zinc-100">精选作品</h2>
          </div>
          <Link
            href="/works"
            className="text-sm text-zinc-400 transition hover:text-zinc-100"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </section>
    </div>
  );
}
