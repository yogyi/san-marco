"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart, cartTotals } from "@/store/cart";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=floral", label: "Florals" },
  { href: "/shop?category=solid", label: "Solids" },
  { href: "/collections/festive", label: "Festive Edit" },
  { href: "/gifting", label: "Gifting" },
  { href: "/about", label: "Our Story" },
];

export function SiteHeader() {
  const { items, openCart } = useCart();
  const { count } = cartTotals(items);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-burgundy text-center text-[11px] tracking-[0.22em] text-cream/90 uppercase py-2.5">
        Festive Comfort Collection · Free shipping above ₹1,999 · Gift bag with every piece
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-gold/25 bg-cream/90 backdrop-blur-md shadow-[0_10px_40px_-28px_rgba(90,24,36,0.45)]"
            : "bg-cream/70 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <button
            className="md:hidden p-2 text-burgundy"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-burgundy/75">
            {links.slice(0, 3).map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-burgundy transition">
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="flex flex-col items-center gap-0.5">
            <Image
              src="/brand/san-marco-logo.jpg"
              alt="San Marco"
              width={72}
              height={72}
              className="h-14 w-14 rounded-full object-cover ring-1 ring-gold/50 md:h-16 md:w-16"
              priority
            />
            <span className="font-display text-xl leading-none text-burgundy md:text-2xl">
              San Marco
            </span>
            <span className="hidden text-[9px] tracking-[0.28em] text-ink/55 uppercase sm:block">
              Premium Bedding & Comforters
            </span>
          </Link>

          <div className="flex items-center gap-1 md:gap-3">
            <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-burgundy/75 mr-2">
              {links.slice(3).map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-burgundy transition">
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/shop"
              className="hidden sm:inline-flex p-2 text-burgundy/70 hover:text-burgundy"
              aria-label="Search shop"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 text-burgundy"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center bg-gold px-1 text-[10px] font-semibold text-burgundy-deep">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-burgundy-deep/40"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-2xl text-burgundy">San Marco</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-burgundy" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-gold/20 pb-3 font-display text-xl text-burgundy"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="pt-2 text-sm tracking-wide text-burgundy/70"
              >
                Contact & WhatsApp
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
