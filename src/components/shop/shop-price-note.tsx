"use client";

import { useActiveMarket } from "@/store/market";
import { overseasUnitPrice } from "@/data/markets";
import { formatMoney } from "@/lib/money";
import { VARIANTS } from "@/data/products";

export function ShopPriceNote({ count }: { count: number }) {
  const market = useActiveMarket();
  if (market.id === "in") {
    return (
      <p className="mt-2 text-sm text-muted">
        {count} designs · Double sets from {formatMoney(VARIANTS[0].price, market)}
      </p>
    );
  }
  const from = overseasUnitPrice(market, "one", "single");
  return (
    <p className="mt-2 text-sm text-muted">
      {count} designs · From {formatMoney(from, market)} · {market.shippingLine}
    </p>
  );
}
