import type { ReactNode } from "react";
export default function AuthShell({ children }: { children: ReactNode }) {
 return <main className="flex w-full flex-1 items-center justify-center px-4 py-12 sm:py-16"><div className="w-full max-w-md rounded-2xl border border-line bg-panel p-6 shadow-xl sm:p-8">{children}</div></main>;
}
