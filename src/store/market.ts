"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  GEO_COOKIE,
  MARKET_COOKIE,
  MARKETS,
  getMarket,
  marketFromCountry,
  type Market,
  type MarketId,
} from "@/data/markets";

type MarketState = {
  marketId: MarketId;
  hydrated: boolean;
  setMarketId: (id: MarketId) => void;
  applyGeoIfUnset: (countryCode: string | null) => void;
  market: () => Market;
};

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export const useMarket = create<MarketState>()(
  persist(
    (set, get) => ({
      marketId: "in",
      hydrated: false,
      setMarketId: (id) => {
        if (!(id in MARKETS)) return;
        writeCookie(MARKET_COOKIE, id);
        set({ marketId: id });
      },
      applyGeoIfUnset: (countryCode) => {
        const manual = readCookie(MARKET_COOKIE);
        if (manual && manual in MARKETS) {
          set({ marketId: manual as MarketId, hydrated: true });
          return;
        }
        const detected = marketFromCountry(countryCode || readCookie(GEO_COOKIE));
        writeCookie(MARKET_COOKIE, detected.id);
        set({ marketId: detected.id, hydrated: true });
      },
      market: () => getMarket(get().marketId),
    }),
    {
      name: "san-marco-market",
      partialize: (s) => ({ marketId: s.marketId }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.hydrated = true;
        writeCookie(MARKET_COOKIE, state.marketId);
      },
    }
  )
);

export function useActiveMarket(): Market {
  const marketId = useMarket((s) => s.marketId);
  return getMarket(marketId);
}
