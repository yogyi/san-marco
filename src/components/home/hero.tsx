"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[82svh] w-full overflow-hidden md:min-h-[calc(100vh-8.5rem)]">
      {/* Mobile hero image — keep open wall on the left for copy */}
      <Image
        src="/hero/hero-mobile.jpg"
        alt="Alberta floral comforter styled in a calm bedroom"
        fill
        priority
        className="object-cover object-[68%_22%] md:hidden"
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

      {/* Mobile copy — airy, sits in clear wall above the lamp */}
      <div className="absolute inset-0 z-10 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-5 top-1/2 w-[min(68%,17rem)] -translate-y-1/2"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-gold-deep">
            Alberta Collection
          </p>

          <p className="mt-4 font-display text-[3rem] leading-[0.88] tracking-tight text-burgundy">
            San Marco
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-ink/50">
              Soft florals
            </span>
          </div>

          <h1 className="mt-5 font-display text-[1.45rem] leading-[1.25] text-ink">
            Quiet nights
            <br />
            in bloom
          </h1>

          <p className="mt-4 max-w-[14.5rem] text-[13px] leading-[1.65] text-ink/65">
            Quilted microfibre loft.
            <br />
            Gift-ready. Made in India.
          </p>

          <div className="mt-7">
            <Button asChild size="lg" variant="gold" className="min-w-[9.5rem] tracking-[0.12em]">
              <Link href="/shop?collection=alberta">Shop Alberta</Link>
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
