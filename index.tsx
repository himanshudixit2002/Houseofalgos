"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  BarChart2,
  TrendingUp,
  DollarSign,
  Monitor,
  Mail,
  Menu,
  X,
  ChevronRight,
  Star,
  Shield,
  Zap,
  BarChart,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Faq } from "./components/faq"
import { AIImage } from "./components/ai-image"
import { CurrencyTicker } from "./components/currency-ticker"
import { CartoonTradingImage } from "./components/cartoon-trading-image"
import { Feature3DImage } from "./components/feature-3d-image"

export default function HouseOfAlgos() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [logoError, setLogoError] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  // Debounce function
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

    const handleScroll = () => {
      setScrollY(window.scrollY)

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
    }

    const debouncedHandleScroll = debounce(handleScroll, 50)

    window.addEventListener("scroll", debouncedHandleScroll)

    // Initial call to set the active section
    handleScroll()

    // Add smooth scrolling to the body
    document.body.classList.add("smooth-scroll")

    // Clean up
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll)
      document.head.removeChild(style)
      document.body.classList.remove("smooth-scroll")
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Parallax effect for hero section
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
      setIsMenuOpen(false)
    }
  }

  // Animation variants for framer-motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header
        className="fixed w-full z-50 border-b border-white/10 backdrop-blur-md"
        style={{ background: "linear-gradient(135deg, rgba(83, 22, 95, 0.9) 0%, rgba(186, 60, 94, 0.9) 100%)" }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {!logoError ? (
              <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="House of Algo's Logo"
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="w-20 h-20 mr-4 flex items-center justify-center bg-purple-900/30 rounded-full flex-shrink-0">
                <span className="text-amber-400 font-bold text-2xl">HOA</span>
              </div>
            )}
            <div className="flex flex-col justify-center">
              <h1 className="text-lg md:text-xl font-bold leading-tight" style={{ color: "#ffc940" }}>
                HOUSE OF ALGO'S
              </h1>
              <p className="text-white text-xs md:text-xs leading-tight">
                Trade with Intelligence, Earn with Confidence
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
              <button
                key={item.name}
                className={`nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
                onClick={() => scrollToSection(item.id)}
                style={
                  {
                    "--hover-color": "#ffc940",
                    "--active-color": "#ffc940",
                  } as React.CSSProperties
                }
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-gray-300 hover:text-amber-400 transition-all duration-300"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden border-t border-white/10 absolute w-full left-0 right-0 z-50 backdrop-blur-md"
            style={{ background: "linear-gradient(135deg, rgba(83, 22, 95, 0.95) 0%, rgba(186, 60, 94, 0.95) 100%)" }}
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
                  <button
                    key={item.name}
                    className={`py-2 px-3 text-center text-sm font-bold transition-all duration-200 ${
                      activeSection === item.id
                        ? "mobile-nav-active text-amber-400"
                        : "text-gray-300 hover:text-amber-400"
                    }`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section with Video Background */}
        <section id="home" ref={heroRef} className="hero-section">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
              onError={(e) => console.error("Video failed to load:", e)}
            >
              <source src="/vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Semi-transparent overlay - increased transparency */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(83, 22, 95, 0.3) 0%, rgba(186, 60, 94, 0.3) 100%)" }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-center"
              style={parallaxStyle}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                Welcome to <span style={{ color: "#ffc940" }}>HOUSE OF ALGO'S</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                Your trusted partner in algorithmic trading for the Forex market. We provide cutting-edge automated
                trading solutions powered by MT4, ensuring a seamless and profitable trading experience. Our expertly
                crafted strategies allow traders to maximize their income potential with minimal effort.
              </motion.p>
            </motion.div>
          </div>

          {/* Live Currency Ticker */}
          <div
            className="absolute bottom-0 left-0 right-0 py-4 overflow-hidden border-t border-white/10 backdrop-blur-md"
            style={{ background: "linear-gradient(135deg, rgba(83, 22, 95, 0.8) 0%, rgba(186, 60, 94, 0.8) 100%)" }}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center mb-2">
                <div
                  className="px-4 py-1 rounded-md mr-3 shadow-md"
                  style={{ backgroundColor: "rgba(83, 22, 95, 0.8)" }}
                >
                  <span className="text-xs font-bold text-white">LIVE FOREX RATES</span>
                </div>
                <div className="h-px flex-grow bg-white/20"></div>
              </div>
            </div>
            <div className="overflow-hidden">
              <CurrencyTicker />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="about-section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold mb-4 wavy-border inline-block">ABOUT US</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6">
                Discover how our algorithmic trading solutions can transform your trading experience
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-16">
              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-pink-500 rounded-lg blur opacity-25"></div>
                  <div className="relative overflow-hidden rounded-lg shadow-2xl">
                    <CartoonTradingImage width={600} height={400} className="w-full h-auto" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <p className="text-lg text-white mb-6 leading-relaxed">
                  At House of Algo's, we are passionate about helping traders succeed in the Forex market through
                  advanced algorithmic trading. Our team of experts has developed high-performance trading strategies
                  that operate automatically, removing emotional decision-making and optimizing profitability.
                </p>
                <p className="text-lg text-white mb-8 leading-relaxed">
                  We believe in financial freedom through technology and have created a platform where both beginners
                  and experienced traders can benefit from automated trading solutions.
                </p>

                <h3 className="text-2xl font-bold mb-6 mt-8 text-gradient">What Sets Us Apart?</h3>

                <motion.div
                  className="space-y-5"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {[
                    { text: "Proven Trading Strategies", icon: <Star className="w-5 h-5 text-amber-400" /> },
                    { text: "Risk-Managed Algo Systems", icon: <Shield className="w-5 h-5 text-amber-400" /> },
                    {
                      text: "24/7 Market Analysis & Optimization",
                      icon: <BarChart className="w-5 h-5 text-amber-400" />,
                    },
                    {
                      text: "Multiple Revenue Streams for Our Users",
                      icon: <DollarSign className="w-5 h-5 text-amber-400" />,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start glass-effect p-4 rounded-lg hover:border-amber-400/50 transition-all duration-300"
                      variants={fadeIn}
                    >
                      <div className="mr-4 mt-1 p-2 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-500/30">
                        {item.icon}
                      </div>
                      <span className="text-white text-lg">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-10"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <button
                    className="golden-button flex items-center text-base"
                    onClick={() => scrollToSection("contact")}
                  >
                    Join us today! <ChevronRight className="ml-1 w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="vision-section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold mb-4 wavy-border inline-block">VISION & MISSION</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6">
                Our guiding principles that drive everything we do
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-16">
              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <div className="glass-effect p-8 rounded-lg h-full transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div className="relative overflow-hidden rounded-lg mb-8 h-64">
                    <AIImage
                      title="Market Vision"
                      width={400}
                      height={300}
                      type="chart"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-gradient">Our Vision</h3>
                    </div>
                  </div>
                  <p className="text-white text-lg leading-relaxed">
                    To empower traders worldwide by providing seamless algorithmic trading solutions, making Forex
                    trading accessible, profitable, and stress-free for everyone.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <div className="glass-effect p-8 rounded-lg h-full transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div className="relative overflow-hidden rounded-lg mb-8 h-64">
                    <AIImage
                      title="Growth Strategy"
                      width={400}
                      height={300}
                      type="trading"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-gradient">Our Mission</h3>
                    </div>
                  </div>
                  <p className="text-white text-lg leading-relaxed">
                    To revolutionize the way people trade by offering automated strategies that minimize risk, maximize
                    profits, and create multiple streams of income for our users.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-16 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <button
                className="golden-button flex items-center mx-auto text-base"
                onClick={() => scrollToSection("contact")}
              >
                Discover Our Approach <ChevronRight className="ml-1 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Income Section */}
        <section id="income" className="income-section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold mb-4 wavy-border inline-block">INCOME STREAMS</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6">
                At House of Algo's, we believe in diversifying income streams. Here's how you can earn with us:
              </p>
            </motion.div>

            {/* Symmetric 2x2 grid layout */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-amber-400/20 to-pink-500/20 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-amber-400/10 to-pink-500/10 blur-xl"></div>
              </div>

              {/* Grid layout */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Box 1: Automated Trading Profits */}
                <motion.div
                  className="w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeIn}
                >
                  <div className="relative overflow-hidden rounded-lg group shadow-xl h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <AIImage
                      title="Automated Trading Profits"
                      width={600}
                      height={300}
                      type="automation"
                      className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-full bg-white/10 mr-4">
                          <BarChart2 className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gradient">Automated Trading Profits</h3>
                      </div>
                      <p className="text-white max-w-lg">
                        Our algo-based strategies trade 24/7 on your behalf, ensuring optimized returns while reducing
                        risks.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Box 2: PAMM Services */}
                <motion.div
                  className="w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeIn}
                >
                  <div className="relative overflow-hidden rounded-lg group shadow-xl h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <AIImage
                      title="PAMM Services"
                      width={600}
                      height={300}
                      type="money"
                      className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-full bg-white/10 mr-4">
                          <DollarSign className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gradient">PAMM Services</h3>
                      </div>
                      <p className="text-white max-w-lg">
                        Participate in PAMM services where experienced traders & ALGO manage funds on behalf of
                        investors.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Box 3: Copy Trading */}
                <motion.div
                  className="w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeIn}
                >
                  <div className="relative overflow-hidden rounded-lg group shadow-xl h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <AIImage
                      title="Copy Trading"
                      width={600}
                      height={300}
                      type="trading"
                      className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-full bg-white/10 mr-4">
                          <Monitor className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gradient">Copy Trading</h3>
                      </div>
                      <p className="text-white max-w-lg">
                        Follow and copy the best-performing strategies with ease. Even if you're a beginner, you can
                        trade like a pro!
                      </p>
                      <button
                        className="golden-button mt-4 text-base flex items-center"
                        onClick={() => scrollToSection("contact")}
                      >
                        Start Copy Trading <ChevronRight className="ml-1 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Box 4: Referral Program */}
                <motion.div
                  className="w-full"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeIn}
                >
                  <div className="relative overflow-hidden rounded-lg group shadow-xl h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <AIImage
                      title="Referral Program"
                      width={600}
                      height={300}
                      type="chart"
                      className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-full bg-white/10 mr-4">
                          <Mail className="w-8 h-8 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gradient">Referral Program</h3>
                      </div>
                      <p className="text-white max-w-lg">
                        Earn passive income by referring others to our platform. Get commissions for every successful
                        referral!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section id="platform" className="platform-section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold mb-4 wavy-border inline-block">PLATFORM</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6">
                Getting started with House of Algo's is simple:
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-pink-500 to-purple-600 hidden md:block"></div>

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
                    imageType: "money",
                    animation: "fade-left",
                  },
                  {
                    step: "Step 3",
                    title: "Deposit Funds & start following our PAMM ACCOUNT",
                    description:
                      "Fund your account and connect to our PAMM ACCOUNT or Copy trading to our MASTER ACCOUNT.",
                    imageType: "trading",
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
                  <motion.div
                    key={index}
                    className="flex mb-16 relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeIn}
                  >
                    <div className="hidden md:block">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-pink-500 rounded-full flex items-center justify-center relative z-10 animate-pulse-glow">
                        <span className="text-sm font-bold text-deep-purple">{item.step}</span>
                      </div>
                    </div>

                    <div className="md:ml-12 w-full">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="md:hidden mb-4">
                          <div className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full text-deep-purple text-sm font-medium">
                            {item.step}
                          </div>
                        </div>

                        <div className="w-full md:w-1/3 overflow-hidden rounded-lg glass-effect p-2 shadow-xl">
                          <AIImage
                            title={item.title}
                            width={300}
                            height={200}
                            type={item.imageType as any}
                            className="w-full h-auto rounded-lg transform hover:scale-105 transition-all duration-500"
                          />
                        </div>

                        <div className="w-full md:w-2/3">
                          <h3 className="text-xl font-bold mb-3 text-gradient">{item.title}</h3>
                          <p className="text-white text-lg leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <p className="text-lg text-amber-300 mb-6">
                  📌 No prior experience required. Just sit back and let the algorithms work!
                </p>
                <button
                  className="golden-button flex items-center mx-auto text-base"
                  onClick={() => scrollToSection("contact")}
                >
                  Get Started Now <ChevronRight className="ml-1 w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold mb-4 wavy-border inline-block">FEATURES</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6">
                Discover the powerful features that make our platform stand out
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "Fully Automated Trading",
                  icon: <Zap className="w-12 h-12 text-amber-400" />,
                  description:
                    "Our algo trading system operates 24/7, executing trades based on pre-set strategies without the need for manual intervention.",
                  imageType: "automation",
                  animation: "zoom-fade",
                },
                {
                  title: "User-Friendly Interface",
                  icon: <Monitor className="w-12 h-12 text-amber-400" />,
                  description:
                    "Designed for both beginners and experienced traders, our platform integrates seamlessly with MT4 for effortless trading.",
                  imageType: "platform",
                  animation: "fade-up-slow",
                },
                {
                  title: "Real-Time Market Analysis",
                  icon: <BarChart className="w-12 h-12 text-amber-400" />,
                  description:
                    "Our algorithms continuously analyze market trends, ensuring that trading decisions are made based on the latest market conditions.",
                  imageType: "analysis",
                  animation: "slide-up",
                },
                {
                  title: "Risk Management Tools",
                  icon: <Shield className="w-12 h-12 text-amber-400" />,
                  description:
                    "We implement stop-loss, take-profit, and risk diversification techniques to help minimize potential losses.",
                  imageType: "chart",
                  animation: "zoom-fade",
                },
                {
                  title: "Multiple Income Streams",
                  icon: <DollarSign className="w-12 h-12 text-amber-400" />,
                  description:
                    "Traders can earn not just through trading but also via referral programs, copy trading and subscription-based strategies.",
                  imageType: "money",
                  animation: "fade-up-slow",
                },
                {
                  title: "High-Speed Execution",
                  icon: <TrendingUp className="w-12 h-12 text-amber-400" />,
                  description:
                    "Our systems ensure rapid trade execution, reducing slippage and maximizing profit potential.",
                  imageType: "trading",
                  animation: "slide-up",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="feature-item glass-effect p-6 rounded-xl transform hover:translate-y-[-10px] transition-all duration-500 overflow-hidden shadow-xl"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeIn}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-500/30 backdrop-blur-sm animate-pulse-glow">
                      {item.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gradient">{item.title}</h3>

                    <div className="mb-6 w-full h-48 overflow-hidden rounded-lg">
                      <Feature3DImage
                        width={400}
                        height={200}
                        type={item.imageType as any}
                        className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                      />
                    </div>

                    <p className="text-white text-lg leading-relaxed mb-6">{item.description}</p>

                    <button
                      className="golden-button text-base flex items-center"
                      onClick={() => scrollToSection("contact")}
                    >
                      Learn More <ChevronRight className="ml-1 w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <button
                className="golden-button flex items-center mx-auto text-lg px-8 py-4"
                onClick={() => scrollToSection("contact")}
              >
                Explore All Features <ChevronRight className="ml-1 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="faq-section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold mb-4 wavy-border inline-block">FAQ</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6">
                Get answers to the most common questions about our platform
              </p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <Faq />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl font-bold mb-4 wavy-border inline-block">CONTACT US</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6">
                Have questions or need assistance? Reach out to us via email.
              </p>
            </motion.div>

            <motion.div
              className="max-w-md mx-auto w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <div className="glass-effect p-8 rounded-lg shadow-xl">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                      placeholder="Your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="golden-button w-full flex items-center justify-center text-base"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection("contact")
                    }}
                  >
                    Send Message <ChevronRight className="ml-1 w-5 h-5" />
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-400 mr-2" />
                    <a href="mailto:contact@houseofalgos.com" className="text-amber-400 hover:underline">
                      contact@houseofalgos.com
                    </a>
                  </div>
                  <p className="text-center text-sm text-white mt-4">
                    🌟 Join the Future of Trading – Get Started Today!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer-section py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Logo and Heading - Left Column */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-3">
                {!logoError ? (
                  <div className="relative w-16 h-16 mr-3">
                    <Image
                      src="/logo.png"
                      alt="House of Algo's Logo"
                      fill
                      className="object-contain"
                      onError={() => setLogoError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 mr-3 flex items-center justify-center bg-purple-900/30 rounded-full">
                    <span className="text-amber-400 font-bold text-xl">HOA</span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-amber-400">HOUSE OF ALGO'S</h3>
                  <p className="text-white/80 text-sm">Trade with Intelligence, Earn with Confidence</p>
                </div>
              </div>
            </div>

            {/* Quick Links - Center Column */}
            <div className="flex flex-col items-center">
              <h4
                className="text-amber-400 font-bold mb-4 text-lg relative pb-2 inline-block"
                style={{ textDecoration: "none" }}
              >
                Quick Links
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
              </h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                {[
                  { name: "Home", id: "home" },
                  { name: "Features", id: "features" },
                  { name: "About", id: "about" },
                  { name: "FAQ", id: "faq" },
                  { name: "Vision", id: "vision" },
                  { name: "Contact", id: "contact" },
                  { name: "Income", id: "income" },
                  { name: "Platform", id: "platform" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/80 hover:text-amber-400 transition-colors text-sm flex items-center group text-left"
                  >
                    <ChevronRight className="w-3 h-3 mr-1 text-amber-400/50 group-hover:text-amber-400 transition-colors" />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact - Right Column */}
            <div className="flex flex-col items-center md:items-end">
              <h4
                className="text-amber-400 font-bold mb-4 text-lg relative pb-2 inline-block"
                style={{ textDecoration: "none" }}
              >
                Contact Us
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
              </h4>
              <div className="flex items-center justify-center mb-2 glass-effect px-4 py-2 rounded-full">
                <Mail className="w-5 h-5 text-amber-400 mr-2" />
                <a
                  href="mailto:contact@houseofalgos.com"
                  className="text-white hover:text-amber-400 transition-colors text-sm"
                >
                  contact@houseofalgos.com
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-8 pt-4 w-full text-center">
            <p className="text-white/60 text-xs">
              &copy; {new Date().getFullYear()} House of Algo's. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

