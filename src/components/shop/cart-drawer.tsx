"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, cartTotals } from "@/store/cart";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem } = useCart();
  const { subtotal, savings, shipping, total, count } = cartTotals(items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (!open ? closeCart() : null)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Atelier Bag</SheetTitle>
          <p className="text-sm text-ink/60">
            {count === 0 ? "Your bag is waiting to be filled." : `${count} piece${count > 1 ? "s" : ""} selected`}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <p className="font-display text-2xl text-burgundy">Nothing here yet</p>
              <p className="max-w-xs text-sm text-ink/60">
                Discover the Festive Comfort Collection — soft loft, gift-ready bags, Made in India.
              </p>
              <Button asChild onClick={closeCart}>
                <Link href="/shop">Browse Collection</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 border-b border-gold/15 pb-5">
                  <div className="relative h-24 w-20 overflow-hidden bg-ivory">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg text-burgundy leading-tight">{item.name}</p>
                        <p className="mt-1 text-xs text-ink/55">{item.variantLabel}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-ink/40 hover:text-burgundy"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-burgundy/15">
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
                        <p className="text-sm font-medium text-burgundy">
                          {formatINR(item.price * item.quantity)}
                        </p>
                        <p className="text-xs text-ink/40 line-through">
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
          <div className="border-t border-gold/20 bg-ivory/50 px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-ink/60">Subtotal</span>
              <span className="text-burgundy">{formatINR(subtotal)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">You save</span>
                <span className="text-burgundy">{formatINR(savings)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-ink/60">Shipping</span>
              <span className="text-burgundy">
                {shipping === 0 ? "Complimentary" : formatINR(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gold/20 pt-3">
              <span className="font-display text-xl text-burgundy">Total</span>
              <span className="font-display text-xl text-burgundy">{formatINR(total)}</span>
            </div>
            <Button asChild className="w-full" size="lg" onClick={closeCart}>
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
