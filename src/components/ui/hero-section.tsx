"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-background",
          className
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <RetroGrid />
        </div>
        {children}
      </div>
    )
  }
)
HeroSection.displayName = "HeroSection"

const RetroGrid = () => {
  const gridOptions = {
    angle: 45,
    opacity: 0.6,
    lightLineColor: "#E2E8F0",
    darkLineColor: "#1A202C",
  }

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridOptions.angle}deg, ${gridOptions.lightLineColor} 1px, transparent 1px), linear-gradient(-${gridOptions.angle}deg, ${gridOptions.lightLineColor} 1px, transparent 1px)`,
          backgroundSize: "35px 35px",
          opacity: gridOptions.opacity,
        }}
      />
      <div className="absolute inset-0 bg-background/90" />
    </div>
  )
}

export { HeroSection }