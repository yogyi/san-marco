const items = [
  "Made in India",
  "Soft Microfibre Loft",
  "Gift-Ready Carry Bag",
  "Venice · Alberta · Tiffany",
  "Free Shipping above ₹1,999",
  "Festive Comfort Collection",
  "Everyday Luxury",
  "Reversible Designs",
];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em] text-cream/90">
            {item}
          </span>
          <span aria-hidden className="font-display text-sm text-gold-soft/80">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section
      aria-label="San Marco highlights"
      className="relative overflow-hidden border-y border-gold/30 bg-burgundy-deep py-3.5"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  );
}
