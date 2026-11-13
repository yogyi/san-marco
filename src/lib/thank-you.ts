import { emailConfigured, sendOrderEmails } from "@/lib/email";
import type { ThankYouEmailPayload } from "@/lib/email-templates";
import {
  buildStoreWhatsAppText,
  sendThankYouWhatsApp,
  storeWhatsAppDeepLink,
  whatsappConfigured,
} from "@/lib/whatsapp";

/** Hosted mail sender with Gmail SMTP (used when this deploy has no SMTP env). */
const DEFAULT_EMAIL_RELAY =
  "https://san-marco-beta.vercel.app/api/orders/confirm";

function isRealEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !value.startsWith("no-email+");
}

function emailRelayUrl() {
  return process.env.EMAIL_RELAY_URL?.trim() || DEFAULT_EMAIL_RELAY;
}

function isSelfHost() {
  const host = process.env.VERCEL_URL?.replace(/^https?:\/\//, "") || "";
  const relay = emailRelayUrl();
  if (!host) return false;
  return relay.includes(host);
}

async function sendViaRelay(payload: ThankYouEmailPayload) {
  if (isSelfHost()) {
    return {
      emailConfigured: false,
      emailSent: false,
      emailProvider: "log" as const,
      emailError:
        "Gmail SMTP not configured on the mail host. Set SMTP_HOST, SMTP_USER, SMTP_PASS.",
      storeEmailSent: false,
    };
  }

  const res = await fetch(emailRelayUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-san-marco-relay": "1",
    },
    body: JSON.stringify({
      orderId: payload.orderId,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      phone: payload.phone,
      address: payload.address,
      city: payload.city,
      state: payload.state,
      pincode: payload.pincode,
      payment: payload.payment,
      notes: payload.notes,
      razorpayPaymentId: payload.razorpayPaymentId,
      awbNumber: payload.awbNumber,
      trackingUrl: payload.trackingUrl,
      trackPageUrl: payload.trackPageUrl,
      items: payload.items,
      totals: {
        subtotal: payload.subtotal,
        shipping: payload.shipping,
        total: payload.total,
      },
    }),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as {
    emailSent?: boolean;
    storeEmailSent?: boolean;
    emailConfigured?: boolean;
    emailError?: string;
    error?: string;
    provider?: "smtp" | "resend" | "relay" | "log";
  };

  if (!res.ok) {
    return {
      emailConfigured: Boolean(data?.emailConfigured),
      emailSent: false,
      emailProvider: "relay" as const,
      emailError: String(data?.error || data?.emailError || `Relay HTTP ${res.status}`),
      storeEmailSent: false,
    };
  }

  return {
    emailConfigured: true,
    emailSent: Boolean(data?.emailSent),
    emailProvider: (data?.provider || "relay") as "smtp" | "resend" | "relay" | "log",
    emailError: data?.emailSent
      ? undefined
      : String(data?.emailError || data?.error || "Relay did not send email"),
    storeEmailSent: Boolean(data?.storeEmailSent),
  };
}

export async function sendPurchaseThankYou(
  payload: ThankYouEmailPayload,
  opts?: { fromRelay?: boolean }
) {
  const shouldEmail = isRealEmail(payload.customerEmail);

  const whatsappPromise = sendThankYouWhatsApp({
    customerName: payload.customerName,
    phone: payload.phone,
    orderId: payload.orderId,
    total: payload.total,
    payment: payload.payment,
  });

  let emailResult: {
    emailConfigured: boolean;
    emailSent: boolean;
    emailProvider?: "resend" | "smtp" | "relay" | "log";
    emailError?: string;
    storeEmailSent: boolean;
  };

  if (!shouldEmail) {
    emailResult = {
      emailConfigured: emailConfigured(),
      emailSent: false,
      emailProvider: "log",
      emailError: "No customer email provided",
      storeEmailSent: false,
    };
  } else if (emailConfigured()) {
    const email = await sendOrderEmails(payload);
    emailResult = {
      emailConfigured: true,
      emailSent: email.customer.sent,
      emailProvider: email.customer.provider,
      emailError: email.customer.error,
      storeEmailSent: email.store.sent,
    };
  } else if (!opts?.fromRelay) {
    emailResult = await sendViaRelay(payload);
  } else {
    emailResult = {
      emailConfigured: false,
      emailSent: false,
      emailProvider: "log",
      emailError:
        "Gmail SMTP not configured on the server. Add SMTP_HOST, SMTP_USER, SMTP_PASS in deployment env.",
      storeEmailSent: false,
    };
  }

  const whatsapp = await whatsappPromise;

  const storeText = buildStoreWhatsAppText({
    customerName: payload.customerName,
    orderId: payload.orderId,
    phone: payload.phone,
    email: payload.customerEmail,
    total: payload.total,
    payment: payload.payment,
  });

  return {
    ok: emailResult.emailSent || whatsapp.sent,
    emailConfigured: emailResult.emailConfigured,
    whatsappConfigured: whatsappConfigured(),
    emailSent: emailResult.emailSent,
    emailProvider: emailResult.emailProvider,
    emailError: emailResult.emailError,
    storeEmailSent: emailResult.storeEmailSent,
    whatsappSent: whatsapp.sent,
    whatsappProvider: whatsapp.provider,
    whatsappError: whatsapp.error,
    storeWhatsAppLink: storeWhatsAppDeepLink(storeText),
    message: `Thank you for your purchase, ${payload.customerName}! Your San Marco order ${payload.orderId} is confirmed.`,
  };
}
