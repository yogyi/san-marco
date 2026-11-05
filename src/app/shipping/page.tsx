import Link from "next/link";
import { BRAND } from "@/data/products";

export const metadata = {
  title: "Shipping & Returns",
  description:
    "India free delivery and overseas San Marco shipping terms — DHL/FedEx zones, DDP/DDU, and returns.",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-5xl text-burgundy">Shipping & Returns</h1>
      <p className="mt-3 text-sm font-medium text-ink/60">
        Effective 4 November 2026 · Use the header market switcher to see local retail prices.
      </p>

      <div className="mt-10 space-y-10 text-[15px] font-medium leading-relaxed text-ink/75">
        <section>
          <h2 className="font-display text-3xl text-burgundy">India — free delivery</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Complimentary delivery on every order to all pin codes.</li>
            <li>Dispatch within 24–48 hours from Panipat.</li>
            <li>Metro transit typically 2–4 working days; Tier 2/3 and remote 4–7 days.</li>
            <li>Reusable San Marco gift carry bag inside courier packing.</li>
            <li>Tracking shared on WhatsApp and email at dispatch.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl text-burgundy">Overseas — included in price</h2>
          <p className="mt-4">
            International retail prices on the site already include courier freight. Product pages
            show either <strong>Free shipping · Duties included (DDP)</strong> or{" "}
            <strong>Free shipping · Import duties payable on delivery</strong> depending on your
            market.
          </p>
          <p className="mt-3">
            Parcels ship via DHL Express / FedEx International Priority from India. Vacuum-packed
            comforter, gift bag folded flat, outer carton, commercial invoice with HS code 9404.
          </p>
          <p className="mt-3">
            Indicative transit after dispatch: Gulf & SE Asia 3–5 days · UK & Europe 4–6 days ·
            Australia / North America 4–7 days · Africa 5–8 days (customs holds excluded).
          </p>
          <p className="mt-3">
            Overseas orders are prepaid in full. Cash on Delivery is not available outside India.
            Countries not listed in our market switcher are quoted on WhatsApp before dispatch.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-burgundy">Returns</h2>
          <p className="mt-4">
            If your piece arrives damaged or incorrect, contact us within 48 hours with photos —
            we will arrange a replacement or return guidance through our concierge desk.
          </p>
          <p className="mt-3">
            International returns are not accepted except for transit damage reported with photos
            within 48 hours of delivery.
          </p>
        </section>

        <p>
          Questions?{" "}
          <a className="text-burgundy underline" href={`https://wa.me/${BRAND.whatsapp}`}>
            WhatsApp {BRAND.phone}
          </a>{" "}
          or{" "}
          <Link href="/contact" className="text-burgundy underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
