const ResearchGateIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={className}
  >
    <rect width="256" height="256" rx="20" fill="#00CCBB" />
    <text
      x="50%"
      y="55%"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="120"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      RG
    </text>
  </svg>
);

export default ResearchGateIcon;
