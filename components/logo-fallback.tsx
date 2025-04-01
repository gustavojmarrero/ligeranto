"use client"

import Image from "next/image"
import { useState } from "react"

interface LogoProps {
  variant?: "default" | "icon"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LogoFallback({ variant = "default", size = "md", className = "" }: LogoProps) {
  const [imgSrc, setImgSrc] = useState(variant === "default" ? "/logo.svg" : "/logo-icon.svg")

  // Define dimensions based on size
  const dimensions = {
    sm: variant === "default" ? { width: 120, height: 36 } : { width: 36, height: 36 },
    md: variant === "default" ? { width: 150, height: 45 } : { width: 45, height: 45 },
    lg: variant === "default" ? { width: 200, height: 60 } : { width: 60, height: 60 },
  }

  const { width, height } = dimensions[size]

  const handleError = () => {
    // If SVG fails, switch to PNG
    setImgSrc(variant === "default" ? "/logo-fallback.png" : "/logo-icon-fallback.png")
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: variant === "default" ? width : height,
        height: height,
      }}
    >
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt="Ligeranto Logo"
        fill
        priority
        sizes={`(max-width: 640px) ${width * 0.8}px, ${width}px`}
        style={{ objectFit: "contain", objectPosition: "left center" }}
        onError={handleError}
      />
    </div>
  )
}

