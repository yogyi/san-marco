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
  const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_PASS!.trim();
  const isGmail = host.includes("gmail.com") || user.endsWith("@gmail.com");

  const transporter = nodemailer.createTransport(
    isGmail
      ? {
          service: "gmail",
          auth: { user, pass },
        }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        }
  );

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
  // Prefer Gmail SMTP when configured (San Marco brand inbox)
  if (hasSmtp()) {
    const result = await sendViaSmtp(opts);
    return { sent: true, ...result };
  }
  if (hasResend()) {
    const result = await sendViaResend(opts);
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
      "Gmail SMTP not configured. Set SMTP_PASS in .env.local to the Google App Password for sanmarcofurnishings@gmail.com.",
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
