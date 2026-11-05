"use client";

import { useEffect } from "react";
import { MARKET_LIST, type MarketId } from "@/data/markets";
import { useCart } from "@/store/cart";
import { useMarket } from "@/store/market";
import { cn } from "@/lib/utils";

export function MarketSwitcher({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const marketId = useMarket((s) => s.marketId);
  const setMarketId = useMarket((s) => s.setMarketId);
  const applyGeoIfUnset = useMarket((s) => s.applyGeoIfUnset);
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )san-marco-geo-country=([^;]*)/);
    const country = match ? decodeURIComponent(match[1]) : null;
    applyGeoIfUnset(country);
  }, [applyGeoIfUnset]);

  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      {!compact ? (
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-burgundy/55 sm:inline">
          Ship to
        </span>
      ) : null}
      <select
        aria-label="Select shipping market"
        value={marketId}
        onChange={(e) => {
          const next = e.target.value as MarketId;
          if (next === marketId) return;
          clear();
          setMarketId(next);
        }}
        className={cn(
          "max-w-[11rem] truncate border border-burgundy/20 bg-cream/90 px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-burgundy outline-none transition hover:border-burgundy/45 focus:border-burgundy",
          compact && "max-w-[9.5rem] py-1"
        )}
      >
        {MARKET_LIST.map((m) => (
          <option key={m.id} value={m.id}>
            {m.shortLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
