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

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.25) }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={900}
            className="h-auto w-full object-contain transition duration-700 group-hover:scale-[1.02]"
            sizes="(max-width:768px) 50vw, 25vw"
          />
          {(product.newArrival || product.bestseller) && (
            <span className="absolute left-3 top-3 bg-cream/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-burgundy">
              {product.newArrival ? "New" : "Bestseller"}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold-deep">
            {product.collection} · {product.designCode}
          </p>
          <h3 className="font-display text-xl text-burgundy">{product.name}</h3>
          <p className="text-sm text-ink/55 line-clamp-1">{product.tagline}</p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-burgundy font-medium">{formatINR(starter.price)}</span>
            <span className="text-xs text-ink/40 line-through">{formatINR(starter.mrp)}</span>
            <span className="text-[10px] uppercase tracking-wider text-burgundy/60">from</span>
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
