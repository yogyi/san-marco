import type { Market } from "@/data/markets";
import { formatINR } from "@/lib/utils";

export function formatMoney(amount: number, market: Market) {
  if (market.currency === "INR") return formatINR(amount);
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currency,
    maximumFractionDigits: market.fractionDigits,
    minimumFractionDigits: market.fractionDigits,
  }).format(amount);
}
