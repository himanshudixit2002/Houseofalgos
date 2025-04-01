"use client"

import { useEffect, useRef } from "react"

interface CartoonTradingImageProps {
  width?: number
  height?: number
  className?: string
}

export function CartoonTradingImage({ width = 600, height = 400, className = "" }: CartoonTradingImageProps) {
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
    let isComponentMounted = true
    let time = 0
    const chartPoints: { x: number; y: number; direction: number }[] = []
    const candleSticks: { x: number; open: number; close: number; high: number; low: number; color: string }[] = []
    const coins: { x: number; y: number; size: number; speed: number; rotation: number; rotationSpeed: number }[] = []

    // Initialize chart points
    for (let i = 0; i < 20; i++) {
      chartPoints.push({
        x: (i / 19) * (width * 0.8) + width * 0.1,
        y: height * 0.5 + Math.sin(i * 0.5) * 50 - Math.random() * 30,
        direction: Math.random() > 0.5 ? 1 : -1,
      })
    }

    // Initialize candle sticks
    for (let i = 0; i < 10; i++) {
      const open = height * 0.3 + Math.random() * height * 0.3
      const close = height * 0.3 + Math.random() * height * 0.3
      const high = Math.min(open, close) - Math.random() * 20
      const low = Math.max(open, close) + Math.random() * 20

      candleSticks.push({
        x: (i / 9) * (width * 0.6) + width * 0.2,
        open,
        close,
        high,
        low,
        color: open > close ? "#EC4899" : "#10B981",
      })
    }

    // Initialize coins
    for (let i = 0; i < 5; i++) {
      coins.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 15 + Math.random() * 15,
        speed: 0.5 + Math.random() * 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.05 - 0.025) * 2,
      })
    }

    // Draw background
    const drawBackground = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(45, 10, 78, 0.8)")
      gradient.addColorStop(1, "rgba(154, 28, 94, 0.8)")

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

    // Draw line chart
    const drawLineChart = () => {
      // Update chart points
      chartPoints.forEach((point) => {
        point.y += point.direction * Math.random() * 2
        if (point.y < height * 0.3 || point.y > height * 0.7) {
          point.direction *= -1
        }
      })

      // Draw chart line
      ctx.strokeStyle = "#F59E0B"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(chartPoints[0].x, chartPoints[0].y)

      for (let i = 1; i < chartPoints.length; i++) {
        const xc = (chartPoints[i].x + chartPoints[i - 1].x) / 2
        const yc = (chartPoints[i].y + chartPoints[i - 1].y) / 2
        ctx.quadraticCurveTo(chartPoints[i - 1].x, chartPoints[i - 1].y, xc, yc)
      }

      ctx.stroke()

      // Draw chart points
      chartPoints.forEach((point) => {
        ctx.fillStyle = "#F59E0B"
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw chart area
      ctx.fillStyle = "rgba(245, 158, 11, 0.1)"
      ctx.beginPath()
      ctx.moveTo(chartPoints[0].x, height)
      ctx.lineTo(chartPoints[0].x, chartPoints[0].y)

      for (let i = 1; i < chartPoints.length; i++) {
        const xc = (chartPoints[i].x + chartPoints[i - 1].x) / 2
        const yc = (chartPoints[i].y + chartPoints[i - 1].y) / 2
        ctx.quadraticCurveTo(chartPoints[i - 1].x, chartPoints[i - 1].y, xc, yc)
      }

      ctx.lineTo(chartPoints[chartPoints.length - 1].x, height)
      ctx.closePath()
      ctx.fill()
    }

    // Draw candle sticks
    const drawCandleSticks = () => {
      candleSticks.forEach((candle) => {
        // Draw wick
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(candle.x, candle.high)
        ctx.lineTo(candle.x, candle.low)
        ctx.stroke()

        // Draw body
        ctx.fillStyle = candle.color
        const bodyHeight = Math.abs(candle.open - candle.close)
        const y = Math.min(candle.open, candle.close)
        ctx.fillRect(candle.x - 5, y, 10, bodyHeight)
      })
    }

    // Draw coins
    const drawCoins = () => {
      coins.forEach((coin) => {
        // Update coin position
        coin.y += coin.speed
        coin.rotation += coin.rotationSpeed

        // Reset coin if it goes off screen
        if (coin.y > height + coin.size) {
          coin.y = -coin.size
          coin.x = Math.random() * width
        }

        // Draw coin
        ctx.save()
        ctx.translate(coin.x, coin.y)
        ctx.rotate(coin.rotation)

        // Coin body
        ctx.fillStyle = "#F59E0B"
        ctx.beginPath()
        ctx.arc(0, 0, coin.size, 0, Math.PI * 2)
        ctx.fill()

        // Coin highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.beginPath()
        ctx.arc(-coin.size * 0.3, -coin.size * 0.3, coin.size * 0.4, 0, Math.PI * 2)
        ctx.fill()

        // Coin symbol
        ctx.fillStyle = "#7E22CE"
        ctx.font = `${coin.size * 0.8}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("$", 0, 0)

        ctx.restore()
      })
    }

    // Draw robot trader
    const drawRobot = () => {
      const robotX = width * 0.85
      const robotY = height * 0.75
      const headSize = 40
      const bodyWidth = 60
      const bodyHeight = 70

      // Body
      ctx.fillStyle = "#7E22CE"
      ctx.fillRect(robotX - bodyWidth / 2, robotY - bodyHeight / 2, bodyWidth, bodyHeight)

      // Head
      ctx.fillStyle = "#9333EA"
      ctx.beginPath()
      ctx.arc(robotX, robotY - bodyHeight / 2 - headSize / 2, headSize / 2, 0, Math.PI * 2)
      ctx.fill()

      // Eyes
      const eyeOffset = headSize / 5
      const eyeSize = headSize / 6
      const eyeY = robotY - bodyHeight / 2 - headSize / 2 - eyeSize / 2

      ctx.fillStyle = "#F59E0B"
      ctx.beginPath()
      ctx.arc(robotX - eyeOffset, eyeY, eyeSize, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(robotX + eyeOffset, eyeY, eyeSize, 0, Math.PI * 2)
      ctx.fill()

      // Antenna
      ctx.strokeStyle = "#EC4899"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(robotX, robotY - bodyHeight / 2 - headSize)
      ctx.lineTo(robotX, robotY - bodyHeight / 2 - headSize - 15)
      ctx.stroke()

      ctx.fillStyle = "#EC4899"
      ctx.beginPath()
      ctx.arc(robotX, robotY - bodyHeight / 2 - headSize - 15, 5, 0, Math.PI * 2)
      ctx.fill()

      // Arms
      const armWidth = 15
      const armHeight = 40
      const armY = robotY - armHeight / 2

      ctx.fillStyle = "#9333EA"
      ctx.fillRect(robotX - bodyWidth / 2 - armWidth, armY, armWidth, armHeight)
      ctx.fillRect(robotX + bodyWidth / 2, armY, armWidth, armHeight)

      // Legs
      const legWidth = 20
      const legHeight = 30
      const legY = robotY + bodyHeight / 2

      ctx.fillStyle = "#9333EA"
      ctx.fillRect(robotX - bodyWidth / 4 - legWidth / 2, legY, legWidth, legHeight)
      ctx.fillRect(robotX + bodyWidth / 4 - legWidth / 2, legY, legWidth, legHeight)

      // Robot screen (showing trading data)
      ctx.fillStyle = "#1E1B4B"
      ctx.fillRect(robotX - bodyWidth / 3, robotY - bodyHeight / 3, (bodyWidth * 2) / 3, bodyHeight / 2)

      // Screen data
      ctx.strokeStyle = "#10B981"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(robotX - bodyWidth / 3 + 5, robotY - bodyHeight / 6 + Math.sin(time * 3) * 5)
      ctx.lineTo(robotX - bodyWidth / 3 + 15, robotY - bodyHeight / 6 + Math.sin(time * 3 + 1) * 5)
      ctx.lineTo(robotX - bodyWidth / 3 + 25, robotY - bodyHeight / 6 + Math.sin(time * 3 + 2) * 5)
      ctx.lineTo(robotX - bodyWidth / 3 + 35, robotY - bodyHeight / 6 + Math.sin(time * 3 + 3) * 5)
      ctx.stroke()
    }

    // Draw trading desk
    const drawTradingDesk = () => {
      const deskX = width * 0.25
      const deskY = height * 0.8
      const deskWidth = 150
      const deskHeight = 80

      // Desk
      ctx.fillStyle = "#4C1D95"
      ctx.fillRect(deskX - deskWidth / 2, deskY - deskHeight / 2, deskWidth, deskHeight)

      // Monitors
      const monitorWidth = 60
      const monitorHeight = 40
      const monitorY = deskY - deskHeight / 2 - monitorHeight / 2 - 10

      // Left monitor
      ctx.fillStyle = "#1E1B4B"
      ctx.fillRect(deskX - monitorWidth - 10, monitorY, monitorWidth, monitorHeight)

      // Right monitor
      ctx.fillRect(deskX + 10, monitorY, monitorWidth, monitorHeight)

      // Monitor stands
      ctx.fillStyle = "#6D28D9"
      ctx.fillRect(deskX - monitorWidth - 10 + monitorWidth / 2 - 5, monitorY + monitorHeight, 10, 15)
      ctx.fillRect(deskX + 10 + monitorWidth / 2 - 5, monitorY + monitorHeight, 10, 15)

      // Monitor data
      // Left monitor data (candlesticks)
      const candleWidth = 6
      const candleSpacing = 10
      const candleStartX = deskX - monitorWidth - 10 + 10
      const candleY = monitorY + 10

      for (let i = 0; i < 4; i++) {
        const x = candleStartX + i * candleSpacing
        const isUp = Math.sin(time + i) > 0
        const color = isUp ? "#10B981" : "#EC4899"
        const height = 10 + Math.abs(Math.sin(time + i)) * 10

        ctx.fillStyle = color
        ctx.fillRect(x, candleY + (isUp ? height : 0), candleWidth, height)
      }

      // Right monitor data (line chart)
      ctx.strokeStyle = "#F59E0B"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(deskX + 10 + 5, monitorY + 20 + Math.sin(time * 2) * 10)

      for (let i = 1; i < 5; i++) {
        const x = deskX + 10 + 5 + i * 10
        const y = monitorY + 20 + Math.sin(time * 2 + i * 0.5) * 10
        ctx.lineTo(x, y)
      }

      ctx.stroke()
    }

    // Animation loop
    const animate = () => {
      if (!isComponentMounted) return

      time += 0.01
      ctx.clearRect(0, 0, width, height)

      drawBackground()
      drawLineChart()
      drawCandleSticks()
      drawCoins()
      drawRobot()
      drawTradingDesk()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      isComponentMounted = false
      cancelAnimationFrame(animationFrameId)
    }
  }, [width, height])

  return <canvas ref={canvasRef} width={width} height={height} className={`${className} rounded-lg shadow-xl`} />
}

