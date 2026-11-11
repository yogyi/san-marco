# San Marco — Premium Bedding & Comforters

Luxury e-commerce storefront for **San Marco**, featuring the Festive Comfort Collection of Made-in-India comforters and bedsheet sets.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Zustand cart (persisted)
- Framer Motion
- Razorpay Checkout (UPI / cards / netbanking / wallets) + COD

## Run locally

```bash
npm install
cp .env.example .env.local
# fill Razorpay keys in .env.local
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Razorpay setup

Add these to `.env.local` (never commit secrets):

```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_from_dashboard
```

- **Key ID** opens Razorpay Checkout on the client.
- **Key Secret** (Dashboard → Account & Settings → API Keys) creates server Orders and verifies payment signatures.
- Without the secret, checkout still opens in amount mode and can accept payments; add the secret for full verification.

Checkout flow: Shipping → Payment (Razorpay or COD) → Review → Pay / Place order.

## India vs overseas pricing

India keeps festive INR variants (Double Bed Set ₹2,399, etc.) with **free delivery on every order**.

Other regions use the fixed local price table from the overseas pricing brief (AED / SAR / SGD / GBP / EUR / AUD / CAD / USD / KES) with **shipping built into the price** — no strikethrough MRP abroad. Visitors can switch market in the header or footer; geo detection seeds the choice from `x-vercel-ip-country` when available.

Overseas PDP offers **1 Comforter** or **2-Comforter Bundle**, plus Single / Double (+10% packed-weight premium). Checkout is prepaid only (no COD). Razorpay still captures in INR using the brief’s approximate INR amounts.

## Discount coupons

Shoppers can apply a code in the bag or at checkout. Active codes:

| Code | Offer |
|------|--------|
| `SANMARCO10` | 10% off (min ₹999) |
| `WELCOME15` | 15% welcome off |
| `FESTIVE200` | ₹200 off India (min ₹1,999) |
| `COMFORT500` | ₹500 off India (min ₹2,999) |
| `GIFTPACK` | 12% gifting off |

Edit codes in `src/data/coupons.ts`.

## Thank-you purchase messages

After every successful order (Razorpay or COD), San Marco sends a **“Thank you for your purchase”** message:

1. **Email** to the shopper (branded confirmation) + alert to the store inbox  
2. **WhatsApp** to the shopper’s phone (optional Meta Cloud API)

Add to `.env.local`:

```bash
# Email (pick one)
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=San Marco <onboarding@resend.dev>
# or SMTP_HOST / SMTP_USER / SMTP_PASS for Gmail

ORDER_NOTIFY_EMAIL=sanmarcofurnishings@gmail.com

# Optional WhatsApp Cloud API
WHATSAPP_TOKEN=EAAG...
WHATSAPP_PHONE_NUMBER_ID=1234567890
```

Checkout collects email + phone. The order confirmation page always shows the thank-you message; email/WhatsApp send when credentials are configured.

## What’s included

- Home, shop (filters), product detail with size variants
- Cart drawer + 3-step checkout with live Razorpay payments
- Thank-you purchase email + store order alert on every order
- Our Craft page with factory quilting & packaging photos
- Festive collection, gifting, about, contact, shipping pages
- Product imagery from the brand PDF; specs from the product sheet

## Brand contacts

- Email: sanmarcofurnishings@gmail.com
- WhatsApp: +91 99929 29440
- Marketed by: KARM BABA Ventures Pvt. Ltd., Panipat
