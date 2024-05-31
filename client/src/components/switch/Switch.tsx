import React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

interface SwitchProps {
  name: string;
  displayName: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const Switch = ({
  name,
  displayName,
  onChange,
  checked,
}: SwitchProps) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <SwitchPrimitive.Root
        onCheckedChange={onChange}
        checked={checked}
        className="relative h-[25px] w-[42px] cursor-pointer rounded-full bg-colors-black-A3 outline-none data-[state=checked]:bg-colors-green-10"
        id={name}
      >
        <SwitchPrimitive.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-colors-white-A12 shadow-[0_2px_2px] shadow-black-A4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </SwitchPrimitive.Root>
      <label className="text-left text-sm text-gray-11" htmlFor={name}>
        {displayName}
      </label>
    </div>
  );
};

export default Switch;
