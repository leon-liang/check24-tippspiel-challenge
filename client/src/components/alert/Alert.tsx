import { cva, type VariantProps } from "class-variance-authority";

interface AlertProps {
  message: string;
  variant: "warning" | "success" | "danger";
}

const alertVariants = cva(
  ["w-full", "rounded-lg", "border", "px-6", "py-4", "text-sm"],
  {
    variants: {
      variant: {
        warning: "border-amber-6 bg-colors-amber-3 text-amber-12",
        success: "border-green-6 bg-colors-green-3 text-green-12",
        danger: "border-red-6 bg-colors-red-3 text-red-12",
      },
    },
  },
);

const Alert = ({
  message,
  variant,
}: AlertProps & VariantProps<typeof alertVariants>) => {
  return <div className={alertVariants({ variant })}>{message}</div>;
};

export default Alert;
