import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "default" | "icon"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ServerLogo({ variant = "default", size = "md", className = "" }: LogoProps) {
  // Define dimensions based on size
  const dimensions = {
    sm: variant === "default" ? { width: 120, height: 36 } : { width: 36, height: 36 },
    md: variant === "default" ? { width: 150, height: 45 } : { width: 45, height: 45 },
    lg: variant === "default" ? { width: 200, height: 60 } : { width: 60, height: 60 },
  }

  const { width, height } = dimensions[size]
  const src = variant === "default" ? "/logo.svg" : "/logo-icon.svg"

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: variant === "default" ? width : height,
        height: height,
      }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt="Ligeranto Logo"
        fill
        priority
        sizes={`(max-width: 640px) ${width * 0.8}px, ${width}px`}
        style={{ objectFit: "contain", objectPosition: "left center" }}
      />
    </div>
  )
}

export function ServerLogoLink({ variant = "default", size = "md", className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <ServerLogo variant={variant} size={size} />
    </Link>
  )
}

