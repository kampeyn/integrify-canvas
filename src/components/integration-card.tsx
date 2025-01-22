import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApiIntegration } from "@/hooks/use-api-integration";

interface IntegrationCardProps {
  name: string;
  description: string;
  url: string;
  connected: boolean;
  onToggleConnection: () => void;
}

export function IntegrationCard({
  name,
  description,
  url,
  connected,
  onToggleConnection,
}: IntegrationCardProps) {
  const { connectApi, disconnectApi, isLoading } = useApiIntegration({
    integrationId: name.toLowerCase().replace(/\s+/g, '_'),
    onSuccess: onToggleConnection,
  });

  const handleToggle = async () => {
    if (connected) {
      await disconnectApi();
    } else {
      // For now, we'll just pass an empty object as credentials
      // In a real implementation, you'd want to show a modal or form to collect API keys
      // alert("API Key input is not yet implemented. Please check back later!"); // Temporary alert
      await connectApi({}); // Placeholder - replace with proper credentials handling
    }
  };

  return (
    <Card className="w-full transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom duration-500">
      <CardHeader className="pb-2 space-y-1">
        <CardTitle className="text-lg font-semibold line-clamp-1">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline truncate max-w-[200px]"
          >
            Visit website
          </a>
          <Button
            variant={connected ? "destructive" : "default"}
            onClick={handleToggle}
            className="w-full sm:w-28"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}