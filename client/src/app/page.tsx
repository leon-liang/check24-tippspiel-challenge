"use client";

import { useGetExample } from "@/hooks/example.api";
import { signOut } from "next-auth/react";

export default function Home() {
  const { isLoading, error, data } = useGetExample();

  return (
    <main>
      <p>{isLoading ? "Loading..." : data?.data.message}</p>
    </main>
  );
}
