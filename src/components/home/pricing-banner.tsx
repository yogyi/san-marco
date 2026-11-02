import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

const tiers = [
  { label: "Double Bed Set", price: 1999, mrp: 4999, note: "Comforter + sheet + pillows" },
  { label: "Double Comforter", price: 1499, mrp: 3999, note: "Comforter only" },
  { label: "Single Comforter", price: 1299, mrp: 2999, note: "150 × 230 cm" },
];

export function PricingBanner() {
  return (
    <section className="relative overflow-hidden bg-burgundy text-cream">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">Festive Season Offer</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Festive pricing on every design
            </h2>
            <p className="mt-4 max-w-md text-cream/75">
              One transparent price list across all 13 designs — suited to home refresh, bridal
              gifting, staff welfare and hospitality.
            </p>
            <Button asChild variant="gold" className="mt-8" size="lg">
              <Link href="/collections/festive">View Festive Collection</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {tiers.map((t) => (
              <div
                key={t.label}
                className="flex items-end justify-between border border-gold/25 bg-burgundy-deep/40 px-5 py-4"
              >
                <div>
                  <p className="font-display text-2xl">{t.label}</p>
                  <p className="text-xs text-cream/55">{t.note}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-cream/40 line-through">{formatINR(t.mrp)}</p>
                  <p className="font-display text-3xl text-gold">{formatINR(t.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
