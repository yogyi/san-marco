import { Resend } from "resend";
import nodemailer from "nodemailer";
import { BRAND } from "@/data/products";
import {
  buildStoreNotifyEmail,
  buildThankYouEmail,
  type ThankYouEmailPayload,
} from "@/lib/email-templates";

export type SendResult = {
  sent: boolean;
  provider?: "resend" | "smtp" | "log";
  id?: string;
  error?: string;
};

function fromAddress() {
  return (
    process.env.EMAIL_FROM?.trim() ||
    `San Marco <${process.env.SMTP_USER || BRAND.email}>`
  );
}

function hasResend() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function hasSmtp() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

export function emailConfigured() {
  return hasResend() || hasSmtp();
}

async function sendViaResend(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM?.trim() || "San Marco <onboarding@resend.dev>";
  const { data, error } = await resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
  });
  if (error) {
    throw new Error(error.message || "Resend send failed");
  }
  return { provider: "resend" as const, id: data?.id };
}

async function sendViaSmtp(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: fromAddress(),
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
  });

  return { provider: "smtp" as const, id: info.messageId };
}

async function deliver(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (hasResend()) {
    const result = await sendViaResend(opts);
    return { sent: true, ...result };
  }
  if (hasSmtp()) {
    const result = await sendViaSmtp(opts);
    return { sent: true, ...result };
  }

  console.info("[email:log]", {
    to: opts.to,
    subject: opts.subject,
    preview: opts.text.slice(0, 240),
  });
  return {
    sent: false,
    provider: "log",
    error:
      "Email not configured. Add RESEND_API_KEY or SMTP_HOST / SMTP_USER / SMTP_PASS.",
  };
}

export async function sendOrderEmails(
  payload: ThankYouEmailPayload
): Promise<{ customer: SendResult; store: SendResult }> {
  const thankYou = buildThankYouEmail(payload);
  const notify = buildStoreNotifyEmail(payload);
  const storeInbox = process.env.ORDER_NOTIFY_EMAIL?.trim() || BRAND.email;

  const customer = await deliver({
    to: payload.customerEmail,
    subject: thankYou.subject,
    html: thankYou.html,
    text: thankYou.text,
    replyTo: storeInbox,
  });

  let store: SendResult = { sent: false, provider: "log" };
  try {
    store = await deliver({
      to: storeInbox,
      subject: notify.subject,
      html: notify.html,
      text: notify.text,
      replyTo: payload.customerEmail,
    });
  } catch (error) {
    store = {
      sent: false,
      error: error instanceof Error ? error.message : "Store notify failed",
    };
  }

  return { customer, store };
}
