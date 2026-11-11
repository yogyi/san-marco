import { NextResponse } from "next/server";
import type { ThankYouEmailPayload } from "@/lib/email-templates";
import { hasRazorpaySecret, verifyPaymentSignature } from "@/lib/razorpay";
import { sendPurchaseThankYou } from "@/lib/thank-you";

export const runtime = "nodejs";

function buildThankYouPayload(
  body: Record<string, unknown>,
  paymentId: string
): ThankYouEmailPayload | null {
  const order = (body?.order || {}) as Record<string, unknown>;
  const customerEmail = String(order.customerEmail || body?.customerEmail || "").trim();
  const customerName = String(order.customerName || body?.customerName || "").trim();
  const localOrderId = String(order.orderId || body?.localOrderId || "").trim();
  if (!customerEmail || !customerName || !localOrderId) return null;

  const items = Array.isArray(order.items) ? order.items : [];
  const totals = (order.totals || {}) as Record<string, unknown>;

  return {
    orderId: localOrderId,
    customerName,
    customerEmail,
    phone: String(order.phone || ""),
    address: String(order.address || ""),
    city: String(order.city || ""),
    state: String(order.state || ""),
    pincode: String(order.pincode || ""),
    payment: "razorpay",
    notes: order.notes ? String(order.notes) : undefined,
    razorpayPaymentId: paymentId,
    items: items.map((item) => {
      const row = (item || {}) as Record<string, unknown>;
      return {
        name: String(row.name || "Item"),
        variantLabel: String(row.variantLabel || ""),
        quantity: Number(row.quantity) || 1,
        price: Number(row.price) || 0,
      };
    }),
    subtotal: Number(totals.subtotal) || 0,
    shipping: Number(totals.shipping) || 0,
    total: Number(totals.total) || 0,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = String(body?.razorpay_order_id || "");
    const paymentId = String(body?.razorpay_payment_id || "");
    const signature = String(body?.razorpay_signature || "");

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
    }

    let mode: "payment_id_only" | "unverified" | "signature" = "payment_id_only";
    let verified = false;

    // Amount-mode checkout returns only payment id (no order/signature).
    if (!orderId || !signature) {
      mode = "payment_id_only";
    } else if (!hasRazorpaySecret()) {
      mode = "unverified";
    } else {
      const ok = verifyPaymentSignature({ orderId, paymentId, signature });
      if (!ok) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }
      verified = true;
      mode = "signature";
    }

    // Send thank-you email to the buyer right after payment is accepted.
    let thankYou: Awaited<ReturnType<typeof sendPurchaseThankYou>> | null = null;
    const payload = buildThankYouPayload(body, paymentId);
    if (payload) {
      thankYou = await sendPurchaseThankYou(payload);
    }

    return NextResponse.json({
      verified,
      accepted: true,
      mode,
      paymentId,
      orderId: orderId || undefined,
      emailSent: Boolean(thankYou?.emailSent),
      emailError: thankYou?.emailError,
      thankYouMessage: thankYou?.message,
      storeWhatsAppLink: thankYou?.storeWhatsAppLink,
      note:
        mode === "payment_id_only"
          ? "Payment captured. Add RAZORPAY_KEY_SECRET to enable full signature verification."
          : mode === "unverified"
            ? "RAZORPAY_KEY_SECRET missing — cannot verify signature yet."
            : undefined,
    });
  } catch (error) {
    console.error("Razorpay verify error", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
