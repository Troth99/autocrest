import { CircleAlert, Trash2 } from "lucide-react";

export default function DangerZone() {
  return <section className="mt-5 rounded-3xl border border-destructive/25 bg-destructive/5 p-6 sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive [&>svg]:size-5"><CircleAlert /></span><div><h2 className="text-lg font-semibold tracking text-text-primary">Danger zone</h2><p className="mt-1 text-sm leading-6 text-muted">Account deletion will be available here in a future update.</p></div></div><span className="inline-flex items-center justify-center gap-2 rounded-full border border-destructive/30 px-4 py-2 text-sm font-semibold text-destructive"><Trash2 className="size-4" />Delete account</span></div></section>;
}
