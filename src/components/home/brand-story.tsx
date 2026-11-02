import Link from "next/link";
import Image from "next/image";

export function BrandStory() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-24">
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f3eee8]">
          <Image
            src="/hero/hero-bedroom.jpg"
            alt="San Marco bedding styled in a calm bedroom"
            fill
            className="object-cover object-center"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>

        {/* Smaller crest badge — not the whole panel */}
        <div className="absolute -bottom-6 right-5 h-28 w-28 overflow-hidden rounded-full bg-cream shadow-[0_18px_40px_-18px_rgba(74,18,28,0.45)] ring-1 ring-gold/50 md:-bottom-8 md:right-8 md:h-32 md:w-32">
          <Image
            src="/brand/san-marco-logo.jpg"
            alt="San Marco crest"
            fill
            className="object-cover object-center scale-110"
            sizes="128px"
          />
        </div>
      </div>

      <div className="md:pl-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-deep">
          The Story of San Marco
        </p>
        <h2 className="mt-4 font-display text-5xl leading-[0.95] text-burgundy md:text-6xl">
          Hi there!
        </h2>
        <span aria-hidden className="mt-4 block font-display text-lg text-gold/80">
          ✦
        </span>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            San Marco was created for bedrooms that deserve more than ordinary bedding — soft loft,
            thoughtful colour, and packaging that already feels like a gift.
          </p>
          <p>
            Inspired by Venetian heritage and crafted in India, our Festive Comfort Collection
            brings thirteen designs across Venice, Alberta and Tiffany.
          </p>
          <p>
            When you bring San Marco home, know that it was made with care — for comfort, beauty,
            and everyday luxury.
          </p>
        </div>
        <Link
          href="/about"
          className="mt-9 inline-block border border-burgundy/80 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy transition hover:bg-burgundy hover:text-cream"
        >
          Our Story
        </Link>
      </div>
    </section>
  );
}
