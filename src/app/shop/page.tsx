import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ShopPriceNote } from "@/components/shop/shop-price-note";
import {
  collectionDisplayName,
  normalizeCollectionParam,
} from "@/lib/collections";

export const metadata = {
  title: "Shop",
  description: "Browse San Marco Venice, Alberta and Tiffany collections.",
};

type SearchParams = Promise<{ collection?: string; category?: string; sort?: string }>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  // Support legacy category links by mapping to collections
  const legacy =
    params.category === "striped"
      ? "venice"
      : params.category === "floral"
        ? "alberta"
        : params.category === "solid"
          ? "tiffany"
          : undefined;
  const collection = normalizeCollectionParam(params.collection ?? legacy);
  const sort = params.sort ?? "featured";

  let list = [...products];
  if (collection) {
    const name = collectionDisplayName(collection);
    list = list.filter((p) => p.collection === name);
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

  const heading = collectionDisplayName(collection) ?? "All Bedding";

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 md:py-14">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-ink md:text-4xl">{heading}</h1>
        <ShopPriceNote count={list.length} />
      </div>

      <ShopFilters
        activeCollection={collection}
        activeSort={sort}
        count={list.length}
      />

      {list.length === 0 ? (
        <p className="py-20 text-center text-muted">No designs in this collection yet.</p>
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
