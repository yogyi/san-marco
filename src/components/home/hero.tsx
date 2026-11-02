"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[78svh] w-full overflow-hidden md:min-h-[calc(100vh-8.5rem)]">
      {/* Mobile hero image only */}
      <Image
        src="/hero/hero-mobile.jpg"
        alt="Alberta floral comforter styled in a calm bedroom"
        fill
        priority
        className="object-cover object-[center_28%] md:hidden"
        sizes="100vw"
      />
      {/* Desktop hero unchanged */}
      <Image
        src="/hero/hero-bedroom.jpg"
        alt="San Marco premium comforter in a luxury bedroom"
        fill
        priority
        className="hidden object-cover object-center md:block"
        sizes="100vw"
      />

      {/* Mobile copy — sits in open wall space, no panel */}
      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-start px-5 pt-16 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[17.5rem]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-gold-deep drop-shadow-[0_1px_8px_rgba(255,255,255,0.55)]">
            Alberta Collection
          </p>
          <p className="mt-2 font-display text-[2.65rem] leading-[0.9] tracking-tight text-burgundy drop-shadow-[0_2px_14px_rgba(255,248,240,0.7)]">
            San Marco
          </p>
          <div className="my-3 flex items-center gap-2.5">
            <span className="h-px w-8 bg-gold" />
            <span className="text-[9px] uppercase tracking-[0.26em] text-ink/55">
              Soft florals
            </span>
          </div>
          <h1 className="font-display text-[1.35rem] leading-snug text-ink drop-shadow-[0_1px_10px_rgba(255,248,240,0.65)]">
            Quiet nights in bloom
          </h1>
          <p className="mt-2.5 max-w-[15.5rem] text-[12.5px] leading-relaxed text-ink/70 drop-shadow-[0_1px_8px_rgba(255,248,240,0.6)]">
            Quilted microfibre loft — serene colour, gift-ready, Made in India.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button asChild size="default" variant="gold">
              <Link href="/shop?collection=alberta">Shop Alberta</Link>
            </Button>
            <Button
              asChild
              size="default"
              variant="outline"
              className="border-burgundy/35 bg-transparent text-burgundy hover:bg-burgundy hover:text-cream"
            >
              <Link href="/shop">Shop All</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Desktop copy unchanged */}
      <div className="relative z-10 mx-auto hidden min-h-[calc(100vh-8.5rem)] max-w-7xl flex-col justify-center px-4 py-16 md:flex md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-ink"
        >
          <p className="font-display text-6xl leading-[0.92] tracking-tight md:text-8xl">
            San Marco
          </p>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px w-12 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold-deep">
              Premium Bedding & Comforters
            </span>
          </div>
          <h1 className="font-display text-2xl leading-snug text-ink/90 md:text-3xl">
            Wrap yourself in everyday luxury
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65 md:text-[15px]">
            Soft microfibre loft, reversible designs, and gift-ready bags — the Festive Comfort
            Collection, Made in India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="gold">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/collections/festive">Festive Prices</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
