import Link from "next/link";
import VehicleTypes from "@/shared/components/VehicleTypes/VehicleTypes";

export default function HeroSection() {
  return (
    <section className="marketing-hero" aria-labelledby="hero-title">
      {(["left", "right"] as const).map((side) => (
        <svg
          key={side}
          className={`marketing-hero-road marketing-hero-road-${side}`}
          viewBox="0 0 360 460"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M300 -15C175 15 100 24 112 53C126 84 269 109 278 163C291 235 164 289 -60 373" />
          <path d="M326 -15C218 16 154 28 162 53C174 79 296 111 314 162C340 239 222 317 -18 453" />
          <path
            d="M313 -15C197 16 127 26 137 53C150 82 283 110 296 163C316 237 193 303 -39 413"
            strokeDasharray="14 17"
          />
        </svg>
      ))}
      <div className="relative mx-auto w-full max-w-[112rem]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-text">
            YOUR PERSONAL VEHICLE SPACE
          </p>
          <h1
            id="hero-title"
            className="marketing-hero-title mt-3"
          >
            Every journey.
            <br />
            <span className="text-accent-text">One garage.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-6 text-text-secondary">
            Keep your vehicle details, service history and next steps together.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/garrage" className="button-primary button-base px-6 py-3 text-sm shadow-none">
              Start your garage
            </Link>
            <a href="#how-it-works" className="button-secondary button-base px-6 py-3 text-sm">
              See how it works
            </a>
          </div>
        </div>
        <div className="mt-8">
          <VehicleTypes />
        </div>
      </div>
    </section>
  );
}
