import Image from "next/image";
import Link from "next/link";

export default function StartGarageSection() {
  return (
    <section className="marketing-section" aria-labelledby="start-garage-title">
      <div className="relative isolate overflow-hidden rounded-2xl">
        <Image
          src="/images/marketing/lakeside-drive.webp"
          alt=""
          fill
          sizes="(min-width: 1792px) 1744px, 100vw"
          className="-z-20 object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
        <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <h2
            id="start-garage-title"
            className="max-w-md text-3xl font-semibold leading-[1.06] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ready for the
            <br />
            road ahead?
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/90 sm:text-base">
            Keep your vehicles, their history and next steps together in one simple garage.
          </p>
          <Link
            href="/register"
            className="button-primary button-base mt-5 px-6 py-3 text-sm shadow-none"
          >
            Start your garage
          </Link>
        </div>
      </div>
    </section>
  );
}
