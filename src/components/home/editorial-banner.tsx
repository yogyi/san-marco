import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function EditorialBanner({
  eyebrow,
  title,
  body,
  cta,
  href,
  image,
  reverse = false,
  tone = "sand",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  reverse?: boolean;
  tone?: "sand" | "blush" | "sage";
}) {
  const stage =
    tone === "blush"
      ? "from-[#f3ebe4] via-[#faf6f1] to-[#eadfd4]"
      : tone === "sage"
        ? "from-[#e8f0ef] via-[#f4f7f6] to-[#dde8e6]"
        : "from-[#efe8df] via-[#f8f4ee] to-[#e6ddd2]";

  const panel =
    tone === "blush"
      ? "bg-[#faf6f1]"
      : tone === "sage"
        ? "bg-[#f4f7f6]"
        : "bg-[#f8f4ee]";

  return (
    <section className={cn("border-y border-gold/15", panel)}>
      <div
        className={cn(
          "mx-auto grid max-w-[1400px] items-stretch md:grid-cols-2",
          reverse && "md:[&>*:first-child]:order-2"
        )}
      >
        {/* Image stage */}
        <div className={cn("relative min-h-[340px] bg-gradient-to-br p-6 md:min-h-[520px] md:p-10", stage)}>
          <span aria-hidden className="absolute left-5 top-5 h-5 w-5 border-l border-t border-gold/55 md:left-8 md:top-8" />
          <span aria-hidden className="absolute right-5 top-5 h-5 w-5 border-r border-t border-gold/55 md:right-8 md:top-8" />
          <span aria-hidden className="absolute bottom-5 left-5 h-5 w-5 border-b border-l border-gold/55 md:bottom-8 md:left-8" />
          <span aria-hidden className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-gold/55 md:bottom-8 md:right-8" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(42,28,31,0.06)_100%)]"
          />
          <div className="relative h-full min-h-[292px] w-full md:min-h-[440px]">
            <Image
              src={image}
              alt=""
              fill
              className="object-contain object-center drop-shadow-[0_22px_40px_rgba(42,28,31,0.16)]"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center px-6 py-12 md:px-14 md:py-16 lg:px-16">
          {eyebrow ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-gold-deep">
              {eyebrow}
            </p>
          ) : null}

          <h2 className="mt-4 max-w-md font-display text-4xl font-bold leading-[1.05] text-burgundy md:text-5xl lg:text-[3.4rem]">
            {title}
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span aria-hidden className="font-display text-base font-semibold text-gold/90">
              ✦
            </span>
          </div>

          <p className="mt-5 max-w-md text-[15px] font-medium leading-relaxed text-ink/80 md:text-base">
            {body}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-block bg-burgundy px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cream transition hover:bg-burgundy-deep"
            >
              {cta}
            </Link>
            <Link
              href="/collections/festive"
              className="inline-block border border-burgundy/40 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-burgundy transition hover:border-burgundy hover:bg-burgundy hover:text-cream"
            >
              Festive Prices
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
