import { useState, useEffect } from "react";
import { IntegrationCategory } from "@/components/integration-category";
import type { IntegrationCategory as IIntegrationCategory } from "@/types/integration";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const initialCategories: IIntegrationCategory[] = [
  {
    id: "email_provider",
    title: "Email Providers",
    description: "Connect your email accounts to manage communications",
    integrations: [
      {
        id: "gmail",
        name: "Gmail",
        type: "email_provider",
        description: "Connect your Gmail account to manage emails and contacts",
        url: "https://gmail.com",
        connected: false,
      },
      {
        id: "outlook",
        name: "Outlook",
        type: "email_provider",
        description: "Integrate with Outlook for email management",
        url: "https://outlook.com",
        connected: false,
      },
      {
        id: "yahoo",
        name: "Yahoo Mail",
        type: "email_provider",
        description: "Connect your Yahoo Mail account",
        url: "https://mail.yahoo.com",
        connected: false,
      },
    ],
  },
  {
    id: "crm",
    title: "CRMs",
    description: "Manage your customer relationships efficiently",
    integrations: [
      {
        id: "numero",
        name: "Numero",
        type: "crm",
        description: "AI-powered CRM for modern teams",
        url: "https://numero.ai",
        connected: false,
      },
      {
        id: "campaign_deputy",
        name: "Campaign Deputy",
        type: "crm",
        description: "Complete campaign management solution",
        url: "https://campaigndeputy.com",
        connected: false,
      },
      {
        id: "raise_more",
        name: "Raise More",
        type: "crm",
        description: "Fundraising and donor management platform",
        url: "https://raisemore.app",
        connected: false,
      },
    ],
  },
  {
    id: "email_marketing",
    title: "Email Marketing",
    description: "Tools for email campaigns and newsletters",
    integrations: [
      {
        id: "mailchimp",
        name: "Mailchimp",
        type: "email_marketing",
        description: "Email marketing and automation platform",
        url: "https://mailchimp.com",
        connected: false,
      },
      {
        id: "action_network",
        name: "ActionNetwork",
        type: "email_marketing",
        description: "Digital organizing platform for nonprofits",
        url: "https://actionnetwork.org",
        connected: false,
      },
      {
        id: "constant_contact",
        name: "Constant Contact",
        type: "email_marketing",
        description: "Email marketing made easy",
        url: "https://constantcontact.com",
        connected: false,
      },
    ],
  },
  {
    id: "donation_tools",
    title: "Donation Page Tools",
    description: "Manage your fundraising and donation pages",
    integrations: [
      {
        id: "actblue",
        name: "ActBlue",
        type: "donation_tools",
        description: "Digital fundraising platform",
        url: "https://actblue.com",
        connected: false,
      },
      {
        id: "revv",
        name: "Revv",
        type: "donation_tools",
        description: "Fundraising and donor management",
        url: "https://revv.co",
        connected: false,
      },
      {
        id: "donorbox",
        name: "Donorbox",
        type: "donation_tools",
        description: "Online donation and fundraising platform",
        url: "https://donorbox.org",
        connected: false,
      },
    ],
  },
];

const Index = () => {
  const queryClient = useQueryClient();
  
  // Fetch integrations data with connection states
  const { data: categories = initialCategories, isLoading } = useQuery({
    queryKey: ['integrations'],
    queryFn: async () => {
      const { data: connections, error } = await supabase
        .from('integration_connections')
        .select('integration_id, connected');

      if (error) {
        console.error('Error fetching connections:', error);
        throw error;
      }

      return initialCategories.map(category => ({
        ...category,
        integrations: category.integrations.map(integration => ({
          ...integration,
          connected: connections?.find(conn => conn.integration_id === integration.id)?.connected || false
        }))
      }));
    }
  });

  // Mutation for toggling connection state
  const toggleConnectionMutation = useMutation({
    mutationFn: async ({ integrationId, connected }: { integrationId: string; connected: boolean }) => {
      const { data, error } = await supabase
        .from('integration_connections')
        .upsert(
          { 
            integration_id: integrationId, 
            connected,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'integration_id' }
        );

      if (error) {
        console.error('Error updating connection:', error);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['integrations'] });
    }
  });

  const handleToggleConnection = (integrationId: string) => {
    const category = categories.find(cat => 
      cat.integrations.some(int => int.id === integrationId)
    );
    const integration = category?.integrations.find(int => int.id === integrationId);
    
    if (integration) {
      toggleConnectionMutation.mutate({
        integrationId,
        connected: !integration.connected
      });
    }
  };

  if (isLoading) {
    return (
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
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Integrations</h1>
        <p className="text-xl text-muted-foreground">
          Connect your favorite tools and services
        </p>
      </div>
      
      {categories.map((category) => (
        <IntegrationCategory
          key={category.id}
          title={category.title}
          description={category.description}
          integrations={category.integrations}
          onToggleConnection={handleToggleConnection}
        />
      ))}
    </div>
  );
};

export default Index;