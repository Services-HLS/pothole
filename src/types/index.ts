export type UserRole = 'citizen' | 'district_officer' | 'state_officer';

export type ComplaintStatus =
  | 'Submitted'
  | 'Under Verification'
  | 'Approved'
  | 'Assigned'
  | 'In Progress'
  | 'Under Inspection'
  | 'Completed'
  | 'Resolved'
  | 'Rejected'
  | 'Reopened';

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  phone?: string;
}

export interface ResolutionRecommendation {
  type: string;
  cost: number;
  completionTime: string;
  suitability: 'Optimal' | 'High' | 'Partial' | 'Low';
  confidence: number;
  details: {
    advantages: string[];
    disadvantages: string[];
    risks: string[];
    materials: string[];
    impact: string;
  };
}

export interface ExecutionRecommendation {
  type: string;
  teamId: string;
  teamName: string;
  travelTime: string;
  workDuration: string;
  manpower: number;
  delayProb: number;
  confidence: number;
  details: {
    positives: string[];
    negatives: string[];
    costs: { fuel: number; time: number };
    manpowerImpact: string;
    slaEffect: string;
  };
}

export interface Complaint {
  id: string;
  citizenId: string;
  citizenName: string;
  title: string;
  description: string;
  area: string;
  landmark: string;
  district: string;
  latitude: number;
  longitude: number;
  severity: SeverityLevel;
  status: ComplaintStatus;
  imageUrl: string;
  aiConfidence: number;
  aiClassification: string;
  createdAt: string;
  updatedAt: string;
  assignedTeam?: string;
  districtOfficerNotes?: string;
  stateOfficerNotes?: string;
  repairImageUrl?: string;
  estimatedCost?: number;
  resolvedAt?: string;
  source: 'Citizen' | 'APSRTC Bus' | 'Municipal CCTV';
  appliedAction?: string;
  recommendations?: { type: string; confidence: number; description: string }[];

  // New AI Analysis Fields
  depthEstimate?: number; // In cm
  surfaceDamage?: number; // In percentage
  riskLevel?: 'High' | 'Medium' | 'Low';

  // Independent Recommendation Systems
  resolutionRecommendations?: ResolutionRecommendation[];
  executionRecommendations?: ExecutionRecommendation[];

  justification?: string;
  deadline?: string;
  budget?: number;
  qualityScore?: number;
  trafficDensity?: 'Low' | 'Medium' | 'High';
  roadCategory?: 'National Highway' | 'State Highway' | 'District Road' | 'Village Road';
  beforeImageUrl?: string;
  duringImageUrl?: string;
  afterImageUrl?: string;
  mandal?: string;
  ward?: string;
  historicalFootage?: { type: 'dashcam' | 'cctv', url: string, timestamp: string }[];
}

export interface MaintenanceTeam {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  status: 'Available' | 'On Task' | 'Offline';
  specialization: 'Highways' | 'Urban' | 'Emergency' | 'General';
  members: number;
}

export interface KPIData {
  label: string;
  value: number | string;
  change?: number;
  icon?: string;
}

export interface DemoCredentials {
  email: string;
  password: string;
  role: UserRole;
  user: User;
}
