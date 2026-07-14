"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-sans text-[14px] font-semibold transition-[transform,box-shadow,background,filter] duration-300 ease-[cubic-bezier(.22,.9,.32,1)] active:scale-[0.96] active:duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-graphite text-mist shadow-[0_6px_18px_rgba(15,17,20,0.22)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,17,20,0.28)]",
        light:
          "border border-line bg-gradient-to-br from-white to-mist-2 text-graphite shadow-[var(--shadow-xs)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
        ghost:
          "border border-graphite-mist/70 text-graphite hover:-translate-y-0.5 hover:border-graphite",
        "ghost-inverse":
          "border border-white/30 text-mist hover:-translate-y-0.5 hover:border-white/70",
        accent:
          "bg-accent text-white shadow-[0_8px_22px_rgba(163,121,63,0.35)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(163,121,63,0.42)]",
        link: "text-graphite underline-offset-4 hover:underline",
      },
      size: {
        default: "px-7 py-3.5",
        sm: "px-5 py-2.5 text-[13px]",
        lg: "px-9 py-4 text-[15px]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  href?: string;
  sheen?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, sheen = true, children, ...props }, ref) => {
    const classes = cn(buttonStyles({ variant, size }), className);
    const content = (
      <>
        {sheen && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,.9,.32,1)] group-hover:translate-x-[120%]"
          />
        )}
        <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
      </>
    );

    if (href) {
      return (
        <Link href={href} className={cn(classes, "group")}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={cn(classes, "group")} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
