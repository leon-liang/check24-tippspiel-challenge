"use client";

import React, { useState } from "react";
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";

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
        {nestedItems &&
          (showNestedItems ? (
            <ChevronUp width={28} height={28} />
          ) : (
            <ChevronDown width={28} height={28} />
          ))}
      </div>
      <div className="ml-4">
        {showNestedItems &&
          nestedItems?.map((nestedItemProps, index) => {
            return (
              <div key={index} className="border-l-2 border-gray-6">
                <SidebarItem {...nestedItemProps} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarItem;
