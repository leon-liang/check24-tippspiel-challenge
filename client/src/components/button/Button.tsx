import React, { forwardRef, PropsWithChildren } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "classnames";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "action" | "mute";
};
const buttonVariants = cva(
  [
    "rounded-md",
    "px-5",
    "font-medium",
    "py-2",
    "text-sm",
    "focus:outline-none",
  ],
  {
    variants: {
      variant: {
        action: "bg-colors-gray-12 text-white-A12 hover:bg-colors-gray-11",
        mute: "bg-colors-indigo-3 text-grey-12 hover:bg-colors-indigo-4",
      },
    },
    defaultVariants: {
      variant: "action",
    },
  },
);
const Button = forwardRef(function Button(
  {
    className,
    variant,
    children,
    ...rest
  }: PropsWithChildren<ButtonProps> & VariantProps<typeof buttonVariants>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
