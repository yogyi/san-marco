import Link from "next/link";
import Image from "next/image";

export function BrandStory() {
  return (
    <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src="/brand/san-marco-logo.jpg"
          alt="San Marco"
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-burgundy">
          The Story of San Marco
        </p>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Hi there!</h2>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
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
          className="mt-8 inline-block bg-burgundy px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-burgundy-deep"
        >
          Our Story
        </Link>
      </div>
    </section>
  );
}
