import type { MarketId } from "@/data/markets";

export type CouponType = "percent";

export type Coupon = {
  code: string;
  type: CouponType;
  /** Percent only — must be between 5 and 25 */
  value: number;
  label: string;
  description: string;
  /** Minimum subtotal before discount */
  minSubtotal?: number;
  /** Cap for percent discounts (absolute amount) */
  maxDiscount?: number;
  /** Which markets can use this code; omit = all */
  markets?: MarketId[];
  active?: boolean;
};

export const MIN_COUPON_PERCENT = 5;
export const MAX_COUPON_PERCENT = 25;

/** Public coupons — percent only, 5%–25% */
export const COUPONS: Coupon[] = [
  {
    code: "SANMARCO5",
    type: "percent",
    value: 5,
    label: "5% off",
    description: "5% off your bag — a gentle festive touch.",
    minSubtotal: 999,
  },
  {
    code: "SANMARCO10",
    type: "percent",
    value: 10,
    label: "10% off",
    description: "10% off your bag — everyday luxury, a little lighter.",
    minSubtotal: 999,
  },
  {
    code: "WELCOME15",
    type: "percent",
    value: 15,
    label: "15% welcome",
    description: "Welcome offer — 15% off your San Marco order.",
    minSubtotal: 1299,
  },
  {
    code: "FESTIVE20",
    type: "percent",
    value: 20,
    label: "20% festive",
    description: "Festive 20% off — soft loft for the season.",
    minSubtotal: 1499,
  },
  {
    code: "GIFTPACK25",
    type: "percent",
    value: 25,
    label: "25% gifting",
    description: "Maximum 25% off for gift-ready bags.",
    minSubtotal: 1999,
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

function clampPercent(value: number) {
  return Math.min(MAX_COUPON_PERCENT, Math.max(MIN_COUPON_PERCENT, value));
}

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

  if (coupon.type !== "percent") {
    return { ok: false, error: "Only percent coupons (5%–25%) are allowed." };
  }

  const percent = clampPercent(coupon.value);
  if (coupon.value < MIN_COUPON_PERCENT || coupon.value > MAX_COUPON_PERCENT) {
    return {
      ok: false,
      error: `Coupons must be between ${MIN_COUPON_PERCENT}% and ${MAX_COUPON_PERCENT}%.`,
    };
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

  let discount = (subtotal * percent) / 100;
  if (coupon.maxDiscount != null) {
    discount = Math.min(discount, coupon.maxDiscount);
  }

  discount = Math.min(Math.max(0, Math.round(discount)), subtotal);
  if (discount <= 0) {
    return { ok: false, error: "Coupon does not change this order total." };
  }

  return {
    ok: true,
    coupon: { ...coupon, value: percent },
    discount,
    message: `${percent}% off applied — you save on this order.`,
  };
}

export function listPublicCoupons(marketId: MarketId = "in") {
  return COUPONS.filter(
    (c) =>
      c.active !== false &&
      c.type === "percent" &&
      c.value >= MIN_COUPON_PERCENT &&
      c.value <= MAX_COUPON_PERCENT &&
      (!c.markets || c.markets.includes(marketId))
  );
}
