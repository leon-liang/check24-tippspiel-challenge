const DotIcon = ({ className, width, height, stroke }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={stroke ?? "currentColor"}
      width={width}
      height={height}
      className={className}
    >
      <circle cx="12.1" cy="12.1" r="4" />
    </svg>
  );
};

export default DotIcon;
