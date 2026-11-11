"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applyCoupon, listPublicCoupons } from "@/data/coupons";
import { useCart } from "@/store/cart";
import { useActiveMarket } from "@/store/market";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

export function CouponField({
  subtotal,
  discount,
  className,
  showHints = true,
}: {
  subtotal: number;
  discount: number;
  className?: string;
  showHints?: boolean;
}) {
  const market = useActiveMarket();
  const couponCode = useCart((s) => s.couponCode);
  const setCouponCode = useCart((s) => s.setCouponCode);
  const clearCoupon = useCart((s) => s.clearCoupon);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const hints = listPublicCoupons(market.id).slice(0, 3);

  function apply() {
    setError("");
    setSuccess("");
    const result = applyCoupon(draft || couponCode || "", subtotal, market.id);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setCouponCode(result.coupon.code);
    setDraft("");
    setSuccess(result.message);
  }

  function remove() {
    clearCoupon();
    setError("");
    setSuccess("");
    setDraft("");
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy">
        <Tag className="h-3.5 w-3.5 text-gold-deep" />
        Discount coupon
      </p>

      {couponCode && discount > 0 ? (
        <div className="flex items-center justify-between gap-2 border border-gold/40 bg-gold/10 px-3 py-2.5">
          <div>
            <p className="text-sm font-bold text-burgundy">{couponCode}</p>
            <p className="text-xs font-medium text-ink/65">
              Saving {formatMoney(discount, market)}
            </p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-burgundy/70 hover:text-burgundy"
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value.toUpperCase());
              setError("");
              setSuccess("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                apply();
              }
            }}
            placeholder="Enter code"
            className="uppercase tracking-[0.08em]"
            aria-label="Coupon code"
          />
          <Button type="button" variant="outline" onClick={apply}>
            Apply
          </Button>
        </div>
      )}

      {error ? (
        <p className="text-xs font-semibold text-burgundy">{error}</p>
      ) : null}
      {success ? (
        <p className="text-xs font-semibold text-gold-deep">{success}</p>
      ) : null}

      {showHints && !couponCode ? (
        <p className="text-[11px] font-medium text-ink/50">
          Try {hints.map((h) => h.code).join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
