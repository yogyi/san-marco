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
    <section className="border-b border-black/5 bg-white">
      {/* Mobile: compact scroll */}
      <div className="flex gap-3.5 overflow-x-auto px-3 py-4 md:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group flex w-[66px] shrink-0 flex-col items-center"
          >
            <span className="relative block h-[58px] w-[58px] overflow-hidden rounded-full bg-[#f3f3f3] shadow-sm ring-1 ring-black/5">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover"
                sizes="58px"
                priority
              />
            </span>
            <span className="mt-1.5 text-center text-[10px] font-medium leading-tight text-ink/80">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop: edge-to-edge equal columns, circles fill most of each column */}
      <div className="mx-auto hidden w-full px-4 py-7 md:block md:px-6 lg:px-8 xl:px-10">
        <div className="grid w-full grid-cols-7 gap-x-3 lg:gap-x-5 xl:gap-x-6">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex w-full flex-col items-center"
            >
              <span className="relative block aspect-square w-full overflow-hidden rounded-full bg-[#f3f3f3] shadow-[0_8px_22px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition duration-300 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] group-hover:ring-burgundy/25">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width:1280px) 180px, (min-width:768px) 14vw, 58px"
                  priority
                />
              </span>
              <span className="mt-3 text-center text-[12px] font-medium tracking-[0.04em] text-ink transition group-hover:text-burgundy lg:text-[14px]">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
