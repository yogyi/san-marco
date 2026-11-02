import { Hero } from "@/components/home/hero";
import { CircleCategories } from "@/components/home/circle-categories";
import { ProductRail } from "@/components/home/product-rail";
import { LookbookStrip } from "@/components/home/lookbook-strip";
import { EditorialBanner } from "@/components/home/editorial-banner";
import { Testimonials } from "@/components/home/testimonials";
import { BrandStory } from "@/components/home/brand-story";
import { products } from "@/data/products";

export default function HomePage() {
  const mostLoved = products.filter((p) => p.featured || p.bestseller).slice(0, 4);
  const alberta = products.filter((p) => p.collection === "Alberta").slice(0, 4);
  const tiffany = products.filter((p) => p.collection === "Tiffany").slice(0, 4);

  return (
    <>
      <CircleCategories />

      <Hero />

      <ProductRail
        title="Most Loved"
        eyebrow="Bestsellers"
        subtitle="The designs guests notice first — soft loft, gift-ready finish."
        products={mostLoved}
      />

      <LookbookStrip />

      <ProductRail
        title="Alberta"
        eyebrow="Floral Prints"
        subtitle="Quiet gardens for the bed — bloom-soft microfibre, serene colour."
        products={alberta}
        viewAllHref="/shop?collection=alberta"
      />

      <EditorialBanner
        eyebrow="Celebrate life, every day!"
        title="Today is an occasion"
        body="Starting your day, being around your loved ones, and resting well is an occasion. Dress your bed in San Marco — soft loft, beautiful colour, Made in India."
        cta="Shop Bedding"
        href="/shop"
        image="/products/tiffany-peach-rust.jpg"
      />

      <EditorialBanner
        eyebrow="The art of gifting"
        title="Gifts made with warmth"
        body="From festive corporate welfare to bridal surprises — every San Marco piece arrives in a reusable gift-ready carry bag."
        cta="Explore Gifting"
        href="/gifting"
        image="/products/gift-bag.jpg"
        reverse
      />

      <ProductRail
        title="Tiffany"
        eyebrow="Two-Tone Solids"
        subtitle="Calm colour stories — reversible comfort with a polished finish."
        products={tiffany}
        viewAllHref="/shop?collection=tiffany"
      />

      <Testimonials />
      <BrandStory />
    </>
  );
}
