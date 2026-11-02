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

/** Circular category menu — phones only. Desktop uses text nav in the header. */
export function CircleCategories() {
  return (
    <section className="border-b border-black/5 bg-white px-3 py-4 md:hidden">
      <div className="flex gap-3.5 overflow-x-auto pb-1">
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
    </section>
  );
}
