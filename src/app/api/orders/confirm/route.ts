import { NextResponse } from "next/server";
import { emailConfigured, sendOrderEmails } from "@/lib/email";
import type { ThankYouEmailPayload } from "@/lib/email-templates";

export const runtime = "nodejs";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const customerEmail = String(body?.customerEmail || body?.email || "").trim();
    const customerName = String(body?.customerName || body?.name || "").trim();
    const orderId = String(body?.orderId || "").trim();
    const phone = String(body?.phone || "").trim();
    const address = String(body?.address || "").trim();
    const city = String(body?.city || "").trim();
    const state = String(body?.state || "").trim();
    const pincode = String(body?.pincode || "").trim();
    const payment = String(body?.payment || "").trim();
    const notes = String(body?.notes || "").trim();
    const razorpayPaymentId = body?.razorpayPaymentId
      ? String(body.razorpayPaymentId)
      : undefined;

    const items = Array.isArray(body?.items) ? body.items : [];
    const totals = body?.totals || {};

    if (!orderId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing orderId, customerName, or customerEmail" },
        { status: 400 }
      );
    }

    if (!isValidEmail(customerEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const payload: ThankYouEmailPayload = {
      orderId,
      customerName,
      customerEmail,
      phone,
      address,
      city,
      state,
      pincode,
      payment,
      notes: notes || undefined,
      razorpayPaymentId,
      items: items.map(
        (item: {
          name?: string;
          variantLabel?: string;
          quantity?: number;
          price?: number;
        }) => ({
          name: String(item?.name || "Item"),
          variantLabel: String(item?.variantLabel || ""),
          quantity: Number(item?.quantity) || 1,
          price: Number(item?.price) || 0,
        })
      ),
      subtotal: Number(totals.subtotal) || 0,
      shipping: Number(totals.shipping) || 0,
      total: Number(totals.total) || 0,
    };

    const result = await sendOrderEmails(payload);

    return NextResponse.json({
      ok: true,
      configured: emailConfigured(),
      sent: result.customer.sent,
      provider: result.customer.provider,
      id: result.customer.id,
      error: result.customer.error,
      storeNotified: result.store.sent,
    });
  } catch (error) {
    console.error("Order confirm email error", error);
    return NextResponse.json(
      {
        ok: false,
        sent: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
