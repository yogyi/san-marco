import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";

export function ProductRail({
  title,
  products,
  viewAllHref = "/shop",
}: {
  title: string;
  products: Product[];
  viewAllHref?: string;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-16">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {title}
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href={viewAllHref}
          className="inline-block bg-burgundy px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-burgundy-deep"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
