import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export const metadata = {
  title: "Festive Comfort Collection",
  description: "Festive pricing on all 13 San Marco designs.",
};

export default function FestiveCollectionPage() {
  return (
    <div>
      <section className="bg-burgundy px-4 py-16 text-cream md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Festive Season</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Festive Comfort Collection
          </h1>
          <p className="mt-4 max-w-xl text-cream/75">
            Premium Made-in-India comforters — festive prices starting at {formatINR(1299)}. Soft,
            lightweight, gift-ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-cream/50">Double Set</p>
              <p className="font-display text-3xl text-gold">{formatINR(1999)}</p>
            </div>
            <div>
              <p className="text-cream/50">Double Comforter</p>
              <p className="font-display text-3xl text-gold">{formatINR(1499)}</p>
            </div>
            <div>
              <p className="text-cream/50">Single</p>
              <p className="font-display text-3xl text-gold">{formatINR(1299)}</p>
            </div>
          </div>
          <Button asChild variant="gold" className="mt-10" size="lg">
            <Link href="/shop">Shop all designs</Link>
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
