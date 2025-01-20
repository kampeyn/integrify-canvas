import IntegrationHeader from "@/components/integration-header";
import IntegrationLoading from "@/components/integration-loading";
import { IntegrationCategory } from "@/components/integration-category";
import { useIntegrations } from "@/hooks/use-integrations";

const Index = () => {
  const { categories, isLoading, toggleConnection } = useIntegrations();

  if (isLoading) {
    return <IntegrationLoading />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <IntegrationHeader />
      
      {categories.map((category) => (
        <IntegrationCategory
          key={category.id}
          title={category.title}
          description={category.description}
          integrations={category.integrations}
          onToggleConnection={toggleConnection}
        />
      ))}
    </div>
  );
};

export default Index;