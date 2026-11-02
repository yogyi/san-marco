"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart, cartTotals } from "@/store/cart";
import { cn } from "@/lib/utils";

const leftLinks = [
  { href: "/shop?collection=tiffany", label: "Tiffany" },
  { href: "/shop?collection=venice", label: "Venice" },
  { href: "/shop?collection=alberta", label: "Alberta" },
];

const rightLinks = [
  { href: "/collections/festive", label: "Festive Edit" },
  { href: "/gifting", label: "Gifting" },
  { href: "/about", label: "Our Story" },
];

const mobileLinks = [
  { href: "/shop", label: "Shop All" },
  ...leftLinks,
  ...rightLinks,
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
      <div className="bg-burgundy py-2.5 text-center text-[11px] uppercase tracking-[0.22em] text-cream/90">
        Festive Comfort Collection · Free shipping above ₹1,999 · Gift bag with every piece
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-gold/25 bg-cream/95 backdrop-blur-md shadow-[0_10px_40px_-28px_rgba(90,24,36,0.45)]"
            : "bg-cream/80 backdrop-blur-sm"
        )}
      >
        <div className="relative mx-auto grid max-w-7xl grid-cols-3 items-center px-4 py-2.5 md:px-8">
          {/* Left */}
          <div className="justify-self-start">
            <button
              className="p-2 text-burgundy md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-burgundy md:flex">
              {leftLinks.map((l) => (
                <Link key={l.href} href={l.href} className="transition hover:text-burgundy-deep">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center crest only */}
          <Link
            href="/"
            aria-label="San Marco home"
            className="justify-self-center"
          >
            <Image
              src="/brand/san-marco-logo.jpg"
              alt="San Marco"
              width={56}
              height={56}
              className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/50 md:h-12 md:w-12"
              priority
            />
          </Link>

          {/* Right */}
          <div className="justify-self-end flex items-center gap-1 md:gap-2">
            <nav className="mr-2 hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-burgundy md:flex">
              {rightLinks.map((l) => (
                <Link key={l.href} href={l.href} className="transition hover:text-burgundy-deep">
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/shop"
              className="hidden p-2 text-burgundy/70 transition hover:text-burgundy sm:inline-flex"
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
              <Image
                src="/brand/san-marco-logo.jpg"
                alt="San Marco"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/50"
              />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-burgundy" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {mobileLinks.map((l) => (
                <Link
                  key={l.href + l.label}
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
