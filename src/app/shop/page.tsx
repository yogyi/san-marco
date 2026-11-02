import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";
import { ShopFilters } from "@/components/shop/shop-filters";

export const metadata = {
  title: "Shop",
  description: "Browse San Marco premium comforters and bedsheet sets.",
};

type SearchParams = Promise<{ category?: string; sort?: string }>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const category = params.category;
  const sort = params.sort ?? "featured";

  let list = [...products];
  if (category === "striped" || category === "floral" || category === "solid") {
    list = list.filter((p) => p.category === category);
  }
  if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "new") {
    list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
  } else {
    list.sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        Number(b.bestseller) - Number(a.bestseller)
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-ink md:text-4xl">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Bedding"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {list.length} designs · Double sets from ₹1,999
        </p>
      </div>

      <ShopFilters activeCategory={category} activeSort={sort} count={list.length} />

      {list.length === 0 ? (
        <p className="py-20 text-center text-muted">No designs in this filter yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
