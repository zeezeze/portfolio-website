import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-6">
      <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">404</p>
      <h1 className="mt-2 text-4xl font-medium text-zinc-100">页面不存在</h1>
      <p className="mt-4 text-zinc-400">你要找的作品或页面可能已被移动或删除。</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
      >
        返回首页
      </Link>
    </div>
  );
}
