import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Outraise</div>
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Sign In
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Streamline Your Tech Stack with Outraise
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Centralize and manage all your integrations in one place. Connect your email
            providers, CRMs, marketing tools, and donation pages effortlessly.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={() => navigate("/auth")}>
              Get Started with Outraise
            </Button>
            <Button size="lg" variant="outline">
              Learn More About Outraise
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105"
            >
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
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