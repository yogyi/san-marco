import Image from "next/image";
import Link from "next/link";

const categories = [
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
    label: "Gift Box",
    href: "/gifting",
    image: "/products/gift-bag.jpg",
  },
];

export function CircleCategories() {
  return (
    <section className="bg-white px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-[1100px] items-start justify-center gap-6 overflow-x-auto pb-1 sm:gap-10 md:gap-16 lg:gap-20">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group flex w-[100px] shrink-0 flex-col items-center sm:w-[130px] md:w-[150px]"
          >
            <span className="relative block aspect-square w-full overflow-hidden rounded-full bg-[#f5f5f5] shadow-[0_6px_20px_rgba(0,0,0,0.10)] ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="150px"
                priority
              />
            </span>
            <span className="mt-3 text-center text-[13px] font-medium tracking-[0.06em] text-[#333] transition group-hover:text-burgundy md:mt-4 md:text-[15px]">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
