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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-burgundy">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">{body}</p>
          <Link
            href={href}
            className="mt-8 inline-block border border-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-ink hover:text-white"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
