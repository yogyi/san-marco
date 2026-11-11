import type { MarketId } from "@/data/markets";

export type CouponType = "percent" | "fixed";

export type Coupon = {
  code: string;
  type: CouponType;
  /** Percent 1–100, or fixed amount in major currency units */
  value: number;
  label: string;
  description: string;
  /** Minimum subtotal before discount */
  minSubtotal?: number;
  /** Cap for percent discounts */
  maxDiscount?: number;
  /** Which markets can use this code; omit = all */
  markets?: MarketId[];
  active?: boolean;
};

/** Public festive coupons — codes are case-insensitive at apply time */
export const COUPONS: Coupon[] = [
  {
    code: "SANMARCO10",
    type: "percent",
    value: 10,
    label: "10% off",
    description: "10% off your bag — everyday luxury, a little lighter.",
    minSubtotal: 999,
    maxDiscount: 1500,
  },
  {
    code: "WELCOME15",
    type: "percent",
    value: 15,
    label: "15% welcome",
    description: "Welcome offer — 15% off your first San Marco order.",
    minSubtotal: 1299,
    maxDiscount: 2000,
  },
  {
    code: "FESTIVE200",
    type: "fixed",
    value: 200,
    label: "₹200 off",
    description: "Festive flat ₹200 off on India orders.",
    minSubtotal: 1999,
    markets: ["in"],
  },
  {
    code: "COMFORT500",
    type: "fixed",
    value: 500,
    label: "₹500 off",
    description: "₹500 off when your bag is ₹2,999 or more (India).",
    minSubtotal: 2999,
    markets: ["in"],
  },
  {
    code: "GIFTPACK",
    type: "percent",
    value: 12,
    label: "12% gifting",
    description: "12% off for gift-ready bags and corporate warmth.",
    minSubtotal: 1499,
    maxDiscount: 2500,
  },
];

export type CouponResult =
  | {
      ok: true;
      coupon: Coupon;
      discount: number;
      message: string;
    }
  | {
      ok: false;
      error: string;
    };

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return COUPONS.find((c) => c.code === normalized && c.active !== false);
}

export function applyCoupon(
  code: string,
  subtotal: number,
  marketId: MarketId = "in"
): CouponResult {
  const coupon = findCoupon(code);
  if (!coupon) {
    return { ok: false, error: "This coupon code is not valid." };
  }

  if (coupon.markets && !coupon.markets.includes(marketId)) {
    return {
      ok: false,
      error: "This coupon is not available for your selected market.",
    };
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      ok: false,
      error: `Add items worth at least ${coupon.minSubtotal} to use ${coupon.code}.`,
    };
  }

  let discount = 0;
  if (coupon.type === "percent") {
    discount = (subtotal * coupon.value) / 100;
    if (coupon.maxDiscount != null) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
  } else {
    discount = coupon.value;
  }

  discount = Math.min(Math.max(0, Math.round(discount)), subtotal);
  if (discount <= 0) {
    return { ok: false, error: "Coupon does not change this order total." };
  }

  return {
    ok: true,
    coupon,
    discount,
    message: `${coupon.label} applied — you save on this order.`,
  };
}

export function listPublicCoupons(marketId: MarketId = "in") {
  return COUPONS.filter(
    (c) => c.active !== false && (!c.markets || c.markets.includes(marketId))
  );
}
