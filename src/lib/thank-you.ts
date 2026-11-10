import { emailConfigured, sendOrderEmails } from "@/lib/email";
import type { ThankYouEmailPayload } from "@/lib/email-templates";
import {
  buildStoreWhatsAppText,
  sendThankYouWhatsApp,
  storeWhatsAppDeepLink,
  whatsappConfigured,
} from "@/lib/whatsapp";

function isRealEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !value.startsWith("no-email+");
}

export async function sendPurchaseThankYou(payload: ThankYouEmailPayload) {
  const shouldEmail = isRealEmail(payload.customerEmail);

  const [email, whatsapp] = await Promise.all([
    shouldEmail
      ? sendOrderEmails(payload)
      : Promise.resolve({
          customer: {
            sent: false as const,
            provider: "log" as const,
            error: "No customer email provided",
          },
          store: { sent: false as const, provider: "log" as const },
        }),
    sendThankYouWhatsApp({
      customerName: payload.customerName,
      phone: payload.phone,
      orderId: payload.orderId,
      total: payload.total,
      payment: payload.payment,
    }),
  ]);

  const storeText = buildStoreWhatsAppText({
    customerName: payload.customerName,
    orderId: payload.orderId,
    phone: payload.phone,
    email: payload.customerEmail,
    total: payload.total,
    payment: payload.payment,
  });

  return {
    ok: email.customer.sent || whatsapp.sent,
    emailConfigured: emailConfigured(),
    whatsappConfigured: whatsappConfigured(),
    emailSent: email.customer.sent,
    emailProvider: email.customer.provider,
    emailError: email.customer.error,
    storeEmailSent: email.store.sent,
    whatsappSent: whatsapp.sent,
    whatsappProvider: whatsapp.provider,
    whatsappError: whatsapp.error,
    storeWhatsAppLink: storeWhatsAppDeepLink(storeText),
    message: `Thank you for your purchase, ${payload.customerName}! Your San Marco order ${payload.orderId} is confirmed.`,
  };
}
