import Image from "next/image";
import Button from "../button/Button";

const Topbar = () => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-16 w-full flex-row justify-between border-b border-gray-6 bg-colors-white px-6 py-4">
      <div className="relative h-full w-32">
        <Image
          src="/check24-logo.svg"
          alt="Check24 Logo"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button>Create Community</Button>
        <Button>Join Community</Button>
      </div>
    </div>
  );
};

export default Topbar;
