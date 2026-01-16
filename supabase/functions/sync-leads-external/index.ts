import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Internal Supabase client (Lovable Cloud)
    const internalUrl = Deno.env.get("SUPABASE_URL")!;
    const internalServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const internalClient = createClient(internalUrl, internalServiceKey);

    // External Supabase client (AlefDatabase)
    const externalUrl = Deno.env.get("EXTERNAL_SUPABASE_URL")!;
    const externalServiceKey = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_KEY")!;
    const externalClient = createClient(externalUrl, externalServiceKey);

    // Fetch all leads from internal database
    const { data: leads, error: fetchError } = await internalClient
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching leads:", fetchError);
      return new Response(
        JSON.stringify({ error: "Erro ao buscar leads", details: fetchError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Map leads to external table format (Chatbot Alavanca AI)
    // Note: The external table name has spaces, we need to use double quotes
    const mappedLeads = leads?.map((lead) => ({
      id: lead.id,
      email: lead.email,
      nome: lead.nome,
      servico_interesse: lead.servico_interesse,
      objetivo_projeto: lead.objetivo_projeto,
      resumo_da_conversa: lead.resumo_da_conversa,
      inicio_atendimento: lead.inicio_atendimento,
      session_id: lead.session_id,
      created_at: lead.created_at,
      updated_at: lead.updated_at,
    })) || [];

    if (mappedLeads.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "Nenhum lead para sincronizar", synced: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Upsert leads to external database
    // Using the table name "Chatbot Alavanca AI" with double quotes for spaces
    const { data: syncedData, error: syncError } = await externalClient
      .from("Chatbot Alavanca AI")
      .upsert(mappedLeads, { onConflict: "id" });

    if (syncError) {
      console.error("Error syncing leads:", syncError);
      return new Response(
        JSON.stringify({ error: "Erro ao sincronizar leads", details: syncError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully synced ${mappedLeads.length} leads`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `${mappedLeads.length} leads sincronizados com sucesso`,
        synced: mappedLeads.length,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: "Erro inesperado", details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
