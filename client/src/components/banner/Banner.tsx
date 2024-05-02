import { PropsWithChildren } from "react";

interface BannerProps {
  title: string;
}

const Banner = ({ title, children }: PropsWithChildren<BannerProps>) => {
  return (
    <div className="flex h-96 flex-col justify-center gap-8 bg-colors-purple-2 bg-topography-pattern px-32">
      <h1 className="text-4xl font-medium">{title}</h1>
      <div className="flex flex-col gap-1 text-gray-11">{children}</div>
    </div>
  );
};

export default Banner;
