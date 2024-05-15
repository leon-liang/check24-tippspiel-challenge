"use client";

import React, { PropsWithChildren } from "react";
import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";
import HomeIcon from "@/components/icons/HomeIcon";
import UserGroupIcon from "@/components/icons/UserGroupIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import { useGetUserCommunities } from "@/hooks/communities.api";
import BoltIcon from "@/components/icons/BoltIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import useValidatePermissions from "@/hooks/use-validate-permissions";

const Navigation = ({ children }: PropsWithChildren) => {
  const { data } = useGetUserCommunities();
  const communities = data?.data.communities;
  const [isLoading, isPermitted] = useValidatePermissions(["admin:full"]);

  const sidebarItems = [
    {
      icon: <HomeIcon width={22} height={22} />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <BoltIcon width={22} height={22} />,
      label: "Your Bets",
      link: "/bets",
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

  if (!isLoading && isPermitted) {
    sidebarItems.splice(2, 0, {
      icon: <TicketIcon width={22} height={22} />,
      label: "Matches",
      link: "/matches",
    });
  }

  return (
    <>
      <Topbar />
      <Sidebar sidebarItems={sidebarItems} />
      <div className="ml-64 mt-16">{children}</div>
    </>
  );
};

export default Navigation;
