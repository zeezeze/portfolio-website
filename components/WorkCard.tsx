import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/content/works";

type WorkCardProps = {
  work: Work;
};

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 transition hover:border-violet-500/40 hover:bg-zinc-900/70"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-medium text-zinc-100 transition group-hover:text-violet-200">
            {work.title}
          </h3>
          {work.year ? (
            <span className="shrink-0 text-xs text-zinc-500">{work.year}</span>
          ) : null}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
