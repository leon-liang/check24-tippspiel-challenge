import SidebarItem, {
  SidebarItemProps,
} from "@/components/sidebar/SidebarItem";
import UserBadge from "@/components/user-badge/UserBadge";

interface SidebarProps {
  sidebarItems: SidebarItemProps[];
}

const Sidebar = ({ sidebarItems }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 border-r border-gray-6 pt-16">
      <div className="flex h-full flex-col justify-between px-6 py-4">
        <div>
          {sidebarItems.map((itemProps, index) => {
            return <SidebarItem key={index} {...itemProps} />;
          })}
        </div>
        <div>
          <UserBadge />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
