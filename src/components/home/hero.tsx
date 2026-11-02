"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      <Image
        src="/products/sunshine-teal-stripe.jpg"
        alt="San Marco premium comforter in a luxury bedroom"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/75 via-burgundy-deep/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/50 via-transparent to-burgundy-deep/20" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:justify-center md:px-8 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-cream"
        >
          <p className="font-display text-5xl leading-[0.95] md:text-7xl">San Marco</p>
          <div className="my-4 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold">
              Premium Bedding & Comforters
            </span>
          </div>
          <h1 className="font-display text-3xl leading-tight text-cream md:text-4xl">
            Wrap yourself in everyday luxury
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 md:text-base">
            Soft microfibre loft, reversible designs, and gift-ready bags — the Festive Comfort
            Collection, Made in India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="gold">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream/10 hover:border-cream">
              <Link href="/collections/festive">Festive Prices</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-6 right-6 hidden text-[10px] uppercase tracking-[0.24em] text-cream/55 md:block"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}
