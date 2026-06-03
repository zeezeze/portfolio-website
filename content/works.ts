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
  {
    slug: "cursor-dot-scale",
    title: "鼠标圆点缩放交互",
    description:
      "自定义圆点光标：悬停可点击元素时放大，颜色随时间循环变化。效果仅在演示框内生效。",
    tags: ["interactive", "cursor", "micro-interaction"],
    thumbnail: "/works/cursor-dot-scale/thumb.svg",
    featured: true,
    year: 2026,
  },
  {
    slug: "normcore-motion",
    title: "Normcore Motion Playground",
    description:
      "Normcore 风格 2D 生成式动态 playground：高饱和色场、像素格、几何块与故障艺术层，支持实时滑杆调参。",
    tags: ["gsap", "generative", "glitch", "motion"],
    thumbnail: "/works/normcore-motion/thumb.svg",
    featured: false,
    year: 2026,
  },
  {
    slug: "milcore-hud",
    title: "Milcore Industrial HUD",
    description:
      "军工未来界面：偏心能量核心、三角碎片矢量爆发、分层 HUD 与阶梯机械动效，灰度 + 单霓虹强调色。",
    tags: ["gsap", "hud", "motion", "industrial"],
    thumbnail: "/works/milcore-hud/thumb.svg",
    featured: false,
    year: 2026,
  },
  {
    slug: "confirm-hover",
    title: "确认按钮 Hover",
    description:
      "黑底「确认」按钮：hover 约 0.5s 白块与描边从左到右机械擦除，字色转粉；点击时文字缩小回弹。",
    tags: ["interactive", "gsap", "button", "micro-interaction"],
    thumbnail: "/works/confirm-hover/thumb.svg",
    featured: false,
    year: 2026,
  },
  {
    slug: "game-menu-hover",
    title: "游戏菜单 Hover",
    description:
      "白底游戏菜单项：hover 时故障闪屏、粉色字与三枚方块轨道动画（圆/方/三角路径），黑色方块每 2s 交替快旋。",
    tags: ["interactive", "gsap", "glitch", "menu", "micro-interaction"],
    thumbnail: "/works/game-menu-hover/thumb.svg",
    featured: false,
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
