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

const saveCompanyToDatabase = async (data: EnrichedCompanyData) => {
  try {
    const { data: savedData, error } = await (supabase as any)
      .from('companies')
      .insert({
        name: data.name,
        fantasy_name: data.fantasyName,
        cnpj: data.cnpj,
        city: data.city,
        state: data.state,
        segment: data.segment,
        employees: data.employees,
        opportunity: data.opportunity,
        ai_detected: data.aiDetected,
        website: data.website,
        year_founded: data.yearFounded,
        digital_maturity: data.digitalMaturity,
        created_at: data.createdAt,
        created_by: data.createdBy
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return savedData;
  } catch (error) {
    console.error("Error saving company to database:", error);
    throw error;
  }
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
