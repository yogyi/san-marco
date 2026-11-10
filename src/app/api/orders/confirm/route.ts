import { NextResponse } from "next/server";
import type { ThankYouEmailPayload } from "@/lib/email-templates";
import { sendPurchaseThankYou } from "@/lib/thank-you";

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

    if (!orderId || !customerName) {
      return NextResponse.json(
        { error: "Missing orderId or customerName" },
        { status: 400 }
      );
    }

    if (!customerEmail && !phone) {
      return NextResponse.json(
        { error: "Email or phone required for thank-you message" },
        { status: 400 }
      );
    }

    if (customerEmail && !isValidEmail(customerEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const payload: ThankYouEmailPayload = {
      orderId,
      customerName,
      customerEmail: customerEmail || `no-email+${orderId}@sanmarcofurnishings.com`,
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

    const result = await sendPurchaseThankYou(payload);

    return NextResponse.json({
      ok: true,
      sent: result.ok,
      message: result.message,
      configured: result.emailConfigured || result.whatsappConfigured,
      emailConfigured: result.emailConfigured,
      whatsappConfigured: result.whatsappConfigured,
      emailSent: result.emailSent,
      whatsappSent: result.whatsappSent,
      storeEmailSent: result.storeEmailSent,
      storeWhatsAppLink: result.storeWhatsAppLink,
      emailError: result.emailError,
      whatsappError: result.whatsappError,
      provider: result.emailSent
        ? result.emailProvider
        : result.whatsappSent
          ? result.whatsappProvider
          : "log",
    });
  } catch (error) {
    console.error("Order thank-you error", error);
    return NextResponse.json(
      {
        ok: false,
        sent: false,
        error: error instanceof Error ? error.message : "Failed to send thank-you",
      },
      { status: 500 }
    );
  }
}
