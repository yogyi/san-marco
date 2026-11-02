"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const bands = [
  {
    title: "Striped New Arrivals",
    copy: "Sunshine teal and peach-rust stories for contemporary bedrooms.",
    href: "/shop?category=striped",
    image: "/products/lifestyle-set-1.jpg",
  },
  {
    title: "Printed Florals",
    copy: "Six garden-inspired prints — soft, gift-ready, reversible.",
    href: "/shop?category=floral",
    image: "/products/grey-blossom.jpg",
  },
  {
    title: "Solid Colour Edit",
    copy: "Five two-tone solids for quiet, curated spaces.",
    href: "/shop?category=solid",
    image: "/products/sage-green.jpg",
  },
];

export function CollectionBands() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">The Edit</p>
        <h2 className="mt-2 font-display text-4xl text-burgundy md:text-5xl">
          Thirteen designs. One signature loft.
        </h2>
        <p className="mt-3 text-ink/65">
          Shop by mood — striped, floral or solid — each piece arrives with a reusable gift bag.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {bands.map((band, i) => (
          <motion.div
            key={band.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
          >
            <Link href={band.href} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={band.image}
                alt={band.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/80 via-burgundy-deep/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <h3 className="font-display text-3xl">{band.title}</h3>
                <p className="mt-2 text-sm text-cream/75">{band.copy}</p>
                <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-gold">
                  Explore →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
