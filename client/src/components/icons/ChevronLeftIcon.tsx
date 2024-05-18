const ChevronLeftIcon = ({ className, stroke, width, height }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke ?? "currentColor"}
      className={className}
      width={width}
      height={height}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export default ChevronLeftIcon;
