export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          ai_detected: boolean | null
          city: string | null
          cnpj: string | null
          created_at: string | null
          created_by: string | null
          digital_maturity: number | null
          employees: string | null
          fantasy_name: string
          id: string
          name: string
          opportunity: string | null
          segment: string | null
          state: string | null
          updated_at: string | null
          website: string | null
          year_founded: string | null
        }
        Insert: {
          ai_detected?: boolean | null
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          created_by?: string | null
          digital_maturity?: number | null
          employees?: string | null
          fantasy_name: string
          id?: string
          name: string
          opportunity?: string | null
          segment?: string | null
          state?: string | null
          updated_at?: string | null
          website?: string | null
          year_founded?: string | null
        }
        Update: {
          ai_detected?: boolean | null
          city?: string | null
          cnpj?: string | null
          created_at?: string | null
          created_by?: string | null
          digital_maturity?: number | null
          employees?: string | null
          fantasy_name?: string
          id?: string
          name?: string
          opportunity?: string | null
          segment?: string | null
          state?: string | null
          updated_at?: string | null
          website?: string | null
          year_founded?: string | null
        }
        Relationships: []
      }
      lead_activities: {
        Row: {
          action_type: string
          description: string
          id: string
          is_ai_action: boolean | null
          lead_id: string
          metadata: Json | null
          performed_at: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          description: string
          id?: string
          is_ai_action?: boolean | null
          lead_id: string
          metadata?: Json | null
          performed_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          description?: string
          id?: string
          is_ai_action?: boolean | null
          lead_id?: string
          metadata?: Json | null
          performed_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          ai_interaction_count: number | null
          ai_recommendation: string | null
          assigned_to: string | null
          campaign: string | null
          company_id: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contact_position: string | null
          created_at: string | null
          created_by: string | null
          id: string
          last_action: string | null
          last_action_by: string | null
          last_action_date: string | null
          notes: string | null
          opportunity: Database["public"]["Enums"]["opportunity_level"] | null
          status: Database["public"]["Enums"]["lead_status"] | null
          updated_at: string | null
        }
        Insert: {
          ai_interaction_count?: number | null
          ai_recommendation?: string | null
          assigned_to?: string | null
          campaign?: string | null
          company_id: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_action?: string | null
          last_action_by?: string | null
          last_action_date?: string | null
          notes?: string | null
          opportunity?: Database["public"]["Enums"]["opportunity_level"] | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
        }
        Update: {
          ai_interaction_count?: number | null
          ai_recommendation?: string | null
          assigned_to?: string | null
          campaign?: string | null
          company_id?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_action?: string | null
          last_action_by?: string | null
          last_action_date?: string | null
          notes?: string | null
          opportunity?: Database["public"]["Enums"]["opportunity_level"] | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          last_name: string | null
          login_count: number | null
          login_logs: Json | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          login_count?: number | null
          login_logs?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string | null
          login_count?: number | null
          login_logs?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      sdr_performance: {
        Row: {
          closures: number | null
          conversion_rate: number | null
          created_at: string | null
          id: string
          insights: string | null
          leads_worked: number | null
          meetings: number | null
          period_end: string
          period_start: string
          qualified: number | null
          responses: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          closures?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          insights?: string | null
          leads_worked?: number | null
          meetings?: number | null
          period_end: string
          period_start: string
          qualified?: number | null
          responses?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          closures?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          id?: string
          insights?: string | null
          leads_worked?: number | null
          meetings?: number | null
          period_end?: string
          period_start?: string
          qualified?: number | null
          responses?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      lead_status:
        | "new"
        | "contacted"
        | "qualifying"
        | "meeting"
        | "negotiation"
        | "won"
        | "lost"
      opportunity_level: "hot" | "warm" | "cold"
      user_role: "admin" | "co_admin" | "manager" | "sdr"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      lead_status: [
        "new",
        "contacted",
        "qualifying",
        "meeting",
        "negotiation",
        "won",
        "lost",
      ],
      opportunity_level: ["hot", "warm", "cold"],
      user_role: ["admin", "co_admin", "manager", "sdr"],
    },
  },
} as const
