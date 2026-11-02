"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-7.5rem)] w-full overflow-hidden md:min-h-[calc(100vh-8.5rem)]">
      <Image
        src="/hero/hero-bedroom.jpg"
        alt="San Marco premium comforter in a luxury bedroom"
        fill
        priority
        className="object-cover object-left md:object-center"
        sizes="100vw"
      />

      {/* Mobile-only soft light panel so text stays readable */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white/55 md:hidden"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 left-0 hidden w-[48%] bg-gradient-to-r from-white/35 via-white/10 to-transparent md:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-7xl flex-col justify-center px-4 py-16 md:min-h-[calc(100vh-8.5rem)] md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl rounded-sm bg-white/0 p-0 text-ink md:bg-transparent"
        >
          <p className="font-display text-5xl leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-8xl">
            San Marco
          </p>
          <div className="my-4 flex items-center gap-3 md:my-5">
            <span className="h-px w-10 bg-gold md:w-12" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-gold-deep sm:text-[11px] md:tracking-[0.28em]">
              Premium Bedding & Comforters
            </span>
          </div>
          <h1 className="font-display text-xl leading-snug text-ink sm:text-2xl md:text-3xl">
            Wrap yourself in everyday luxury
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70 md:mt-4 md:text-[15px]">
            Soft microfibre loft, reversible designs, and gift-ready bags — the Festive Comfort
            Collection, Made in India.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
            <Button asChild size="lg" variant="gold" className="w-full sm:w-auto">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/collections/festive">Festive Prices</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
