import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function GiftingCta() {
  return (
    <section className="mx-auto grid max-w-7xl gap-0 px-4 py-8 md:grid-cols-2 md:px-8 md:py-12">
      <div className="relative min-h-[360px] overflow-hidden">
        <Image
          src="/products/gift-bag.jpg"
          alt="San Marco gift-ready carry bag"
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-center bg-ink px-8 py-12 text-ivory md:px-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold-soft">The Art of Gifting</p>
        <h2 className="mt-3 font-display text-4xl">Gift bags included. Concierge available.</h2>
        <p className="mt-4 leading-relaxed text-ivory/70">
          Every San Marco piece ships in a reusable carry bag — ready for festive, bridal and
          corporate gifting. Need bulk quotes? Message our WhatsApp atelier.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold">
            <Link href="/gifting">Explore Gifting</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-ivory/30 text-ivory hover:border-gold hover:bg-ivory/5"
          >
            <Link href="/contact">Talk to Concierge</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
