"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart, cartTotals } from "@/store/cart";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?collection=venice", label: "Venice" },
  { href: "/shop?collection=alberta", label: "Alberta" },
  { href: "/shop?collection=tiffany", label: "Tiffany" },
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
      <div className="bg-burgundy py-2 text-center text-[10px] uppercase tracking-[0.18em] text-cream/90 md:text-[11px]">
        Festive Comfort Collection · Free shipping above ₹1,999 · Gift bag with every piece
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-gold/20 bg-cream/95 backdrop-blur-md shadow-sm"
            : "bg-cream/90 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 md:px-8">
          <button
            className="p-2 text-burgundy md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/about" className="hidden text-[11px] uppercase tracking-[0.16em] text-burgundy/70 transition hover:text-burgundy md:inline">
            Our Story
          </Link>

          <Link href="/" className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            <Image
              src="/brand/san-marco-logo.jpg"
              alt="San Marco"
              width={44}
              height={44}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-gold/40 md:h-10 md:w-10"
              priority
            />
            <span className="flex flex-col">
              <span className="font-display text-lg leading-none text-burgundy md:text-xl">
                San Marco
              </span>
              <span className="mt-0.5 hidden text-[8px] uppercase tracking-[0.2em] text-ink/50 sm:block">
                Premium Bedding & Comforters
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/shop"
              className="hidden p-2 text-burgundy/70 transition hover:text-burgundy sm:inline-flex"
              aria-label="Search shop"
            >
              <Search className="h-4 w-4" />
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 text-burgundy"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-gold px-1 text-[9px] font-semibold text-burgundy-deep">
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
              {mobileLinks.map((l) => (
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
