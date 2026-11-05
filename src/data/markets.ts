/** Fixed overseas retail prices (shipping included) — not live FX conversion. */

export type DutyMode = "ddp" | "ddu" | "domestic";

export type MarketId =
  | "in"
  | "ae"
  | "sa"
  | "gulf"
  | "sg"
  | "uk"
  | "eu"
  | "au"
  | "ca"
  | "us"
  | "ke"
  | "row";

export type Market = {
  id: MarketId;
  label: string;
  /** Short label for switcher */
  shortLabel: string;
  currency: string;
  locale: string;
  /** ISO countries that map to this market */
  countries: string[];
  /** 1 comforter retail (major units) */
  singlePrice: number;
  /** 2-comforter bundle retail (major units) */
  bundlePrice: number;
  /** Approx INR for Razorpay capture — 1 comforter */
  approxInrSingle: number;
  /** Approx INR for Razorpay capture — 2-comforter bundle */
  approxInrBundle: number;
  dutyMode: DutyMode;
  shippingLine: string;
  /** Fraction digits for display (KES/INR 0, others often 2) */
  fractionDigits: number;
};

export const MARKETS: Record<MarketId, Market> = {
  in: {
    id: "in",
    label: "India",
    shortLabel: "IN · ₹",
    currency: "INR",
    locale: "en-IN",
    countries: ["IN"],
    singlePrice: 0,
    bundlePrice: 0,
    approxInrSingle: 0,
    approxInrBundle: 0,
    dutyMode: "domestic",
    shippingLine: "Free delivery on every order across India",
    fractionDigits: 0,
  },
  ae: {
    id: "ae",
    label: "United Arab Emirates",
    shortLabel: "UAE · AED",
    currency: "AED",
    locale: "en-AE",
    countries: ["AE"],
    singlePrice: 199,
    bundlePrice: 349,
    approxInrSingle: 5160,
    approxInrBundle: 9040,
    dutyMode: "ddp",
    shippingLine: "Free shipping · Duties included (DDP)",
    fractionDigits: 0,
  },
  sa: {
    id: "sa",
    label: "Saudi Arabia",
    shortLabel: "KSA · SAR",
    currency: "SAR",
    locale: "en-SA",
    countries: ["SA"],
    singlePrice: 199,
    bundlePrice: 349,
    approxInrSingle: 5050,
    approxInrBundle: 8850,
    dutyMode: "ddp",
    shippingLine: "Free shipping · Duties included (DDP)",
    fractionDigits: 0,
  },
  gulf: {
    id: "gulf",
    label: "Qatar, Oman, Kuwait & Bahrain",
    shortLabel: "Gulf · AED",
    currency: "AED",
    locale: "en-AE",
    countries: ["QA", "OM", "KW", "BH"],
    singlePrice: 199,
    bundlePrice: 349,
    approxInrSingle: 5160,
    approxInrBundle: 9040,
    dutyMode: "ddp",
    shippingLine: "Free shipping · Duties included (DDP)",
    fractionDigits: 0,
  },
  sg: {
    id: "sg",
    label: "Singapore",
    shortLabel: "SG · SGD",
    currency: "SGD",
    locale: "en-SG",
    countries: ["SG"],
    singlePrice: 79,
    bundlePrice: 129,
    approxInrSingle: 5850,
    approxInrBundle: 9550,
    dutyMode: "ddp",
    shippingLine: "Free shipping · GST included",
    fractionDigits: 0,
  },
  uk: {
    id: "uk",
    label: "United Kingdom",
    shortLabel: "UK · £",
    currency: "GBP",
    locale: "en-GB",
    countries: ["GB"],
    singlePrice: 59.99,
    bundlePrice: 99.99,
    approxInrSingle: 7290,
    approxInrBundle: 12150,
    dutyMode: "ddp",
    shippingLine: "Free shipping · VAT & duty included (DDP)",
    fractionDigits: 2,
  },
  eu: {
    id: "eu",
    label: "European Union",
    shortLabel: "EU · €",
    currency: "EUR",
    locale: "en-IE",
    countries: [
      "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
      "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
    ],
    singlePrice: 69.99,
    bundlePrice: 119.99,
    approxInrSingle: 7410,
    approxInrBundle: 12700,
    dutyMode: "ddp",
    shippingLine: "Free shipping · VAT & duty included (DDP)",
    fractionDigits: 2,
  },
  au: {
    id: "au",
    label: "Australia",
    shortLabel: "AU · AUD",
    currency: "AUD",
    locale: "en-AU",
    countries: ["AU"],
    singlePrice: 109,
    bundlePrice: 179,
    approxInrSingle: 7285,
    approxInrBundle: 11960,
    dutyMode: "ddp",
    shippingLine: "Free shipping · GST included",
    fractionDigits: 0,
  },
  ca: {
    id: "ca",
    label: "Canada",
    shortLabel: "CA · CAD",
    currency: "CAD",
    locale: "en-CA",
    countries: ["CA"],
    singlePrice: 119.99,
    bundlePrice: 199,
    approxInrSingle: 8150,
    approxInrBundle: 13520,
    dutyMode: "ddp",
    shippingLine: "Free shipping · Duty & GST included (DDP)",
    fractionDigits: 2,
  },
  us: {
    id: "us",
    label: "United States",
    shortLabel: "US · $",
    currency: "USD",
    locale: "en-US",
    countries: ["US"],
    singlePrice: 89.99,
    bundlePrice: 159.99,
    approxInrSingle: 8570,
    approxInrBundle: 15240,
    dutyMode: "ddp",
    shippingLine: "Free shipping · Duty included (DDP)",
    fractionDigits: 2,
  },
  ke: {
    id: "ke",
    label: "Kenya & East Africa",
    shortLabel: "KE · KES",
    currency: "KES",
    locale: "en-KE",
    countries: ["KE", "TZ", "UG", "RW", "ET"],
    singlePrice: 9999,
    bundlePrice: 16499,
    approxInrSingle: 7380,
    approxInrBundle: 12180,
    dutyMode: "ddu",
    shippingLine: "Free shipping · Import duties payable on delivery",
    fractionDigits: 0,
  },
  row: {
    id: "row",
    label: "Rest of world",
    shortLabel: "World · $",
    currency: "USD",
    locale: "en-US",
    countries: [],
    singlePrice: 89.99,
    bundlePrice: 159.99,
    approxInrSingle: 8570,
    approxInrBundle: 15240,
    dutyMode: "ddu",
    shippingLine: "Free shipping · Import duties payable on delivery (DDU)",
    fractionDigits: 2,
  },
};

export const MARKET_LIST = Object.values(MARKETS);

export const MARKET_COOKIE = "san-marco-market";
export const GEO_COOKIE = "san-marco-geo-country";

/** Double-bed packed weight premium (~10%) from overseas pricing brief */
export const DOUBLE_PREMIUM = 1.1;

export type OverseasPackId = "one" | "bundle";
export type OverseasSizeId = "single" | "double";

export function getMarket(id: string | null | undefined): Market {
  if (id && id in MARKETS) return MARKETS[id as MarketId];
  return MARKETS.in;
}

export function marketFromCountry(countryCode: string | null | undefined): Market {
  const code = (countryCode || "").toUpperCase();
  if (!code) return MARKETS.in;
  if (code === "IN") return MARKETS.in;
  for (const market of MARKET_LIST) {
    if (market.id === "in" || market.id === "row") continue;
    if (market.countries.includes(code)) return market;
  }
  return MARKETS.row;
}

export function roundMarketPrice(amount: number, market: Market) {
  if (market.fractionDigits === 0) return Math.round(amount);
  return Math.round(amount * 100) / 100;
}

export function overseasUnitPrice(
  market: Market,
  pack: OverseasPackId,
  size: OverseasSizeId
) {
  const base = pack === "bundle" ? market.bundlePrice : market.singlePrice;
  const sized = size === "double" ? base * DOUBLE_PREMIUM : base;
  return roundMarketPrice(sized, market);
}

export function overseasInrCapture(
  market: Market,
  pack: OverseasPackId,
  size: OverseasSizeId,
  quantity: number
) {
  const base = pack === "bundle" ? market.approxInrBundle : market.approxInrSingle;
  const sized = size === "double" ? base * DOUBLE_PREMIUM : base;
  return Math.round(sized * quantity);
}

export function overseasPackLabel(pack: OverseasPackId) {
  return pack === "bundle" ? "2-Comforter Bundle" : "1 Comforter";
}

export function overseasSizeLabel(size: OverseasSizeId) {
  return size === "double" ? "Double" : "Single";
}

export function overseasVariantKey(pack: OverseasPackId, size: OverseasSizeId) {
  return `overseas:${pack}:${size}` as const;
}
