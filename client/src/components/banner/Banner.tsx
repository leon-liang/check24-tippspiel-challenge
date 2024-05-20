"use client";

import { PropsWithChildren } from "react";

const Banner = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-96 flex-col justify-center gap-8 bg-colors-purple-2 bg-topography-pattern px-[10%]">
      {children}
    </div>
  );
};

export default Banner;

export const BannerTitle = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-8 text-4xl font-medium">
      {children}
    </div>
  );
};

export const BannerContent = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-1 text-gray-11">{children}</div>;
};
