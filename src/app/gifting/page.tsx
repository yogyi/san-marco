import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/products";

export const metadata = {
  title: "Gifting",
};

export default function GiftingPage() {
  return (
    <div>
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image
          src="/products/lifestyle-set-2.jpg"
          alt="San Marco gift packaging"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-7xl items-end px-4 pb-14 md:px-8">
          <div className="max-w-xl text-cream">
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">Gifting Atelier</p>
            <h1 className="mt-3 font-display text-5xl">Gifts that feel kept, not wrapped.</h1>
            <p className="mt-4 text-cream/80">
              Every San Marco piece includes a reusable carry bag — ready for festive, bridal and
              staff welfare programmes.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Festive & Bridal",
              copy: "Curate colour stories across florals and solids for personal gifting.",
            },
            {
              title: "Corporate Welfare",
              copy: "Bulk festive pricing on all 13 designs with gift-ready packing.",
            },
            {
              title: "Hospitality",
              copy: "Consistent loft and easy-care shells suited to guest rooms and suites.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-gold/20 bg-ivory/40 p-6">
              <h2 className="font-display text-2xl text-ink">{item.title}</h2>
              <p className="mt-3 text-sm text-ink/65">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/shop">Shop gift-ready designs</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi, I need a San Marco corporate gifting quote.")}`}>
              Request bulk quote
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
