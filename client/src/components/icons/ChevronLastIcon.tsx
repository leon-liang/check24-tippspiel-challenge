const ChevronLastIcon = ({ className, stroke, width, height }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke ?? "currentColor"}
      className={className}
      width={width}
      height={height}
    >
      <path d="m7 18 6-6-6-6" />
      <path d="M17 6v12" />
    </svg>
  );
};

export default ChevronLastIcon;
