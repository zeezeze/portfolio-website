import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkDemo } from "@/components/works";
import { getAllSlugs, getWorkBySlug } from "@/content/works";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return { title: "作品未找到" };
  }

  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Link
        href="/works"
        className="text-sm text-zinc-500 transition hover:text-zinc-300"
      >
        ← 返回作品列表
      </Link>

      <div className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-4xl font-medium text-zinc-100">{work.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          {work.description}
        </p>
      </div>

      <section className="mt-12">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-zinc-500">
          Live Demo
        </p>
        <WorkDemo slug={slug} />
      </section>
    </div>
  );
}
