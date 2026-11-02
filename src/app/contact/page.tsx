import { BRAND } from "@/data/products";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">Concierge</p>
      <h1 className="mt-3 font-display text-5xl text-burgundy">Contact San Marco</h1>
      <p className="mt-4 text-ink/65">
        For orders, bulk gifting and product guidance — we respond on WhatsApp and email.
      </p>

      <div className="mt-10 space-y-6 border border-gold/20 bg-ivory/40 p-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy/60">WhatsApp</p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            className="mt-1 block font-display text-3xl text-burgundy hover:underline"
          >
            {BRAND.phone}
          </a>
          <p className="text-sm text-ink/50">Alt: {BRAND.phoneAlt}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy/60">Email</p>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-1 block text-lg text-burgundy hover:underline"
          >
            {BRAND.email}
          </a>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy/60">Studio</p>
          <p className="mt-1 text-ink/70">
            {BRAND.marketedBy}
            <br />
            {BRAND.address}
          </p>
        </div>
        <Button asChild size="lg">
          <a href={`https://wa.me/${BRAND.whatsapp}`}>Message on WhatsApp</a>
        </Button>
      </div>
    </div>
  );
}
