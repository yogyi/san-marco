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

## What’s included

- Home, shop (filters), product detail with size variants
- Cart drawer + 3-step checkout with live Razorpay payments
- Festive collection, gifting, about, contact, shipping pages
- Product imagery from the brand PDF; specs from the product sheet

## Brand contacts

- Email: sanmarcofurnishings@gmail.com
- WhatsApp: +91 99929 29440
- Marketed by: KARM BABA Ventures Pvt. Ltd., Panipat
