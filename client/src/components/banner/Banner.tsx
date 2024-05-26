"use client";

import { PropsWithChildren } from "react";
import cn from "classnames";

const Banner = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-96 flex-col justify-center gap-8 bg-colors-purple-2 bg-topography-pattern px-[10%]">
      {children}
    </div>
  );
};

export default Banner;

interface BannerTitleProps {
  className?: string;
}

export const BannerTitle = ({
  className,
  children,
}: PropsWithChildren<BannerTitleProps>) => {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap items-center gap-8 text-4xl font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BannerContentProps {
  className?: string;
}

export const BannerContent = ({
  className,
  children,
}: PropsWithChildren<BannerContentProps>) => {
  return (
    <div className={cn("flex flex-col gap-1 text-gray-11", className)}>
      {children}
    </div>
  );
};
