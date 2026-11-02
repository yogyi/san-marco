"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { VARIANTS } from "@/data/products";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/store/cart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCart((s) => s.addItem);
  const starter = VARIANTS[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
      className="group"
    >
      <div className="relative overflow-hidden bg-[#f5f5f5]">
        <Link href={`/product/${product.slug}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={1100}
            className="aspect-[4/5] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </Link>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-col gap-0 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            className="bg-burgundy py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-burgundy-deep"
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
            Add to Cart
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="bg-white/95 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-ink hover:bg-white"
          >
            Quick View
          </Link>
        </div>
      </div>
      <div className="mt-3 space-y-1 text-center md:text-left">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[15px] font-medium leading-snug text-ink hover:text-burgundy">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted">{product.tagline}</p>
        <div className="flex items-center justify-center gap-2 pt-1 md:justify-start">
          <span className="text-sm font-semibold text-ink">{formatINR(starter.price)}</span>
          <span className="text-xs text-muted line-through">{formatINR(starter.mrp)}</span>
        </div>
      </div>
    </motion.article>
  );
}
