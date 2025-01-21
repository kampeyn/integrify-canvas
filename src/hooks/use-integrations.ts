import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { IntegrationCategory } from "@/types/integration";

const initialCategories: IntegrationCategory[] = [
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

export const useIntegrations = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('integration-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'integration_connections'
        },
        () => {
          // Invalidate and refetch when changes occur
          queryClient.invalidateQueries({ queryKey: ['integrations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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

  return {
    categories,
    isLoading,
    toggleConnection: (integrationId: string) => {
      const category = categories?.find(cat => 
        cat.integrations.some(int => int.id === integrationId)
      );
      const integration = category?.integrations.find(int => int.id === integrationId);
      
      if (integration) {
        toggleConnectionMutation.mutate({
          integrationId,
          connected: !integration.connected
        });
      }
    }
  };
};