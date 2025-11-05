const ORCIDIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={className}
  >
    <circle cx="128" cy="128" r="128" fill="#A6CE39" />
    <text
      x="50%"
      y="55%"
      fontFamily="Arial, sans-serif"
      fontSize="120"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      iD
    </text>
  </svg>
);

export default ORCIDIcon;
