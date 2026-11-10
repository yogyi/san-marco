import { BRAND } from "@/data/products";
import { formatINR } from "@/lib/utils";

export type WhatsAppSendResult = {
  sent: boolean;
  provider?: "meta" | "log";
  id?: string;
  error?: string;
};

function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `91${digits.slice(1)}`;
  return digits;
}

export function whatsappConfigured() {
  return Boolean(
    process.env.WHATSAPP_TOKEN?.trim() && process.env.WHATSAPP_PHONE_NUMBER_ID?.trim()
  );
}

export function buildThankYouWhatsAppText(opts: {
  customerName: string;
  orderId: string;
  total: number;
  payment: string;
  currencyLabel?: string;
}) {
  const totalLabel = opts.currencyLabel || formatINR(opts.total);
  const pay =
    opts.payment === "cod"
      ? "Cash on Delivery"
      : opts.payment === "razorpay"
        ? "Paid online"
        : opts.payment;

  return [
    `Thank you for your purchase, ${opts.customerName}!`,
    ``,
    `Your San Marco order *${opts.orderId}* is confirmed.`,
    `Total: ${totalLabel}`,
    `Payment: ${pay}`,
    ``,
    `We're preparing your pieces with care. Gift-ready packing · Made in India.`,
    ``,
    `Questions? Reply here or WhatsApp ${BRAND.phone}.`,
    `— San Marco`,
  ].join("\n");
}

export function buildStoreWhatsAppText(opts: {
  customerName: string;
  orderId: string;
  phone: string;
  email: string;
  total: number;
  payment: string;
}) {
  return [
    `New San Marco order ${opts.orderId}`,
    `${opts.customerName} · ${opts.phone} · ${opts.email}`,
    `Total: ${formatINR(opts.total)} · ${opts.payment}`,
    `Please send thank-you confirmation to the customer.`,
  ].join("\n");
}

export function storeWhatsAppDeepLink(text: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

async function sendMetaWhatsApp(to: string, text: string): Promise<WhatsAppSendResult> {
  const token = process.env.WHATSAPP_TOKEN!.trim();
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID!.trim();
  const template = process.env.WHATSAPP_TEMPLATE_NAME?.trim();

  const url = `https://graph.facebook.com/v20.0/${phoneId}/messages`;
  const body = template
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG?.trim() || "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: text.slice(0, 1024) },
              ],
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { preview_url: false, body: text },
      };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      data?.error?.message || `WhatsApp API failed (${res.status})`
    );
  }

  return {
    sent: true,
    provider: "meta",
    id: data?.messages?.[0]?.id,
  };
}

export async function sendThankYouWhatsApp(opts: {
  customerName: string;
  phone: string;
  orderId: string;
  total: number;
  payment: string;
  currencyLabel?: string;
}): Promise<WhatsAppSendResult> {
  const to = normalizePhone(opts.phone);
  const text = buildThankYouWhatsAppText(opts);

  if (!to || to.length < 10) {
    return { sent: false, error: "Invalid customer phone" };
  }

  if (!whatsappConfigured()) {
    console.info("[whatsapp:log]", { to, preview: text.slice(0, 200) });
    return {
      sent: false,
      provider: "log",
      error:
        "WhatsApp not configured. Add WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID.",
    };
  }

  try {
    return await sendMetaWhatsApp(to, text);
  } catch (error) {
    return {
      sent: false,
      provider: "meta",
      error: error instanceof Error ? error.message : "WhatsApp send failed",
    };
  }
}
