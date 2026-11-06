import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main
      className="mx-auto flex min-h-screen w-full max-w-md flex-1 items-center justify-center gap-3 px-6 py-16"
      role="status"
      aria-busy="true"
    >
      <LoaderCircle
        className="size-5 shrink-0 text-accent-text motion-safe:animate-spin"
        aria-hidden="true"
      />
      <p className="section-description">Checking your sign-in...</p>
    </main>
  );
}
