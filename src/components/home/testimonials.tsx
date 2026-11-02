"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/home/section-heading";

const quotes = [
  {
    name: "Ananya M.",
    city: "Delhi",
    product: "Grey Blossom",
    rating: 5,
    text: "Our bedroom looks beautiful with the Grey Blossom set — soft loft and gift-ready packaging. Guests keep asking where we bought it.",
  },
  {
    name: "Rohan K.",
    city: "Mumbai",
    product: "Sage Green",
    rating: 5,
    text: "Ordered Sage Green for festive gifting. Everyone loved how premium it looked — the carry bag made it feel like a boutique gift.",
  },
  {
    name: "Meera S.",
    city: "Bengaluru",
    product: "Sunshine Teal Stripe",
    rating: 5,
    text: "Sunshine Teal Stripe transformed the guest room. Lightweight yet so cozy — perfect for our warm evenings.",
  },
  {
    name: "Isha P.",
    city: "Jaipur",
    product: "Tiffany Peach Rust",
    rating: 5,
    text: "The comforter is soft & snug. We’ve been enjoying it every evening — colour looks even richer in person.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[13px] leading-none text-gold">
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = quotes;

  return (
    <section className="relative overflow-hidden bg-[#f3ebe3] py-16 md:py-24">
      {/* soft atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,161,91,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionHeading
          title="Loved Across India"
          eyebrow="Customer Reviews"
          subtitle="Real homes. Soft nights. Verified San Marco stories."
        />

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <Stars count={5} />
            <p className="font-display text-3xl font-bold text-burgundy">4.9</p>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
            Average rating · Festive Comfort Collection
          </p>
        </div>

        {/* Featured review */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto mt-12 max-w-3xl border border-gold/30 bg-cream/90 px-6 py-10 text-center shadow-[0_24px_60px_-36px_rgba(74,18,28,0.35)] md:px-12 md:py-12"
        >
          <span
            aria-hidden
            className="font-display text-6xl leading-none text-gold/50 md:text-7xl"
          >
            “
          </span>
          <p className="mt-2 font-display text-2xl font-semibold leading-snug text-burgundy md:text-3xl">
            {featured.text}
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Stars count={featured.rating} />
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-ink">
              {featured.name}
            </p>
            <p className="text-[11px] font-medium tracking-wide text-muted">
              {featured.city} · {featured.product} · Verified buyer
            </p>
          </div>
        </motion.blockquote>

        {/* Supporting reviews */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {rest.map((q, i) => (
            <motion.blockquote
              key={q.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative flex h-full flex-col border border-burgundy/10 bg-cream p-6 transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_40px_-28px_rgba(74,18,28,0.4)] md:p-7"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <Stars count={q.rating} />
                <span className="rounded-full bg-burgundy/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-burgundy">
                  {q.product}
                </span>
              </div>
              <p className="font-display text-xl font-semibold leading-snug text-ink">
                “{q.text}”
              </p>
              <footer className="mt-auto pt-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-burgundy">
                  {q.name}
                </p>
                <p className="mt-1 text-[11px] font-medium text-muted">
                  {q.city} · Verified buyer
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
