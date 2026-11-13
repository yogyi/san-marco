import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/data/products";
import { MarketSwitcher } from "@/components/layout/market-switcher";

const shopLinks = [
  { href: "/shop", label: "All Bedding" },
  { href: "/shop?collection=venice", label: "Venice" },
  { href: "/shop?collection=alberta", label: "Alberta" },
  { href: "/shop?collection=tiffany", label: "Tiffany" },
  { href: "/collections/festive", label: "Festive Edit" },
  { href: "/gifting", label: "Gifting" },
];

const helpLinks = [
  { href: "/shipping", label: "Shipping & Returns" },
  { href: "/track", label: "Track Order" },
  { href: "/craft", label: "Our Craft" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
  { href: "/checkout", label: "Your Bag" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-burgundy-deep text-cream">
      <div className="border-b border-gold/25">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-4 py-12 text-center md:px-8 md:py-14">
          <Image
            src="/brand/san-marco-logo.jpg"
            alt="San Marco"
            width={72}
            height={72}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-gold/50"
          />
          <p className="font-display text-4xl font-bold text-cream md:text-5xl">San Marco</p>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-gold-soft">
              Premium Bedding & Comforters
            </span>
            <span className="h-px w-10 bg-gold/70" />
          </div>
          <p className="max-w-xl text-sm font-medium leading-relaxed text-cream/85 md:text-[15px]">
            Soft loft, thoughtful colour, gift-ready finish — everyday luxury, Made in India.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="bg-gold px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-burgundy-deep transition hover:bg-gold-soft"
            >
              Shop Collection
            </Link>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi San Marco, I'd like help choosing bedding.")}`}
              target="_blank"
              rel="noreferrer"
              className="border border-cream/35 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition hover:border-gold hover:text-gold-soft"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:px-8 md:py-16">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-soft">
            Contact
          </p>
          <div className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-cream/85">
            <p>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="transition hover:text-gold-soft">
                {BRAND.phone}
              </a>
            </p>
            <p>
              <a href={`tel:${BRAND.phoneAlt.replace(/\s/g, "")}`} className="transition hover:text-gold-soft">
                {BRAND.phoneAlt}
              </a>
            </p>
            <p>
              <a href={`mailto:${BRAND.email}`} className="transition hover:text-gold-soft">
                {BRAND.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-soft">
            Shop
          </p>
          <ul className="mt-5 space-y-2.5 text-sm font-medium text-cream/85">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-gold-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-soft">
            Help
          </p>
          <ul className="mt-5 space-y-2.5 text-sm font-medium text-cream/85">
            {helpLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-gold-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-soft">
            Ship to
          </p>
          <div className="mt-5">
            <MarketSwitcher className="[&_select]:border-cream/30 [&_select]:bg-burgundy-deep [&_select]:text-cream" />
          </div>
          <p className="mt-5 text-sm font-medium leading-relaxed text-cream/85">
            India keeps festive ₹ pricing. Overseas markets show fixed local prices with shipping
            built in — switch above anytime.
          </p>
          <p className="mt-5 text-[11px] leading-relaxed tracking-wide text-cream/45">
            Sold & marketed by {BRAND.marketedBy}
          </p>
        </div>
      </div>

      <div className="border-t border-gold/20 bg-[#3a0e16]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-center text-[11px] tracking-[0.08em] text-cream/45 md:flex-row md:px-8 md:text-left">
          <p>© {new Date().getFullYear()} San Marco · Everyday Luxury, Made in India</p>
          <p className="uppercase tracking-[0.22em] text-gold-soft/80">Festive Comfort Collection</p>
        </div>
      </div>
    </footer>
  );
}
