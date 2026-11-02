import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-burgundy text-cream hover:bg-burgundy-deep shadow-[0_10px_30px_-18px_rgba(90,24,36,0.8)]",
        gold: "bg-gold text-burgundy-deep hover:bg-gold-soft",
        outline:
          "border border-burgundy/30 bg-transparent text-burgundy hover:border-burgundy hover:bg-burgundy/5",
        ghost: "text-burgundy hover:bg-burgundy/5",
        cream: "bg-cream text-burgundy hover:bg-ivory",
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
