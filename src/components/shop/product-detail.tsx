"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import type { Product, VariantId } from "@/data/products";
import { VARIANTS, getVariant } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { cn, formatINR } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState<VariantId>("double-set");
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);
  const variant = useMemo(() => getVariant(variantId), [variantId]);
  const savePct = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <div className="overflow-hidden bg-sand">
          <Image
            src={activeImage}
            alt={product.name}
            width={1600}
            height={1200}
            className="h-auto w-full object-contain"
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {product.gallery.map((src) => (
            <button
              key={src}
              onClick={() => setActiveImage(src)}
              className={cn(
                "overflow-hidden border bg-sand p-1",
                activeImage === src ? "border-burgundy" : "border-transparent opacity-80"
              )}
            >
              <Image
                src={src}
                alt=""
                width={240}
                height={180}
                className="h-auto w-full object-contain"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">
          {product.collection} · {product.designCode}
        </p>
        <h1 className="mt-2 font-display text-5xl text-burgundy">{product.name}</h1>
        <p className="mt-3 text-ink/65">{product.tagline}</p>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-display text-4xl text-burgundy">{formatINR(variant.price)}</span>
          <span className="text-ink/40 line-through">{formatINR(variant.mrp)}</span>
          <span className="bg-gold/20 px-2 py-1 text-[10px] uppercase tracking-wider text-burgundy">
            Save {savePct}%
          </span>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-burgundy/70">
            Choose size
          </p>
          <div className="space-y-2">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "flex w-full items-center justify-between border px-4 py-3 text-left transition",
                  variantId === v.id
                    ? "border-burgundy bg-burgundy/[0.04]"
                    : "border-burgundy/15 hover:border-burgundy/35"
                )}
              >
                <div>
                  <p className="font-medium text-burgundy">{v.label}</p>
                  <p className="text-xs text-ink/55">{v.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-burgundy">{formatINR(v.price)}</p>
                  <p className="text-xs text-ink/40 line-through">{formatINR(v.mrp)}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink/50">{variant.dimensions}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center border border-burgundy/15">
            <button
              className="px-3 py-3 text-burgundy"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease"
            >
              −
            </button>
            <span className="w-10 text-center">{qty}</span>
            <button
              className="px-3 py-3 text-burgundy"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase"
            >
              +
            </button>
          </div>
          <Button
            size="lg"
            className="flex-1 min-w-[180px]"
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.image,
                variantId: variant.id,
                variantLabel: variant.label,
                price: variant.price,
                mrp: variant.mrp,
                quantity: qty,
              })
            }
          >
            Add to Bag
          </Button>
        </div>

        <ul className="mt-8 space-y-2 border-t border-gold/20 pt-6">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-ink/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-4 text-sm text-ink/65">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy/70">Fabric</p>
            <p className="mt-1">{product.fabric}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy/70">Filling</p>
            <p className="mt-1">{product.filling}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy/70">Colours</p>
            <p className="mt-1">{product.colours}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy/70">Wash care</p>
            <p className="mt-1">{product.washCare}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
