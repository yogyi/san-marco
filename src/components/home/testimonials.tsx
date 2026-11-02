"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/home/section-heading";

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
    <section className="bg-[#f7f5f2] py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionHeading
          title="What Our Customers Say"
          eyebrow="Customer Reviews"
          subtitle="Real stories from homes dressed in San Marco."
        />
        <p className="mt-4 text-center font-display text-xl text-burgundy/80">
          4.9 · Loved across India
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-gold/20 bg-white/80 p-6"
            >
              <p className="font-display text-lg leading-relaxed text-ink/85">
                “{q.text}”
              </p>
              <footer className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                {q.name} · Verified
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
