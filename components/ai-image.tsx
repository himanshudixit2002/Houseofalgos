interface AIImageProps {
  title: string
  width: number
  height: number
  type?: "trading" | "chart" | "money" | "platform" | "automation" | "analysis"
  className?: string
}

export function AIImage({ title, width, height, type = "trading", className = "" }: AIImageProps) {
  // Generate a gradient based on the type
  const getGradient = () => {
    switch (type) {
      case "trading":
        return (
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E22CE" /> {/* Purple */}
              <stop offset="50%" stopColor="#EC4899" /> {/* Pink */}
              <stop offset="100%" stopColor="#F59E0B" /> {/* Amber/Gold */}
            </linearGradient>
            <filter id={`glow-${title.replace(/\s+/g, "-")}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        )
      case "chart":
        return (
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" /> {/* Purple */}
              <stop offset="50%" stopColor="#FBBF24" /> {/* Amber/Gold */}
              <stop offset="100%" stopColor="#F59E0B" /> {/* Amber/Gold */}
            </linearGradient>
            <filter id={`glow-${title.replace(/\s+/g, "-")}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        )
      case "money":
        return (
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E22CE" /> {/* Purple */}
              <stop offset="50%" stopColor="#F59E0B" /> {/* Amber/Gold */}
              <stop offset="100%" stopColor="#FBBF24" /> {/* Brighter Gold */}
            </linearGradient>
            <filter id={`glow-${title.replace(/\s+/g, "-")}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        )
      case "platform":
        return (
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" /> {/* Purple */}
              <stop offset="50%" stopColor="#F59E0B" /> {/* Amber/Gold */}
              <stop offset="100%" stopColor="#DB2777" /> {/* Pink */}
            </linearGradient>
            <filter id={`glow-${title.replace(/\s+/g, "-")}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        )
      case "automation":
        return (
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" /> {/* Purple */}
              <stop offset="50%" stopColor="#F59E0B" /> {/* Amber/Gold */}
              <stop offset="100%" stopColor="#BE185D" /> {/* Pink */}
            </linearGradient>
            <filter id={`glow-${title.replace(/\s+/g, "-")}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        )
      case "analysis":
        return (
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E22CE" /> {/* Purple */}
              <stop offset="50%" stopColor="#DB2777" /> {/* Pink */}
              <stop offset="100%" stopColor="#F59E0B" /> {/* Amber/Gold */}
            </linearGradient>
            <filter id={`glow-${title.replace(/\s+/g, "-")}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        )
      default:
        return (
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" /> {/* Purple */}
              <stop offset="50%" stopColor="#EC4899" /> {/* Pink */}
              <stop offset="100%" stopColor="#F59E0B" /> {/* Amber/Gold */}
            </linearGradient>
          </defs>
        )
    }
  }

  // Choose SVG content based on type
  const getSvgContent = () => {
    const gradientId = `gradient-${title.replace(/\s+/g, "-")}`
    const glowId = `glow-${title.replace(/\s+/g, "-")}`

    switch (type) {
      case "trading":
        return (
          <>
            {/* Abstract trading pattern with more dynamic elements */}
            <circle cx="50%" cy="50%" r="35%" fill={`url(#${gradientId})`} opacity="0.8" />
            <path
              d="M20,50 L30,40 L40,45 L50,30 L60,35 L70,25 L80,30"
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              fill="none"
              filter={`url(#${glowId})`}
            />
            <circle cx="30" cy="40" r="2" fill="#F59E0B" />
            <circle cx="40" cy="45" r="2" fill="#F59E0B" />
            <circle cx="50" cy="30" r="2" fill="#F59E0B" />
            <circle cx="60" cy="35" r="2" fill="#F59E0B" />
            <circle cx="70" cy="25" r="2" fill="#F59E0B" />

            {/* Add candlestick elements to make it more trading-focused */}
            <rect x="25" y="55" width="4" height="10" fill="#EC4899" />
            <line x1="27" y1="52" x2="27" y2="55" stroke="#EC4899" strokeWidth="1" />
            <line x1="27" y1="65" x2="27" y2="68" stroke="#EC4899" strokeWidth="1" />

            <rect x="35" y="58" width="4" height="8" fill="#10B981" />
            <line x1="37" y1="55" x2="37" y2="58" stroke="#10B981" strokeWidth="1" />
            <line x1="37" y1="66" x2="37" y2="70" stroke="#10B981" strokeWidth="1" />

            <rect x="45" y="60" width="4" height="12" fill="#EC4899" />
            <line x1="47" y1="57" x2="47" y2="60" stroke="#EC4899" strokeWidth="1" />
            <line x1="47" y1="72" x2="47" y2="75" stroke="#EC4899" strokeWidth="1" />

            <rect x="55" y="62" width="4" height="6" fill="#10B981" />
            <line x1="57" y1="59" x2="57" y2="62" stroke="#10B981" strokeWidth="1" />
            <line x1="57" y1="68" x2="57" y2="72" stroke="#10B981" strokeWidth="1" />

            {/* Decorative elements */}
            <circle cx="15%" cy="15%" r="5%" fill="#9333EA" opacity="0.5" />
            <circle cx="85%" cy="85%" r="5%" fill="#EC4899" opacity="0.5" />
            <circle cx="85%" cy="15%" r="3%" fill="#F59E0B" opacity="0.5" />
            <circle cx="15%" cy="85%" r="3%" fill="#9333EA" opacity="0.5" />
          </>
        )
      case "chart":
        return (
          <>
            {/* Abstract chart */}
            <rect
              x="10%"
              y="10%"
              width="80%"
              height="80%"
              rx="10"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
            />
            <path
              d="M20,70 L30,60 L40,65 L50,40 L60,50 L70,30 L80,35"
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              fill="none"
              filter={`url(#${glowId})`}
            />

            {/* Grid lines */}
            <line x1="20%" y1="20%" x2="20%" y2="80%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />
            <line x1="40%" y1="20%" x2="40%" y2="80%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />
            <line x1="60%" y1="20%" x2="60%" y2="80%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />
            <line x1="80%" y1="20%" x2="80%" y2="80%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />

            <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />
            <line x1="20%" y1="40%" x2="80%" y2="40%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />
            <line x1="20%" y1="60%" x2="80%" y2="60%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />
            <line x1="20%" y1="80%" x2="80%" y2="80%" stroke="#9333EA" strokeWidth="0.5" opacity="0.3" />

            {/* Data points */}
            <circle cx="30" cy="60" r="2" fill="#F59E0B" />
            <circle cx="40" cy="65" r="2" fill="#F59E0B" />
            <circle cx="50" cy="40" r="2" fill="#F59E0B" />
            <circle cx="60" cy="50" r="2" fill="#F59E0B" />
            <circle cx="70" cy="30" r="2" fill="#F59E0B" />
          </>
        )
      case "money":
        return (
          <>
            {/* Coin shapes with more dynamic elements */}
            <circle cx="35%" cy="40%" r="20%" fill={`url(#${gradientId})`} opacity="0.8" />
            <circle cx="35%" cy="40%" r="18%" fill="none" stroke="#F59E0B" strokeWidth="1" />
            <text
              x="35%"
              y="40%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="10"
              fontWeight="bold"
            >
              $
            </text>

            <circle cx="65%" cy="60%" r="15%" fill={`url(#${gradientId})`} opacity="0.8" />
            <circle cx="65%" cy="60%" r="13%" fill="none" stroke="#F59E0B" strokeWidth="1" />
            <text
              x="65%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="8"
              fontWeight="bold"
            >
              $
            </text>

            <circle cx="50%" cy="30%" r="10%" fill={`url(#${gradientId})`} opacity="0.8" />
            <circle cx="50%" cy="30%" r="8%" fill="none" stroke="#F59E0B" strokeWidth="1" />
            <text
              x="50%"
              y="30%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="6"
              fontWeight="bold"
            >
              $
            </text>

            {/* Add growth chart to represent profits */}
            <path
              d="M20,70 C30,60 40,65 50,55 C60,45 70,50 80,40"
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
              opacity="0.8"
            />
            <circle cx="20" cy="70" r="1.5" fill="#10B981" />
            <circle cx="50" cy="55" r="1.5" fill="#10B981" />
            <circle cx="80" cy="40" r="1.5" fill="#10B981" />

            {/* Decorative elements */}
            <path
              d="M20,70 C30,60 40,80 50,70 C60,60 70,80 80,70"
              stroke="#F59E0B"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
          </>
        )
      case "platform":
        return (
          <>
            {/* Platform/Dashboard */}
            <rect
              x="15%"
              y="20%"
              width="70%"
              height="60%"
              rx="5"
              fill={`url(#${gradientId})`}
              opacity="0.2"
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
            />

            {/* Header */}
            <rect x="15%" y="20%" width="70%" height="10%" rx="5" fill={`url(#${gradientId})`} opacity="0.8" />

            {/* Sidebar */}
            <rect x="15%" y="30%" width="15%" height="50%" fill={`url(#${gradientId})`} opacity="0.4" />

            {/* Content panels */}
            <rect x="35%" y="35%" width="45%" height="15%" rx="3" fill={`url(#${gradientId})`} opacity="0.6" />
            <rect x="35%" y="55%" width="20%" height="20%" rx="3" fill={`url(#${gradientId})`} opacity="0.6" />
            <rect x="60%" y="55%" width="20%" height="20%" rx="3" fill={`url(#${gradientId})`} opacity="0.6" />

            {/* Decorative elements */}
            <circle cx="20%" cy="25%" r="2%" fill="#F59E0B" />
            <circle cx="25%" cy="25%" r="2%" fill="#EC4899" />
            <circle cx="30%" cy="25%" r="2%" fill="#9333EA" />
          </>
        )
      case "automation":
        return (
          <>
            {/* Gear shapes with animation effect */}
            <circle cx="50%" cy="50%" r="25%" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="30s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="50%" cy="50%" r="15%" fill={`url(#${gradientId})`} opacity="0.5" />

            {/* Gear teeth with animation */}
            <g>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="30s"
                repeatCount="indefinite"
              />
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180
                const x1 = 50 + 25 * Math.cos(angle)
                const y1 = 50 + 25 * Math.sin(angle)
                const x2 = 50 + 32 * Math.cos(angle)
                const y2 = 50 + 32 * Math.sin(angle)
                return (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={`url(#${gradientId})`}
                    strokeWidth="2"
                  />
                )
              })}
            </g>

            {/* Smaller gear with opposite animation */}
            <circle cx="70%" cy="35%" r="12%" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.5">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="360 70 35"
                to="0 70 35"
                dur="15s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="70%" cy="35%" r="7%" fill={`url(#${gradientId})`} opacity="0.5" />

            {/* Smaller gear teeth with animation */}
            <g>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="360 70 35"
                to="0 70 35"
                dur="15s"
                repeatCount="indefinite"
              />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180
                const x1 = 70 + 12 * Math.cos(angle)
                const y1 = 35 + 12 * Math.sin(angle)
                const x2 = 70 + 16 * Math.cos(angle)
                const y2 = 35 + 16 * Math.sin(angle)
                return (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={`url(#${gradientId})`}
                    strokeWidth="1.5"
                  />
                )
              })}
            </g>

            {/* Connection line */}
            <line
              x1="57%"
              y1="43%"
              x2="63%"
              y2="39%"
              stroke={`url(#${gradientId})`}
              strokeWidth="1.5"
              strokeDasharray="2,2"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="4" dur="1s" repeatCount="indefinite" />
            </line>

            {/* Add binary code to represent algorithms */}
            <text x="30%" y="75%" fill="#F59E0B" opacity="0.7" fontSize="3">
              10110101
            </text>
            <text x="50%" y="80%" fill="#EC4899" opacity="0.7" fontSize="3">
              01001101
            </text>
            <text x="70%" y="70%" fill="#F59E0B" opacity="0.7" fontSize="3">
              11010010
            </text>
          </>
        )
      case "analysis":
        return (
          <>
            {/* Analysis elements */}
            <rect
              x="20%"
              y="20%"
              width="60%"
              height="60%"
              rx="5"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
            />

            {/* Charts */}
            <rect x="25%" y="30%" width="20%" height="40%" rx="3" fill={`url(#${gradientId})`} opacity="0.4" />
            <path d="M25,50 L45,50" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            <path d="M25,40 L45,40" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            <path d="M25,60 L45,60" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            <path d="M30,65 L30,35" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            <path d="M35,65 L35,35" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
            <path d="M40,65 L40,35" stroke="#fff" strokeWidth="0.5" opacity="0.5" />

            {/* Line chart */}
            <path
              d="M55,60 L60,50 L65,55 L70,40 L75,45"
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
              fill="none"
              filter={`url(#${glowId})`}
            />

            {/* Data points */}
            <circle cx="60%" cy="50%" r="1.5%" fill="#F59E0B" />
            <circle cx="65%" cy="55%" r="1.5%" fill="#F59E0B" />
            <circle cx="70%" cy="40%" r="1.5%" fill="#F59E0B" />
            <circle cx="75%" cy="45%" r="1.5%" fill="#F59E0B" />

            {/* Decorative elements */}
            <circle cx="15%" cy="15%" r="3%" fill="#9333EA" opacity="0.5" />
            <circle cx="85%" cy="85%" r="3%" fill="#EC4899" opacity="0.5" />
          </>
        )
      default:
        return (
          <>
            <circle cx="50%" cy="50%" r="40%" fill={`url(#${gradientId})`} opacity="0.7" />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="10">
              {title}
            </text>
          </>
        )
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-hidden`}
      preserveAspectRatio="xMidYMid meet"
    >
      {getGradient()}
      <filter id={`glow-${title.replace(/\s+/g, "-")}`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <rect width="100" height="100" fill="none" />
      {getSvgContent()}
      <text
        x="50%"
        y="90%"
        fontSize="4"
        textAnchor="middle"
        fill="#F59E0B"
        fontWeight="bold"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {title}
      </text>
    </svg>
  )
}

