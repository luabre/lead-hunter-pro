
// Local database types to extend Supabase types until they're properly regenerated
export type LeadStatus = 'new' | 'contacted' | 'qualifying' | 'meeting' | 'negotiation' | 'won' | 'lost';
export type OpportunityLevel = 'hot' | 'warm' | 'cold';
export type UserRole = 'admin' | 'co_admin' | 'manager' | 'sdr';

export interface DatabaseLead {
  id: string;
  company_id: string;
  assigned_to: string | null;
  status: LeadStatus;
  opportunity: OpportunityLevel | null;
  last_action_date: string | null;
  last_action_by: string | null;
  last_action: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  ai_interaction_count: number;
  ai_recommendation: string | null;
  campaign: string | null;
  notes: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_position: string | null;
}

export interface DatabaseCompany {
  id: string;
  name: string;
  fantasy_name: string;
  cnpj: string | null;
  city: string | null;
  state: string | null;
  segment: string | null;
  employees: string | null;
  opportunity: string | null;
  ai_detected: boolean;
  website: string | null;
  year_founded: string | null;
  digital_maturity: number | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface DatabaseProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  is_active: boolean;
  last_login: string | null;
  login_count: number;
  login_logs: any;
  created_at: string;
  updated_at: string;
}

export interface DatabaseLeadActivity {
  id: string;
  lead_id: string;
  user_id: string | null;
  action_type: string;
  description: string;
  metadata: any;
  is_ai_action: boolean;
  performed_at: string;
}

export interface DatabaseSdrPerformance {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  leads_worked: number;
  responses: number;
  qualified: number;
  meetings: number;
  closures: number;
  conversion_rate: number | null;
  insights: string | null;
  created_at: string;
  updated_at: string;
}
