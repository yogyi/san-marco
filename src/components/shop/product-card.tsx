"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { VARIANTS } from "@/data/products";
import { overseasUnitPrice } from "@/data/markets";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/store/cart";
import { useActiveMarket } from "@/store/market";

const stageByCollection: Record<Product["collection"], string> = {
  Venice: "from-[#e8f0ef] via-[#f4f7f6] to-[#dde8e6]",
  Alberta: "from-[#f3ebe4] via-[#faf6f1] to-[#eadfd4]",
  Tiffany: "from-[#eee8e1] via-[#f7f3ed] to-[#e4ddd4]",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCart((s) => s.addItem);
  const market = useActiveMarket();
  const isIndia = market.id === "in";
  const starter = VARIANTS[0];
  const fromPrice = isIndia ? starter.price : overseasUnitPrice(market, "one", "single");
  const stage = stageByCollection[product.collection] ?? stageByCollection.Tiffany;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
      className="group"
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block">
          <div
            className={cn(
              "relative aspect-square bg-gradient-to-br p-4 transition duration-500 md:p-5",
              "ring-1 ring-inset ring-burgundy/[0.06]",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
              stage
            )}
          >
            {/* soft vignette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(42,28,31,0.06)_100%)]"
            />
            {/* corner gold ticks */}
            <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-gold/45" />
            <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-gold/45" />
            <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-gold/45" />
            <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/45" />

            <div className="relative h-full w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center drop-shadow-[0_18px_28px_rgba(42,28,31,0.14)] transition duration-700 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 50vw, 25vw"
              />
            </div>
          </div>
        </Link>

        <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-full flex-col gap-0 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            className="bg-burgundy py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-burgundy-deep"
            onClick={() => {
              if (isIndia) {
                addItem({
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  image: product.image,
                  variantId: starter.id,
                  variantLabel: starter.label,
                  price: starter.price,
                  mrp: starter.mrp,
                  currency: "INR",
                  marketId: "in",
                  inrCapture: starter.price,
                });
              } else {
                window.location.href = `/product/${product.slug}`;
              }
            }}
          >
            Add to Cart
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="bg-cream/95 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink hover:bg-cream"
          >
            Quick View
          </Link>
        </div>
      </div>

      <div className="mt-3.5 space-y-1 text-center md:text-left">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          {product.collection}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[15px] font-semibold leading-snug text-ink hover:text-burgundy">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs font-medium text-muted">{product.tagline}</p>
        <div className="flex items-center justify-center gap-2 pt-1 md:justify-start">
          <span className="text-sm font-bold text-ink">
            {isIndia ? formatMoney(fromPrice, market) : `From ${formatMoney(fromPrice, market)}`}
          </span>
          {isIndia ? (
            <span className="text-xs font-medium text-muted line-through">
              {formatMoney(starter.mrp, market)}
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
