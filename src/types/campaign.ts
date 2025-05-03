
export type CampaignStatus = "active" | "draft" | "paused" | "completed";
export type CampaignObjective = "prospecting" | "nurture" | "follow-up" | "upsell";
export type LeadSource = "smart-search" | "import" | "radar" | "existing-base";
export type ApproachType = "whatsapp" | "email" | "manual";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  objective: string;
  progress: number;
  totalLeads: number;
  leadSource: string;
  responses: number;
  meetings: number;
  conversionRate: number;
  createdAt: string;
  remainingDays: number;
}
