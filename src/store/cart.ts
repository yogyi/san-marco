"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VariantId } from "@/data/products";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  variantId: VariantId | string;
  variantLabel: string;
  price: number;
  mrp: number;
  quantity: number;
  /** Market currency at add time (INR for India, AED/USD/… overseas) */
  currency?: string;
  marketId?: string;
  /** INR amount used for Razorpay capture on overseas orders */
  inrCapture?: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "key" | "quantity"> & { quantity?: number }) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      addItem: (item) => {
        const key = `${item.productId}:${item.variantId}`;
        const existing = get().items.find((i) => i.key === key);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.key === key
                ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...get().items,
              { ...item, key, quantity: item.quantity ?? 1 },
            ],
            isOpen: true,
          });
        }
      },
      removeItem: (key) =>
        set({ items: get().items.filter((i) => i.key !== key) }),
      updateQty: (key, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.key !== key) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, quantity } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "san-marco-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export function cartTotals(items: CartItem[], opts?: { freeShipping?: boolean }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const mrpTotal = items.reduce((s, i) => s + i.mrp * i.quantity, 0);
  const savings = Math.max(0, mrpTotal - subtotal);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const freeShipping = opts?.freeShipping ?? true;
  // India + overseas retail: free shipping (overseas freight is built into local price)
  const shipping = freeShipping || subtotal === 0 ? 0 : subtotal >= 1999 ? 0 : 99;
  const inrCapture = items.reduce(
    (s, i) => s + (i.inrCapture ?? (i.currency === "INR" || !i.currency ? i.price : 0)) * i.quantity,
    0
  );
  return { subtotal, mrpTotal, savings, count, shipping, total: subtotal + shipping, inrCapture };
}
