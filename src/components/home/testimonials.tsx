"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

const quotes = [
  {
    name: "Ananya M.",
    city: "Delhi",
    text: "The Grey Blossom set made our guest room feel like a boutique stay. Soft loft, beautiful packaging.",
  },
  {
    name: "Rohan K.",
    city: "Gurugram",
    text: "Ordered Sage Green for corporate festive gifting — arrived gift-ready and looked truly premium.",
  },
  {
    name: "Meera S.",
    city: "Jaipur",
    text: "Sunshine Teal Stripe is the statement piece our bedroom needed. Lightweight yet so cozy.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title="At Home With San Marco" subtitle="Loved for softness & presence" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-sand bg-cream/50 px-6 py-8"
            >
              <p className="font-display text-2xl leading-snug text-ink">“{q.text}”</p>
              <footer className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted">
                {q.name} · {q.city}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
