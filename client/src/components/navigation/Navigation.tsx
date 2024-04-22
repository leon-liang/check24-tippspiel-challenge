"use client";

import React, { PropsWithChildren } from "react";
import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";
import HomeIcon from "@/components/icons/HomeIcon";
import UserGroupIcon from "@/components/icons/UserGroupIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import Button from "@/components/button/Button";
import CreateCommunity from "@/views/create-community/CreateCommunity";

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
        <CreateCommunity />
      </Topbar>
      <Sidebar sidebarItems={sidebarItems} />
      <div className="ml-64 mt-16">{children}</div>
    </>
  );
};

export default Navigation;
