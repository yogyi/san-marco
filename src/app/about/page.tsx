import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/data/products";

export const metadata = {
  title: "Our Story",
  description:
    "San Marco — Venetian-inspired premium bedding crafted in India for soft loft, thoughtful colour, and gift-ready everyday luxury.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
              Our Story
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold text-burgundy md:text-6xl">
              San Marco
            </h1>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              {BRAND.tagline}
            </p>
            <div className="mt-8 space-y-4 text-[15px] font-medium leading-relaxed text-ink/70">
              <p>
                San Marco was created for bedrooms that deserve more than ordinary bedding — soft
                loft, thoughtful colour, and packaging that already feels like a gift.
              </p>
              <p>
                Inspired by Venetian heritage and crafted in India, our Festive Comfort Collection
                brings thirteen designs across Venice, Alberta and Tiffany. Each comforter uses a
                premium poly-cotton shell with hollow siliconised microfibre fill for breathable,
                all-season comfort.
              </p>
              <p>
                Sold & marketed by {BRAND.marketedBy}, we serve homes, hospitality partners and
                corporate gifting programmes with the same promise: everyday luxury, made carefully.
              </p>
            </div>
            <Link
              href="/craft"
              className="mt-9 inline-block border border-burgundy/80 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy transition hover:bg-burgundy hover:text-cream"
            >
              See How We Make It
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
            <Image
              src="/brand/san-marco-logo.jpg"
              alt="San Marco logo"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <section className="border-t border-gold/20 bg-gradient-to-b from-ivory to-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-20">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
            <Image
              src="/craft/quilting-cream.jpg"
              alt="San Marco comforter on the quilting floor"
              fill
              className="object-cover object-[50%_30%]"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-deep">
              Behind the crest
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-burgundy md:text-5xl">
              Care you can see in every stitch.
            </h2>
            <p className="mt-5 text-[15px] font-medium leading-relaxed text-muted">
              From precision quilting floors to gift-ready cartons stacked for dispatch — step
              inside the making of San Marco.
            </p>
            <Link
              href="/craft"
              className="mt-8 inline-block bg-burgundy px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition hover:bg-burgundy-deep"
            >
              Our Craft
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
