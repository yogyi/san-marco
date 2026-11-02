import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  className,
  light = false,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <div className="section-rule mb-3">
        <h2
          className={cn(
            "px-2 font-display text-3xl tracking-[0.04em] uppercase md:text-4xl",
            light ? "text-ivory" : "text-ink"
          )}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className={cn("font-display text-lg italic md:text-xl", light ? "text-ivory/75" : "text-muted")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
