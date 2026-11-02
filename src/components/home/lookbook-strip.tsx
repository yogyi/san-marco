"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { SectionHeading } from "@/components/home/section-heading";
import { cn } from "@/lib/utils";

const stages = [
  "from-[#eee8e1] via-[#f7f3ed] to-[#e4ddd4]",
  "from-[#e8f0ef] via-[#f4f7f6] to-[#dde8e6]",
  "from-[#f3ebe4] via-[#faf6f1] to-[#eadfd4]",
  "from-[#efe6ea] via-[#f8f2f4] to-[#e7dbe1]",
  "from-[#ebe7df] via-[#f6f3ec] to-[#e2ddd3]",
];

export function LookbookStrip() {
  const shots = products.slice(0, 5);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
      <SectionHeading
        title="Watch. Love. Shop"
        eyebrow="Lookbook"
        subtitle="Wear soft nights. Share warm homes."
      />
      <div className="mt-10 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
        {shots.map((p, i) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="group relative min-w-[160px] flex-1 md:min-w-0"
          >
            <div
              className={cn(
                "relative aspect-[4/5] overflow-hidden bg-gradient-to-br p-3 ring-1 ring-inset ring-burgundy/[0.06] md:p-4",
                stages[i % stages.length]
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(42,28,31,0.05)_100%)]"
              />
              <div className="relative h-full w-full">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain object-center drop-shadow-[0_14px_22px_rgba(42,28,31,0.12)] transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width:768px) 40vw, 20vw"
                />
              </div>
              <span className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy/90 text-sm font-semibold text-cream shadow-lg ring-1 ring-gold/40 transition group-hover:scale-105">
                ▶
              </span>
            </div>
            <p className="mt-2.5 truncate text-center font-display text-base font-semibold text-burgundy">
              {p.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
