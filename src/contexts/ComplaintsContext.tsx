import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Complaint, ComplaintStatus, SeverityLevel, ResolutionRecommendation, ExecutionRecommendation, MaintenanceTeam } from '@/types';
import { initialComplaints, maintenanceTeams } from '@/data/mockData';

interface ComplaintsContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'aiConfidence' | 'aiClassification'> & { aiConfidence?: number, aiClassification?: string }) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus, notes?: string) => void;
  assignTeam: (id: string, team: string) => void;
  setSeverity: (id: string, severity: SeverityLevel) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  getComplaintsByUser: (userId: string) => Complaint[];
  getComplaintsByStatus: (status: ComplaintStatus) => Complaint[];
  maintenanceTeams: MaintenanceTeam[];
}

const ComplaintsContext = createContext<ComplaintsContextType | undefined>(undefined);

const aiClassifications = ['Surface Crack', 'Deep Pothole', 'Road Cave-in', 'Edge Deterioration', 'Alligator Cracking'];

// Helper to generate Resolution Recommendations (Cost Focused)
const generateResolutionRecs = (severity: SeverityLevel): ResolutionRecommendation[] => {
  return [
    {
      type: severity === 'Critical' ? 'Emergency Pavement Restoration' : 'Cold Mix Patching',
      cost: severity === 'Critical' ? 25000 : 12500,
      completionTime: severity === 'Critical' ? '2 Hours' : '6 Hours',
      suitability: 'Optimal',
      confidence: 94,
      details: {
        advantages: ['Quick mobilization', 'Minimal traffic disruption'],
        disadvantages: ['Temporary nature', 'Requires dry conditions'],
        risks: ['Base water entrapment'],
        materials: ['Cold-mix asphalt', 'Tack coat'],
        impact: 'Safe road surface restored immediately.'
      }
    },
    {
      type: 'Hot Mix Overlay',
      cost: 45000,
      completionTime: '12 Hours',
      suitability: 'High',
      confidence: 88,
      details: {
        advantages: ['High durability', 'Superior bond with old road'],
        disadvantages: ['Requires heating machinery', 'Longer setup time'],
        risks: ['Thermal cracking if cooled too fast'],
        materials: ['Hot Bitumen SG', 'Graded aggregates'],
        impact: 'Robust long-term structural solution.'
      }
    },
    {
      type: 'Stone Matrix Asphalt',
      cost: 75000,
      completionTime: '24 Hours',
      suitability: 'Partial',
      confidence: 82,
      details: {
        advantages: ['Extreme fatigue resistance', 'High rutting resistance'],
        disadvantages: ['Higher material cost', 'Specialized additives needed'],
        risks: ['Reflective cracking if base is weak'],
        materials: ['Cellulose fibers', 'Modified bitumen', 'High quality aggregates'],
        impact: 'Heavy-duty reinforcement for high traffic loads.'
      }
    },
    {
      type: 'Full Depth Reclamation',
      cost: 120000,
      completionTime: '3 Days',
      suitability: 'Low',
      confidence: 76,
      details: {
        advantages: ['Stops recurring failure', 'Base reinforcement'],
        disadvantages: ['Very expensive', 'Complete road closure required'],
        risks: ['Over-excavation risking subgrade collapse'],
        materials: ['Granular sub-base', 'WMM', 'Bituminous Concrete'],
        impact: 'Extends infrastructure life by 10 years.'
      }
    }
  ];
};

// Helper to generate Execution Recommendations (Speed/Logistics Focused)
const generateExecutionRecs = (complaint: Complaint, teams: MaintenanceTeam[]): ExecutionRecommendation[] => {
  // Find teams in the same district first
  const districtTeams = teams.filter(t => t.district === complaint.district);

  // Create a priority list based on distance/suitability
  return districtTeams.concat(teams.filter(t => t.district !== complaint.district))
    .map((team, idx) => ({
      type: `Dispatch ${team.name}`,
      teamId: team.id,
      teamName: team.name,
      travelTime: `${Math.floor(15 + idx * 20)} Min`,
      workDuration: '2.5 Hours',
      manpower: team.members,
      delayProb: 5 + idx * 10,
      confidence: 96 - idx * 4,
      suitability: idx === 0 ? 'Optimal' : idx === 1 ? 'High' : idx === 2 ? 'Partial' : 'Low',
      details: {
        positives: ['Available unit', 'Minimal travel cost'],
        negatives: ['Equipment limitations'],
        costs: { fuel: 850 + idx * 200, time: 25 + idx * 15 },
        manpowerImpact: `${team.members} personnel locked`,
        slaEffect: idx < 2 ? '+45% safety margin' : '-10% SLA risk'
      }
    })).slice(0, 4);
};

export const ComplaintsProvider = ({ children }: { children: ReactNode }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const save = (updated: Complaint[]) => {
    setComplaints(updated);
  };

  const addComplaint = useCallback((data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'aiConfidence' | 'aiClassification'> & { aiConfidence?: number, aiClassification?: string }) => {
    const severity = data.severity || 'Medium';
    const newComplaint: Complaint = {
      ...data,
      id: `CPL-${String(Date.now()).slice(-6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiConfidence: data.aiConfidence || Math.round((75 + Math.random() * 20) * 10) / 10,
      aiClassification: data.aiClassification || aiClassifications[Math.floor(Math.random() * aiClassifications.length)],
      depthEstimate: Math.round((5 + Math.random() * 15) * 10) / 10,
      surfaceDamage: Math.round((10 + Math.random() * 60)),
      riskLevel: severity === 'Critical' || severity === 'High' ? 'High' : severity === 'Medium' ? 'Medium' : 'Low',
      resolutionRecommendations: generateResolutionRecs(severity),
    } as Complaint;
    save([newComplaint, ...complaints]);
  }, [complaints]);

  const updateComplaintStatus = useCallback((id: string, status: ComplaintStatus, notes?: string) => {
    save(complaints.map(c => {
      if (c.id === id) {
        const updated = {
          ...c, status, updatedAt: new Date().toISOString(),
          ...(notes ? { districtOfficerNotes: notes } : {}),
          ...(status === 'Resolved' ? { resolvedAt: new Date().toISOString() } : {}),
        };
        // Add Execution recommendations when moved to Assigned or In Progress
        if (status === 'Assigned' || status === 'Approved') {
          updated.executionRecommendations = generateExecutionRecs(updated, maintenanceTeams);
        }
        return updated;
      }
      return c;
    }));
  }, [complaints]);

  const assignTeam = useCallback((id: string, team: string) => {
    save(complaints.map(c => c.id === id ? { ...c, assignedTeam: team, updatedAt: new Date().toISOString() } : c));
  }, [complaints]);

  const setSeverity = useCallback((id: string, severity: SeverityLevel) => {
    save(complaints.map(c => c.id === id ? {
      ...c,
      severity,
      updatedAt: new Date().toISOString(),
      resolutionRecommendations: generateResolutionRecs(severity)
    } : c));
  }, [complaints]);

  const updateComplaint = useCallback((id: string, updates: Partial<Complaint>) => {
    save(complaints.map(c => {
      if (c.id === id) {
        const updated = { ...c, ...updates, updatedAt: new Date().toISOString() };
        if (updates.status === 'Assigned' || updates.status === 'Approved') {
          updated.executionRecommendations = generateExecutionRecs(updated, maintenanceTeams);
        }
        return updated;
      }
      return c;
    }));
  }, [complaints]);

  const getComplaintsByUser = useCallback((userId: string) => complaints.filter(c => c.citizenId === userId), [complaints]);
  const getComplaintsByStatus = useCallback((status: ComplaintStatus) => complaints.filter(c => c.status === status), [complaints]);

  return (
    <ComplaintsContext.Provider value={{
      complaints, addComplaint, updateComplaintStatus, assignTeam, setSeverity,
      updateComplaint, getComplaintsByUser, getComplaintsByStatus, maintenanceTeams
    }}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => {
  const ctx = useContext(ComplaintsContext);
  if (!ctx) throw new Error('useComplaints must be used within ComplaintsProvider');
  return ctx;
};
