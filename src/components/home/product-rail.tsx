import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";
import { SectionHeading } from "@/components/home/section-heading";

export function ProductRail({
  title,
  eyebrow,
  subtitle,
  products,
  viewAllHref = "/shop",
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
      <SectionHeading title={title} eyebrow={eyebrow} subtitle={subtitle} />
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href={viewAllHref}
          className="inline-block border border-burgundy/80 bg-transparent px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy transition hover:bg-burgundy hover:text-cream"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
