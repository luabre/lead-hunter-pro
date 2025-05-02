
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Types for the enriched company data
export interface EnrichedCompanyData {
  website?: string;
  companyType?: string;
  size?: string;
  employees?: string;
  revenue?: string;
  digitalPresence?: string;
  sector?: string;       // Primary, Secondary, Tertiary, or Quaternary
  subSector?: string;    // More specific industry category
  decisionMaker?: {
    name?: string;
    position?: string;
  };
  recommendedChannels?: string[];
  opportunitySignals?: string[];
  observations?: string;
}

/**
 * Enriches company data using GPT as a data source
 * This function can be replaced with actual API integrations in the future
 * without changing the frontend implementation
 */
export async function enrichCompanyWithGPT(
  companyName: string,
  city?: string,
  segment?: string
): Promise<EnrichedCompanyData | null> {
  try {
    // Get the OpenAI API key from Supabase's edge function
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa estar logado para enriquecer dados de empresas",
        variant: "destructive",
      });
      return null;
    }

    // Create the prompt for the GPT model with more specific instructions about matching the segment
    const prompt = `
Com base no nome da empresa abaixo, e se possível, na cidade e segmento, gere um perfil resumido da empresa para fins comerciais.

Nome da empresa: ${companyName}
Cidade (se houver): ${city || ""}
Segmento (se houver): ${segment || ""}

IMPORTANTE: O perfil deve ser específico para o segmento "${segment || ""}". Se não for possível determinar o segmento exato, escolha um subsegmento apropriado dentro do segmento principal solicitado.

Retorne em formato estruturado:
- Site provável:
- Tipo jurídico:
- Porte estimado:
- Classificação por setor: (Primário/Secundário/Terciário/Quaternário)
- Subsetor específico:
- Número de funcionários:
- Faturamento estimado:
- Presença digital (baixa, média, alta):
- Nome e cargo provável do decisor:
- Canais recomendados para contato:
- Sinais de oportunidade detectados:
- Observações relevantes:
    `;

    // Call OpenAI API to generate company data
    const response = await fetch("/api/enrich-company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        prompt,
        segment, // Pass segment explicitly to the edge function
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao enriquecer dados da empresa");
    }

    const data = await response.json();
    const result = parseGPTResponse(data.generatedText);

    return result;
  } catch (error: any) {
    console.error("Error enriching company data:", error);
    toast({
      title: "Erro ao enriquecer dados",
      description: error.message || "Não foi possível enriquecer os dados da empresa",
      variant: "destructive",
    });
    return null;
  }
}

/**
 * Saves a company to the database
 * IMPORTANT: Authentication check has been temporarily bypassed
 */
export async function saveCompanyToDatabase(company: any) {
  try {
    // MODIFIED: Removed authentication check to allow saving companies without login

    // Map the company data to the structure expected by the database
    const companyData = {
      name: company.name,
      fantasy_name: company.fantasyName,
      cnpj: company.cnpj || null,
      city: company.city || null,
      state: company.state || null,
      segment: company.segment || null,
      // Removed sector and subsector fields as they don't exist in the database
      employees: company.employees || null,
      opportunity: company.opportunity || null,
      ai_detected: company.aiDetected || false,
      website: company.website || company.digitalPresence || null,
      year_founded: company.yearFounded || null,
      digital_maturity: 50, // Default value
      created_at: new Date().toISOString(), // Convert Date to string
      created_by: null // MODIFIED: Set to null since we're bypassing authentication
    };

    console.log("Saving company data:", companyData);

    // Insert the company into the database
    const { data, error } = await supabase
      .from('companies')
      .insert(companyData)
      .select();

    if (error) {
      console.error("Error saving company to database:", error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível incluir a empresa na base de dados.",
        variant: "destructive",
      });
      return { success: false, error };
    }

    toast({
      title: "Empresa salva com sucesso",
      description: `${company.fantasyName} foi adicionada à base de dados.`,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("Error in save operation:", error);
    toast({
      title: "Erro ao salvar",
      description: "Ocorreu um erro ao processar sua solicitação.",
      variant: "destructive",
    });
    return { success: false, error };
  }
}

/**
 * Parses the GPT response text into a structured object
 */
function parseGPTResponse(text: string): EnrichedCompanyData {
  // Initialize empty result
  const result: EnrichedCompanyData = {};

  // Check for website
  const websiteMatch = text.match(/Site provável: (.+?)($|\n)/);
  if (websiteMatch) result.website = websiteMatch[1].trim();

  // Check for company type
  const typeMatch = text.match(/Tipo jurídico: (.+?)($|\n)/);
  if (typeMatch) result.companyType = typeMatch[1].trim();

  // Check for company size
  const sizeMatch = text.match(/Porte estimado: (.+?)($|\n)/);
  if (sizeMatch) result.size = sizeMatch[1].trim();

  // Check for sector classification
  const sectorMatch = text.match(/Classificação por setor: (.+?)($|\n)/);
  if (sectorMatch) result.sector = sectorMatch[1].trim();

  // Check for subsector
  const subSectorMatch = text.match(/Subsetor específico: (.+?)($|\n)/);
  if (subSectorMatch) result.subSector = subSectorMatch[1].trim();

  // Check for employee count
  const employeesMatch = text.match(/Número de funcionários: (.+?)($|\n)/);
  if (employeesMatch) result.employees = employeesMatch[1].trim();

  // Check for revenue
  const revenueMatch = text.match(/Faturamento estimado: (.+?)($|\n)/);
  if (revenueMatch) result.revenue = revenueMatch[1].trim();

  // Check for digital presence
  const digitalPresenceMatch = text.match(/Presença digital \(.+\): (.+?)($|\n)/);
  if (digitalPresenceMatch) result.digitalPresence = digitalPresenceMatch[1].trim();

  // Check for decision maker
  const decisionMakerMatch = text.match(/Nome e cargo provável do decisor: (.+?)($|\n)/);
  if (decisionMakerMatch) {
    const decisionMakerText = decisionMakerMatch[1].trim();
    const dmParts = decisionMakerText.split(',').map(part => part.trim());
    result.decisionMaker = {
      name: dmParts[0],
      position: dmParts[1] || ''
    };
  }

  // Check for recommended channels
  const channelsMatch = text.match(/Canais recomendados para contato: (.+?)($|\n)/);
  if (channelsMatch) {
    result.recommendedChannels = channelsMatch[1]
      .split(',')
      .map(channel => channel.trim());
  }

  // Check for opportunity signals
  const signalsMatch = text.match(/Sinais de oportunidade detectados: (.+?)($|\n)/);
  if (signalsMatch) {
    result.opportunitySignals = signalsMatch[1]
      .split(',')
      .map(signal => signal.trim());
  }

  // Check for observations
  const observationsMatch = text.match(/Observações relevantes: (.+?)($|\n)/);
  if (observationsMatch) result.observations = observationsMatch[1].trim();

  return result;
}
