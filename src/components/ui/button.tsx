import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-ivory hover:bg-ink/90 shadow-soft",
        gold: "bg-[#c9a86a] text-ink hover:bg-[#d4bc7d]",
        burgundy:
          "bg-burgundy text-ivory hover:bg-burgundy-deep",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:border-gold hover:text-gold-deep",
        ghost: "text-ink/70 hover:bg-sand/70 hover:text-ink",
        cream: "bg-cream text-ink hover:bg-sand",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs tracking-wide",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={asChild ? undefined : type ?? "button"}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
