import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "House of Algo's - Trade with Intelligence, Earn with Confidence",
  description: "Your trusted partner in algorithmic trading for the Forex market.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* <title>House of Algo's - Trade with Intelligence, Earn with Confidence</title>
        <meta name="description" content="Your trusted partner in algorithmic trading for the Forex market." /> */}
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}



import './globals.css'