export type VariantId = "double-set" | "double-comforter" | "single";

export type ProductVariant = {
  id: VariantId;
  label: string;
  shortLabel: string;
  description: string;
  dimensions: string;
  mrp: number;
  price: number;
  skuSuffix: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  designCode: string;
  /** Official collections from San Marco product sheet */
  collection: "Venice" | "Alberta" | "Tiffany";
  category: "striped" | "floral" | "solid";
  tagline: string;
  description: string;
  colours: string;
  pattern: string;
  fabric: string;
  filling: string;
  features: string[];
  washCare: string;
  image: string;
  gallery: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
};

export const VARIANTS: ProductVariant[] = [
  {
    id: "double-set",
    label: "Double Bed Set",
    shortLabel: "Double Set",
    description: "Comforter + bed sheet & 2 pillow covers",
    dimensions: "Comforter 220 × 240 cm · Bedsheet & pillow covers included",
    mrp: 4999,
    price: 2399,
    skuSuffix: "DB-SET",
  },
  {
    id: "double-comforter",
    label: "Double Bed Comforter",
    shortLabel: "Double Comforter",
    description: "Comforter only — without bed sheet & pillow covers",
    dimensions: "Comforter 220 × 240 cm",
    mrp: 3999,
    price: 1499,
    skuSuffix: "DB",
  },
  {
    id: "single",
    label: "Single Bed Comforter",
    shortLabel: "Single",
    description: "Single bed comforter",
    dimensions: "Comforter 150 × 230 cm",
    mrp: 2999,
    price: 1299,
    skuSuffix: "SB",
  },
];

export const BRAND = {
  name: "San Marco",
  tagline: "Premium Bedding & Comforters",
  slogan: "Wrap Yourself in Everyday Luxury",
  email: "sanmarcofurnishings@gmail.com",
  phone: "+91 99929 29440",
  phoneAlt: "+91 90349 75500",
  whatsapp: "919992929440",
  marketedBy: "KARM BABA Ventures Pvt. Ltd.",
  address: "829, Sector-18, Panipat, Haryana 132103",
};

const sharedFeatures = [
  "Soft & Cozy microfibre loft",
  "Breathable premium poly-cotton shell",
  "Reversible two-tone finish",
  "All-season comfort",
  "Gift-ready reusable carry bag",
  "Made in India",
];

export const products: Product[] = [
  {
    id: "sm-ven-01",
    slug: "sunshine-teal-stripe",
    name: "Sunshine Teal Stripe",
    designCode: "NEW01",
    collection: "Venice",
    category: "striped",
    tagline: "Bold coastal stripes for a sunlit bedroom",
    description:
      "A contemporary striped comforter in mustard, teal, navy and cream — tailored for festive gifting and everyday elegance. Soft, lightweight loft that feels plush without the weight.",
    colours: "Yellow / Teal / Navy / Cream",
    pattern: "Bold horizontal stripes",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/sunshine-teal-stripe.jpg",
    gallery: [
      "/products/sunshine-teal-stripe.jpg",
      "/products/lifestyle-set-1.jpg",
      "/products/closeup-fabric.jpg",
      "/products/gift-bag.jpg",
    ],
    featured: true,
    newArrival: true,
    bestseller: true,
  },
  {
    id: "sm-tif-01",
    slug: "tiffany-peach-rust",
    name: "Tiffany Peach & Rust",
    designCode: "NEW02",
    collection: "Venice",
    category: "striped",
    tagline: "Warm peach and rust for intimate evenings",
    description:
      "Soft peach and rust tones layered into a refined striped story — ideal for guest rooms, bridal gifting and hospitality suites.",
    colours: "Peach / Rust / Cream",
    pattern: "Contemporary striped colour-block",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/tiffany-peach-rust.jpg",
    gallery: [
      "/products/tiffany-peach-rust.jpg",
      "/products/lifestyle-set-2.jpg",
      "/products/gift-bag.jpg",
    ],
    featured: true,
    newArrival: true,
  },
  {
    id: "sm-alb-01",
    slug: "grey-blossom",
    name: "Grey Blossom",
    designCode: "FL01",
    collection: "Alberta",
    category: "floral",
    tagline: "Quiet florals on cream for timeless calm",
    description:
      "Delicate grey-lavender blossoms across a cream ground, finished with a textured reverse. A serene floral for year-round sleep.",
    colours: "Cream / Lavender-grey floral, grey check reverse",
    pattern: "Lavender-grey floral vine",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/grey-blossom.jpg",
    gallery: ["/products/grey-blossom.jpg", "/products/gift-bag.jpg"],
    featured: true,
    bestseller: true,
  },
  {
    id: "sm-alb-02",
    slug: "rust-indigo-daisy",
    name: "Rust & Indigo Daisy",
    designCode: "FL02",
    collection: "Alberta",
    category: "floral",
    tagline: "Petals in rust and indigo for lively rooms",
    description:
      "A ditsy daisy print in rust, indigo and cream — cheerful yet polished, made for festive bedrooms and thoughtful corporate gifts.",
    colours: "Beige / Multicolour ditsy floral, beige damask reverse",
    pattern: "Red-blue-white ditsy floral",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/rust-indigo-daisy.jpg",
    gallery: ["/products/rust-indigo-daisy.jpg", "/products/gift-bag.jpg"],
    featured: true,
  },
  {
    id: "sm-alb-03",
    slug: "mocha-chevron-bloom",
    name: "Mocha Chevron Bloom",
    designCode: "FL03",
    collection: "Alberta",
    category: "floral",
    tagline: "Warm mocha florals with geometric reverse",
    description:
      "Brown rose-vine florals on cream with a geometric reverse — earthy luxury that layers beautifully with wood and brass interiors.",
    colours: "Cream / Brown floral, brown geometric reverse",
    pattern: "Brown rose-vine floral",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/mocha-chevron-bloom.jpg",
    gallery: ["/products/mocha-chevron-bloom.jpg", "/products/gift-bag.jpg"],
  },
  {
    id: "sm-alb-04",
    slug: "lavender-mist",
    name: "Lavender Mist",
    designCode: "FL04",
    collection: "Alberta",
    category: "floral",
    tagline: "Soft lavender vines for restful nights",
    description:
      "Misty lavender florals with a grey check reverse — a quiet, spa-like comforter designed for restorative sleep.",
    colours: "Cream / Lavender-grey floral, grey check reverse",
    pattern: "Lavender-grey floral vine",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/lavender-mist.jpg",
    gallery: ["/products/lavender-mist.jpg", "/products/gift-bag.jpg"],
  },
  {
    id: "sm-alb-05",
    slug: "rose-blush-garden",
    name: "Rose Blush Garden",
    designCode: "FL05",
    collection: "Alberta",
    category: "floral",
    tagline: "Blush daisies for romantic bedrooms",
    description:
      "Pink daisy florals on taupe with a pink check reverse — romantic, gift-ready, and soft enough for everyday use.",
    colours: "Pink / Taupe floral, pink check reverse",
    pattern: "Pink daisy floral on taupe",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/rose-blush-garden.jpg",
    gallery: ["/products/rose-blush-garden.jpg", "/products/gift-bag.jpg"],
    bestseller: true,
  },
  {
    id: "sm-alb-06",
    slug: "caramel-spring",
    name: "Caramel Spring",
    designCode: "FL06",
    collection: "Alberta",
    category: "floral",
    tagline: "Tan blossoms with a checkable reverse",
    description:
      "Tan floral blossoms with a brown check reverse — caramel warmth that suits both modern and classic homes.",
    colours: "Beige / Tan floral, brown check reverse",
    pattern: "Tan floral blossom print",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/caramel-spring.jpg",
    gallery: ["/products/caramel-spring.jpg", "/products/gift-bag.jpg"],
  },
  {
    id: "sm-sol-01",
    slug: "sage-green",
    name: "Sage Green",
    designCode: "SD01",
    collection: "Tiffany",
    category: "solid",
    tagline: "Two-tone sage for calm, curated spaces",
    description:
      "A reversible sage-to-forest solid comforter — understated luxury for those who prefer colour over print.",
    colours: "Sage / Forest Green",
    pattern: "Plain, two-tone reversible",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/sage-green.jpg",
    gallery: ["/products/sage-green.jpg", "/products/gift-bag.jpg"],
    featured: true,
  },
  {
    id: "sm-sol-02",
    slug: "mist-blue",
    name: "Mist Blue",
    designCode: "SD02",
    collection: "Tiffany",
    category: "solid",
    tagline: "Cool mist blue with a deeper reverse",
    description:
      "Sky-to-navy reversible comfort — crisp, hotel-like, and easy to style with white linens.",
    colours: "Sky Blue / Navy",
    pattern: "Plain, two-tone reversible",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/mist-blue.jpg",
    gallery: ["/products/mist-blue.jpg", "/products/gift-bag.jpg"],
  },
  {
    id: "sm-sol-03",
    slug: "latte-beige",
    name: "Latte Beige",
    designCode: "SD03",
    collection: "Tiffany",
    category: "solid",
    tagline: "Warm latte neutrals for quiet luxury",
    description:
      "Latte beige reversible solid — the versatile foundation piece for any San Marco bedroom edit.",
    colours: "Latte Beige / Warm Taupe",
    pattern: "Plain, two-tone reversible",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/latte-beige.jpg",
    gallery: ["/products/latte-beige.jpg", "/products/gift-bag.jpg"],
    bestseller: true,
  },
  {
    id: "sm-sol-04",
    slug: "blush-peach",
    name: "Blush Peach",
    designCode: "SD04",
    collection: "Tiffany",
    category: "solid",
    tagline: "Soft blush peach with rose reverse",
    description:
      "Blush-to-rose reversible comfort — gentle colour for bridal suites, guest rooms and soft modern homes.",
    colours: "Blush Pink / Rose",
    pattern: "Plain, two-tone reversible",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/blush-peach.jpg",
    gallery: ["/products/blush-peach.jpg", "/products/gift-bag.jpg"],
  },
  {
    id: "sm-sol-05",
    slug: "denim-blue",
    name: "Denim Blue",
    designCode: "SD05",
    collection: "Tiffany",
    category: "solid",
    tagline: "Deep denim blue with navy depth",
    description:
      "Denim-to-navy reversible solid — a confident classic that photographs beautifully and wears for years.",
    colours: "Denim Blue / Navy",
    pattern: "Plain, two-tone reversible",
    fabric: "Premium poly-cotton soft-finish shell",
    filling: "Hollow conjugated siliconised microfibre fill (~150 GSM)",
    features: sharedFeatures,
    washCare: "Gentle machine wash cold or dry clean. Mild detergent, no bleach, shade dry.",
    image: "/products/denim-blue.jpg",
    gallery: ["/products/denim-blue.jpg", "/products/gift-bag.jpg"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getVariant(id: VariantId) {
  return VARIANTS.find((v) => v.id === id)!;
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}
