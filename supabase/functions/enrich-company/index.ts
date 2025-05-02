
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Brazilian economic sectors classification
const brazilianSectors = {
  primary: [
    "Agricultura", "Pecuária", "Extrativismo vegetal", "Mineração", "Pesca", "Aquicultura"
  ],
  secondary: [
    "Indústria de transformação", "Construção civil", "Energia", "Utilities", 
    "Indústria química", "Indústria farmacêutica", "Siderurgia", "Metalurgia"
  ],
  tertiary: [
    "Comércio", "Varejo", "Atacado", "E-commerce", "Serviços financeiros", "Bancos", "Seguros",
    "Fintechs", "Transporte", "Logística", "Turismo", "Hospitalidade", "Educação", "Saúde",
    "Tecnologia", "Telecomunicações", "Serviços profissionais", "Consultoria"
  ],
  quaternary: [
    "Pesquisa e desenvolvimento", "P&D", "Tecnologia da Informação", "TI", "Inteligência artificial",
    "Serviços especializados", "Engenharia", "Biotecnologia"
  ]
};

// More detailed health sector classification
const healthSectors = [
  "Hospitais", "Clínicas médicas", "Clínicas odontológicas", "Laboratórios", "Análises clínicas",
  "Planos de saúde", "Farmácias", "Drogarias", "Home care", "Telemedicina", "Psicologia",
  "Fisioterapia", "Nutrição", "Indústria farmacêutica", "Equipamentos médicos",
  "Produtos hospitalares", "Biomedicina", "Biotecnologia", "Fitoterápicos",
  "Healthtech", "Diagnósticos"
];

// Business size classification in Brazil
const businessSizes = {
  "MEI": "Faturamento até R$ 81 mil/ano",
  "Microempresa": "Faturamento até R$ 360 mil/ano",
  "Pequena Empresa": "Faturamento até R$ 4,8 milhões/ano",
  "Média Empresa": "Faturamento até R$ 300 milhões/ano",
  "Grande Empresa": "Faturamento acima de R$ 300 milhões/ano"
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
Classificação por setor: Setor Terciário (Saúde)
Subsetor: Clínicas médicas
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

    // Enhanced prompt with detailed industry segmentation knowledge
    const enhancedPrompt = `
${prompt}

Ao gerar o perfil da empresa, por favor use a seguinte classificação brasileira de segmentos de mercado:

1. Setor Primário: Empresas de extração de recursos naturais ou produção agrícola e pecuária (Agricultura, Pecuária, Extrativismo vegetal, Mineração, Pesca)

2. Setor Secundário: Empresas de transformação de matéria-prima em produtos industrializados (Indústria de transformação, Construção civil, Energia e utilities, Indústria química e farmacêutica, Siderurgia e metalurgia)

3. Setor Terciário: Empresas de serviços (Comércio/varejo, Serviços financeiros, Transporte e logística, Turismo e hospitalidade, Educação e saúde, Tecnologia e telecomunicações, Serviços profissionais)

4. Setor Quaternário: Empresas baseadas em conhecimento e inovação (Pesquisa e desenvolvimento, Tecnologia da Informação, Serviços especializados)

Para empresas de saúde, detalhe ainda mais o subsetor específico: Hospitais, Clínicas médicas/odontológicas, Laboratórios, Planos de saúde, Farmácias, Home care, etc.

Para porte da empresa, use as classificações: MEI (até R$81 mil/ano), Microempresa (até R$360 mil/ano), Pequena Empresa (até R$4,8 milhões/ano), Média Empresa (até R$300 milhões/ano), Grande Empresa (acima de R$300 milhões/ano).
`;

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
            content: 'Você é um assistente especializado em dados empresariais brasileiros. Sua função é gerar informações estruturadas sobre empresas, com conhecimento detalhado sobre os setores econômicos brasileiros, classificações de porte de empresas e subsetores específicos como saúde. Baseie-se nas tendências de mercado e conhecimento geral sobre empresas similares para inferir informações quando necessário. Mantenha suas respostas estritamente no formato solicitado.' 
          },
          { role: 'user', content: enhancedPrompt }
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
