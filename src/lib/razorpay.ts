import crypto from "crypto";

export const RAZORPAY_KEY_ID =
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() || "rzp_live_TdVKupjbPwZKD9";

export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET?.trim() || "";

export function hasRazorpaySecret() {
  return Boolean(RAZORPAY_KEY_SECRET);
}

export function toPaise(amountInr: number) {
  return Math.round(amountInr * 100);
}

export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  if (!RAZORPAY_KEY_SECRET) return false;
  const body = `${params.orderId}|${params.paymentId}`;
  const expected = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");
  return expected === params.signature;
}
