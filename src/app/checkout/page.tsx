"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartTotals, useCart } from "@/store/cart";
import { cn, formatINR } from "@/lib/utils";
import { formatMoney } from "@/lib/money";
import { BRAND } from "@/data/products";
import { loadRazorpayScript } from "@/lib/load-razorpay";
import { useActiveMarket } from "@/store/market";

type Step = 1 | 2 | 3;
type PayMethod = "razorpay" | "cod";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCart();
  const market = useActiveMarket();
  const isIndia = market.id === "in";
  const totals = cartTotals(items, { freeShipping: true });
  const payAmountInr = isIndia ? totals.total : Math.max(totals.inrCapture, 1);
  const [step, setStep] = useState<Step>(1);
  const [payment, setPayment] = useState<PayMethod>("razorpay");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    notes: "",
  });

  const validShipping = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const pinOk = isIndia ? form.pincode.trim().length >= 6 : form.pincode.trim().length >= 3;
    return (
      form.name.trim() &&
      emailOk &&
      form.phone.trim().length >= 8 &&
      form.address.trim() &&
      form.city.trim() &&
      pinOk
    );
  }, [form, isIndia]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-burgundy">Your bag is empty</h1>
        <p className="mt-3 font-medium text-ink/70">Add a design before checking out.</p>
        <Button asChild className="mt-8">
          <Link href="/shop">Browse Collection</Link>
        </Button>
      </div>
    );
  }

  async function sendThankYouEmail(meta: {
    orderId: string;
    payment: string;
    razorpayPaymentId?: string;
  }) {
    try {
      const res = await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: meta.orderId,
          customerName: form.name,
          customerEmail: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          notes: form.notes,
          payment: meta.payment,
          razorpayPaymentId: meta.razorpayPaymentId,
          items: items.map((item) => ({
            name: item.name,
            variantLabel: item.variantLabel,
            quantity: item.quantity,
            price: item.price,
          })),
          totals: {
            subtotal: totals.subtotal,
            shipping: totals.shipping,
            total: totals.total,
          },
        }),
      });
      const data = await res.json();
      return {
        thankYouSent: Boolean(data?.sent || data?.emailSent || data?.whatsappSent),
        emailSent: Boolean(data?.emailSent),
        whatsappSent: Boolean(data?.whatsappSent),
        emailConfigured: Boolean(data?.emailConfigured),
        whatsappConfigured: Boolean(data?.whatsappConfigured),
        storeWhatsAppLink: String(data?.storeWhatsAppLink || ""),
        thankYouMessage: String(
          data?.message ||
            `Thank you for your purchase, ${form.name}! Your San Marco order is confirmed.`
        ),
      };
    } catch {
      return {
        thankYouSent: false,
        emailSent: false,
        whatsappSent: false,
        emailConfigured: false,
        whatsappConfigured: false,
        storeWhatsAppLink: "",
        thankYouMessage: `Thank you for your purchase, ${form.name}! Your San Marco order is confirmed.`,
      };
    }
  }

  async function finishOrder(meta: {
    orderId: string;
    payment: string;
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
  }) {
    const thankYou = await sendThankYouEmail(meta);
    const payload = {
      orderId: meta.orderId,
      items,
      totals,
      shipping: form,
      payment: meta.payment,
      razorpayPaymentId: meta.razorpayPaymentId,
      razorpayOrderId: meta.razorpayOrderId,
      thankYouSent: thankYou.thankYouSent,
      emailSent: thankYou.emailSent,
      whatsappSent: thankYou.whatsappSent,
      emailConfigured: thankYou.emailConfigured,
      whatsappConfigured: thankYou.whatsappConfigured,
      storeWhatsAppLink: thankYou.storeWhatsAppLink,
      thankYouMessage: thankYou.thankYouMessage,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem("san-marco-last-order", JSON.stringify(payload));
    clear();
    router.push(`/order/${meta.orderId}`);
  }

  async function placeOrder() {
    setPlacing(true);
    setError("");
    const localOrderId = `SM${Date.now().toString().slice(-8)}`;

    try {
      if (payment === "cod") {
        if (!isIndia) {
          throw new Error("Cash on Delivery is only available in India.");
        }
        await finishOrder({ orderId: localOrderId, payment: "cod" });
        return;
      }

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payAmountInr,
          currency: "INR",
          receipt: localOrderId,
          notes: {
            customer: form.name,
            phone: form.phone,
            email: form.email || "",
            city: form.city,
            market: market.id,
            displayTotal: `${market.currency} ${totals.total}`,
            country: form.country || market.label,
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData?.error || "Could not start payment");
      }

      const ready = await loadRazorpayScript();
      if (!ready || !window.Razorpay) {
        throw new Error("Razorpay failed to load. Check your connection and try again.");
      }

      const options = {
        key: orderData.keyId as string,
        amount: orderData.amount as number,
        currency: (orderData.currency as string) || "INR",
        name: "San Marco",
        description: `Order ${localOrderId}`,
        image: "/brand/san-marco-logo.jpg",
        order_id: orderData.orderId as string | undefined,
        prefill: {
          name: form.name,
          email: form.email || undefined,
          contact: form.phone,
        },
        notes: {
          receipt: localOrderId,
          address: form.address,
        },
        theme: { color: "#6b1f2a" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id?: string;
          razorpay_signature?: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.accepted) {
              throw new Error(verifyData?.error || "Payment verification failed");
            }
            await finishOrder({
              orderId: localOrderId,
              payment: "razorpay",
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            });
          } catch (e) {
            setError(e instanceof Error ? e.message : "Payment verification failed");
            setPlacing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
            setError("Payment window closed. You can try again anytime.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not place order");
      setPlacing(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="font-display text-5xl font-bold text-burgundy">Checkout</h1>
      <p className="mt-2 font-medium text-ink/70">
        {isIndia
          ? "Secure checkout powered by Razorpay — UPI, cards, netbanking & wallets."
          : `${market.label} pricing · ${market.shippingLine}. Prepaid via Razorpay (INR settlement).`}
      </p>

      <ol className="mt-8 flex gap-2 md:gap-4">
        {[
          { n: 1, label: "Shipping" },
          { n: 2, label: "Payment" },
          { n: 3, label: "Review" },
        ].map((s) => (
          <li
            key={s.n}
            className={cn(
              "flex-1 border-b-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em]",
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
              <h2 className="font-display text-3xl font-bold text-burgundy">Shipping details</h2>
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
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="We’ll send your thank-you & order confirmation"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House / street / landmark"
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
                  <Label htmlFor="pincode">{isIndia ? "PIN code" : "ZIP / Postal code"}</Label>
                  <Input
                    id="pincode"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    placeholder={isIndia ? "6 digits" : "Postal / ZIP"}
                  />
                </div>
                {!isIndia ? (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={form.country || market.label}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder={market.label}
                    />
                  </div>
                ) : null}
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
              <h2 className="font-display text-3xl font-bold text-burgundy">Payment</h2>
              <p className="text-sm font-medium text-ink/70">
                Pay securely with Razorpay — UPI, cards, netbanking and wallets. Or choose Cash on
                Delivery.
              </p>
              <div className="space-y-3">
                {(
                  [
                    {
                      id: "razorpay" as const,
                      title: isIndia ? "Pay Online · Razorpay" : "Pay Online · Prepaid",
                      desc: isIndia
                        ? "UPI · Cards · Netbanking · Wallets"
                        : `Cards · International prepaid · Charged in INR (~${formatINR(payAmountInr)})`,
                    },
                    ...(isIndia
                      ? [
                          {
                            id: "cod" as const,
                            title: "Cash on Delivery",
                            desc: "Pay when your bag arrives",
                          },
                        ]
                      : []),
                  ]
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
                      <p className="font-semibold text-burgundy">{opt.title}</p>
                      <p className="text-xs font-medium text-ink/60">{opt.desc}</p>
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
              <h2 className="font-display text-3xl font-bold text-burgundy">Review & pay</h2>
              <div className="space-y-1 border border-gold/20 bg-ivory/50 p-4 text-sm font-medium text-ink/75">
                <p className="font-semibold text-burgundy">{form.name}</p>
                <p>{form.address}</p>
                <p>
                  {form.city}
                  {form.state ? `, ${form.state}` : ""} {form.pincode}
                </p>
                <p>{form.phone}</p>
                {form.email && <p>{form.email}</p>}
                <p className="pt-2">
                  Payment:{" "}
                  {payment === "cod"
                    ? "Cash on Delivery"
                    : isIndia
                      ? "Razorpay (UPI / Card / Netbanking)"
                      : "Prepaid international (Razorpay)"}
                </p>
                <p className="pt-1 text-xs text-ink/55">{market.shippingLine}</p>
                {form.notes && <p className="pt-2 italic">Gift note: {form.notes}</p>}
              </div>
              {error ? (
                <p className="border border-burgundy/30 bg-burgundy/5 px-3 py-2 text-sm font-semibold text-burgundy">
                  {error}
                </p>
              ) : null}
              <p className="text-xs font-medium text-ink/55">
                Need help? WhatsApp {BRAND.phone} — our concierge will assist.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} disabled={placing}>
                  Back
                </Button>
                <Button size="lg" onClick={placeOrder} disabled={placing}>
                  {placing
                    ? payment === "cod"
                      ? "Placing order…"
                      : "Opening Razorpay…"
                    : payment === "cod"
                      ? `Place COD Order · ${formatMoney(totals.total, market)}`
                      : `Pay ${formatMoney(totals.total, market)} securely`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit border border-gold/20 bg-ivory/40 p-6">
          <h2 className="font-display text-2xl font-bold text-burgundy">Order summary</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
            {market.shortLabel}
          </p>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <div className="relative h-16 w-14 overflow-hidden bg-cream">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-burgundy">{item.name}</p>
                  <p className="text-xs font-medium text-ink/55">
                    {item.variantLabel} · ×{item.quantity}
                  </p>
                  <p className="mt-1 font-semibold">
                    {formatMoney(item.price * item.quantity, market)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-gold/20 pt-4 text-sm font-medium">
            <div className="flex justify-between">
              <span className="text-ink/55">Subtotal</span>
              <span>{formatMoney(totals.subtotal, market)}</span>
            </div>
            {totals.savings > 0 ? (
              <div className="flex justify-between">
                <span className="text-ink/55">Savings</span>
                <span>{formatMoney(totals.savings, market)}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span className="text-ink/55">Shipping</span>
              <span>
                {totals.shipping === 0 ? "Complimentary" : formatMoney(totals.shipping, market)}
              </span>
            </div>
            <div className="flex justify-between pt-2 font-display text-2xl font-bold text-burgundy">
              <span>Total</span>
              <span>{formatMoney(totals.total, market)}</span>
            </div>
          </div>
          <p className="mt-4 text-[11px] font-medium leading-snug text-ink/55">
            {market.shippingLine}
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
            Secured by Razorpay
          </p>
        </aside>
      </div>
    </div>
  );
}
