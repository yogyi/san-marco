import Link from "next/link";
import Image from "next/image";

export function EditorialBanner({
  eyebrow,
  title,
  body,
  cta,
  href,
  image,
  reverse = false,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <section className="bg-[#f7f5f2]">
      <div
        className={`mx-auto grid max-w-[1400px] items-center md:grid-cols-2 ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative min-h-[320px] md:min-h-[460px]">
          <Image src={image} alt="" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="px-6 py-12 md:px-14 md:py-16">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-deep">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-burgundy md:text-5xl lg:text-[3.35rem]">
            {title}
          </h2>
          <span aria-hidden className="mt-3 block font-display text-lg font-semibold text-gold/80">
            ✦
          </span>
          <p className="mt-5 max-w-md text-[15px] font-medium leading-relaxed text-muted">{body}</p>
          <Link
            href={href}
            className="mt-9 inline-block border border-burgundy/80 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy transition hover:bg-burgundy hover:text-cream"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
