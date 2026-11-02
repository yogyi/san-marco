import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-deep">
          {eyebrow}
        </p>
      ) : null}

      <div
        className={cn(
          "flex w-full max-w-xl items-center gap-4",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        <span
          aria-hidden
          className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-gold/40 sm:block"
        />
        <h2 className="shrink-0 font-display text-4xl font-bold tracking-[-0.01em] text-burgundy md:text-5xl lg:text-[3.35rem]">
          {title}
        </h2>
        <span
          aria-hidden
          className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-gold/70 to-gold/40 sm:block"
        />
      </div>

      <span
        aria-hidden
        className="font-display text-lg leading-none text-gold/80"
      >
        ✦
      </span>

      {subtitle ? (
        <p className="max-w-md text-sm font-medium leading-relaxed tracking-wide text-muted md:text-[15px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
