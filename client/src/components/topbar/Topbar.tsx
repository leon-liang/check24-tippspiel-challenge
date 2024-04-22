import Image from "next/image";
import React, { PropsWithChildren } from "react";

const Topbar = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-16 w-full flex-row justify-between border-b border-gray-6 bg-colors-white-A12 px-6 py-4">
      <div className="relative h-full w-32">
        <Image src="/check24-logo.svg" alt="Check24 Logo" fill priority />
      </div>
      <div className="flex flex-row gap-4">{children}</div>
    </div>
  );
};

export default Topbar;
