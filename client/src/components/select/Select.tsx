import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import cn from "classnames";
import { cva, type VariantProps } from "class-variance-authority";

interface SelectProps {
  variant: "xs" | "md";
  items: string[];
  value: string;
  onValueChange: (value: string) => void;
}

const selectTriggerVariants = cva(
  [
    "inline-flex items-center justify-between gap-4 rounded-[4px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none hover:bg-colors-indigo-2 focus:shadow-[0_0_0_2px] focus:shadow-indigo-8",
  ],
  {
    variants: {
      variant: {
        md: "h-[35px] w-[200px] px-[15px] text-[15px]",
        xs: "h-[25px] w-[75px] px-[5px] text-sm",
      },
    },
  },
);

export const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> &
    SelectProps &
    VariantProps<typeof selectTriggerVariants>
>(
  (
    { variant, items, value, onValueChange, children, ...props },
    forwardedRef,
  ) => {
    return (
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        <SelectPrimitive.Trigger
          className={cn(selectTriggerVariants({ variant }))}
          ref={forwardedRef}
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon>
            <ChevronDownIcon width={20} height={20} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            sideOffset={5}
            position="popper"
            className="w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-gray-6 bg-colors-white-A12 shadow-lg"
          >
            <SelectPrimitive.Viewport className="p-[5px]">
              {items.map((item, index) => {
                return (
                  <SelectItem
                    variant={variant}
                    defaultChecked={index == 0}
                    key={index}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                );
              })}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);

Select.displayName = SelectPrimitive.Root.displayName;

const selectItemVariants = cva(
  [
    "relative flex select-none items-center rounded-[3px] leading-none text-indigo-11 data-[disabled]:pointer-events-none data-[highlighted]:bg-colors-indigo-3 data-[state='checked']:!bg-colors-indigo-9 data-[disabled]:text-indigo-8 data-[highlighted]:text-indigo-11 data-[state='checked']:!text-white-A12 data-[highlighted]:outline-none",
  ],
  {
    variants: {
      variant: {
        md: "h-[35px] pl-[25px] pr-[35px] text-[15px]",
        xs: "h-[20px] pl-[10px] pr-[20px] text-sm",
      },
    },
  },
);

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> &
    VariantProps<typeof selectItemVariants>
>(({ variant, className, children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      className={cn(selectItemVariants({ variant }))}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = SelectPrimitive.Item.displayName;
