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
    <div className="mb-8 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="mb-6 px-4 md:px-0">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-muted-foreground text-sm md:text-base">{description}</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-0">
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