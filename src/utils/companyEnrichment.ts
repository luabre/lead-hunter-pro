
import { supabase } from "@/integrations/supabase/client";

interface CompanyData {
  name: string;
  fantasyName: string;
  cnpj?: string;
  city?: string;
  state?: string;
  segment?: string;
  employees?: string;
  opportunity?: string;
  website?: string;
  yearFounded?: string;
  createdBy?: string;
}

interface EnrichedCompanyData extends CompanyData {
  digitalMaturity?: number;
  aiDetected: boolean;
  createdAt: string;
  digitalPresence?: string;
  revenue?: string;
  companyType?: string;
  decisionMaker?: {
    name: string;
    position: string;
  };
  opportunitySignals?: string[];
  recommendedChannels?: string[];
  observations?: string;
}

interface AIInsights {
  digitalMaturity: number;
}

export const enrichCompany = async (data: CompanyData) => {
  try {
    // Check if company already exists in our database
    const existingCompany = await checkExistingCompany(data.cnpj || data.name);
    
    if (existingCompany) {
      console.log("Company already exists in database:", existingCompany);
      return existingCompany;
    }

    // Get AI insights about the company
    const aiInsights = await getAIInsights(data);
    
    // Create enriched company data
    const enrichedData: EnrichedCompanyData = {
      ...data,
      digitalMaturity: aiInsights.digitalMaturity,
      aiDetected: true,
      createdAt: new Date().toISOString()
    };

    // Save to database
    const savedCompany = await saveCompanyToDatabase(enrichedData);
    
    return savedCompany;
  } catch (error) {
    console.error("Error enriching company:", error);
    throw error;
  }
};

// Export the enrichCompanyWithGPT function that components are trying to import
export const enrichCompanyWithGPT = async (companyName: string, city?: string, segment?: string): Promise<EnrichedCompanyData | null> => {
  try {
    // Mock AI enrichment for demonstration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const enrichedData: EnrichedCompanyData = {
      name: companyName,
      fantasyName: companyName,
      city: city || "São Paulo",
      segment: segment || "Tecnologia",
      digitalMaturity: Math.floor(Math.random() * 10) + 1,
      aiDetected: true,
      createdAt: new Date().toISOString(),
      website: `www.${companyName.toLowerCase().replace(/\s+/g, '')}.com.br`,
      companyType: "LTDA",
      employees: "50-100",
      digitalPresence: "Alta",
      revenue: "R$ 5-10 milhões/ano",
      decisionMaker: {
        name: "João Silva",
        position: "Diretor de Tecnologia"
      },
      opportunitySignals: ["Crescimento recente", "Investimento em tecnologia"],
      recommendedChannels: ["LinkedIn", "Email"],
      observations: "Empresa com potencial de crescimento e interesse em soluções tecnológicas."
    };
    
    return enrichedData;
  } catch (error) {
    console.error("Error enriching company with GPT:", error);
    return null;
  }
};

// Export the saveCompanyToDatabase function
export const saveCompanyToDatabase = async (data: any) => {
  try {
    console.log("Saving company to database:", data);
    
    // Mock save operation - in a real app this would save to Supabase
    const savedCompany = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      saved_at: new Date().toISOString()
    };
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: savedCompany
    };
  } catch (error) {
    console.error("Error saving company to database:", error);
    return {
      success: false,
      error: error
    };
  }
};

// Export the EnrichedCompanyData type
export type { EnrichedCompanyData };

const checkExistingCompany = async (identifier: string) => {
  try {
    const { data, error } = await (supabase as any)
      .from('companies')
      .select('*')
      .or(`cnpj.eq.${identifier},name.eq.${identifier}`)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error checking existing company:", error);
    return null;
  }
};

const getAIInsights = async (data: CompanyData): Promise<AIInsights> => {
  // Mock AI insights for demonstration
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const digitalMaturity = Math.floor(Math.random() * 10) + 1;
  
  return {
    digitalMaturity: digitalMaturity
  };
};

export const fetchCompanyById = async (companyId: string) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();
    
    if (error) {
      console.error("Error fetching company by ID:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return null;
  }
};
