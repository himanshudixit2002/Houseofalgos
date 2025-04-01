"use client"

import { useEffect, useRef } from "react"

interface Feature3DImageProps {
  width?: number
  height?: number
  className?: string
  type?: "chart" | "trading" | "automation" | "analysis" | "platform"
}

export function Feature3DImage({ width = 600, height = 400, className = "", type = "chart" }: Feature3DImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Animation variables
    let animationFrameId: number
    let time = 0

    // Colors based on our theme
    const colors = {
      purple: "#53165f",
      darkPurple: "#4C1D95",
      pink: "#ba3c5e",
      gold: "#ffc940",
      brightGold: "#ffd700",
    }

    // Draw background
    const drawBackground = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(83, 22, 95, 0.8)")
      gradient.addColorStop(1, "rgba(186, 60, 94, 0.8)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * width
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let i = 0; i <= 6; i++) {
        const y = (i / 6) * height
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    // Draw chart visualization
    const drawChart = () => {
      // Draw axes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 2

      // X-axis
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.8)
      ctx.lineTo(width * 0.9, height * 0.8)
      ctx.stroke()

      // Y-axis
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.2)
      ctx.lineTo(width * 0.1, height * 0.8)
      ctx.stroke()

      // Draw line chart
      ctx.strokeStyle = colors.gold
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.5 + Math.sin(time) * height * 0.1)

      for (let i = 1; i <= 20; i++) {
        const x = width * 0.1 + (width * 0.8 * i) / 20
        const y = height * 0.5 + Math.sin(time + i * 0.2) * height * 0.1
        ctx.lineTo(x, y)
      }

      ctx.stroke()

      // Draw data points
      for (let i = 0; i <= 20; i += 4) {
        const x = width * 0.1 + (width * 0.8 * i) / 20
        const y = height * 0.5 + Math.sin(time + i * 0.2) * height * 0.1

        ctx.fillStyle = colors.brightGold
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw area under the curve
      ctx.fillStyle = "rgba(255, 201, 64, 0.2)"
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.8)
      ctx.lineTo(width * 0.1, height * 0.5 + Math.sin(time) * height * 0.1)

      for (let i = 1; i <= 20; i++) {
        const x = width * 0.1 + (width * 0.8 * i) / 20
        const y = height * 0.5 + Math.sin(time + i * 0.2) * height * 0.1
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width * 0.9, height * 0.8)
      ctx.closePath()
      ctx.fill()
    }

    // Draw trading visualization
    const drawTrading = () => {
      // Draw candlesticks
      const candleWidth = width * 0.03
      const spacing = width * 0.06
      const startX = width * 0.15

      for (let i = 0; i < 12; i++) {
        const x = startX + i * spacing
        const open = height * 0.3 + Math.random() * height * 0.3
        const close = height * 0.3 + Math.random() * height * 0.3
        const high = Math.min(open, close) - Math.random() * 20
        const low = Math.max(open, close) + Math.random() * 20
        const isUp = close < open

        // Draw wick
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, high)
        ctx.lineTo(x, low)
        ctx.stroke()

        // Draw body
        ctx.fillStyle = isUp ? "#10B981" : "#EC4899"
        const bodyHeight = Math.abs(open - close)
        const y = Math.min(open, close)
        ctx.fillRect(x - candleWidth / 2, y, candleWidth, bodyHeight)
      }

      // Draw moving average line
      ctx.strokeStyle = colors.gold
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(width * 0.15, height * 0.5 + Math.sin(time) * height * 0.05)

      for (let i = 1; i < 12; i++) {
        const x = startX + i * spacing
        const y = height * 0.5 + Math.sin(time + i * 0.3) * height * 0.05
        ctx.lineTo(x, y)
      }

      ctx.stroke()
    }

    // Draw automation visualization
    const drawAutomation = () => {
      // Draw central gear
      const centerX = width * 0.5
      const centerY = height * 0.5
      const radius = Math.min(width, height) * 0.2

      ctx.strokeStyle = colors.gold
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw gear teeth
      const teethCount = 12
      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2 + time
        const innerX = centerX + radius * Math.cos(angle)
        const innerY = centerY + radius * Math.sin(angle)
        const outerX = centerX + (radius + 15) * Math.cos(angle)
        const outerY = centerY + (radius + 15) * Math.sin(angle)

        ctx.strokeStyle = colors.gold
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        ctx.stroke()
      }

      // Draw smaller connected gear
      const smallGearX = width * 0.75
      const smallGearY = height * 0.35
      const smallRadius = radius * 0.6

      ctx.strokeStyle = colors.pink
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(smallGearX, smallGearY, smallRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw small gear teeth
      const smallTeethCount = 8
      for (let i = 0; i < smallTeethCount; i++) {
        const angle = (i / smallTeethCount) * Math.PI * 2 - time * 1.5
        const innerX = smallGearX + smallRadius * Math.cos(angle)
        const innerY = smallGearY + smallRadius * Math.sin(angle)
        const outerX = smallGearX + (smallRadius + 10) * Math.cos(angle)
        const outerY = smallGearY + (smallRadius + 10) * Math.sin(angle)

        ctx.strokeStyle = colors.pink
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(innerX, innerY)
        ctx.lineTo(outerX, outerY)
        ctx.stroke()
      }

      // Draw connection line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.setLineDash([5, 5])
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX + radius * Math.cos(Math.PI / 4), centerY + radius * Math.sin(Math.PI / 4))
      ctx.lineTo(smallGearX - smallRadius * Math.cos(Math.PI / 4), smallGearY + smallRadius * Math.sin(Math.PI / 4))
      ctx.stroke()
      ctx.setLineDash([])

      // Draw binary code
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "12px monospace"
      ctx.fillText("10110101", width * 0.2, height * 0.2)
      ctx.fillText("01001101", width * 0.7, height * 0.7)
      ctx.fillText("11010010", width * 0.3, height * 0.8)
    }

    // Draw analysis visualization
    const drawAnalysis = () => {
      // Draw dashboard frame
      ctx.strokeStyle = colors.gold
      ctx.lineWidth = 2
      ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8)

      // Draw panels
      ctx.fillStyle = "rgba(83, 22, 95, 0.5)"
      ctx.fillRect(width * 0.15, height * 0.2, width * 0.3, height * 0.3)
      ctx.fillRect(width * 0.55, height * 0.2, width * 0.3, height * 0.3)
      ctx.fillRect(width * 0.15, height * 0.6, width * 0.3, height * 0.2)
      ctx.fillRect(width * 0.55, height * 0.6, width * 0.3, height * 0.2)

      // Draw chart in top left panel
      ctx.strokeStyle = colors.brightGold
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(width * 0.17, height * 0.35)

      for (let i = 0; i < 10; i++) {
        const x = width * 0.17 + i * ((width * 0.26) / 9)
        const y = height * 0.35 - Math.sin(time + i * 0.5) * height * 0.1
        ctx.lineTo(x, y)
      }

      ctx.stroke()

      // Draw bar chart in top right panel
      for (let i = 0; i < 5; i++) {
        const barHeight = (Math.sin(time + i) * 0.5 + 0.5) * height * 0.2
        ctx.fillStyle = `rgba(255, 201, 64, ${0.5 + i * 0.1})`
        ctx.fillRect(width * 0.58 + i * ((width * 0.24) / 5), height * 0.45 - barHeight, width * 0.03, barHeight)
      }

      // Draw pie chart in bottom left
      ctx.beginPath()
      ctx.moveTo(width * 0.3, height * 0.7)
      ctx.arc(width * 0.3, height * 0.7, height * 0.08, 0, Math.PI * 0.7 + Math.sin(time) * 0.2)
      ctx.lineTo(width * 0.3, height * 0.7)
      ctx.fillStyle = colors.gold
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(width * 0.3, height * 0.7)
      ctx.arc(width * 0.3, height * 0.7, height * 0.08, Math.PI * 0.7 + Math.sin(time) * 0.2, Math.PI * 1.5)
      ctx.lineTo(width * 0.3, height * 0.7)
      ctx.fillStyle = colors.pink
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(width * 0.3, height * 0.7)
      ctx.arc(width * 0.3, height * 0.7, height * 0.08, Math.PI * 1.5, Math.PI * 2)
      ctx.lineTo(width * 0.3, height * 0.7)
      ctx.fillStyle = colors.purple
      ctx.fill()

      // Draw data table in bottom right
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.moveTo(width * 0.58, height * 0.65 + i * height * 0.05)
        ctx.lineTo(width * 0.82, height * 0.65 + i * height * 0.05)
        ctx.stroke()
      }
    }

    // Draw platform visualization
    const drawPlatform = () => {
      // Draw monitor
      ctx.fillStyle = colors.darkPurple
      ctx.fillRect(width * 0.3, height * 0.2, width * 0.4, height * 0.4)

      // Draw monitor stand
      ctx.fillStyle = colors.darkPurple
      ctx.fillRect(width * 0.45, height * 0.6, width * 0.1, height * 0.1)
      ctx.fillRect(width * 0.4, height * 0.7, width * 0.2, height * 0.05)

      // Draw screen content
      ctx.fillStyle = "rgba(30, 30, 50, 0.9)"
      ctx.fillRect(width * 0.32, height * 0.22, width * 0.36, height * 0.36)

      // Draw chart on screen
      ctx.strokeStyle = colors.gold
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(width * 0.34, height * 0.4)

      for (let i = 0; i < 10; i++) {
        const x = width * 0.34 + i * ((width * 0.32) / 9)
        const y = height * 0.4 - Math.sin(time + i * 0.5) * height * 0.1
        ctx.lineTo(x, y)
      }

      ctx.stroke()

      // Draw UI elements on screen
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.fillRect(width * 0.34, height * 0.25, width * 0.32, height * 0.05)
      ctx.fillRect(width * 0.34, height * 0.5, width * 0.15, height * 0.05)
      ctx.fillRect(width * 0.51, height * 0.5, width * 0.15, height * 0.05)

      // Draw keyboard
      ctx.fillStyle = colors.darkPurple
      ctx.fillRect(width * 0.35, height * 0.8, width * 0.3, height * 0.08)

      // Draw keyboard keys
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
          ctx.fillRect(width * (0.36 + i * 0.028), height * (0.81 + j * 0.022), width * 0.02, height * 0.015)
        }
      }

      // Draw mouse
      ctx.fillStyle = colors.darkPurple
      ctx.beginPath()
      ctx.ellipse(width * 0.7, height * 0.8, width * 0.02, height * 0.04, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    // Animation loop
    const animate = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      drawBackground()

      // Draw different visualization based on type
      switch (type) {
        case "chart":
          drawChart()
          break
        case "trading":
          drawTrading()
          break
        case "automation":
          drawAutomation()
          break
        case "analysis":
          drawAnalysis()
          break
        case "platform":
          drawPlatform()
          break
        default:
          drawChart()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [width, height, type])

  return (
    <div className="cartoon-image-container">
      <canvas ref={canvasRef} width={width} height={height} className={`${className} rounded-lg shadow-xl`} />
    </div>
  )
}

