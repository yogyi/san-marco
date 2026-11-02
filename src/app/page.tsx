import { Hero } from "@/components/home/hero";
import { ProductRail } from "@/components/home/product-rail";
import { LookbookStrip } from "@/components/home/lookbook-strip";
import { EditorialBanner } from "@/components/home/editorial-banner";
import { Testimonials } from "@/components/home/testimonials";
import { BrandStory } from "@/components/home/brand-story";
import { products } from "@/data/products";

export default function HomePage() {
  const mostLoved = products.filter((p) => p.featured || p.bestseller).slice(0, 4);
  const florals = products.filter((p) => p.category === "floral").slice(0, 4);
  const mustHave = products.filter((p) => p.category === "solid" || p.newArrival).slice(0, 4);

  return (
    <>
      <Hero />


      <ProductRail title="Most Loved" products={mostLoved} />

      <LookbookStrip />

      <ProductRail
        title="Florals & Prints"
        products={florals}
        viewAllHref="/shop?category=floral"
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

      <ProductRail title="Must Have Pieces" products={mustHave} />

      <Testimonials />
      <BrandStory />
    </>
  );
}
