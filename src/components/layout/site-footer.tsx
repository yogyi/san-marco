import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-gold/25 bg-burgundy-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1 space-y-4">
          <Image
            src="/brand/san-marco-logo.jpg"
            alt="San Marco"
            width={88}
            height={88}
            className="h-20 w-20 rounded-full object-cover ring-1 ring-gold/40"
          />
          <p className="font-display text-3xl">San Marco</p>
          <p className="text-sm text-cream/70 leading-relaxed">
            {BRAND.slogan}. Premium Made-in-India comforters and bedsheet sets for homes,
            hospitality and thoughtful gifting.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-gold">Explore</p>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/shop" className="hover:text-gold">Shop All</Link></li>
            <li><Link href="/collections/festive" className="hover:text-gold">Festive Collection</Link></li>
            <li><Link href="/gifting" className="hover:text-gold">Corporate Gifting</Link></li>
            <li><Link href="/about" className="hover:text-gold">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-gold">Care</p>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/shipping" className="hover:text-gold">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            <li>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                WhatsApp Concierge
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-gold">Atelier</p>
          <p className="text-sm text-cream/75 leading-relaxed">
            Sold & marketed by {BRAND.marketedBy}
            <br />
            {BRAND.address}
          </p>
          <p className="mt-4 text-sm text-cream/75">
            <a href={`mailto:${BRAND.email}`} className="hover:text-gold">
              {BRAND.email}
            </a>
            <br />
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-gold">
              {BRAND.phone}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-[11px] tracking-[0.16em] text-cream/50 uppercase">
        © {new Date().getFullYear()} San Marco · Everyday Luxury, Made in India
      </div>
    </footer>
  );
}
