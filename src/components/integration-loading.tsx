import { Skeleton } from "@/components/ui/skeleton";

const IntegrationLoading = () => (
  <div className="container mx-auto py-8 px-4">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-48 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

export default IntegrationLoading;