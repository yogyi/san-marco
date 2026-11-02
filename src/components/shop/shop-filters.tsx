"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  { id: undefined, label: "All" },
  { id: "striped", label: "Striped" },
  { id: "floral", label: "Floral" },
  { id: "solid", label: "Solid" },
] as const;

export function ShopFilters({
  activeCategory,
  activeSort,
  count,
}: {
  activeCategory?: string;
  activeSort: string;
  count: number;
}) {
  const buildHref = (category?: string, sort?: string) => {
    const q = new URLSearchParams();
    if (category) q.set("category", category);
    if (sort && sort !== "featured") q.set("sort", sort);
    const s = q.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  return (
    <div className="flex flex-col gap-4 border-y border-black/5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.label}
            href={buildHref(c.id, activeSort)}
            className={cn(
              "px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition",
              activeCategory === c.id || (!activeCategory && !c.id)
                ? "bg-burgundy text-white"
                : "border border-black/10 text-ink/70 hover:border-burgundy hover:text-burgundy"
            )}
          >
            {c.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted">
        <span>{count} designs</span>
        <select
          className="border border-black/10 bg-white px-3 py-2 text-xs uppercase tracking-wider text-ink outline-none"
          value={activeSort}
          onChange={(e) => {
            window.location.href = buildHref(activeCategory, e.target.value);
          }}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="new">New arrivals</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </div>
  );
}
