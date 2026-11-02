import { Hero } from "@/components/home/hero";
import { FeaturedStrip } from "@/components/home/featured-strip";
import { CollectionBands } from "@/components/home/collection-bands";
import { PricingBanner } from "@/components/home/pricing-banner";
import { Testimonials } from "@/components/home/testimonials";
import { GiftingCta } from "@/components/home/gifting-cta";
import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/data/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedStrip />
      <CollectionBands />

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">Most Loved</p>
            <h2 className="mt-2 font-display text-4xl text-burgundy md:text-5xl">
              Signature designs
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/shop">View all 13 designs</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <PricingBanner />
      <Testimonials />
      <GiftingCta />
    </>
  );
}
