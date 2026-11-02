import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-sand bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="space-y-4 md:col-span-1">
          <Image
            src="/brand/san-marco-logo.jpg"
            alt="San Marco"
            width={80}
            height={80}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-gold/35"
          />
          <p className="font-display text-3xl text-ink">San Marco</p>
          <p className="text-sm leading-relaxed text-muted">
            {BRAND.slogan}. Premium Made-in-India comforters and bedsheet sets for homes,
            hospitality and thoughtful gifting.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-gold-deep">Explore</p>
          <ul className="space-y-2 text-sm text-ink/75">
            <li><Link href="/shop" className="hover:text-gold-deep">Shop All</Link></li>
            <li><Link href="/collections/festive" className="hover:text-gold-deep">Festive Collection</Link></li>
            <li><Link href="/gifting" className="hover:text-gold-deep">Corporate Gifting</Link></li>
            <li><Link href="/about" className="hover:text-gold-deep">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-gold-deep">Care</p>
          <ul className="space-y-2 text-sm text-ink/75">
            <li><Link href="/shipping" className="hover:text-gold-deep">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-gold-deep">Contact</Link></li>
            <li>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-deep"
              >
                WhatsApp Concierge
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-gold-deep">Atelier</p>
          <p className="text-sm leading-relaxed text-muted">
            Sold & marketed by {BRAND.marketedBy}
            <br />
            {BRAND.address}
          </p>
          <p className="mt-4 text-sm text-muted">
            <a href={`mailto:${BRAND.email}`} className="hover:text-gold-deep">
              {BRAND.email}
            </a>
            <br />
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-gold-deep">
              {BRAND.phone}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-sand py-5 text-center text-[11px] uppercase tracking-[0.14em] text-muted">
        © {new Date().getFullYear()} San Marco · Everyday Luxury, Made in India
      </div>
    </footer>
  );
}
