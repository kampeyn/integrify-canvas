import { IntegrationCard } from "./integration-card";
import type { Integration } from "@/types/integration";

interface IntegrationCategoryProps {
  title: string;
  description: string;
  integrations: Integration[];
  onToggleConnection: (integrationId: string) => void;
}

export function IntegrationCategory({
  title,
  description,
  integrations,
  onToggleConnection,
}: IntegrationCategoryProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            name={integration.name}
            description={integration.description}
            url={integration.url}
            connected={integration.connected}
            onToggleConnection={() => onToggleConnection(integration.id)}
          />
        ))}
      </div>
    </div>
  );
}