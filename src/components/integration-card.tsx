import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleToggle = () => {
    onToggleConnection();
    toast({
      title: connected ? "Disconnected" : "Connected",
      description: `Successfully ${connected ? "disconnected from" : "connected to"} ${name}`,
    });
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
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}