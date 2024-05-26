import React from "react";

interface TagProps {
  icon?: React.ReactNode;
  text: string;
}

const Tag = ({ text, icon }: TagProps) => {
  return (
    <div className="flex flex-row items-center gap-0.5 rounded-full bg-colors-red-5 px-2 py-0.5 text-xs font-medium text-red-11">
      {icon}
      {text}
    </div>
  );
};

export default Tag;
