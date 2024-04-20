import { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  variant?: "solid" | "soft";
}

const Button = ({ children, onClick }: PropsWithChildren<ButtonProps>) => {
  return (
    <button className="text-sm" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
