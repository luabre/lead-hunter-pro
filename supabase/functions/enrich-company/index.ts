
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    // If no API key, return a demo response
    if (!openAIApiKey) {
      console.log("No OpenAI API key found, returning demo response");
      return new Response(JSON.stringify({
        generatedText: `
Site provável: empresademo.com.br
Tipo jurídico: LTDA
Porte estimado: Médio
Número de funcionários: 50-100
Faturamento estimado: R$ 5-10 milhões/ano
Presença digital (média): Média
Nome e cargo provável do decisor: Carlos Oliveira, Diretor de Operações
Canais recomendados para contato: LinkedIn, Email, WhatsApp
Sinais de oportunidade detectados: Expansão recente, Contratações em andamento
Observações relevantes: Empresa com crescimento acelerado no último ano, pode estar buscando novos fornecedores.
        `
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um assistente especializado em dados empresariais brasileiros. Sua função é gerar informações estruturadas sobre empresas, mesmo quando há poucos dados disponíveis. Baseie-se nas tendências de mercado e conhecimento geral sobre empresas similares para inferir informações quando necessário. Mantenha suas respostas estritamente no formato solicitado.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enrich-company function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
