"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

const edits = [
  {
    title: "Festive Edit",
    href: "/collections/festive",
    image: "/products/sunshine-teal-stripe.jpg",
    icon: "✦",
  },
  {
    title: "Floral Edit",
    href: "/shop?category=floral",
    image: "/products/grey-blossom.jpg",
    icon: "❀",
  },
  {
    title: "Solid Edit",
    href: "/shop?category=solid",
    image: "/products/sage-green.jpg",
    icon: "◇",
  },
  {
    title: "Gifting Edit",
    href: "/gifting",
    image: "/products/gift-bag.jpg",
    icon: "✧",
  },
];

/** Varanga-style scalloped / lotus frame (viewBox 0 0 200 240) */
const FRAME_PATH =
  "M100 4 C114 4 124 20 130 38 C140 20 158 8 176 16 C194 28 202 52 198 74 C214 84 222 106 216 128 C222 150 214 172 198 182 C202 204 194 228 176 238 C158 246 140 234 130 216 C124 234 114 250 100 250 C86 250 76 234 70 216 C60 234 42 246 24 238 C6 228 -2 204 2 182 C-14 172 -22 150 -16 128 C-22 106 -14 84 2 74 C-2 52 6 28 24 16 C42 8 60 20 70 38 C76 20 86 4 100 4 Z";

export function OrnateEdit() {
  return (
    <section className="bg-ivory px-4 py-16 md:px-8 md:py-20">
      <SectionHeading
        title="The San Marco Edit"
        subtitle="Timeless comfort, modern bedrooms"
      />
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-8">
        {edits.map((edit, i) => (
          <motion.div
            key={edit.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Link href={edit.href} className="group relative block w-full max-w-[220px]">
              <svg viewBox="0 0 200 254" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <clipPath id={`frame-${i}`}>
                    <path d={FRAME_PATH} />
                  </clipPath>
                  <linearGradient id={`fade-${i}`} x1="0" y1="0.55" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a1214" stopOpacity="0" />
                    <stop offset="100%" stopColor="#1a1214" stopOpacity="0.72" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative aspect-[5/6] w-full">
                <svg viewBox="0 0 200 254" className="h-full w-full drop-shadow-sm">
                  <defs>
                    <clipPath id={`clip-${i}`}>
                      <path d={FRAME_PATH} />
                    </clipPath>
                    <linearGradient id={`ov-${i}`} x1="0" y1="0.5" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8f7040" stopOpacity="0" />
                      <stop offset="55%" stopColor="#5c1f28" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#2c2426" stopOpacity="0.78" />
                    </linearGradient>
                  </defs>
                  <image
                    href={edit.image}
                    x="0"
                    y="0"
                    width="200"
                    height="254"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#clip-${i})`}
                    className="transition duration-700 group-hover:scale-105 origin-center"
                    style={{ transformOrigin: "100px 120px" }}
                  />
                  <path d={FRAME_PATH} fill={`url(#ov-${i})`} />
                  <path
                    d={FRAME_PATH}
                    fill="none"
                    stroke="#b8954f"
                    strokeWidth="1.4"
                    opacity="0.85"
                  />
                  <text
                    x="100"
                    y="210"
                    textAnchor="middle"
                    fill="#faf7f2"
                    style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "15px", fontStyle: "italic" }}
                  >
                    {edit.title}
                  </text>
                </svg>

                <span className="absolute -bottom-3 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-ivory text-sm text-gold-deep shadow-soft transition group-hover:bg-gold group-hover:text-ink">
                  {edit.icon}
                </span>
              </div>
            </Link>
            <Link
              href={edit.href}
              className="mt-7 font-display text-base text-ink/80 underline-offset-4 transition hover:text-gold-deep hover:underline"
            >
              Explore Now
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ShopByCategory() {
  const cats = [
    {
      title: "Bedsheets",
      href: "/shop?category=floral",
      image: "/products/caramel-spring.jpg",
      icon: "床",
      label: "Bedsheets",
    },
    {
      title: "Comforters",
      href: "/shop",
      image: "/products/lifestyle-set-1.jpg",
      icon: "◈",
      label: "Comforters",
    },
    {
      title: "Double Sets",
      href: "/shop",
      image: "/products/rose-blush-garden.jpg",
      icon: "◎",
      label: "Double Sets",
    },
    {
      title: "Singles",
      href: "/shop?category=solid",
      image: "/products/blush-peach.jpg",
      icon: "○",
      label: "Singles",
    },
    {
      title: "Solids",
      href: "/shop?category=solid",
      image: "/products/mist-blue.jpg",
      icon: "▢",
      label: "Solids",
    },
    {
      title: "Gifting",
      href: "/gifting",
      image: "/products/gift-bag.jpg",
      icon: "♡",
      label: "Gifting",
    },
  ];

  return (
    <section className="border-y border-sand bg-cream/60 px-4 py-16 md:px-8 md:py-20">
      <SectionHeading title="Shop by Category" subtitle="Find your perfect style" />
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
        {cats.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            className="flex flex-col items-center"
          >
            <Link href={cat.href} className="group relative w-full max-w-[150px]">
              <div className="relative aspect-[5/6]">
                <svg viewBox="0 0 200 254" className="h-full w-full">
                  <defs>
                    <clipPath id={`cat-clip-${i}`}>
                      <path d={FRAME_PATH} />
                    </clipPath>
                    <linearGradient id={`cat-ov-${i}`} x1="0" y1="0.45" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b8954f" stopOpacity="0" />
                      <stop offset="100%" stopColor="#2c2426" stopOpacity="0.75" />
                    </linearGradient>
                  </defs>
                  <image
                    href={cat.image}
                    x="0"
                    y="0"
                    width="200"
                    height="254"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#cat-clip-${i})`}
                  />
                  <path d={FRAME_PATH} fill={`url(#cat-ov-${i})`} />
                  <path d={FRAME_PATH} fill="none" stroke="#d4bc7d" strokeWidth="1.2" />
                  <text
                    x="100"
                    y="210"
                    textAnchor="middle"
                    fill="#ffffff"
                    style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "14px", fontStyle: "italic" }}
                  >
                    {cat.label}
                  </text>
                </svg>
                <span className="absolute -bottom-2.5 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-gold bg-ivory text-[11px] text-gold-deep shadow-soft">
                  {cat.icon === "床" ? "▣" : cat.icon}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
