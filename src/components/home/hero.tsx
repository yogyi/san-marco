"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-7.5rem)] w-full overflow-hidden md:min-h-[calc(100vh-8.5rem)]">
      <Image
        src="/products/sunshine-teal-stripe.jpg"
        alt="San Marco premium comforter in a luxury bedroom"
        fill
        priority
        className="object-cover object-[center_35%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#4a121c]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#4a121c]/90 via-[#4a121c]/55 to-[#4a121c]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#4a121c]/70 via-transparent to-[#4a121c]/25" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-7xl flex-col justify-center px-4 py-16 md:min-h-[calc(100vh-8.5rem)] md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-cream"
        >
          <p className="font-display text-6xl leading-[0.92] tracking-tight md:text-8xl">
            San Marco
          </p>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px w-12 bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold">
              Premium Bedding & Comforters
            </span>
          </div>
          <h1 className="font-display text-2xl leading-snug text-cream/95 md:text-3xl">
            Wrap yourself in everyday luxury
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 md:text-[15px]">
            Soft microfibre loft, reversible designs, and gift-ready bags — the Festive Comfort
            Collection, Made in India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="gold">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream/45 text-cream hover:border-cream hover:bg-cream/10"
            >
              <Link href="/collections/festive">Festive Prices</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
