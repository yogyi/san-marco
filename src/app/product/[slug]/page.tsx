import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, products, relatedProducts } from "@/data/products";
import { ProductDetail } from "@/components/shop/product-detail";
import { ProductCard } from "@/components/shop/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-14">
      <nav className="mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/55">
        <Link href="/shop" className="hover:text-burgundy">
          Shop
        </Link>
        <span className="mx-2 text-ink/30">/</span>
        <Link
          href={`/shop?collection=${product.collection.toLowerCase()}`}
          className="hover:text-burgundy"
        >
          {product.collection}
        </Link>
        <span className="mx-2 text-ink/30">/</span>
        <span className="text-burgundy">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <section className="mt-20 border-t border-gold/20 pt-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-deep">
          Keep exploring
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-burgundy md:text-4xl">
          You may also love
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
