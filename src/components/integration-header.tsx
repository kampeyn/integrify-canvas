import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const IntegrationHeader = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Integrations</h1>
        <p className="text-xl text-muted-foreground">
          Connect your favorite tools and services
        </p>
      </div>
      <Button variant="outline" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default IntegrationHeader;