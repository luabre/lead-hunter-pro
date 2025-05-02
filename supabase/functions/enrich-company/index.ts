
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

// Map of segment keywords to their specific sectors and subsectors
const segmentSectorMap: Record<string, {sector: string, subsectors: string[]}> = {
  "saúde": {
    sector: "Terciário",
    subsectors: [
      "Hospitais", "Clínicas médicas", "Clínicas odontológicas", "Laboratórios", "Análises clínicas",
      "Planos de saúde", "Farmácias", "Drogarias", "Home care", "Telemedicina"
    ]
  },
  "tecnologia": {
    sector: "Terciário/Quaternário",
    subsectors: [
      "Desenvolvimento de software", "Consultoria em TI", "Infraestrutura de TI",
      "Inteligência artificial", "Serviços em nuvem", "Desenvolvimento web", "E-commerce"
    ]
  },
  "construção": {
    sector: "Secundário",
    subsectors: [
      "Construção civil", "Incorporadoras", "Empreiteiras", "Materiais de construção",
      "Engenharia", "Arquitetura", "Reformas"
    ]
  },
  "alimentação": {
    sector: "Secundário/Terciário",
    subsectors: [
      "Indústria alimentícia", "Restaurantes", "Fast food", "Distribuidoras", "Atacadistas",
      "Supermercados", "Orgânicos", "Bebidas"
    ]
  },
  "logística": {
    sector: "Terciário",
    subsectors: [
      "Transportadoras", "Armazenagem", "Distribuidoras", "Entregas", "Gestão de cadeia de suprimentos",
      "Frotas", "Logística reversa"
    ]
  },
  "educação": {
    sector: "Terciário",
    subsectors: [
      "Escolas", "Universidades", "Cursos profissionalizantes", "Ensino a distância",
      "Plataformas de aprendizado", "Treinamentos corporativos", "Idiomas"
    ]
  },
  "financeiro": {
    sector: "Terciário",
    subsectors: [
      "Bancos", "Seguradoras", "Corretoras", "Fintechs", "Crédito", "Investimentos",
      "Contabilidade", "Consultoria financeira"
    ]
  },
  "agronegócio": {
    sector: "Primário",
    subsectors: [
      "Agricultura", "Pecuária", "Insumos agrícolas", "Máquinas agrícolas", 
      "Processamento de alimentos", "Cooperativas", "Commodities"
    ]
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, segment } = await req.json();
    console.log("Request received for segment:", segment);
    
    // Normalize the segment for matching (lowercase, remove accents)
    const normalizedSegment = segment ? segment.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
    
    // Find specific sector information based on segment keywords
    let sectorInfo = null;
    for (const [key, info] of Object.entries(segmentSectorMap)) {
      if (normalizedSegment.includes(key) || key.includes(normalizedSegment)) {
        sectorInfo = info;
        break;
      }
    }

    // If no API key, return a demo response
    if (!openAIApiKey) {
      console.log("No OpenAI API key found, returning demo response");
      // Generate a more specific demo response based on the segment
      const demoResponse = sectorInfo ? 
        generateSegmentSpecificDemoResponse(segment, sectorInfo.sector, sectorInfo.subsectors) :
        generateGenericDemoResponse(segment);
        
      return new Response(JSON.stringify({
        generatedText: demoResponse
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enhanced prompt with detailed industry segmentation knowledge and forcing alignment with requested segment
    const enhancedPrompt = `
${prompt}

IMPORTANTE: Mantenha a empresa ESTRITAMENTE no segmento de "${segment}". Não crie empresas de outros segmentos.

Ao gerar o perfil da empresa, por favor use a seguinte classificação brasileira de segmentos de mercado:

1. Setor Primário: Empresas de extração de recursos naturais ou produção agrícola e pecuária (Agricultura, Pecuária, Extrativismo vegetal, Mineração, Pesca)

2. Setor Secundário: Empresas de transformação de matéria-prima em produtos industrializados (Indústria de transformação, Construção civil, Energia e utilities, Indústria química e farmacêutica, Siderurgia e metalurgia)

3. Setor Terciário: Empresas de serviços (Comércio/varejo, Serviços financeiros, Transporte e logística, Turismo e hospitalidade, Educação e saúde, Tecnologia e telecomunicações, Serviços profissionais)

4. Setor Quaternário: Empresas baseadas em conhecimento e inovação (Pesquisa e desenvolvimento, Tecnologia da Informação, Serviços especializados)

Para empresas de saúde, detalhe ainda mais o subsetor específico: Hospitais, Clínicas médicas/odontológicas, Laboratórios, Planos de saúde, Farmácias, Home care, etc.

Para porte da empresa, use as classificações: MEI (até R$81 mil/ano), Microempresa (até R$360 mil/ano), Pequena Empresa (até R$4,8 milhões/ano), Média Empresa (até R$300 milhões/ano), Grande Empresa (acima de R$300 milhões/ano).
`;

    console.log("Sending request to OpenAI for segment:", segment);

    // Determine the most appropriate system message based on the segment
    const systemMessage = sectorInfo ? 
      `Você é um assistente especializado em dados empresariais brasileiros, com foco no segmento de ${segment}. Sua função é gerar informações estruturadas sobre empresas deste segmento específico: ${segment}. Utilize seu conhecimento detalhado sobre os setores econômicos brasileiros, especialmente sobre ${sectorInfo.sector} e subsetores como ${sectorInfo.subsectors.join(", ")}. Baseie-se nas tendências de mercado e conhecimento geral sobre empresas similares para inferir informações quando necessário. Mantenha suas respostas estritamente no formato solicitado e NUNCA gere empresas de setores diferentes do solicitado (${segment}).` :
      `Você é um assistente especializado em dados empresariais brasileiros. Sua função é gerar informações estruturadas sobre empresas, com conhecimento detalhado sobre os setores econômicos brasileiros, classificações de porte de empresas e subsetores específicos. Baseie-se nas tendências de mercado e conhecimento geral sobre empresas similares para inferir informações quando necessário. Mantenha suas respostas estritamente no formato solicitado e SEMPRE focadas no segmento solicitado (${segment}).`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: enhancedPrompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("OpenAI API error:", data.error.message);
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }
    
    const generatedText = data.choices[0].message.content;
    console.log("Response received from OpenAI, length:", generatedText.length);

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

// Function to generate a segment-specific demo response
function generateSegmentSpecificDemoResponse(segment: string, sector: string, subsectors: string[]): string {
  const randomSubsector = subsectors[Math.floor(Math.random() * subsectors.length)];
  const randomSizeName = ['Pequena Empresa', 'Média Empresa', 'Grande Empresa'][Math.floor(Math.random() * 3)];
  const randomRevenueRange = randomSizeName === 'Pequena Empresa' ? 
    'R$ 1-5 milhões/ano' : 
    (randomSizeName === 'Média Empresa' ? 'R$ 10-50 milhões/ano' : 'R$ 100-500 milhões/ano');
  
  const randomEmployeeCount = randomSizeName === 'Pequena Empresa' ? 
    '15-50' : 
    (randomSizeName === 'Média Empresa' ? '100-250' : '500-1000');

  return `
Site provável: empresa${randomSubsector.toLowerCase().replace(/\s/g, '')}.com.br
Tipo jurídico: LTDA
Porte estimado: ${randomSizeName}
Classificação por setor: Setor ${sector}
Subsetor específico: ${randomSubsector}
Número de funcionários: ${randomEmployeeCount}
Faturamento estimado: ${randomRevenueRange}
Presença digital (média): Média
Nome e cargo provável do decisor: Carlos Oliveira, Diretor de Operações
Canais recomendados para contato: LinkedIn, Email, WhatsApp
Sinais de oportunidade detectados: Expansão recente, Contratações em andamento
Observações relevantes: Empresa com foco no segmento de ${segment}, apresentando crescimento acelerado no último ano, pode estar buscando novos fornecedores.
  `;
}

// Function to generate a generic demo response when no specific segment is matched
function generateGenericDemoResponse(segment: string): string {
  return `
Site provável: empresa${segment.toLowerCase().replace(/\s/g, '')}.com.br
Tipo jurídico: LTDA
Porte estimado: Médio
Número de funcionários: 50-100
Faturamento estimado: R$ 5-10 milhões/ano
Classificação por setor: Setor Terciário
Subsetor específico: ${segment}
Presença digital (média): Média
Nome e cargo provável do decisor: Carlos Oliveira, Diretor de Operações
Canais recomendados para contato: LinkedIn, Email, WhatsApp
Sinais de oportunidade detectados: Expansão recente, Contratações em andamento
Observações relevantes: Empresa com foco no segmento de ${segment}, apresentando crescimento acelerado no último ano, pode estar buscando novos fornecedores.
  `;
}
