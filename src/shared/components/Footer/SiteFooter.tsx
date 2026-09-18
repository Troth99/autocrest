const footerColumns = [
  {
    heading: "Product",
    links: ["Modules", "Timeline", "Pricing", "Changelog"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API", "Status", "Support"],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-slate-400/12 bg-[linear-gradient(180deg,rgb(10_16_23_/_32%)_0%,rgb(10_16_23_/_78%)_48%,#0a1017_100%)] shadow-[0_-18px_42px_rgb(0_0_0_/_12%),inset_0_1px_rgb(255_255_255_/_2.5%)] backdrop-blur-xl before:absolute before:left-1/2 before:top-[-1px] before:h-px before:w-[min(30rem,70vw)] before:-translate-x-1/2 before:bg-[linear-gradient(90deg,transparent,#38bdf8_25%,var(--accent)_75%,transparent)] before:opacity-45 before:content-['']">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 text-sm font-bold text-sky-400">
              AC
            </span>
            <p className="mt-3 max-w-[16rem] text-sm text-slate-400">
              AutoCrest connects every vehicle&apos;s history, status, and next
              decision.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-slate-100">
                {col.heading}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-slate-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-700/40 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>&copy; 2026 AutoCrest. Prototype build.</span>
          <span>Not yet connected to real database data.</span>
        </div>
      </div>
    </footer>
  );
}
