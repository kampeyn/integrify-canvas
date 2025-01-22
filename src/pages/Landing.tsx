import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/ui/hero-section"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/components/theme-provider/use-theme"

const Landing = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="text-2xl font-bold text-primary">Outraise</div>
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection>
        <main className="container relative z-10 mx-auto px-4 pt-24 sm:px-6 lg:pt-32">
          <div className="mx-auto max-w-[800px] text-center">
            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              New Generation of Automation
            </h1>

            {/* Subheading with Gradient */}
            <h2 className="mb-6 text-2xl font-semibold sm:text-3xl md:text-4xl">
              <span className="text-foreground">Intent-Driven </span>
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Fundraising Engagement
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Capture intent signals to gain full visibility into who and how to contact next — efficiently
              increasing your revenue and shortening your fundraising cycle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="text-base sm:text-lg"
              >
                Try for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg"
              >
                Learn More About Outraise
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <div className="relative mx-auto max-w-5xl">
              <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-gray-900/10">
                <img
                  src={theme === "dark" ? "/assets/outraise-dashboard-dark.png" : "/assets/outraise-dashboard-light.png"}
                  alt="Outraise Dashboard"
                  className="w-full"
                  width={1200}
                  height={675}
                />
              </div>
            </div>
          </div>
        </main>
      </HeroSection>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-card p-6 shadow-lg transition-transform hover:scale-105"
            >
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Centralized Management",
    description:
      "Manage all your tech integrations from a single dashboard with real-time status updates.",
  },
  {
    title: "Easy Integration",
    description:
      "Connect your email providers, CRMs, marketing tools, and donation pages with just a few clicks.",
  },
  {
    title: "Real-time Updates",
    description:
      "Stay informed with instant updates on your integration statuses and connection health.",
  },
]

export default Landing