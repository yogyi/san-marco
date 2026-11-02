"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    label: "Venice",
    href: "/shop?collection=venice",
    image: "/products/sunshine-teal-stripe.jpg",
  },
  {
    label: "Alberta",
    href: "/shop?collection=alberta",
    image: "/products/grey-blossom.jpg",
  },
  {
    label: "Tiffany",
    href: "/shop?collection=tiffany",
    image: "/products/sage-green.jpg",
  },
  {
    label: "Gift Box",
    href: "/gifting",
    image: "/products/gift-bag.jpg",
  },
];

export function CircleCategories() {
  return (
    <section className="border-b border-black/5 bg-[#fafafa] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link href={cat.href} className="group flex w-[120px] flex-col items-center sm:w-[140px] md:w-[160px]">
              <span className="relative block aspect-square w-full overflow-hidden rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition duration-300 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] group-hover:ring-burgundy/20">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="160px"
                />
              </span>
              <span className="mt-4 text-center text-[13px] font-medium tracking-[0.04em] text-ink transition group-hover:text-burgundy md:text-[15px]">
                {cat.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
