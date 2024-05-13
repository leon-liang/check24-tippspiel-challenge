"use client";

import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import Banner, { BannerTitle } from "@/components/banner/Banner";

const Matches = () => {
  const session = useSession();

  if (
    session.status !== "loading" &&
    // @ts-ignore
    !session.data?.roles.includes("admin:full")
  ) {
    return notFound();
  }

  return (
    <>
      <Banner>
        <BannerTitle>Matches</BannerTitle>
      </Banner>
    </>
  );
};

export default Matches;
