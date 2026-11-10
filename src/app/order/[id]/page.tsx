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
  thankYouSent?: boolean;
  emailSent?: boolean;
  whatsappSent?: boolean;
  thankYouMessage?: string;
  storeWhatsAppLink?: string;
  shipping: { name: string; city: string; email?: string; phone?: string };
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

  const thankYouText =
    order?.thankYouMessage ||
    `Thank you for your purchase${order?.shipping?.name ? `, ${order.shipping.name}` : ""}! Your San Marco order ${params.id} is confirmed.`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8">
      <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">Thank you</p>
      <h1 className="mt-3 font-display text-5xl text-burgundy">Thank you for your purchase</h1>
      <p className="mt-4 text-ink/65">
        Your San Marco pieces are being prepared with care.
      </p>

      <div className="mx-auto mt-8 border border-gold/30 bg-burgundy px-6 py-6 text-left text-cream">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
          Confirmation message
        </p>
        <p className="mt-3 font-display text-2xl leading-snug text-cream">{thankYouText}</p>
        <div className="mt-4 space-y-1 text-sm text-cream/80">
          {order?.emailSent ? (
            <p>Thank-you email sent to {order.shipping.email}.</p>
          ) : order?.shipping.email ? (
            <p>We’ll also email {order.shipping.email} shortly.</p>
          ) : null}
          {order?.whatsappSent ? (
            <p>Thank-you WhatsApp sent to {order.shipping.phone}.</p>
          ) : order?.shipping.phone ? (
            <p>WhatsApp updates will reach {order.shipping.phone}.</p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-8 border border-gold/25 bg-ivory/50 px-6 py-8 text-left">
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
          Questions?{" "}
          <a className="text-burgundy underline" href={`https://wa.me/${BRAND.whatsapp}`}>
            Message us on WhatsApp
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
        {order?.storeWhatsAppLink ? (
          <Button asChild variant="gold">
            <a href={order.storeWhatsAppLink} target="_blank" rel="noreferrer">
              Share order on WhatsApp
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
