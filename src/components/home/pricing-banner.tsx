import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

const tiers = [
  { label: "Double Bed Set", price: 1999, mrp: 4999, note: "Comforter + sheet + pillows" },
  { label: "Double Comforter", price: 1499, mrp: 3999, note: "Comforter only" },
  { label: "Single Comforter", price: 1299, mrp: 2999, note: "150 × 230 cm" },
];

export function PricingBanner() {
  return (
    <section className="relative overflow-hidden bg-sand/70">
      <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <SectionHeading
          title="Festive Season Offer"
          subtitle="Transparent pricing on every design"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.label}
              className="border border-gold/25 bg-ivory px-5 py-6 text-center shadow-soft"
            >
              <p className="font-display text-2xl text-ink">{t.label}</p>
              <p className="mt-1 text-xs text-muted">{t.note}</p>
              <p className="mt-4 text-xs text-muted line-through">{formatINR(t.mrp)}</p>
              <p className="font-display text-4xl text-gold-deep">{formatINR(t.price)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="gold" size="lg">
            <Link href="/collections/festive">View Festive Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
