"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { BRAND } from "@/data/products";

type StoredOrder = {
  orderId: string;
  totals: { total: number; count: number };
  payment: string;
  razorpayPaymentId?: string;
  shipping: { name: string; city: string };
};

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("san-marco-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8">
      <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">Thank you</p>
      <h1 className="mt-3 font-display text-5xl text-burgundy">Order confirmed</h1>
      <p className="mt-4 text-ink/65">
        Your San Marco pieces are being prepared with care.
      </p>
      <div className="mx-auto mt-10 border border-gold/25 bg-ivory/50 px-6 py-8 text-left">
        <p className="text-[11px] uppercase tracking-[0.18em] text-burgundy/60">Order ID</p>
        <p className="font-display text-3xl text-burgundy">{params.id}</p>
        {order && (
          <div className="mt-4 space-y-1 text-sm text-ink/65">
            <p>
              {order.shipping.name} · {order.shipping.city}
            </p>
            <p>
              {order.totals.count} item{order.totals.count > 1 ? "s" : ""} ·{" "}
              {formatINR(order.totals.total)}
            </p>
            <p className="capitalize">
              Payment:{" "}
              {order.payment === "razorpay"
                ? "Paid online (Razorpay)"
                : order.payment === "cod"
                  ? "Cash on Delivery"
                  : order.payment}
            </p>
            {order.razorpayPaymentId ? (
              <p className="text-xs">Razorpay ID: {order.razorpayPaymentId}</p>
            ) : null}
          </div>
        )}
        <p className="mt-6 text-sm text-ink/55">
          A concierge confirmation will be shared on WhatsApp/email shortly. Questions?{" "}
          <a className="text-burgundy underline" href={`https://wa.me/${BRAND.whatsapp}`}>
            Message us
          </a>
          .
        </p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
