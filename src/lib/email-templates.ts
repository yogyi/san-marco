import { formatINR } from "@/lib/utils";
import { BRAND } from "@/data/products";

export type ThankYouEmailItem = {
  name: string;
  variantLabel: string;
  quantity: number;
  price: number;
};

export type ThankYouEmailPayload = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment: string;
  notes?: string;
  items: ThankYouEmailItem[];
  subtotal: number;
  shipping: number;
  total: number;
  razorpayPaymentId?: string;
  /** Delhivery AWB when already manifested */
  awbNumber?: string;
  /** Live courier tracking URL (Delhivery) */
  trackingUrl?: string;
  /** San Marco track page fallback */
  trackPageUrl?: string;
};

function paymentLabel(payment: string) {
  if (payment === "razorpay") return "Paid online (Razorpay)";
  if (payment === "cod") return "Cash on Delivery";
  return payment;
}

export function buildThankYouEmail(data: ThankYouEmailPayload) {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #ead9b8;font-family:Georgia,serif;color:#4a1a22;font-size:15px;">
          <strong>${escapeHtml(item.name)}</strong><br/>
          <span style="color:#6b5256;font-size:13px;">${escapeHtml(item.variantLabel)} · Qty ${item.quantity}</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #ead9b8;text-align:right;font-family:Arial,sans-serif;color:#4a1a22;font-size:14px;white-space:nowrap;">
          ${formatINR(item.price * item.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const subject = `Thank you for your purchase · Order ${data.orderId}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f7f1e8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f1e8;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#fffaf3;border:1px solid #d4b56a;">
          <tr>
            <td style="background:#6b1f2a;padding:28px 28px 24px;text-align:center;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#d4b56a;">San Marco</p>
              <h1 style="margin:10px 0 0;font-family:Georgia,serif;font-size:28px;font-weight:normal;color:#fffaf3;">Thank you for your purchase</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:18px;color:#4a1a22;">Dear ${escapeHtml(data.customerName)},</p>
              <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#5c4548;">
                We’re delighted you chose San Marco. Your order is confirmed and our team is preparing your pieces with care.
              </p>
              <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#a67c2d;">Order ID</p>
              <p style="margin:0 0 22px;font-family:Georgia,serif;font-size:24px;color:#6b1f2a;">${escapeHtml(data.orderId)}</p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${itemRows}</table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px;">
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b5256;padding:4px 0;">Subtotal</td>
                  <td style="font-family:Arial,sans-serif;font-size:13px;color:#4a1a22;text-align:right;padding:4px 0;">${formatINR(data.subtotal)}</td>
                </tr>
                <tr>
                  <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b5256;padding:4px 0;">Shipping</td>
                  <td style="font-family:Arial,sans-serif;font-size:13px;color:#4a1a22;text-align:right;padding:4px 0;">${data.shipping === 0 ? "Complimentary" : formatINR(data.shipping)}</td>
                </tr>
                <tr>
                  <td style="font-family:Georgia,serif;font-size:18px;color:#6b1f2a;padding-top:10px;">Total</td>
                  <td style="font-family:Georgia,serif;font-size:18px;color:#6b1f2a;text-align:right;padding-top:10px;">${formatINR(data.total)}</td>
                </tr>
              </table>

              <div style="margin-top:24px;padding:16px;background:#f3ebe0;border:1px solid #ead9b8;">
                <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a67c2d;">Shipping to</p>
                <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;color:#4a1a22;">
                  ${escapeHtml(data.customerName)}<br/>
                  ${escapeHtml(data.address)}<br/>
                  ${escapeHtml(data.city)}${data.state ? `, ${escapeHtml(data.state)}` : ""} ${escapeHtml(data.pincode)}<br/>
                  ${escapeHtml(data.phone)}
                </p>
                <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#5c4548;">
                  Payment: ${escapeHtml(paymentLabel(data.payment))}
                  ${data.razorpayPaymentId ? `<br/>Razorpay ID: ${escapeHtml(data.razorpayPaymentId)}` : ""}
                </p>
                ${
                  data.notes
                    ? `<p style="margin:12px 0 0;font-family:Georgia,serif;font-size:13px;font-style:italic;color:#6b1f2a;">Gift note: ${escapeHtml(data.notes)}</p>`
                    : ""
                }
              </div>

              ${trackingBlock(data)}

              <p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#5c4548;">
                Questions about your order? Reply to this email or WhatsApp us at
                <a href="https://wa.me/${BRAND.whatsapp}" style="color:#6b1f2a;">${BRAND.phone}</a>.
              </p>
              <p style="margin:18px 0 0;font-family:Georgia,serif;font-size:16px;color:#4a1a22;">With warm regards,<br/>The San Marco team</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;border-top:1px solid #ead9b8;text-align:center;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;line-height:1.5;color:#8a7276;">
                ${escapeHtml(BRAND.marketedBy)} · ${escapeHtml(BRAND.address)}<br/>
                ${escapeHtml(BRAND.email)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Thank you for your purchase, ${data.customerName}!`,
    ``,
    `Your San Marco order ${data.orderId} is confirmed.`,
    ``,
    ...data.items.map(
      (i) => `- ${i.name} (${i.variantLabel}) ×${i.quantity}: ${formatINR(i.price * i.quantity)}`
    ),
    ``,
    `Subtotal: ${formatINR(data.subtotal)}`,
    `Shipping: ${data.shipping === 0 ? "Complimentary" : formatINR(data.shipping)}`,
    `Total: ${formatINR(data.total)}`,
    `Payment: ${paymentLabel(data.payment)}`,
    ``,
    `Ship to: ${data.customerName}, ${data.address}, ${data.city}${data.state ? `, ${data.state}` : ""} ${data.pincode}`,
    `Phone: ${data.phone}`,
    data.notes ? `Gift note: ${data.notes}` : "",
    ``,
    ...trackingText(data),
    ``,
    `Questions? WhatsApp ${BRAND.phone} or email ${BRAND.email}`,
    ``,
    `— San Marco`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

function trackingBlock(data: ThankYouEmailPayload) {
  const liveUrl = data.trackingUrl || data.trackPageUrl;
  if (!liveUrl) return "";

  const awbLine = data.awbNumber
    ? `<p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:13px;color:#5c4548;">AWB / Waybill: <strong style="color:#4a1a22;">${escapeHtml(data.awbNumber)}</strong></p>`
    : `<p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:13px;color:#5c4548;">Your live courier tracking link is ready. Use it anytime to follow your parcel.</p>`;

  return `
              <div style="margin-top:24px;padding:20px 16px;background:#6b1f2a;text-align:center;">
                <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#d4b56a;">Live tracking</p>
                ${awbLine}
                <a href="${escapeHtml(liveUrl)}" style="display:inline-block;margin-top:4px;padding:12px 22px;background:#d4b56a;color:#4a1a22;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;">
                  Track your order
                </a>
                <p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:1.5;color:#f3ebe0;">
                  ${escapeHtml(liveUrl)}
                </p>
              </div>`;
}

function trackingText(data: ThankYouEmailPayload) {
  const liveUrl = data.trackingUrl || data.trackPageUrl;
  if (!liveUrl) return [] as string[];
  return [
    data.awbNumber ? `AWB / Waybill: ${data.awbNumber}` : "Live tracking:",
    `Track your order: ${liveUrl}`,
  ];
}

export function buildStoreNotifyEmail(data: ThankYouEmailPayload) {
  const subject = `New order ${data.orderId} · ${formatINR(data.total)}`;
  const track =
    data.trackingUrl || data.trackPageUrl
      ? `<p>Tracking: <a href="${escapeHtml(data.trackingUrl || data.trackPageUrl || "")}">${escapeHtml(data.trackingUrl || data.trackPageUrl || "")}</a>${data.awbNumber ? ` · AWB ${escapeHtml(data.awbNumber)}` : ""}</p>`
      : "";
  const html = `<p><strong>New San Marco order</strong></p>
<p>Order <strong>${escapeHtml(data.orderId)}</strong> from ${escapeHtml(data.customerName)} (${escapeHtml(data.customerEmail)} / ${escapeHtml(data.phone)})</p>
<p>Total: ${formatINR(data.total)} · ${escapeHtml(paymentLabel(data.payment))}</p>
<ul>${data.items
    .map(
      (i) =>
        `<li>${escapeHtml(i.name)} — ${escapeHtml(i.variantLabel)} ×${i.quantity} (${formatINR(i.price * i.quantity)})</li>`
    )
    .join("")}</ul>
<p>${escapeHtml(data.address)}, ${escapeHtml(data.city)}${data.state ? `, ${escapeHtml(data.state)}` : ""} ${escapeHtml(data.pincode)}</p>
${track}`;
  const text = [
    `New order ${data.orderId} · ${formatINR(data.total)} from ${data.customerName}`,
    data.awbNumber ? `AWB ${data.awbNumber}` : "",
    data.trackingUrl || data.trackPageUrl || "",
  ]
    .filter(Boolean)
    .join("\n");
  return { subject, html, text };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
