import Link from "next/link";
import { BRAND } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-[#fafafa]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Contact Us</p>
          <p className="mt-4 text-sm text-muted">
            Phone: {BRAND.phone}
            <br />
            Email:{" "}
            <a href={`mailto:${BRAND.email}`} className="hover:text-burgundy">
              {BRAND.email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/shop" className="hover:text-burgundy">All Bedding</Link></li>
            <li><Link href="/shop?category=floral" className="hover:text-burgundy">Florals</Link></li>
            <li><Link href="/shop?category=solid" className="hover:text-burgundy">Solids</Link></li>
            <li><Link href="/collections/festive" className="hover:text-burgundy">Festive Edit</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Help</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/shipping" className="hover:text-burgundy">Shipping & Returns</Link></li>
            <li><Link href="/gifting" className="hover:text-burgundy">Gifting</Link></li>
            <li><Link href="/about" className="hover:text-burgundy">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-burgundy">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-2xl text-ink">San Marco</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Premium bedding & comforters. Soft loft, Made in India — wrap yourself in everyday luxury.
          </p>
          <p className="mt-4 text-xs text-muted">{BRAND.marketedBy}</p>
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} San Marco · Everyday Luxury, Made in India
      </div>
    </footer>
  );
}
