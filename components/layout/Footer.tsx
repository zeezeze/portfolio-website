export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Portfolio. Built with Next.js.</p>
        <p>Cursor · GitHub · Vercel</p>
      </div>
    </footer>
  );
}
