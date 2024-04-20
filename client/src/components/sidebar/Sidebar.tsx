import SidebarItem, {
  SidebarItemProps,
} from "@/components/sidebar/SidebarItem";

interface SidebarProps {
  sidebarItems: SidebarItemProps[];
}

const Sidebar = ({ sidebarItems }: SidebarProps) => {
  return (
    <div className="fixed h-screen w-64 border-r border-gray-6 px-6 py-4">
      <div className="flex flex-col">
        {sidebarItems.map((itemProps, index) => {
          return <SidebarItem key={index} {...itemProps} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
