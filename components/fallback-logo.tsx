"use client"

import { useState } from "react"
import Image from "next/image"

export function FallbackLogo({ className = "", width = 96, height = 96 }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm animate-pulse"></div>

      {!imageError ? (
        <Image
          src="/logo.png"
          alt="House of Algo's Logo"
          width={width}
          height={height}
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,201,64,0.5)]"
          style={{ filter: "drop-shadow(0 0 10px rgba(255, 201, 64, 0.7))" }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center relative z-10">
          <div className="text-amber-400 font-bold text-2xl" style={{ textShadow: "0 0 10px rgba(255, 201, 64, 0.7)" }}>
            HOA
          </div>
        </div>
      )}
    </div>
  )
}

