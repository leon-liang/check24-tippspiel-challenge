"use client";

import React, { PropsWithChildren } from "react";
import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";
import HomeIcon from "@/components/icons/HomeIcon";
import UserGroupIcon from "@/components/icons/UserGroupIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import { useGetUserCommunities } from "@/hooks/communities.api";

const Navigation = ({ children }: PropsWithChildren) => {
  const { data, isLoading, error } = useGetUserCommunities();
  const communities = data?.data.communities;

  const sidebarItems = [
    {
      icon: <HomeIcon width={22} height={22} />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <UserGroupIcon width={22} height={22} />,
      label: "Communities",
      nestedItems:
        communities?.map((community) => {
          return {
            label: community.community?.name ?? "",
            link: `/communities/${community.community?.id}`,
          };
        }) ?? [],
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
      <Topbar />
      <Sidebar sidebarItems={sidebarItems} />
      <div className="ml-64 mt-16">{children}</div>
    </>
  );
};

export default Navigation;
