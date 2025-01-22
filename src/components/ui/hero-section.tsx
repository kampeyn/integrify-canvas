import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface HeroSectionProps {
  title: string
  subtitle: {
    regular: string
    gradient: string
  }
  description: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  bottomImage: {
    light: string
    dark: string
  }
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  bottomImage,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background pt-16">
      <div className="container relative z-10 mx-auto px-4 pt-24 sm:px-6 lg:pt-32">
        <div className="mx-auto max-w-[800px] text-center">
          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>

          {/* Subheading with Gradient */}
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl md:text-4xl">
            <span className="text-foreground">{subtitle.regular}</span>
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              {subtitle.gradient}
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Button asChild size="lg" className="text-base sm:text-lg">
              <Link to={ctaHref}>{ctaText}</Link>
            </Button>
            {secondaryCtaText && secondaryCtaHref && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base sm:text-lg"
              >
                <Link to={secondaryCtaHref}>{secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-gray-900/10">
              <img
                src={bottomImage.dark}
                alt="Dashboard Preview"
                className="hidden w-full dark:block"
                width={1200}
                height={675}
              />
              <img
                src={bottomImage.light}
                alt="Dashboard Preview"
                className="block w-full dark:hidden"
                width={1200}
                height={675}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}