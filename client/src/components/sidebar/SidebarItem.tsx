"use client";

import React, { useState } from "react";
import ChevronUp from "@/components/icons/ChevronUp";
import { motion, AnimatePresence } from "framer-motion";

export interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  link?: string;
  nestedItems?: SidebarItemProps[];
}

const SidebarItem = ({ icon, label, nestedItems }: SidebarItemProps) => {
  const [showNestedItems, setShowNestedItems] = useState<boolean>(true);

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row justify-between py-2"
        onClick={() => {
          nestedItems && setShowNestedItems(!showNestedItems);
        }}
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
      <div className="ml-4">
        <AnimatePresence>
          {showNestedItems &&
            nestedItems?.map((nestedItemProps, index) => {
              return (
                <motion.div
                  key={index}
                  className="border-l-2 border-gray-6"
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
