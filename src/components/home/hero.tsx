"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const tiles = [
  {
    src: "/products/sunshine-teal-stripe.jpg",
    alt: "Sunshine Teal Stripe bedroom",
    className: "md:col-span-2 md:row-span-2",
    label: "Festive Bedding",
  },
  {
    src: "/products/grey-blossom.jpg",
    alt: "Grey Blossom comforter",
    className: "",
    label: "Florals",
  },
  {
    src: "/products/tiffany-peach-rust.jpg",
    alt: "Tiffany Peach bedroom",
    className: "",
    label: "New Arrivals",
  },
  {
    src: "/products/sage-green.jpg",
    alt: "Sage Green solid",
    className: "",
    label: "Solids",
  },
  {
    src: "/products/lifestyle-set-1.jpg",
    alt: "San Marco set",
    className: "",
    label: "Gift Ready",
  },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-3 pt-3 md:px-6 md:pt-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className={`group relative min-h-[180px] overflow-hidden md:min-h-0 ${tile.className} ${
              i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-square"
            }`}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              priority={i < 2}
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 50vw, 40vw"
            />
            <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" />
            {i === 0 && (
              <div className="absolute inset-0 flex items-end justify-end p-4 md:p-8">
                <Link
                  href="/shop"
                  className="bg-black/70 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-burgundy"
                >
                  Shop Now
                </Link>
              </div>
            )}
            {i !== 0 && (
              <span className="absolute bottom-3 left-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white drop-shadow">
                {tile.label}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
