"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart, cartTotals } from "@/store/cart";
import { cn } from "@/lib/utils";

const links = [
  { href: "/shop", label: "Bedding" },
  { href: "/shop?category=floral", label: "Florals" },
  { href: "/shop?category=solid", label: "Solids" },
  { href: "/shop?category=striped", label: "Striped" },
  { href: "/collections/festive", label: "Festive" },
  { href: "/gifting", label: "Gift Box" },
  { href: "/about", label: "Our Story" },
];

export function SiteHeader() {
  const { items, openCart } = useCart();
  const { count } = cartTotals(items);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-burgundy py-2 text-center text-[11px] tracking-[0.08em] text-white">
        Festive Comfort Collection · Free shipping above ₹1,999 · Gift bag with every piece
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-black/5 bg-white transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:px-8">
          <button
            className="p-2 text-ink lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/brand/san-marco-logo.jpg"
              alt="San Marco"
              width={44}
              height={44}
              className="h-10 w-10 rounded-full object-cover"
              priority
            />
            <span className="font-display text-xl tracking-wide text-ink md:text-2xl">
              SAN MARCO
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-6 text-[12px] font-medium uppercase tracking-[0.12em] text-ink/80 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-burgundy">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Link href="/shop" className="p-2 text-ink/70 hover:text-ink" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 text-ink/70 hover:text-ink"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[80%] max-w-sm flex-col bg-white p-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-2xl">SAN MARCO</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-black/5 pb-3 text-sm uppercase tracking-[0.14em]"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="pt-2 text-sm text-muted">
                Contact & WhatsApp
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
