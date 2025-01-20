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
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            Visit website
          </a>
          <Button
            variant={connected ? "destructive" : "default"}
            onClick={handleToggle}
            className="w-28"
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}