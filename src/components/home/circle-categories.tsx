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
];

export function CircleCategories() {
  return (
    <section className="border-b border-black/5 bg-cream/40 px-3 py-4 md:px-6 md:py-5">
      <div className="mx-auto flex max-w-5xl items-start justify-start gap-4 overflow-x-auto px-1 pb-1 sm:justify-center sm:gap-5 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group flex w-[64px] shrink-0 flex-col items-center sm:w-[72px]"
          >
            <span className="relative block h-14 w-14 overflow-hidden rounded-full bg-white shadow-[0_3px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition group-hover:ring-burgundy/25 sm:h-16 sm:w-16">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition duration-400 group-hover:scale-105"
                sizes="64px"
                priority
              />
            </span>
            <span className="mt-1.5 text-center text-[10px] font-medium leading-tight tracking-[0.02em] text-ink/80 transition group-hover:text-burgundy sm:text-[11px]">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
