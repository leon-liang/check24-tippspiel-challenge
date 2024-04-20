import { PropsWithChildren } from "react";
import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/Sidebar";
import HomeIcon from "@/components/icons/HomeIcon";
import UserGroupIcon from "@/components/icons/UserGroupIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";

const Navigation = ({ children }: PropsWithChildren) => {
  const sidebarItems = [
    {
      icon: <HomeIcon width={28} height={28} />,
      label: "Dashboard",
    },
    {
      icon: <UserGroupIcon width={28} height={28} />,
      label: "Communities",
      nestedItems: [
        {
          label: "Community A",
        },
        {
          label: "Community B",
        },
      ],
    },
    {
      icon: <SettingsIcon width={28} height={28} />,
      label: "Settings",
    },
    {
      icon: <DocumentIcon width={28} height={28} />,
      label: "Docs",
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
