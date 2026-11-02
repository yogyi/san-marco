"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export function LookbookStrip() {
  const shots = products.slice(0, 5);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-16">
      <h2 className="text-center text-2xl font-semibold text-ink md:text-3xl">
        Watch. Love. Shop
      </h2>
      <p className="mt-2 text-center text-sm text-muted">Wear soft nights. Share warm homes.</p>
      <div className="mt-8 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
        {shots.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="relative min-w-[160px] flex-1 overflow-hidden md:min-w-0"
          >
            <div className="relative aspect-[9/14]">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 40vw, 20vw"
              />
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy/90 text-white">
                ▶
              </span>
            </div>
            <p className="mt-2 truncate text-center text-xs text-ink">{p.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
