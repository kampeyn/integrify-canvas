import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { AnimatedShinyText } from "./animated-shiny-text"

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
          {/* Main Heading (now with pill design and shiny animation) */}
          <div className="mb-8 flex justify-center">
            <div className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}>
              <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2 text-2xl font-semibold sm:text-3xl md:text-4xl">
                {title}
              </AnimatedShinyText>
            </div>
          </div>

          {/* Subheading with Gradient (now headline size) */}
          <h2 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-foreground">{subtitle.regular}</span>{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              {subtitle.gradient}
            </span>
          </h2>

          {/* Description (paragraph size) */}
          <p className="mx-auto mb-12 max-w-2xl text-base text-muted-foreground/80 sm:text-lg">
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