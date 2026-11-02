import Image from "next/image";
import { BRAND } from "@/data/products";

export const metadata = {
  title: "Our Story",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-gold-deep">Our Story</p>
          <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">
            San Marco
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ink/45">
            {BRAND.tagline}
          </p>
          <div className="mt-8 space-y-4 text-ink/70 leading-relaxed">
            <p>
              San Marco was created for bedrooms that deserve more than ordinary bedding — soft
              loft, thoughtful colour, and packaging that already feels like a gift.
            </p>
            <p>
              Inspired by Venetian heritage and crafted in India, our Festive Comfort Collection
              brings thirteen designs across striped, floral and solid edits. Each comforter uses a
              premium poly-cotton shell with hollow siliconised microfibre fill for breathable,
              all-season comfort.
            </p>
            <p>
              Sold & marketed by {BRAND.marketedBy}, we serve homes, hospitality partners and
              corporate gifting programmes with the same promise: everyday luxury, made carefully.
            </p>
          </div>
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
  );
}
