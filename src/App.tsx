import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { DashboardLayout } from "@/components/dashboard-layout"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Landing from "./pages/Landing"
import Integrations from "./pages/dashboard/Integrations"
import Profile from "./pages/dashboard/Profile"
import Pricing from "./pages/pricing/index"
import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container py-6">
          <Skeleton className="h-10 w-[200px] mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>}>
          <Route path="integrations" element={<Integrations />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App