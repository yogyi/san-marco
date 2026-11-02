"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, VARIANTS } from "@/data/products";
import { formatINR } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";

export function Trending() {
  const trending = products.filter((p) => p.bestseller || p.featured).slice(0, 4);
  const starter = VARIANTS[0];
  const addItem = useCart((s) => s.addItem);

  return (
    <section className="bg-ivory px-4 py-16 md:px-8 md:py-20">
      <SectionHeading title="What's Trending" subtitle="Festive favourites, loved at home" />
      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {trending.map((product, i) => {
          const savePct = Math.round(((starter.mrp - starter.price) / starter.mrp) * 100);
          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                  <span className="absolute left-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-ink shadow-soft">
                    -{savePct}%
                  </span>
                </div>
                <div className="mt-4 space-y-1 text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gold-deep">
                    {product.collection}
                  </p>
                  <h3 className="font-display text-xl text-ink">{product.name}</h3>
                  <div className="flex items-baseline justify-center gap-2 md:justify-start">
                    <span className="font-medium text-ink">{formatINR(starter.price)}</span>
                    <span className="text-xs text-muted line-through">{formatINR(starter.mrp)}</span>
                  </div>
                </div>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() =>
                  addItem({
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    image: product.image,
                    variantId: starter.id,
                    variantLabel: starter.label,
                    price: starter.price,
                    mrp: starter.mrp,
                  })
                }
              >
                Add to Bag
              </Button>
            </motion.article>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="gold" size="lg">
          <Link href="/shop">View Full Collection</Link>
        </Button>
      </div>
    </section>
  );
}
