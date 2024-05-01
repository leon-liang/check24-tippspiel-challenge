"use client";

import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewPort,
} from "@/components/toast/Toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </Toast>
        );
      })}
      <ToastViewPort />
    </ToastProvider>
  );
}
