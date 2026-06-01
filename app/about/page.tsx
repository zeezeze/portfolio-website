import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于",
  description: "关于我与联系方式。",
};

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">About</p>
        <h1 className="mt-2 text-4xl font-medium text-zinc-100">关于我</h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-400">
          我正在通过 Cursor、GitHub 和 Vercel 搭建并维护这个作品集站点。这里会陆续发布 UI
          概念、交互视觉和小项目，方便直接分享给他人浏览与体验。
        </p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          你可以把这里当作一个持续更新的创作档案。每完成一个新作品，只需更新项目里的配置文件并
          push 到 GitHub，网站就会自动部署更新。
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          联系方式
        </h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-violet-500/50 hover:text-violet-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
        <h2 className="text-lg font-medium text-zinc-100">技术栈</h2>
        <ul className="mt-4 grid gap-3 text-sm text-zinc-400 sm:grid-cols-2">
          <li>Next.js + React + TypeScript</li>
          <li>Tailwind CSS</li>
          <li>GitHub 版本管理</li>
          <li>Vercel 自动部署</li>
        </ul>
      </section>
    </div>
  );
}
