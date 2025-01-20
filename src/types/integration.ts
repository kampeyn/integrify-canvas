export type IntegrationType = 
  | "email_provider"
  | "crm"
  | "email_marketing"
  | "donation_tools";

export type Integration = {
  id: string;
  name: string;
  type: IntegrationType;
  description: string;
  url: string;
  connected: boolean;
  icon?: string;
};

export type IntegrationCategory = {
  id: IntegrationType;
  title: string;
  description: string;
  integrations: Integration[];
};