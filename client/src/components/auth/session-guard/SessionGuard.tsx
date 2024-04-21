"use client";

import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/api/auth/signin";
    },
  });
  useEffect(() => {
    // @ts-ignore
    if (data?.error === "RefreshAccessTokenError") {
      signIn("keycloak");
    }
  }, [data]);

  return <>{children}</>;
}
