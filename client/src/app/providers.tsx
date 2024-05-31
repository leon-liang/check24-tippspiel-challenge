"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProvider refetchInterval={4 * 60}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
