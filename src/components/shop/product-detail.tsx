"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Check,
  Gift,
  IndianRupee,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import type { Product, VariantId } from "@/data/products";
import { BRAND, VARIANTS, getVariant } from "@/data/products";
import {
  overseasInrCapture,
  overseasPackLabel,
  overseasSizeLabel,
  overseasUnitPrice,
  overseasVariantKey,
  type OverseasPackId,
  type OverseasSizeId,
} from "@/data/markets";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { useActiveMarket } from "@/store/market";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/money";

export function ProductDetail({ product }: { product: Product }) {
  const market = useActiveMarket();
  const isIndia = market.id === "in";

  const [variantId, setVariantId] = useState<VariantId>("double-set");
  const [pack, setPack] = useState<OverseasPackId>("one");
  const [size, setSize] = useState<OverseasSizeId>("double");
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);

  const indiaVariant = useMemo(() => getVariant(variantId), [variantId]);
  const overseasPrice = useMemo(
    () => overseasUnitPrice(market, pack, size),
    [market, pack, size]
  );

  const price = isIndia ? indiaVariant.price : overseasPrice;
  const mrp = isIndia ? indiaVariant.mrp : 0;
  const saveAmt = isIndia ? mrp - price : 0;
  const savePct = isIndia && mrp ? Math.round((saveAmt / mrp) * 100) : 0;

  const variantLabel = isIndia
    ? indiaVariant.label
    : `${overseasPackLabel(pack)} · ${overseasSizeLabel(size)}`;
  const cartVariantId = isIndia ? indiaVariant.id : overseasVariantKey(pack, size);
  const inrCapture = isIndia
    ? indiaVariant.price
    : overseasInrCapture(market, pack, size, 1);

  const trustItems = isIndia
    ? [
        { icon: Truck, label: "Free delivery on every order" },
        { icon: Gift, label: "Gift-ready carry bag" },
        { icon: ShieldCheck, label: "Secure checkout" },
        { icon: Sparkles, label: "Made in India" },
      ]
    : [
        { icon: Truck, label: market.shippingLine },
        { icon: Gift, label: "Gift-ready packing" },
        { icon: ShieldCheck, label: "Prepaid international" },
        { icon: Sparkles, label: "Made in India" },
      ];

  const pushToBag = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variantId: cartVariantId,
      variantLabel,
      price,
      mrp,
      quantity: qty,
      currency: market.currency,
      marketId: market.id,
      inrCapture,
    });
  };

  const addToBag = () => {
    pushToBag();
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative overflow-hidden bg-gradient-to-br from-[#f3ebe4] via-[#faf6f1] to-[#eadfd4] p-4 ring-1 ring-inset ring-burgundy/10 md:p-6">
          <span aria-hidden className="absolute left-4 top-4 h-4 w-4 border-l border-t border-gold/50" />
          <span aria-hidden className="absolute right-4 top-4 h-4 w-4 border-r border-t border-gold/50" />
          <span aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-gold/50" />
          <span aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-gold/50" />
          <Image
            src={activeImage}
            alt={product.name}
            width={1600}
            height={1200}
            className="relative z-[1] h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(42,28,31,0.12)]"
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {product.gallery.map((src) => (
            <button
              key={src}
              onClick={() => setActiveImage(src)}
              className={cn(
                "overflow-hidden bg-[#f7f3ee] p-1.5 ring-1 transition",
                activeImage === src
                  ? "ring-burgundy"
                  : "ring-burgundy/10 opacity-90 hover:opacity-100 hover:ring-burgundy/30"
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
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-deep">
          {product.collection} · {product.designCode}
          {!isIndia ? ` · ${market.shortLabel}` : ""}
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] text-burgundy md:text-5xl">
          {product.name}
        </h1>
        <p className="mt-3 text-[15px] font-medium leading-relaxed text-ink/80">
          {product.tagline}
        </p>

        <div className="mt-5 flex flex-wrap items-end gap-3">
          <span className="font-display text-4xl font-bold text-burgundy md:text-5xl">
            {formatMoney(price, market)}
          </span>
          {isIndia ? (
            <>
              <span className="pb-1 text-base font-semibold text-ink/45 line-through">
                {formatMoney(mrp, market)}
              </span>
              <span className="mb-1 bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-burgundy-deep">
                Save {savePct}% · {formatMoney(saveAmt, market)} off
              </span>
            </>
          ) : null}
        </div>
        <p className="mt-2 text-sm font-medium text-ink/70">
          {isIndia
            ? "Inclusive of taxes · Festive Comfort pricing"
            : market.shippingLine}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {trustItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-start gap-2 border border-gold/25 bg-[#faf7f2] px-2.5 py-2.5"
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              <span className="text-[11px] font-semibold leading-snug text-ink">{label}</span>
            </div>
          ))}
        </div>

        {isIndia ? (
          <div className="mt-8">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-burgundy">
              Choose your set
            </p>
            <div className="space-y-2.5">
              {VARIANTS.map((v) => {
                const selected = variantId === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      "flex w-full items-start justify-between gap-3 border px-4 py-3.5 text-left transition",
                      selected
                        ? "border-burgundy bg-burgundy/[0.06] shadow-[0_10px_28px_-22px_rgba(74,18,28,0.55)]"
                        : "border-burgundy/20 bg-white hover:border-burgundy/45"
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-full border",
                            selected
                              ? "border-burgundy bg-burgundy text-cream"
                              : "border-burgundy/35"
                          )}
                        >
                          {selected ? <Check className="h-2.5 w-2.5" /> : null}
                        </span>
                        <p className="font-display text-lg font-bold text-burgundy">{v.label}</p>
                      </div>
                      <p className="mt-1 pl-6 text-[13px] font-medium leading-snug text-ink/75">
                        {v.description}
                      </p>
                      <p className="mt-1 pl-6 text-[12px] font-semibold text-ink/55">
                        {v.dimensions}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-base font-bold text-burgundy">
                        {formatMoney(v.price, market)}
                      </p>
                      <p className="text-[12px] font-semibold text-ink/40 line-through">
                        {formatMoney(v.mrp, market)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-burgundy">
                Choose your pack
              </p>
              <div className="space-y-2.5">
                {(
                  [
                    {
                      id: "one" as const,
                      title: "1 Comforter",
                      desc: "One vacuum-packed comforter · free international shipping built in",
                      price: overseasUnitPrice(market, "one", size),
                    },
                    {
                      id: "bundle" as const,
                      title: "2-Comforter Bundle",
                      desc: "Best value for gifting · free international shipping built in",
                      price: overseasUnitPrice(market, "bundle", size),
                    },
                  ] as const
                ).map((opt) => {
                  const selected = pack === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setPack(opt.id)}
                      className={cn(
                        "flex w-full items-start justify-between gap-3 border px-4 py-3.5 text-left transition",
                        selected
                          ? "border-burgundy bg-burgundy/[0.06]"
                          : "border-burgundy/20 bg-white hover:border-burgundy/45"
                      )}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-full border",
                              selected
                                ? "border-burgundy bg-burgundy text-cream"
                                : "border-burgundy/35"
                            )}
                          >
                            {selected ? <Check className="h-2.5 w-2.5" /> : null}
                          </span>
                          <p className="font-display text-lg font-bold text-burgundy">
                            {opt.title}
                          </p>
                        </div>
                        <p className="mt-1 pl-6 text-[13px] font-medium text-ink/75">{opt.desc}</p>
                      </div>
                      <p className="shrink-0 text-base font-bold text-burgundy">
                        {formatMoney(opt.price, market)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-burgundy">
                Size
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {(
                  [
                    { id: "single" as const, label: "Single" },
                    { id: "double" as const, label: "Double (+10%)" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSize(opt.id)}
                    className={cn(
                      "border px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] transition",
                      size === opt.id
                        ? "border-burgundy bg-burgundy text-cream"
                        : "border-burgundy/25 text-burgundy hover:border-burgundy"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[12px] font-medium text-ink/55">
                Double size includes a packed-weight premium as per our overseas rate card.
              </p>
            </div>
          </div>
        )}

        <div className="mt-7 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center border border-burgundy/25 bg-white">
              <button
                className="px-4 py-3.5 text-lg font-bold text-burgundy"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease"
              >
                −
              </button>
              <span className="w-12 text-center text-base font-bold text-ink">{qty}</span>
              <button
                className="px-4 py-3.5 text-lg font-bold text-burgundy"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase"
              >
                +
              </button>
            </div>
            <Button
              size="lg"
              className="min-h-12 flex-1 text-[13px] font-bold uppercase tracking-[0.14em]"
              onClick={addToBag}
            >
              {added ? "Added to Bag" : "Add to Bag"}
            </Button>
          </div>
          <Button
            size="lg"
            variant="gold"
            className="min-h-12 w-full text-[13px] font-bold uppercase tracking-[0.14em]"
            onClick={() => {
              pushToBag();
              window.location.href = "/checkout";
            }}
          >
            Buy Now · Easy Checkout
          </Button>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
              `Hi San Marco, I have a question about ${product.name} (${variantLabel}) for ${market.label}.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="block text-center text-[13px] font-semibold text-burgundy underline-offset-4 hover:underline"
          >
            Need help choosing? WhatsApp us
          </a>
        </div>

        <div className="mt-9 border-t border-gold/30 pt-7">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-burgundy">
            Why you&apos;ll love it
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {product.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 border border-burgundy/10 bg-[#faf7f2] px-3 py-2.5 text-[13px] font-semibold leading-snug text-ink"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border border-burgundy/10 bg-white p-4 md:p-5">
          <p className="mb-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-burgundy">
            <IndianRupee className="h-3.5 w-3.5 text-gold-deep" />
            Product details
          </p>
          <dl className="space-y-3.5">
            {[
              ["Fabric", product.fabric],
              ["Filling", product.filling],
              ["Colours", product.colours],
              ["Wash care", product.washCare],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-b border-gold/15 pb-3 last:border-0 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
              >
                <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">
                  {label}
                </dt>
                <dd className="text-[14px] font-medium leading-relaxed text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-5 text-[13px] font-medium leading-relaxed text-ink/75">
          {product.description}
        </p>
      </div>
    </div>
  );
}
