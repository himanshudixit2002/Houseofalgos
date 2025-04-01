"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

// Currency pair data with initial rates and country codes
const currencyPairs = [
  {
    base: "EUR",
    quote: "USD",
    rate: 1.0876,
    baseCountry: "EU",
    quoteCountry: "US",
  },
  {
    base: "GBP",
    quote: "USD",
    rate: 1.2715,
    baseCountry: "GB",
    quoteCountry: "US",
  },
  {
    base: "USD",
    quote: "JPY",
    rate: 151.43,
    baseCountry: "US",
    quoteCountry: "JP",
  },
  {
    base: "USD",
    quote: "CAD",
    rate: 1.3602,
    baseCountry: "US",
    quoteCountry: "CA",
  },
  {
    base: "AUD",
    quote: "USD",
    rate: 0.6573,
    baseCountry: "AU",
    quoteCountry: "US",
  },
  {
    base: "USD",
    quote: "CHF",
    rate: 0.9047,
    baseCountry: "US",
    quoteCountry: "CH",
  },
  {
    base: "EUR",
    quote: "GBP",
    rate: 0.8553,
    baseCountry: "EU",
    quoteCountry: "GB",
  },
  {
    base: "USD",
    quote: "CNY",
    rate: 7.2275,
    baseCountry: "US",
    quoteCountry: "CN",
  },
  {
    base: "USD",
    quote: "INR",
    rate: 83.4725,
    baseCountry: "US",
    quoteCountry: "IN",
  },
]

export function CurrencyTicker() {
  const [rates, setRates] = useState(
    currencyPairs.map((pair) => ({
      ...pair,
      prevRate: pair.rate,
      direction: "neutral" as "up" | "down" | "neutral",
      changing: false,
    })),
  )

  const mounted = useRef(true)

  useEffect(() => {
    // Function to simulate rate changes
    const updateRates = () => {
      setRates((prevRates) =>
        prevRates.map((pair) => {
          // Random fluctuation between -0.5% and +0.5%
          const fluctuation = pair.rate * (Math.random() * 0.01 - 0.005)
          const newRate = Number.parseFloat((pair.rate + fluctuation).toFixed(4))

          return {
            ...pair,
            prevRate: pair.rate,
            rate: newRate,
            direction: newRate > pair.rate ? "up" : newRate < pair.rate ? "down" : "neutral",
            changing: true,
          }
        }),
      )

      // Reset the changing flag after animation completes
      setTimeout(() => {
        if (mounted.current) {
          setRates((prevRates) =>
            prevRates.map((pair) => ({
              ...pair,
              changing: false,
            })),
          )
        }
      }, 300) // Reduced from 600ms to 300ms for faster animation
    }

    // Update rates every 500ms (4x faster than 2000ms)
    const interval = setInterval(updateRates, 500)
    return () => {
      clearInterval(interval)
      mounted.current = false
    }
  }, [])

  return (
    <div
      className="absolute bottom-0 left-0 right-0 backdrop-blur-md py-4 overflow-hidden border-t border-white/10"
      style={{ background: "linear-gradient(135deg, rgba(83, 22, 95, 0.6) 0%, rgba(186, 60, 94, 0.6) 100%)" }}
    >
      <div
        className="flex"
        style={{
          animation: "marquee 7.5s linear infinite",
          willChange: "transform",
        }}
        key="currency-ticker"
      >
        {rates.map((pair, index) => (
          <div key={index} className="ticker-item flex items-center justify-between px-5 py-2 mx-2">
            <div className="flex items-center mr-2">
              <div className="flex items-center mr-2">
                <div className="currency-flag mr-1">
                  <img
                    src={`https://flagcdn.com/w20/${pair.baseCountry.toLowerCase()}.png`}
                    alt={pair.baseCountry}
                    width="20"
                    height="15"
                    className="rounded-sm"
                  />
                </div>
                <div className="currency-flag">
                  <img
                    src={`https://flagcdn.com/w20/${pair.quoteCountry.toLowerCase()}.png`}
                    alt={pair.quoteCountry}
                    width="20"
                    height="15"
                    className="rounded-sm"
                  />
                </div>
              </div>
              <div className="ml-2 flex items-center">
                <span className="text-amber-400 font-bold">{pair.base}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span className="text-amber-400 font-bold">{pair.quote}</span>
              </div>
            </div>
            <div
              className={`ml-2 flex items-center ${
                pair.direction === "up" ? "text-green-400" : pair.direction === "down" ? "text-red-400" : "text-white"
              } ${pair.changing ? "animate-pulse" : ""}`}
            >
              <span className="font-mono font-bold text-sm">{pair.rate.toFixed(4)}</span>
              {pair.direction === "up" && <ArrowUp className="w-3 h-3 ml-1 text-green-400" />}
              {pair.direction === "down" && <ArrowDown className="w-3 h-3 ml-1 text-red-400" />}
            </div>
          </div>
        ))}
        {/* Duplicate the first few items to create a seamless loop */}
        {rates.slice(0, 5).map((pair, index) => (
          <div key={`dup-${index}`} className="ticker-item flex items-center justify-between px-5 py-2 mx-2">
            <div className="flex items-center mr-2">
              <div className="flex items-center mr-2">
                <div className="currency-flag mr-1">
                  <img
                    src={`https://flagcdn.com/w20/${pair.baseCountry.toLowerCase()}.png`}
                    alt={pair.baseCountry}
                    width="20"
                    height="15"
                    className="rounded-sm"
                  />
                </div>
                <div className="currency-flag">
                  <img
                    src={`https://flagcdn.com/w20/${pair.quoteCountry.toLowerCase()}.png`}
                    alt={pair.quoteCountry}
                    width="20"
                    height="15"
                    className="rounded-sm"
                  />
                </div>
              </div>
              <div className="ml-2 flex items-center">
                <span className="text-amber-400 font-bold">{pair.base}</span>
                <span className="mx-1 text-gray-400">/</span>
                <span className="text-amber-400 font-bold">{pair.quote}</span>
              </div>
            </div>
            <div
              className={`ml-2 flex items-center ${
                pair.direction === "up" ? "text-green-400" : pair.direction === "down" ? "text-red-400" : "text-white"
              } ${pair.changing ? "animate-pulse" : ""}`}
            >
              <span className="font-mono font-bold text-sm">{pair.rate.toFixed(4)}</span>
              {pair.direction === "up" && <ArrowUp className="w-3 h-3 ml-1 text-green-400" />}
              {pair.direction === "down" && <ArrowDown className="w-3 h-3 ml-1 text-red-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

