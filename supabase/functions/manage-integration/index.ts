import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface IntegrationRequest {
  integration_id: string;
  credentials?: Record<string, any>;
  access_token?: string;
  refresh_token?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    const { integration_id, credentials, access_token, refresh_token } = await req.json() as IntegrationRequest

    if (req.method === 'POST') {
      // Store integration credentials
      const { data, error } = await supabase
        .from('integration_credentials')
        .upsert({
          user_id: user.id,
          integration_id,
          credentials: credentials || {},
          access_token,
          refresh_token,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,integration_id'
        })

      if (error) throw error

      // Update connection status
      await supabase
        .from('integration_connections')
        .upsert({
          user_id: user.id,
          integration_id,
          connected: true,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,integration_id'
        })

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (req.method === 'DELETE') {
      // Remove integration credentials
      const { error: deleteError } = await supabase
        .from('integration_credentials')
        .delete()
        .match({ user_id: user.id, integration_id })

      if (deleteError) throw deleteError

      // Update connection status
      await supabase
        .from('integration_connections')
        .upsert({
          user_id: user.id,
          integration_id,
          connected: false,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,integration_id'
        })

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    throw new Error(`Method ${req.method} not allowed`)
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})