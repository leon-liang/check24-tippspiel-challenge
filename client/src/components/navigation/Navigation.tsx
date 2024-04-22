"use client";

import React, { PropsWithChildren } from "react";
import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";
import HomeIcon from "@/components/icons/HomeIcon";
import UserGroupIcon from "@/components/icons/UserGroupIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import Button from "@/components/button/Button";
import CrossIcon from "@/components/icons/CrossIcon";
import * as Dialog from "@radix-ui/react-dialog";

const Navigation = ({ children }: PropsWithChildren) => {
  const sidebarItems = [
    {
      icon: <HomeIcon width={22} height={22} />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <UserGroupIcon width={22} height={22} />,
      label: "Communities",
      nestedItems: [
        {
          label: "Community A",
          link: "/communities/0748f5be-466a-40b5-bf54-cb249567ceb7",
        },
        {
          label: "Community B",
          link: "/communities/ca5a2eda-0386-46b5-8a98-9fa5d3e15fff",
        },
      ],
    },
    {
      icon: <SettingsIcon width={22} height={22} />,
      label: "Settings",
      link: "/settings",
    },
    {
      icon: <DocumentIcon width={22} height={22} />,
      label: "Docs",
      link: "/docs",
    },
  ];

  return (
    <>
      <Topbar>
        <Button>Join Community</Button>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Create Community</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-20 bg-colors-black-A6 data-[state=open]:animate-overlayShow" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-30 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-colors-white-A12 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
              <Dialog.Title className="m-0 text-[17px] font-medium text-gray-12">
                Create Community
              </Dialog.Title>
              <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-gray-11">
                Give your community a name. Click save when you are done.
              </Dialog.Description>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="w-[90px] text-right text-[15px] text-indigo-11"
                  htmlFor="name"
                >
                  Community Name
                </label>
                <input
                  className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
                  id="community-name"
                />
              </fieldset>
              <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                  <button className="inline-flex h-[35px] w-[80px] items-center justify-center rounded-[4px] bg-colors-gray-12 px-[15px] leading-none text-white-A12 hover:bg-colors-gray-11 focus:shadow-[0_0_0_2px] focus:shadow-gray-7 focus:outline-none">
                    Save
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button
                  className="absolute right-[10px] top-[10px] inline-flex h-[32px] w-[32px] appearance-none items-center justify-center rounded text-gray-11 hover:bg-colors-gray-4 focus:shadow-[0_0_0_2px] focus:shadow-gray-7 focus:outline-none"
                  aria-label="Close"
                >
                  <CrossIcon width={24} height={24} />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Topbar>
      <Sidebar sidebarItems={sidebarItems} />
      <div className="ml-64 mt-16">{children}</div>
    </>
  );
};

export default Navigation;
