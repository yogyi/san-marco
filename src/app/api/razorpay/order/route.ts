import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  hasRazorpaySecret,
  toPaise,
} from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body?.amount);
    const currency = (body?.currency as string) || "INR";
    const receipt = (body?.receipt as string) || `sm_${Date.now()}`;
    const notes = (body?.notes as Record<string, string>) || {};

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Without secret we still return a client-checkout payload (amount mode).
    if (!hasRazorpaySecret()) {
      return NextResponse.json({
        mode: "checkout",
        keyId: RAZORPAY_KEY_ID,
        amount: toPaise(amount),
        currency,
        receipt,
        notes,
        warning:
          "RAZORPAY_KEY_SECRET is not set. Checkout will open in amount mode. Add the Key Secret for Orders API + signature verification.",
      });
    }

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: toPaise(amount),
      currency,
      receipt,
      notes,
    });

    return NextResponse.json({
      mode: "order",
      keyId: RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt,
    });
  } catch (error) {
    console.error("Razorpay order error", error);
    return NextResponse.json(
      { error: "Could not create Razorpay order" },
      { status: 500 }
    );
  }
}
