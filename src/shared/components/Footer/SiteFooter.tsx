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
    <footer className="site-footer">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-info-soft text-sm font-bold text-info">
              AC
            </span>
            <p className="mt-3 max-w-[16rem] text-sm text-muted">
              AutoCrest connects every vehicle&apos;s history, status, and next
              decision.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-text-primary">
                {col.heading}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted hover:text-text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="site-footer-bottom">
          <span>&copy; 2026 AutoCrest. Prototype build.</span>
        </div>
      </div>
    </footer>
  );
}
