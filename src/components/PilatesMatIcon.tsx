type IconProps = {
  size?: number
  strokeWidth?: number
  className?: string
}

export function PilatesMatIcon({ size = 24, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="7" width="20" height="10" rx="2.5" />
      <line x1="6" y1="10" x2="6" y2="14" />
      <line x1="10.5" y1="10" x2="10.5" y2="14" />
      <line x1="15" y1="10" x2="15" y2="14" />
      <line x1="19.5" y1="10" x2="19.5" y2="14" />
    </svg>
  )
}
