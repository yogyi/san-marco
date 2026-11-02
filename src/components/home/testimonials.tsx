"use client";

import { motion } from "framer-motion";

const quotes = [
  {
    name: "Ananya M.",
    text: "Our bedroom looks beautiful with the Grey Blossom set — soft loft and gift-ready packaging.",
  },
  {
    name: "Rohan K.",
    text: "Ordered Sage Green for festive gifting. Everyone loved how premium it looked.",
  },
  {
    name: "Meera S.",
    text: "Sunshine Teal Stripe transformed the guest room. Lightweight yet so cozy.",
  },
  {
    name: "Isha P.",
    text: "The comforter is soft & snug. We’ve been enjoying it every evening.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#f7f5f2] py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-burgundy">
          Customer Reviews
        </p>
        <h2 className="mt-2 text-center text-3xl font-semibold text-ink">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Real stories from people who transformed their home.
        </p>
        <p className="mt-3 text-center text-sm font-medium text-ink">4.9 · Loved across India</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-5 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-ink/80">“{q.text}”</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                {q.name} · Verified
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
