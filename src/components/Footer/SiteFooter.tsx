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
    <footer className="border-t border-slate-700/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
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
