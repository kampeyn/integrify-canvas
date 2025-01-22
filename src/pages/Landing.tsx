import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/ui/hero-section"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/components/theme-provider/use-theme"

const Landing = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      <nav className="container fixed left-0 right-0 top-0 z-50 mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Outraise</div>
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </nav>

      <HeroSection>
        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              New Generation of Automation
            </h1>
            <h2 className="mb-4 text-3xl font-semibold sm:text-4xl">
              <span className="text-foreground">Intent-Driven </span>
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Fundraising Engagement
              </span>
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Capture intent signals to gain full visibility into who and how to contact next — efficiently
              increasing your revenue and shortening your fundraising cycle.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={() => navigate("/signup")}>
                Try for Free
              </Button>
              <Button size="lg" variant="outline">
                Learn More About Outraise
              </Button>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <img
              src={theme === "dark" ? "/assets/outraise-dashboard-dark.png" : "/assets/outraise-dashboard-light.png"}
              alt="Outraise Dashboard"
              className="rounded-lg shadow-2xl"
              width={1200}
              height={675}
            />
          </div>
        </div>
      </HeroSection>

      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-card p-6 shadow-lg transition-transform hover:scale-105"
            >
              <h3 className="mb-3 text-xl font-semibold text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
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