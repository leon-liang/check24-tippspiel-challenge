"use client";
import * as Popover from "@radix-ui/react-popover";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import LogoutIcon from "@/components/icons/LogoutIcon";
import { useGetMe } from "@/hooks/api/users.api";

const UserBadge = () => {
  const session = useSession();
  const { data, isLoading, error } = useGetMe();

  const fullName = `${data?.data.user?.firstName ?? ""} ${data?.data.user?.lastName ?? ""}`;
  const username = `${data?.data.user?.username ?? ""}`;
  const email = `${data?.data.user?.email ?? ""}`;

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((word, index, array) =>
        index === 0 || index === array.length - 1 ? word[0] : "",
      )
      .join("");
  }

  function truncateText(text: string, maxLength: number) {
    return (text.length ?? maxLength) >= maxLength
      ? text?.slice(0, maxLength - 1) + "…"
      : text;
  }

  async function signOut() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sso-sign-out`, {
        headers: {
          // @ts-ignore
          refresh_token: session.data?.refreshToken,
        },
      });
    } catch (error) {
      console.error("Error occurred during sign out:", error);
    }
    await nextAuthSignOut();
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        asChild
        className="flex h-14 cursor-pointer flex-row gap-3 rounded-md p-2 hover:bg-colors-gray-3 data-[state=open]:bg-colors-gray-3"
      >
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded bg-colors-indigo-5">
            {getInitials(fullName)}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">
              {truncateText(username, 16)}
            </p>
            <p className="text-sm">{truncateText(email, 16)}</p>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="mb-2 w-[var(--radix-popover-trigger-width)] rounded-md border border-gray-6 bg-colors-white-A12 shadow-lg will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade">
          <div className="flex flex-col p-1.5 align-top">
            <p className="p-2 text-sm text-gray-11">
              {truncateText(fullName, 25)}
            </p>
            <hr className="my-2 border-gray-6" />
            <button
              className="flex flex-row items-center gap-2 rounded-md p-2 text-start text-sm hover:bg-colors-gray-3"
              onClick={async () => {
                await signOut();
              }}
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
