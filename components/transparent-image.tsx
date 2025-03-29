interface TransparentImageProps {
  title: string
  width: number
  height: number
  iconType?: "chart" | "trading" | "money" | "analysis" | "platform" | "automation"
  className?: string
}

export function TransparentImage({ title, width, height, iconType = "chart", className = "" }: TransparentImageProps) {
  // Choose icon color based on type
  const getColor = () => {
    switch (iconType) {
      case "chart":
        return "#3B82F6" // blue-500
      case "trading":
        return "#8B5CF6" // purple-500
      case "money":
        return "#10B981" // emerald-500
      case "analysis":
        return "#F59E0B" // amber-500
      case "platform":
        return "#EC4899" // pink-500
      case "automation":
        return "#6366F1" // indigo-500
      default:
        return "#3B82F6" // blue-500
    }
  }

  // Choose icon path based on type
  const getIconPath = () => {
    switch (iconType) {
      case "chart":
        return (
          <path
            d="M3,16h4v4H3V16z M9,10h4v10H9V10z M15,4h4v16h-4V4z M2,8h2v2H2V8z M5,4h2v2H5V4z M9,6h2v2H9V6z M13,2h2v2h-2V2z M17,8h2v2h-2V8z"
            fill={getColor()}
          />
        )
      case "trading":
        return <path d="M3,12h4l3-9l4,18l3-12h4 M2,19h20" stroke={getColor()} strokeWidth="2" fill="none" />
      case "money":
        return (
          <g>
            <circle cx="12" cy="12" r="10" fill="none" stroke={getColor()} strokeWidth="2" />
            <path d="M12,6v12 M8,10h8 M8,14h8" stroke={getColor()} strokeWidth="2" />
          </g>
        )
      case "analysis":
        return (
          <g>
            <path d="M4,4v16h16" stroke={getColor()} strokeWidth="2" fill="none" />
            <path d="M7,14l3-3l4,4l5-5" stroke={getColor()} strokeWidth="2" fill="none" />
            <circle cx="7" cy="14" r="1" fill={getColor()} />
            <circle cx="10" cy="11" r="1" fill={getColor()} />
            <circle cx="14" cy="15" r="1" fill={getColor()} />
            <circle cx="19" cy="10" r="1" fill={getColor()} />
          </g>
        )
      case "platform":
        return (
          <g>
            <rect x="3" y="3" width="18" height="14" rx="2" stroke={getColor()} strokeWidth="2" fill="none" />
            <path d="M8,21h8 M12,17v4" stroke={getColor()} strokeWidth="2" />
            <path d="M7,8h10 M7,12h6" stroke={getColor()} strokeWidth="2" />
          </g>
        )
      case "automation":
        return (
          <g>
            <circle cx="12" cy="12" r="8" fill="none" stroke={getColor()} strokeWidth="2" />
            <path d="M12,8v4l3,3" stroke={getColor()} strokeWidth="2" />
            <path d="M5,5l2,2 M19,19l-2,-2 M5,19l2,-2 M19,5l-2,2" stroke={getColor()} strokeWidth="1" />
          </g>
        )
      default:
        return <path d="M3,16h4v4H3V16z M9,10h4v10H9V10z M15,4h4v16h-4V4z" fill={getColor()} />
    }
  }

  return (
    <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
      <title>{title}</title>
      <rect width="24" height="24" fill="none" />
      {getIconPath()}
      <text
        x="50%"
        y="90%"
        fontSize="3px"
        textAnchor="middle"
        fill={getColor()}
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {title}
      </text>
    </svg>
  )
}

