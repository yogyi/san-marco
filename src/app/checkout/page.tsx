"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartTotals, useCart } from "@/store/cart";
import { formatINR, cn } from "@/lib/utils";
import { BRAND } from "@/data/products";

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const totals = cartTotals(items);
  const [step, setStep] = useState<Step>(1);
  const [payment, setPayment] = useState<"upi" | "card" | "cod">("upi");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const validShipping = useMemo(() => {
    return (
      form.name.trim() &&
      form.phone.trim().length >= 10 &&
      form.address.trim() &&
      form.city.trim() &&
      form.pincode.trim().length >= 6
    );
  }, [form]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-burgundy">Your bag is empty</h1>
        <p className="mt-3 text-ink/60">Add a design before checking out.</p>
        <Button asChild className="mt-8">
          <Link href="/shop">Browse Collection</Link>
        </Button>
      </div>
    );
  }

  async function placeOrder() {
    setPlacing(true);
    const orderId = `SM${Date.now().toString().slice(-8)}`;
    const payload = {
      orderId,
      items,
      totals,
      shipping: form,
      payment,
      createdAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      sessionStorage.setItem("san-marco-last-order", JSON.stringify(payload));
    }
    await new Promise((r) => setTimeout(r, 900));
    clear();
    router.push(`/order/${orderId}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="font-display text-5xl text-burgundy">Checkout</h1>
      <p className="mt-2 text-ink/60">A calm, three-step path — shipping, payment, review.</p>

      <ol className="mt-8 flex gap-2 md:gap-4">
        {[
          { n: 1, label: "Shipping" },
          { n: 2, label: "Payment" },
          { n: 3, label: "Review" },
        ].map((s) => (
          <li
            key={s.n}
            className={cn(
              "flex-1 border-b-2 pb-3 text-[11px] uppercase tracking-[0.16em]",
              step >= s.n ? "border-burgundy text-burgundy" : "border-burgundy/15 text-ink/40"
            )}
          >
            0{s.n} · {s.label}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border border-gold/20 bg-cream/80 p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-3xl text-burgundy">Shipping details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="As on the door"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit mobile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="For order updates"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House, street, landmark"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN code</Label>
                  <Input
                    id="pincode"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Gift note (optional)</Label>
                  <Input
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Add a short message for gifting"
                  />
                </div>
              </div>
              <Button
                size="lg"
                className="mt-4"
                disabled={!validShipping}
                onClick={() => setStep(2)}
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-3xl text-burgundy">Payment</h2>
              <p className="text-sm text-ink/60">
                Demo checkout — no real charge. Choose how you would like to pay.
              </p>
              <div className="space-y-3">
                {(
                  [
                    { id: "upi", title: "UPI", desc: "GPay, PhonePe, Paytm" },
                    { id: "card", title: "Card", desc: "Visa, Mastercard, RuPay" },
                    { id: "cod", title: "Cash on Delivery", desc: "Pay when your bag arrives" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPayment(opt.id)}
                    className={cn(
                      "flex w-full items-center justify-between border px-4 py-4 text-left",
                      payment === opt.id
                        ? "border-burgundy bg-burgundy/[0.04]"
                        : "border-burgundy/15"
                    )}
                  >
                    <div>
                      <p className="font-medium text-burgundy">{opt.title}</p>
                      <p className="text-xs text-ink/55">{opt.desc}</p>
                    </div>
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border",
                        payment === opt.id
                          ? "border-burgundy bg-burgundy"
                          : "border-burgundy/30"
                      )}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button size="lg" onClick={() => setStep(3)}>
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-3xl text-burgundy">Review & place</h2>
              <div className="border border-gold/20 bg-ivory/50 p-4 text-sm text-ink/70 space-y-1">
                <p className="font-medium text-burgundy">{form.name}</p>
                <p>{form.address}</p>
                <p>
                  {form.city}
                  {form.state ? `, ${form.state}` : ""} {form.pincode}
                </p>
                <p>{form.phone}</p>
                {form.email && <p>{form.email}</p>}
                <p className="pt-2 capitalize">Payment: {payment === "cod" ? "Cash on Delivery" : payment.toUpperCase()}</p>
                {form.notes && <p className="pt-2 italic">Gift note: {form.notes}</p>}
              </div>
              <p className="text-xs text-ink/50">
                Need changes? WhatsApp {BRAND.phone} after placing — our concierge will assist.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button size="lg" onClick={placeOrder} disabled={placing}>
                  {placing ? "Placing order…" : `Place Order · ${formatINR(totals.total)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit border border-gold/20 bg-ivory/40 p-6">
          <h2 className="font-display text-2xl text-burgundy">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <div className="relative h-16 w-14 overflow-hidden bg-cream">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-burgundy">{item.name}</p>
                  <p className="text-xs text-ink/50">
                    {item.variantLabel} · ×{item.quantity}
                  </p>
                  <p className="mt-1">{formatINR(item.price * item.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-gold/20 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink/55">Subtotal</span>
              <span>{formatINR(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/55">Savings</span>
              <span>{formatINR(totals.savings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/55">Shipping</span>
              <span>{totals.shipping === 0 ? "Complimentary" : formatINR(totals.shipping)}</span>
            </div>
            <div className="flex justify-between pt-2 font-display text-2xl text-burgundy">
              <span>Total</span>
              <span>{formatINR(totals.total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
