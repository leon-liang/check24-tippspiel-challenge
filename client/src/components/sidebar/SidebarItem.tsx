"use client";

import React, { useState } from "react";
import ChevronUp from "@/components/icons/ChevronUp";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type SidebarItem = { icon?: React.ReactNode; label: string };
type SidebarItemLink = { link: string; nestedItems?: never };
type SidebarItemParent = { nestedItems: SidebarItemProps[]; link?: never };
export type SidebarItemProps = SidebarItem &
  (SidebarItemLink | SidebarItemParent);

const SidebarItem = ({ icon, label, link, nestedItems }: SidebarItemProps) => {
  const currentPath = usePathname();
  const router = useRouter();

  const [showNestedItems, setShowNestedItems] = useState<boolean>(true);

  const toggleNestedItems = () => {
    setShowNestedItems(!showNestedItems);
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "flex cursor-pointer flex-row justify-between rounded-md p-2 text-gray-12 hover:bg-colors-gray-3",
          {
            "bg-colors-gray-3": link && link.startsWith(currentPath ?? ""),
          },
        )}
        onClick={
          link ? () => router.push(link) : nestedItems && toggleNestedItems
        }
      >
        <div className="flex flex-row items-center gap-4">
          <span>{icon ?? null}</span>
          <p>{label}</p>
        </div>
        {nestedItems && (
          <motion.div
            animate={{ rotate: showNestedItems ? 0 : -180 }}
            transition={{ ease: "linear", duration: 0.1 }}
          >
            <ChevronUp width={28} height={28} />
          </motion.div>
        )}
      </div>
      <div className="ml-3">
        <AnimatePresence>
          {showNestedItems &&
            nestedItems?.map((nestedItemProps, index) => {
              return (
                <motion.div
                  key={index}
                  className="border-l-2 border-gray-6 pl-1 hover:border-gray-8"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <SidebarItem {...nestedItemProps} />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarItem;
