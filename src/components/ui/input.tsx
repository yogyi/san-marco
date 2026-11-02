import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full border border-ink/10 bg-cream/80 px-4 py-2 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-gold/50 focus:bg-white focus:ring-2 focus:ring-gold/25",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
