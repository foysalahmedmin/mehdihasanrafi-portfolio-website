const GoogleScholarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={className}
  >
    <rect width="256" height="256" rx="20" fill="#4285F4" />
    <polygon points="64,64 192,64 192,192 64,192" fill="#FBBC05" />
    <polygon points="64,64 192,64 128,128 64,128" fill="#34A853" />
    <polygon points="128,128 192,64 192,192 128,192" fill="#EA4335" />
  </svg>
);

export default GoogleScholarIcon;
