import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full border border-burgundy/15 bg-ivory/60 px-4 py-2 text-sm text-ink placeholder:text-ink/40 outline-none transition focus:border-burgundy/40 focus:bg-white focus:ring-2 focus:ring-gold/30",
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
