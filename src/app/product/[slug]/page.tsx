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
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <nav className="mb-8 text-xs uppercase tracking-[0.14em] text-ink/45">
        <Link href="/shop" className="hover:text-burgundy">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-burgundy">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <section className="mt-20">
        <h2 className="font-display text-3xl text-burgundy">You may also love</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
