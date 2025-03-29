"use client"

import { useState, useEffect } from "react"
import { ArrowRight, RefreshCw } from "lucide-react"

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
]

// Mock exchange rates (in a real app, these would come from an API)
const mockRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.23,
  AUD: 1.52,
  CAD: 1.37,
  CHF: 0.9,
  CNY: 7.24,
  INR: 83.42,
}

export function ForexConverter() {
  const [amount, setAmount] = useState(1000)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Calculate conversion
  useEffect(() => {
    const convertCurrency = () => {
      const fromRate = mockRates[fromCurrency as keyof typeof mockRates]
      const toRate = mockRates[toCurrency as keyof typeof mockRates]
      const converted = (amount / fromRate) * toRate
      setResult(converted)
    }

    convertCurrency()
  }, [amount, fromCurrency, toCurrency])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Currency Converter</h3>
        <button
          onClick={handleRefresh}
          className="flex items-center text-sm text-gray-300 hover:text-blue-400"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Rates
        </button>
      </div>

      <div className="grid md:grid-cols-5 gap-4 items-center">
        <div className="md:col-span-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-300 mb-1">
            From
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button onClick={handleSwap} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-300 mb-1">
            To
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-700/50 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Converted Amount</p>
            <p className="text-2xl font-bold">
              {result.toFixed(2)} {toCurrency}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Exchange Rate</p>
            <p className="text-lg font-semibold">
              1 {fromCurrency} ={" "}
              {(
                mockRates[toCurrency as keyof typeof mockRates] / mockRates[fromCurrency as keyof typeof mockRates]
              ).toFixed(4)}{" "}
              {toCurrency}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-right">Last updated: {lastUpdated.toLocaleTimeString()}</div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-6">
        {currencies.slice(0, 6).map((currency) => (
          <div key={currency.code} className="bg-gray-700/50 p-2 rounded-lg text-center">
            <div className="text-lg">{currency.flag}</div>
            <div className="text-xs font-medium">{currency.code}</div>
            <div className="text-xs text-gray-400">
              {(mockRates.USD / mockRates[currency.code as keyof typeof mockRates]).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

