import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "Shop All",
    href: "/shop",
    image: "/products/lifestyle-set-1.jpg",
  },
  {
    label: "Venice",
    href: "/shop?collection=venice",
    image: "/products/sunshine-teal-stripe.jpg",
  },
  {
    label: "Alberta",
    href: "/shop?collection=alberta",
    image: "/products/grey-blossom.jpg",
  },
  {
    label: "Tiffany",
    href: "/shop?collection=tiffany",
    image: "/products/sage-green.jpg",
  },
  {
    label: "Festive Edit",
    href: "/collections/festive",
    image: "/products/rose-blush-garden.jpg",
  },
  {
    label: "Gifting",
    href: "/gifting",
    image: "/products/gift-bag.jpg",
  },
  {
    label: "Our Story",
    href: "/about",
    image: "/brand/san-marco-logo.jpg",
  },
];

export function CircleCategories() {
  return (
    <section className="border-b border-black/5 bg-white px-3 py-5 md:px-6 md:py-8 lg:px-10 lg:py-9">
      {/* Mobile: compact scroll row */}
      <div className="flex items-start justify-start gap-4 overflow-x-auto pb-1 md:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group flex w-[68px] shrink-0 flex-col items-center"
          >
            <span className="relative block h-14 w-14 overflow-hidden rounded-full bg-[#f5f5f5] shadow-[0_3px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover"
                sizes="56px"
                priority
              />
            </span>
            <span className="mt-1.5 text-center text-[10px] font-medium leading-tight text-ink/80">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop / tablet: full-width equal columns, larger circles */}
      <div className="mx-auto hidden w-full max-w-[1400px] grid-cols-7 gap-3 md:grid lg:gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group flex flex-col items-center"
          >
            <span className="relative mx-auto block aspect-square w-full max-w-[140px] overflow-hidden rounded-full bg-[#f5f5f5] shadow-[0_6px_18px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition duration-300 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)] group-hover:ring-burgundy/20 lg:max-w-[160px]">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="160px"
                priority
              />
            </span>
            <span className="mt-3 text-center text-[13px] font-medium tracking-[0.03em] text-ink transition group-hover:text-burgundy lg:text-[14px]">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
