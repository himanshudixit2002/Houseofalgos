"use client"

import React, { useState, useEffect } from "react"
import {
  BarChart2,
  TrendingUp,
  Target,
  DollarSign,
  Monitor,
  Settings,
  Mail,
  AlertTriangle,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Faq } from "./components/faq"
import { AIImage } from "./components/ai-image"
import { CurrencyTicker } from "./components/currency-ticker"
import AOS from "aos"
import "aos/dist/aos.css"

export default function HouseOfAlgos() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Add this debounce function at the top of your component
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  useEffect(() => {
    // Initialize AOS with more conservative settings
    AOS.init({
      duration: 600,
      once: true, // Only animate once
      mirror: false, // Don't mirror animations
      offset: 50,
      easing: "ease-out",
      delay: 0, // No delay by default
      disable: window.innerWidth < 768 ? true : false, // Disable on mobile
    })

    // Add a style tag to the document head for the marquee animation
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: flex;
        animation: marquee 7.5s linear infinite;
      }
    `
    document.head.appendChild(style)

    const handleScroll = debounce(() => {
      const sections = document.querySelectorAll("section")
      let current = ""

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute("id") || ""
        }
      })

      if (current) {
        setActiveSection(current)
      }
    }, 100) // 100ms debounce

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.head.removeChild(style)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-gradient-dark)" }}>
      {/* Header */}
      <header
        className="fixed w-full z-50 border-b border-pink-800/50 shadow-lg"
        style={{ background: "linear-gradient(90deg, rgba(45, 10, 78, 0.9), rgba(154, 28, 94, 0.9))" }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="House of Algo's Logo" width={50} height={50} className="mr-2" />
            <div>
              <h1 className="text-xl font-bold glow-gold-text" style={{ color: "#ffc940" }}>
                HOUSE OF ALGO'S
              </h1>
              <p className="text-white text-xs">Trade with Intelligence, Earn with Confidence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            {[
              { name: "HOME", id: "home" },
              { name: "PROFITS", id: "about" },
              { name: "VISION", id: "vision" },
              { name: "INCOME", id: "income" },
              { name: "PLATFORM", id: "platform" },
              { name: "FEATURES", id: "features" },
              { name: "FAQ", id: "faq" },
              { name: "CONTACT", id: "contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={`#${item.id}`}
                className={`relative px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 overflow-hidden ${
                  activeSection === item.id
                    ? "text-amber-400 bg-purple-900/50 border-b-2 border-amber-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span className="relative z-10 font-bold">{item.name}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-600 to-amber-400 transform transition-transform duration-300 ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0"
                  } origin-left`}
                ></span>
                <span
                  className={`absolute inset-0 bg-gradient-to-r from-pink-800/20 to-purple-900/20 transform transition-transform duration-300 ${
                    activeSection === item.id ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-purple-900/50 text-gray-300 hover:text-amber-400 hover:bg-pink-800/70 transition-all duration-300"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden border-t border-pink-800/50 absolute w-full left-0 right-0 z-50 shadow-lg"
            style={{ background: "linear-gradient(90deg, rgba(59, 7, 100, 0.95), rgba(131, 24, 67, 0.95))" }}
          >
            <div className="container mx-auto px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "HOME", id: "home" },
                  { name: "PROFITS", id: "about" },
                  { name: "VISION", id: "vision" },
                  { name: "INCOME", id: "income" },
                  { name: "PLATFORM", id: "platform" },
                  { name: "FEATURES", id: "features" },
                  { name: "FAQ", id: "faq" },
                  { name: "CONTACT", id: "contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={`#${item.id}`}
                    className={`py-2 px-3 text-center text-sm font-bold rounded-md transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-pink-800/30 to-purple-900/30 text-amber-400 border border-amber-400/30"
                        : "text-gray-300 hover:bg-purple-900/30 hover:text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section with Video Background */}
        <section
          id="home"
          className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden min-h-screen flex items-center justify-center"
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
            >
              <source src="/vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Semi-transparent overlay to ensure text readability */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(45, 10, 78, 0.4), rgba(154, 28, 94, 0.4))" }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center"
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white welcome-text-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                Welcome to House of Algo's
              </motion.h1>
            </motion.div>
          </div>

          {/* Floating icons */}
          <div className="hidden md:block absolute top-1/4 left-10 animate-float">
            <AIImage title="Bitcoin" width={60} height={60} type="money" />
          </div>
          <div className="hidden md:block absolute bottom-1/4 right-10 animate-float-delayed">
            <AIImage title="Chart" width={60} height={60} type="chart" />
          </div>

          {/* Live Currency Ticker */}
          <div
            className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden border-t border-pink-800/50 shadow-lg"
            style={{ background: "linear-gradient(90deg, rgba(45, 10, 78, 0.8), rgba(154, 28, 94, 0.8))" }}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center mb-2">
                <div
                  className="px-4 py-1 rounded-md mr-3 shadow-md"
                  style={{ background: "linear-gradient(90deg, rgba(131, 24, 67, 0.5), rgba(59, 7, 100, 0.5))" }}
                >
                  <span className="text-xs font-bold text-white">LIVE FOREX RATES</span>
                </div>
                <div className="h-px flex-grow bg-gradient-to-r from-pink-600/50 to-transparent"></div>
              </div>
            </div>
            <div className="overflow-hidden">
              <CurrencyTicker />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="clean-section" style={{ background: "var(--bg-gradient-section)" }}>
          <div className="clean-container">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="glow-gold-text">ABOUT US</h2>
              <div className="divider"></div>
            </div>

            <div className="clean-grid-2 items-center">
              <div className="clean-card" data-aos="fade-right" data-aos-duration="800">
                <p className="text-lg text-white mb-6">
                  At House of Algo's, we are passionate about helping traders succeed in the Forex market through
                  advanced algorithmic trading. Our team of experts has developed high-performance trading strategies
                  that operate automatically, removing emotional decision-making and optimizing profitability.
                </p>
                <p className="text-lg text-white mb-6">
                  We believe in financial freedom through technology and have created a platform where both beginners
                  and experienced traders can benefit from automated trading solutions.
                </p>

                <h3 className="text-xl font-bold mb-4 mt-8" style={{ color: "#ffc940" }}>
                  What Sets Us Apart?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Proven Trading Strategies",
                    "Risk-Managed Algo Systems",
                    "24/7 Market Analysis & Optimization",
                    "Multiple Revenue Streams for Our Users",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start" data-aos="fade-up" data-aos-delay={index * 100}>
                      <div className="bg-amber-400/20 p-1 rounded-full mr-3 mt-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      </div>
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
                  <button className="clean-button">
                    Join us today! <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative" data-aos="fade-left" data-aos-duration="800">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-900/20 rounded-lg transform rotate-3 scale-105"></div>
                <div className="clean-image-container">
                  <AIImage
                    title="Algorithmic Trading"
                    width={600}
                    height={400}
                    type="trading"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section
          id="vision"
          className="clean-section relative overflow-hidden"
          style={{ background: "var(--bg-gradient-alt)" }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <AIImage title="Forex Chart" width={1200} height={800} type="chart" className="w-full h-full" />
            </div>
          </div>

          <div className="clean-container relative z-10">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="glow-gold-text">VISION & MISSION</h2>
              <div className="divider"></div>
            </div>

            <div className="clean-grid-2 gap-16">
              <div className="clean-card" data-aos="flip-left" data-aos-duration="1000">
                <div className="clean-image-container mb-6">
                  <AIImage
                    title="Our Vision"
                    width={400}
                    height={300}
                    type="chart"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-800/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Target className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#ffc940" }}>
                    Our Vision
                  </h3>
                  <p className="text-white">
                    To empower traders worldwide by providing seamless algorithmic trading solutions, making Forex
                    trading accessible, profitable, and stress-free for everyone.
                  </p>
                </div>
              </div>

              <div className="clean-card" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="200">
                <div className="clean-image-container mb-6">
                  <AIImage
                    title="Our Mission"
                    width={400}
                    height={300}
                    type="trading"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <TrendingUp className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#ffc940" }}>
                    Our Mission
                  </h3>
                  <p className="text-white">
                    To revolutionize the way people trade by offering automated strategies that minimize risk, maximize
                    profits, and create multiple streams of income for our users.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center" data-aos="zoom-in" data-aos-delay="300">
              <button className="clean-button">
                Discover Our Approach <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Income Section */}
        <section id="income" className="clean-section" style={{ background: "var(--bg-gradient-section)" }}>
          <div className="clean-container">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="glow-gold-text">INCOME STREAMS</h2>
              <div className="divider"></div>
              <p>At House of Algo's, we believe in diversifying income streams. Here's how you can earn with us:</p>
            </div>

            <div className="clean-grid-3">
              {[
                {
                  title: "Automated Trading Profits",
                  icon: <BarChart2 className="w-8 h-8" />,
                  description:
                    "Our algo-based strategies trade 24/7 on your behalf, ensuring optimized returns while reducing risks.",
                  imageType: "automation",
                  animation: "fade-up-right",
                },
                {
                  title: "PAMM Services",
                  icon: <DollarSign className="w-8 h-8" />,
                  description:
                    "Participate in PAMM services where experienced traders & ALGO manage funds on behalf of investors.",
                  imageType: "money",
                  animation: "fade-up",
                },
                {
                  title: "Copy Trading",
                  icon: <Monitor className="w-8 h-8" />,
                  description:
                    "Follow and copy the best-performing strategies with ease. Even if you're a beginner, you can trade like a pro!",
                  imageType: "trading",
                  animation: "fade-up-left",
                },
                {
                  title: "Subscription Plans",
                  icon: <Settings className="w-8 h-8" />,
                  description:
                    "Access different levels of algorithmic trading strategies based on your trading goals and risk tolerance.",
                  imageType: "platform",
                  animation: "fade-up-right",
                },
                {
                  title: "Referral Program",
                  icon: <Mail className="w-8 h-8" />,
                  description:
                    "Earn passive income by referring others to our platform. Get commissions for every successful referral!",
                  imageType: "money",
                  animation: "fade-up",
                },
                {
                  title: "Start Earning Today",
                  icon: <TrendingUp className="w-8 h-8" />,
                  description:
                    "Join our platform and start earning through multiple streams of income with our advanced trading solutions.",
                  cta: true,
                  imageType: "chart",
                  animation: "fade-up-left",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="clean-card text-center"
                  data-aos={item.animation}
                  data-aos-delay={index * 100}
                  data-aos-duration="800"
                >
                  <div className="clean-image-container mb-6">
                    <AIImage
                      title={item.title}
                      width={400}
                      height={200}
                      type={item.imageType as any}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div
                    className={`w-16 h-16 ${item.cta ? "bg-amber-500/30" : "bg-purple-900/50"} rounded-full flex items-center justify-center mb-4 mx-auto`}
                  >
                    {React.cloneElement(item.icon, {
                      className: `w-8 h-8 ${item.cta ? "text-amber-300" : "text-pink-400"}`,
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "#ffc940" }}>
                    {item.title}
                  </h3>
                  <p className="text-white mb-4">{item.description}</p>

                  {item.cta && (
                    <button className="clean-button mt-4 text-sm mx-auto">
                      🚀 Start Earning <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section
          id="platform"
          className="clean-section relative overflow-hidden"
          style={{ background: "var(--bg-gradient-alt)" }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <AIImage title="Trading Platform" width={1200} height={800} type="platform" className="w-full h-full" />
            </div>
          </div>

          <div className="clean-container relative z-10">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="glow-gold-text">PLATFORM</h2>
              <div className="divider"></div>
              <p>Getting started with House of Algo's is simple:</p>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-600 to-amber-400 hidden md:block"></div>

                {[
                  {
                    step: "Step 1",
                    title: "Sign up on our platform",
                    description:
                      "Create your account in just a few minutes and get ready to start your trading journey.",
                    imageType: "platform",
                    animation: "fade-right",
                  },
                  {
                    step: "Step 2",
                    title: "Open Trading account through our Link",
                    description:
                      "We'll guide you through the process of setting up your trading account with our trusted partners.",
                    imageType: "trading",
                    animation: "fade-left",
                  },
                  {
                    step: "Step 3",
                    title: "Deposit Funds & start following our PAMM ACCOUNT",
                    description:
                      "Fund your account and connect to our PAMM ACCOUNT or Copy trading to our MASTER ACCOUNT.",
                    imageType: "money",
                    animation: "fade-right",
                  },
                  {
                    step: "Step 4",
                    title: "Let the algo trade for you",
                    description: "Sit back and watch your profits grow while our algorithms work for you 24/7.",
                    imageType: "automation",
                    animation: "fade-left",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex mb-12 relative"
                    data-aos={item.animation}
                    data-aos-delay={index * 150}
                    data-aos-duration="800"
                  >
                    <div className="hidden md:block">
                      <div
                        className="w-16 h-16 bg-purple-900 rounded-full border-4 border-pink-600 flex items-center justify-center relative z-10"
                        data-aos="zoom-in"
                        data-aos-delay={index * 150 + 100}
                      >
                        <span className="text-sm font-bold" style={{ color: "#ffc940" }}>
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <div className="md:ml-12 w-full">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="md:hidden mb-4">
                          <div className="inline-block px-3 py-1 bg-pink-800/20 rounded-full text-pink-400 text-sm font-medium">
                            {item.step}
                          </div>
                        </div>

                        <div
                          className="clean-image-container w-full md:w-1/3"
                          data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}
                          data-aos-delay={index * 150 + 200}
                        >
                          <AIImage
                            title={item.title}
                            width={300}
                            height={200}
                            type={item.imageType as any}
                            className="w-full h-auto object-cover"
                          />
                        </div>

                        <div className="w-full md:w-2/3">
                          <h3
                            className="text-xl font-bold mb-3"
                            style={{ color: "#ffc940" }}
                            data-aos="fade-up"
                            data-aos-delay={index * 150 + 250}
                          >
                            {item.title}
                          </h3>
                          <p className="text-white" data-aos="fade-up" data-aos-delay={index * 150 + 300}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8" data-aos="zoom-in" data-aos-delay="400">
                <p className="text-lg text-amber-300 mb-6">
                  📌 No prior experience required. Just sit back and let the algorithms work!
                </p>
                <button className="clean-button">
                  Get Started Now <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="clean-section" style={{ background: "var(--bg-gradient-section)" }}>
          <div className="clean-container">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="glow-gold-text">FEATURES</h2>
              <div className="divider"></div>
            </div>

            <div className="clean-grid-3">
              {[
                {
                  title: "Fully Automated Trading",
                  icon: <Settings className="w-8 h-8" />,
                  description:
                    "Our algo trading system operates 24/7, executing trades based on pre-set strategies without the need for manual intervention.",
                  imageType: "automation",
                  animation: "flip-up",
                },
                {
                  title: "User-Friendly Interface",
                  icon: <Monitor className="w-8 h-8" />,
                  description:
                    "Designed for both beginners and experienced traders, our platform integrates seamlessly with MT4 for effortless trading.",
                  imageType: "platform",
                  animation: "flip-down",
                },
                {
                  title: "Real-Time Market Analysis",
                  icon: <BarChart2 className="w-8 h-8" />,
                  description:
                    "Our algorithms continuously analyze market trends, ensuring that trading decisions are made based on the latest market conditions.",
                  imageType: "analysis",
                  animation: "flip-up",
                },
                {
                  title: "Risk Management Tools",
                  icon: <AlertTriangle className="w-8 h-8" />,
                  description:
                    "We implement stop-loss, take-profit, and risk diversification techniques to help minimize potential losses.",
                  imageType: "chart",
                  animation: "flip-down",
                },
                {
                  title: "Multiple Income Streams",
                  icon: <DollarSign className="w-8 h-8" />,
                  description:
                    "Traders can earn not just through trading but also via referral programs, copy trading and subscription-based strategies.",
                  imageType: "money",
                  animation: "flip-up",
                },
                {
                  title: "High-Speed Execution",
                  icon: <TrendingUp className="w-8 h-8" />,
                  description:
                    "Our systems ensure rapid trade execution, reducing slippage and maximizing profit potential.",
                  imageType: "trading",
                  animation: "flip-down",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group clean-card"
                  data-aos={item.animation}
                  data-aos-delay={index * 100}
                  data-aos-duration="800"
                >
                  <div
                    className="clean-image-container mb-6"
                    data-aos={index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
                    data-aos-delay={index * 50 + 100}
                  >
                    <AIImage
                      title={item.title}
                      width={400}
                      height={200}
                      type={item.imageType as any}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end">
                      <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-center">
                          {React.cloneElement(item.icon, { className: "w-6 h-6 text-amber-400 mr-2" })}
                          <h3 className="text-lg font-bold" style={{ color: "#ffc940" }}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#ffc940" }}
                      data-aos="fade-up"
                      data-aos-delay={index * 50 + 150}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white" data-aos="fade-up" data-aos-delay={index * 50 + 200}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center" data-aos="zoom-in" data-aos-delay="400">
              <button className="clean-button">
                Explore All Features <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="clean-section relative overflow-hidden"
          style={{ background: "var(--bg-gradient-alt)" }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <AIImage
                title="Automated Trading"
                width={1200}
                height={800}
                type="automation"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="clean-container relative z-10">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="glow-gold-text">FREQUENTLY ASKED QUESTIONS</h2>
              <div className="divider"></div>
            </div>

            <div className="max-w-3xl mx-auto w-full" data-aos="fade-up" data-aos-delay="200">
              <Faq />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="clean-section" style={{ background: "var(--bg-gradient-section)" }}>
          <div className="clean-container">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="glow-gold-text">CONTACT US</h2>
              <div className="divider"></div>
              <p>Have questions or need assistance? Reach out to us via email.</p>
            </div>

            <div className="max-w-md mx-auto w-full" data-aos="zoom-in" data-aos-delay="200">
              <div className="clean-card">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-purple-900/50 border border-pink-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-purple-900/50 border border-pink-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-purple-900/50 border border-pink-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <button type="submit" className="clean-button w-full">
                    Send Message <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-pink-800/50">
                  <div className="flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-400 mr-2" />
                    <a href="mailto:contact@houseofalgos.com" style={{ color: "#ffc940" }} className="hover:underline">
                      contact@houseofalgos.com
                    </a>
                  </div>
                  <p className="text-center text-sm text-white mt-4">
                    🌟 Join the Future of Trading – Get Started Today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section
          id="disclaimer"
          className="py-16"
          style={{ background: "linear-gradient(135deg, rgba(45, 10, 78, 0.9), rgba(154, 28, 94, 0.9))" }}
        >
          <div className="clean-container">
            <div className="clean-header" data-aos="fade-up">
              <h2 className="text-2xl font-bold mb-4 glow-gold-text" style={{ color: "#ffc940" }}>
                DISCLAIMER
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-pink-600 to-amber-400 mx-auto"></div>
            </div>

            <div className="max-w-4xl mx-auto w-full clean-card" data-aos="fade-up" data-aos-delay="200">
              <p className="text-sm text-white mb-4">
                House of Algo's is not a financial advisor, investment firm, or brokerage. We do not provide any
                guarantees of profit or fixed returns. Trading in Forex and stock markets involves substantial risk,
                including the risk of losing all invested capital. Past performance of our trading algorithms does not
                guarantee future results.
              </p>

              <p className="text-sm text-white mb-4">By using our platform, you acknowledge and accept that:</p>

              <ul className="list-disc pl-5 text-sm text-white space-y-2 mb-4">
                <li>Algorithmic trading involves market risks and unpredictable fluctuations.</li>
                <li>We are not responsible for any financial losses incurred while using our strategies.</li>
                <li>There is no assurance of consistent profits or returns.</li>
                <li>
                  Users should conduct their own due diligence and consult with financial professionals before making
                  investment decisions.
                </li>
                <li>
                  We do not hold liability for any losses due to market conditions, software errors, or unexpected
                  economic events.
                </li>
              </ul>

              <p className="text-sm text-white">
                Trading in Forex and other financial markets is speculative and may not be suitable for all investors.
                Please trade responsibly and only with funds you can afford to lose.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t border-pink-800/50 py-8"
        style={{ background: "linear-gradient(135deg, rgba(45, 10, 78, 0.95), rgba(154, 28, 94, 0.95))" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-start mb-4 md:mb-0" data-aos="fade-right">
              <div className="flex items-center">
                <Image src="/logo.png" alt="House of Algo's Logo" width={50} height={50} className="mr-2" />
                <h1 className="text-xl font-bold glow-gold-text" style={{ color: "#ffc940" }}>
                  HOUSE OF ALGO'S
                </h1>
              </div>
              <p className="text-white text-xs ml-12 -mt-1">Trade with Intelligence, Earn with Confidence</p>
            </div>

            <div className="flex space-x-6" data-aos="fade-left">
              {[
                { name: "HOME", href: "#home" },
                { name: "ABOUT", href: "#about" },
                { name: "VISION", href: "#vision" },
                { name: "INCOME", href: "#income" },
                { name: "CONTACT", href: "#contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs font-medium text-white hover:text-amber-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-pink-800/50 mt-6 pt-6 text-center" data-aos="fade-up" data-aos-delay="200">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} House of Algo's. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

