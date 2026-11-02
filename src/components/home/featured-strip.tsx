"use client";

import { motion } from "framer-motion";
import { Feather, Snowflake, Sparkles, ShieldCheck } from "lucide-react";

const items = [
  { icon: Feather, label: "Soft & Comfortable" },
  { icon: Snowflake, label: "All Season Use" },
  { icon: Sparkles, label: "Premium Quality" },
  { icon: ShieldCheck, label: "Easy Care" },
];

export function FeaturedStrip() {
  return (
    <section className="border-b border-sand bg-ivory">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-deep">
              <item.icon className="h-5 w-5" strokeWidth={1.4} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/70">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
