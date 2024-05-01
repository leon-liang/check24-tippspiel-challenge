"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import React from "react";
import CheckIcon from "@/components/icons/CheckIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { colors } from "../../../tailwind.config";

const ToastProvider = ToastPrimitive.Provider;

const ToastViewPort = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      {...props}
    />
  );
});

ToastViewPort.displayName = ToastPrimitive.Viewport.displayName;

type ToastVariants = {
  variant?: "success" | "error";
};

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & ToastVariants
>(({ variant, className, children, ...props }, ref) => {
  function renderIcon() {
    switch (variant) {
      case "success":
        return (
          <div className="rounded bg-colors-green-4 p-2">
            <CheckIcon stroke={colors.green["11"]} height={24} width={24} />
          </div>
        );
      case "error":
        return (
          <div className="rounded bg-colors-red-4 p-2">
            <CrossIcon stroke={colors.red["11"]} height={24} width={24} />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <ToastPrimitive.Root
      ref={ref}
      className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-colors-white-A12 p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
      {...props}
    >
      <div className="flex flex-row items-center gap-4">
        {renderIcon()}
        <div>{children}</div>
      </div>
    </ToastPrimitive.Root>
  );
});

Toast.displayName = ToastPrimitive.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className="mb-[2px] text-[15px] font-medium text-gray-12 [grid-area:_title]"
      {...props}
    />
  );
});

ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className="m-0 text-[13px] leading-[1.3] text-gray-11 [grid-area:_description]"
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export {
  type ToastProps,
  ToastProvider,
  ToastViewPort,
  Toast,
  ToastTitle,
  ToastDescription,
};
