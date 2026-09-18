import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-dark-800 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-sky-400/15 text-sm font-bold text-sky-400">
            AC
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-200">
            auto<span className="text-accent">crest</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#modules"
            className="text-sm text-slate-400 transition-colors hover:text-slate-100"
          >
            Modules
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-slate-400 transition-colors hover:text-slate-100"
          >
            How it works
          </a>
          <a
            href="#timeline"
            className="text-sm text-slate-400 transition-colors hover:text-slate-100"
          >
            Timeline
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-slate-100 sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="button-primary button-base px-4 py-2 text-sm font-semibold hover:scale-105"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
