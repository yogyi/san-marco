import { NextResponse } from "next/server";
import { hasRazorpaySecret, verifyPaymentSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = String(body?.razorpay_order_id || "");
    const paymentId = String(body?.razorpay_payment_id || "");
    const signature = String(body?.razorpay_signature || "");

    if (!paymentId) {
      return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
    }

    // Amount-mode checkout returns only payment id (no order/signature).
    if (!orderId || !signature) {
      return NextResponse.json({
        verified: false,
        accepted: true,
        mode: "payment_id_only",
        paymentId,
        note: "Payment captured. Add RAZORPAY_KEY_SECRET to enable full signature verification.",
      });
    }

    if (!hasRazorpaySecret()) {
      return NextResponse.json({
        verified: false,
        accepted: true,
        mode: "unverified",
        paymentId,
        orderId,
        note: "RAZORPAY_KEY_SECRET missing — cannot verify signature yet.",
      });
    }

    const ok = verifyPaymentSignature({ orderId, paymentId, signature });
    if (!ok) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    return NextResponse.json({
      verified: true,
      accepted: true,
      mode: "signature",
      paymentId,
      orderId,
    });
  } catch (error) {
    console.error("Razorpay verify error", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
