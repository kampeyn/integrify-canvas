import { useState } from "react";
import { IntegrationCategory } from "@/components/integration-category";
import type { IntegrationCategory as IIntegrationCategory } from "@/types/integration";

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
  const [categories, setCategories] = useState<IIntegrationCategory[]>(initialCategories);

  const handleToggleConnection = (integrationId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        integrations: category.integrations.map((integration) =>
          integration.id === integrationId
            ? { ...integration, connected: !integration.connected }
            : integration
        ),
      }))
    );
  };

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