"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND } from "@/data/products";

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

export function CraftPage() {
  return (
    <div>
      {/* Hero — full-bleed quilting floor */}
      <section className="relative min-h-[88svh] w-full overflow-hidden md:min-h-[calc(100vh-8.5rem)]">
        <Image
          src="/craft/quilting-cream.jpg"
          alt="San Marco comforter being precision-quilted on an industrial machine"
          fill
          priority
          className="object-cover object-[50%_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/80 via-burgundy-deep/35 to-burgundy-deep/15" />

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-14 md:px-8 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-cream"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-soft">
                San Marco
              </p>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
                Stitched with patience.
              </h1>
              <p className="mt-5 max-w-md text-[15px] font-medium leading-relaxed text-cream/85 md:text-base">
                Behind every San Marco comforter is careful quilting, soft loft, and gift-ready
                finish — Made in India.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-block bg-gold px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy-deep transition hover:bg-gold-soft"
              >
                Shop the Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Precision quilting */}
      <section className="bg-gradient-to-b from-cream via-ivory to-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <motion.div {...fade} className="relative order-2 md:order-1">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/craft/quilting-blue.jpg"
                alt="Precision quilting head stitching a royal blue San Marco comforter"
                fill
                className="object-cover object-center"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div {...fade} className="order-1 md:order-2 md:pl-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-deep">
              Precision quilting
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] text-burgundy md:text-5xl">
              Pattern locked into every loft.
            </h2>
            <span aria-hidden className="mt-4 block font-display text-lg text-gold/80">
              ✦
            </span>
            <div className="mt-6 space-y-4 text-[15px] font-medium leading-relaxed text-muted">
              <p>
                Each San Marco piece is quilted on industrial machines that hold fabric taut and
                stitch clean, lasting geometry — diamond grids, soft curves, and even fill that
                stays lofty wash after wash.
              </p>
              <p>
                Our comforters are finished in North India, including precision work in and around
                Karnal — where skilled operators watch every pass of the needle so the hand-feel
                stays plush, breathable, and even from corner to corner.
              </p>
              <p>
                A premium poly-cotton shell and hollow siliconised microfibre fill keep nights soft
                without trapping heat — everyday luxury built for real Indian homes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Warehouse / packed ready */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/craft/warehouse-boxes.jpg"
            alt="Stacks of San Marco Double Bedsheet Set boxes ready for dispatch"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/90 via-burgundy-deep/70 to-burgundy-deep/35" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-20 md:px-8">
          <motion.div {...fade} className="max-w-lg text-cream">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-soft">
              Packed with care
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] md:text-5xl">
              From the floor to your door.
            </h2>
            <p className="mt-6 text-[15px] font-medium leading-relaxed text-cream/85 md:text-base">
              Once quilted and finished, every Double Bedsheet Set and comforter is sealed,
              labelled, and stacked for dispatch — breathable fabric, soft loft, premium quality,
              and long-lasting comfort, marked Made in India on every carton.
            </p>
            <p className="mt-4 text-[15px] font-medium leading-relaxed text-cream/85 md:text-base">
              Sold & marketed by {BRAND.marketedBy}, so what leaves our partners’ floors arrives
              ready for festive gifting, hospitality, or your own bedroom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift-ready packaging */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
          <motion.div {...fade}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-deep">
              Gift-ready finish
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] text-burgundy md:text-5xl">
              Beautiful before it’s even opened.
            </h2>
            <span aria-hidden className="mt-4 block font-display text-lg text-gold/80">
              ✦
            </span>
            <div className="mt-6 space-y-4 text-[15px] font-medium leading-relaxed text-muted">
              <p>
                Clear, sturdy packing shows the fabric story at a glance — florals, soft neutrals,
                and thoughtful colourways from Venice, Alberta, and Tiffany — with the San Marco
                crest on every label.
              </p>
              <p>
                Icons on the pack remind you what matters in the bed: breathable fabric, soft &
                cozy hand-feel, premium quality, and comfort that lasts season after season. Many
                orders leave with a reusable carry bag, so the unboxing already feels like a gift.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-block bg-burgundy px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-burgundy-deep"
              >
                Browse Designs
              </Link>
              <Link
                href="/gifting"
                className="inline-block border border-burgundy/80 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy transition hover:bg-burgundy hover:text-cream"
              >
                Gifting
              </Link>
            </div>
          </motion.div>

          <motion.div {...fade} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/craft/packaged-sets.jpg"
                alt="San Marco Double Bedsheet Sets in clear gift-ready packaging"
                fill
                className="object-cover object-[50%_40%]"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing strip */}
      <section className="border-t border-gold/25 bg-gradient-to-br from-cream via-[#f3ebe0] to-ivory">
        <motion.div
          {...fade}
          className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-deep">
            The San Marco promise
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-burgundy md:text-5xl">
            Everyday luxury, made carefully.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-medium leading-relaxed text-muted">
            Soft loft, thoughtful colour, and a finish ready for gifting — from our makers’ floors
            to your home. Questions about sizes, bulk orders, or hospitality supply? We’re a
            WhatsApp away.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="inline-block bg-burgundy px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-burgundy-deep"
            >
              Shop San Marco
            </Link>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi San Marco, I'd like to know more about how your bedding is made.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-burgundy/80 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy transition hover:bg-burgundy hover:text-cream"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
