"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, cartTotals } from "@/store/cart";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, openCart, closeCart, updateQty, removeItem } = useCart();
  const { subtotal, savings, shipping, total, count } = cartTotals(items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Your Atelier Bag</SheetTitle>
          <p className="text-sm text-muted">
            {count === 0
              ? "Your bag is waiting to be filled."
              : `${count} piece${count > 1 ? "s" : ""} selected`}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <p className="font-display text-2xl text-ink">Nothing here yet</p>
              <p className="max-w-xs text-sm text-muted">
                Discover the Festive Comfort Collection — soft loft, gift-ready bags, Made in India.
              </p>
              <Button asChild variant="gold" onClick={closeCart}>
                <Link href="/shop">Browse Collection</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 border-b border-sand pb-5">
                  <div className="relative h-24 w-20 overflow-hidden bg-sand">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg leading-tight text-ink">{item.name}</p>
                        <p className="mt-1 text-xs text-muted">{item.variantLabel}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-muted hover:text-ink"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-sand">
                        <button
                          className="p-2"
                          onClick={() => updateQty(item.key, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          className="p-2"
                          onClick={() => updateQty(item.key, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-ink">
                          {formatINR(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-muted line-through">
                          {formatINR(item.mrp * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-sand bg-cream/60 px-6 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-ink">{formatINR(subtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted">You save</span>
                <span className="text-ink">{formatINR(savings)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className="text-ink">
                {shipping === 0 ? "Complimentary" : formatINR(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-sand pt-3">
              <span className="font-display text-xl text-ink">Total</span>
              <span className="font-display text-xl text-ink">{formatINR(total)}</span>
            </div>
            <Button asChild className="w-full" size="lg" variant="gold" onClick={closeCart}>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" onClick={closeCart}>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
