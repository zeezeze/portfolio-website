export type Work = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  year?: number;
};

export const works: Work[] = [
  {
    slug: "sample-demo",
    title: "鼠标光晕",
    description:
      "一个简单的交互视觉示例：鼠标移动时，渐变光晕会跟随指针流动，展示如何在作品详情页嵌入 live demo。",
    tags: ["visual", "interactive", "css"],
    thumbnail: "/works/sample-demo/thumb.svg",
    featured: true,
    year: 2026,
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

export function getFeaturedWorks(limit = 3): Work[] {
  return works.filter((work) => work.featured).slice(0, limit);
}

export function getAllSlugs(): string[] {
  return works.map((work) => work.slug);
}
