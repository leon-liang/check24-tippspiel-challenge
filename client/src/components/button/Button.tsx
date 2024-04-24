import React, { forwardRef, PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  variant?: "solid" | "soft";
}

const Button = forwardRef(function Button(
  { onClick, children }: PropsWithChildren<ButtonProps>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button ref={ref} className="text-sm" onClick={onClick}>
      {children}
    </button>
  );
});

export default Button;
