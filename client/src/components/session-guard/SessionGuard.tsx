"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/api/auth/signin";
    },
  });

  return <>{children}</>;
}
