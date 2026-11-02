import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/data/products";

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
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
  { href: "/checkout", label: "Your Bag" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-gold/25 bg-[#f7f3ee]">
      {/* Soft brand band */}
      <div className="border-b border-gold/15 bg-gradient-to-b from-[#fbf8f3] to-[#f7f3ee]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-4 py-12 text-center md:px-8 md:py-14">
          <Image
            src="/brand/san-marco-logo.jpg"
            alt="San Marco"
            width={72}
            height={72}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-gold/45"
          />
          <p className="font-display text-4xl text-burgundy md:text-5xl">San Marco</p>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-gold-deep">
              Premium Bedding & Comforters
            </span>
            <span className="h-px w-10 bg-gold/70" />
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-ink/60 md:text-[15px]">
            Soft loft, thoughtful colour, gift-ready finish — everyday luxury, Made in India.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="border border-burgundy/80 bg-burgundy px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-burgundy-deep"
            >
              Shop Collection
            </Link>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi San Marco, I'd like help choosing bedding.")}`}
              target="_blank"
              rel="noreferrer"
              className="border border-burgundy/40 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-burgundy transition hover:bg-burgundy hover:text-cream"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4 md:gap-8 md:px-8 md:py-16">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep">
            Contact
          </p>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink/65">
            <p>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="transition hover:text-burgundy">
                {BRAND.phone}
              </a>
            </p>
            <p>
              <a href={`tel:${BRAND.phoneAlt.replace(/\s/g, "")}`} className="transition hover:text-burgundy">
                {BRAND.phoneAlt}
              </a>
            </p>
            <p>
              <a href={`mailto:${BRAND.email}`} className="transition hover:text-burgundy">
                {BRAND.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep">
            Shop
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-ink/65">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-burgundy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep">
            Help
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-ink/65">
            {helpLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-burgundy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-deep">
            At Home
          </p>
          <p className="mt-5 text-sm leading-relaxed text-ink/65">
            Thirteen designs across Venice, Alberta and Tiffany — reversible comfort with a reusable
            gift bag in every order.
          </p>
          <p className="mt-5 text-[11px] leading-relaxed tracking-wide text-ink/45">
            Sold & marketed by {BRAND.marketedBy}
          </p>
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-center text-[11px] tracking-[0.08em] text-ink/45 md:flex-row md:px-8 md:text-left">
          <p>© {new Date().getFullYear()} San Marco · Everyday Luxury, Made in India</p>
          <p className="uppercase tracking-[0.22em] text-gold-deep/80">Festive Comfort Collection</p>
        </div>
      </div>
    </footer>
  );
}
