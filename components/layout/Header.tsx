import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/works", label: "作品" },
  { href: "/about", label: "关于" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] text-zinc-100 uppercase transition hover:text-violet-300"
        >
          Portfolio
        </Link>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
