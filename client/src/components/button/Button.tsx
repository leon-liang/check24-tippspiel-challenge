import React, { forwardRef, PropsWithChildren } from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "action" | "mute";
};

const Button = forwardRef(function Button(
  { children, ...rest }: PropsWithChildren<ButtonProps>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button ref={ref} className={`text-sm`} {...rest}>
      {children}
    </button>
  );
});

export default Button;
