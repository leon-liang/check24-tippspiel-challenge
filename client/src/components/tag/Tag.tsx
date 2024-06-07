import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "classnames";

type TagProps = {
  icon?: React.ReactNode;
  text?: string;
  variant?: "success" | "warning" | "mute";
  className?: string;
};

const tagVariants = cva(
  [
    "inline-flex",
    "flex-row",
    "items-center",
    "justify-center",
    "gap-0.5",
    "rounded-full",
    "px-2",
    "py-0.5",
    "text-xs",
    "font-medium",
  ],
  {
    variants: {
      variant: {
        warning: "bg-colors-red-5 text-red-11",
        success: "bg-colors-green-5 text-green-11",
        mute: "bg-colors-gray-5 text-gray-11",
      },
    },
  },
);

const Tag = ({
  text,
  icon,
  variant,
  className,
}: TagProps & VariantProps<typeof tagVariants>) => {
  return (
    <div className={cn(tagVariants({ variant }), className)}>
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default Tag;
