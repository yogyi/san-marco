"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { SectionHeading } from "@/components/home/section-heading";

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
        {shots.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="group relative min-w-[160px] flex-1 overflow-hidden md:min-w-0"
          >
            <div className="relative aspect-[9/14] overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 40vw, 20vw"
              />
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy/90 text-sm text-cream shadow-lg ring-1 ring-gold/40 transition group-hover:scale-105">
                ▶
              </span>
            </div>
            <p className="mt-2.5 truncate text-center font-display text-base text-burgundy">
              {p.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
