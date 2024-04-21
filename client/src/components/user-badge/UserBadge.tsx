"use client";
import * as Popover from "@radix-ui/react-popover";
import { signOut as nextAuthSignOut } from "next-auth/react";
import LogoutIcon from "@/components/icons/LogoutIcon";

const UserBadge = () => {
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((word, index, array) =>
        index === 0 || index === array.length - 1 ? word[0] : "",
      )
      .join("");
  }

  async function signOut() {
    await nextAuthSignOut();
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        asChild
        className="flex h-16 cursor-pointer flex-row gap-3 rounded-md p-3 hover:bg-colors-gray-3 data-[state=open]:bg-colors-gray-3"
      >
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded bg-colors-purple-5">
            {getInitials("Leon Liang")}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">leon.liang</p>
            <p className="text-sm">hello@leonliang.lu</p>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="mb-2 w-[var(--radix-popover-trigger-width)] rounded-md border border-gray-6 shadow-lg will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade">
          <div className="flex flex-col p-1.5 align-top">
            <p className="p-2 text-sm text-gray-11">Leon Liang</p>
            <hr className="my-2 border-gray-6" />
            <button
              className="flex flex-row items-center gap-2 rounded-md p-2 text-start text-sm hover:bg-colors-gray-3"
              onClick={signOut}
            >
              <LogoutIcon width={24} height={24} />
              <p>Logout</p>
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default UserBadge;
