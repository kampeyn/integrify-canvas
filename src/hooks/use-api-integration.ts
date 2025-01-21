import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface UseApiIntegrationProps {
  integrationId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useApiIntegration = ({
  integrationId,
  onSuccess,
  onError,
}: UseApiIntegrationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const connectApi = async (credentials: Record<string, any>) => {
    setIsLoading(true);
    try {
      const response = await supabase.functions.invoke("manage-integration", {
        body: {
          integration_id: integrationId,
          credentials,
        },
      });

      if (response.error) throw new Error(response.error.message);

      toast({
        title: "Integration Connected",
        description: "Successfully connected the integration.",
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error connecting integration:", error);
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectApi = async () => {
    setIsLoading(true);
    try {
      const response = await supabase.functions.invoke("manage-integration", {
        method: "DELETE",
        body: {
          integration_id: integrationId,
        },
      });

      if (response.error) throw new Error(response.error.message);

      toast({
        title: "Integration Disconnected",
        description: "Successfully disconnected the integration.",
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error disconnecting integration:", error);
      toast({
        title: "Disconnection Failed",
        description: error.message,
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    connectApi,
    disconnectApi,
    isLoading,
  };
};