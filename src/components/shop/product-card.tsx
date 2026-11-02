"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { VARIANTS } from "@/data/products";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCart((s) => s.addItem);
  const starter = VARIANTS[0];
  const savePct = Math.round(((starter.mrp - starter.price) / starter.mrp) * 100);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.25) }}
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
          <span className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink shadow-soft">
            -{savePct}%
          </span>
          {(product.newArrival || product.bestseller) && (
            <span className="absolute right-3 top-3 bg-ivory/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-ink">
              {product.newArrival ? "New" : "Bestseller"}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.18em] text-gold-deep">
            {product.collection} · {product.designCode}
          </p>
          <h3 className="font-display text-xl text-ink">{product.name}</h3>
          <p className="line-clamp-1 text-sm text-muted">{product.tagline}</p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-medium text-ink">{formatINR(starter.price)}</span>
            <span className="text-xs text-muted line-through">{formatINR(starter.mrp)}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted">from</span>
          </div>
        </div>
      </Link>
      <Button
        variant="outline"
        size="sm"
        className="mt-3 w-full opacity-100 md:opacity-0 md:group-hover:opacity-100"
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
        Add Double Set
      </Button>
    </motion.article>
  );
}
