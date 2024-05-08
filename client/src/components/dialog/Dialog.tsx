import React, { ForwardedRef, PropsWithChildren } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import CrossIcon from "@/components/icons/CrossIcon";

export const DialogContent = React.forwardRef(function DialogContent(
  { children, ...props }: PropsWithChildren,
  forwardedRef: ForwardedRef<HTMLDivElement>,
) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-20 bg-colors-black-A3 data-[state=open]:animate-overlayShow" />
      <DialogPrimitive.Content
        {...props}
        ref={forwardedRef}
        className="fixed left-[50%] top-[50%] z-30 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-colors-white-A12 p-[25px] shadow-lg focus:outline-none data-[state=open]:animate-contentShow"
      >
        {children}
        <DialogPrimitive.Close asChild>
          <button
            className="absolute right-[10px] top-[10px] inline-flex h-[32px] w-[32px] appearance-none items-center justify-center rounded text-gray-11 hover:bg-colors-gray-4 focus:shadow-[0_0_0_2px] focus:shadow-gray-7 focus:outline-none"
            aria-label="Close"
          >
            <CrossIcon width={24} height={24} />
          </button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const DialogTitle = ({ children }: PropsWithChildren) => {
  return (
    <DialogPrimitive.Title className="m-0 text-[17px] font-medium text-gray-12">
      {children}
    </DialogPrimitive.Title>
  );
};

export const DialogDescription = ({ children }: PropsWithChildren) => {
  return (
    <DialogPrimitive.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-gray-11">
      {children}
    </DialogPrimitive.Description>
  );
};

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
