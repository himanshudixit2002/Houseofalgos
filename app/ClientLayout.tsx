"use client"

import type React from "react"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // More conservative AOS settings
    AOS.init({
      duration: 800, // Slightly longer for smoother animations
      once: false, // Allow animations to occur each time element scrolls into view
      mirror: true, // Mirror animations when scrolling back up
      offset: 100, // Offset (in px) from the original trigger point
      delay: 0, // No delay by default
      easing: "ease-out-cubic", // Smoother easing function
      throttleDelay: 99999, // Effectively disable throttling for smoother performance
      disable: typeof window !== "undefined" && window.innerWidth < 768 ? false : false, // Enable on all devices
    })

    // Clean up AOS on unmount
    return () => {
      if (typeof window !== "undefined") {
        // @ts-ignore - AOS doesn't have proper TypeScript definitions for this
        AOS.refresh()
      }
    }
  }, [])

  return <body className={inter.className}>{children}</body>
}

