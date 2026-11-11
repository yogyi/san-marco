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
  provider?: "resend" | "smtp" | "relay" | "log";
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
  // Google app passwords are often pasted with spaces
  const pass = process.env.SMTP_PASS!.replace(/\s+/g, "").trim();
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
  try {
    if (hasSmtp()) {
      const result = await sendViaSmtp(opts);
      console.info("[email:smtp:sent]", { to: opts.to, id: result.id, subject: opts.subject });
      return { sent: true, ...result };
    }
    if (hasResend()) {
      const result = await sendViaResend(opts);
      console.info("[email:resend:sent]", { to: opts.to, id: result.id, subject: opts.subject });
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
        "Gmail SMTP not configured on the server. Add SMTP_HOST, SMTP_USER, SMTP_PASS in deployment env.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Email send failed";
    console.error("[email:error]", { to: opts.to, subject: opts.subject, message });
    return {
      sent: false,
      provider: hasSmtp() ? "smtp" : hasResend() ? "resend" : "log",
      error: message,
    };
  }
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

  const store = await deliver({
    to: storeInbox,
    subject: notify.subject,
    html: notify.html,
    text: notify.text,
    replyTo: payload.customerEmail,
  });

  return { customer, store };
}
