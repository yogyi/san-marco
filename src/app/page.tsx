import { Hero } from "@/components/home/hero";
import { FeaturedStrip } from "@/components/home/featured-strip";
import { OrnateEdit, ShopByCategory } from "@/components/home/ornate-edit";
import { Trending } from "@/components/home/trending";
import { PricingBanner } from "@/components/home/pricing-banner";
import { Testimonials } from "@/components/home/testimonials";
import { GiftingCta } from "@/components/home/gifting-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedStrip />
      <OrnateEdit />
      <ShopByCategory />
      <Trending />
      <PricingBanner />
      <Testimonials />
      <GiftingCta />
    </>
  );
}
