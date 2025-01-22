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
      <HeroSection
        title="New Generation of Automation"
        subtitle={{
          regular: "Intent-Driven ",
          gradient: "Fundraising Engagement",
        }}
        description="Capture intent signals to gain full visibility into who and how to contact next — efficiently increasing your revenue and shortening your fundraising cycle."
        ctaText="Try for Free"
        ctaHref="/signup"
        secondaryCtaText="Learn More About Outraise"
        secondaryCtaHref="#features"
        bottomImage={{
          light: "/assets/outraise-dashboard-light.png",
          dark: "/assets/outraise-dashboard-dark.png",
        }}
      />

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