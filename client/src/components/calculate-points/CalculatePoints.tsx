import Button from "@/components/button/Button";
import React, { useState } from "react";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

interface CalculatePointsProps {
  onClick: () => void;
}

const CalculatePoints = ({ onClick }: CalculatePointsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      className="flex flex-row items-center gap-3 text-xs"
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        onClick();
      }}
    >
      {isLoading ? (
        <SpinnerIcon height={16} width={16} className="animate-spin" />
      ) : null}
      Calculate Points
    </Button>
  );
};

export default CalculatePoints;
