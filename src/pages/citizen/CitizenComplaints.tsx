import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import ComplaintImage from '@/components/ComplaintImage';
import { FileText, MapPin, Calendar, Activity, Info, ChevronRight, Search, CheckCircle2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ComplaintDetailModal from '@/components/ComplaintDetailModal';
import { Complaint } from '@/types';

const CitizenComplaints = () => {
  const { user } = useAuth();
  const { getComplaintsByUser } = useComplaints();
  const [selectedComplaint, setSelectedComplaint] = React.useState<Complaint | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!user) return null;
  const complaints = getComplaintsByUser(user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic flex items-center gap-3">
            <FileText className="h-6 w-6" /> Your Submission Ledger
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-medium italic">Official registry of reported road infrastructure grievances</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-10 h-10 w-64 rounded-md border-gray-300 shadow-sm" placeholder="Search by Ticket ID..." />
        </div>
      </div>

      {complaints.length === 0 ? (
        <Card className="border border-dashed py-20 bg-white">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Info className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-primary uppercase">No Records Found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1">Your grievance ledger is currently empty. Reporting infrastructure issues helps improve public safety.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {complaints.map((c) => (
            <Card key={c.id} className="border border-border shadow-sm rounded-md overflow-hidden bg-white hover:border-primary/30 transition-all group">
              <div className="flex flex-col md:flex-row">
                {/* Proof Header/Sidebar */}
                <div className="md:w-64 bg-slate-50 border-r border-border p-4 flex flex-col gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Defect Proof</p>
                    <div className="rounded border bg-white p-1 shadow-sm">
                      <ComplaintImage src={c.imageUrl} alt={c.title} />
                    </div>
                  </div>
                  {c.afterImageUrl && (
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-green-700 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Rectification Proof
                      </p>
                      <div className="rounded border border-green-200 bg-white p-1 shadow-md">
                        <ComplaintImage src={c.afterImageUrl} alt="After repair" />
                      </div>
                    </div>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Metadata</span>
                      <span>{c.aiConfidence}% AI CONF</span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black font-mono bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded uppercase tracking-widest shadow-sm">
                        #{c.id}
                      </span>
                      <SeverityBadge severity={c.severity} />
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                      <Calendar className="h-3 w-3" /> REGISTERED: {new Date(c.createdAt).toLocaleDateString('en-In')}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors uppercase tracking-tight">{c.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{c.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <p className="font-bold text-primary uppercase">Location Matrix</p>
                          <p className="text-gray-500 font-medium">{c.area} • {c.landmark}</p>
                          <p className="text-[9px] font-mono text-gray-400 mt-1 uppercase tracking-tighter italic">LAT: {c.latitude.toFixed(4)} | LONG: {c.longitude.toFixed(4)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {c.assignedTeam && (
                        <div className="flex items-start gap-2">
                          <Activity className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <p className="font-bold text-blue-800 uppercase">Operational Asset</p>
                            <p className="text-gray-500 font-medium">UNIT: {c.assignedTeam}</p>
                          </div>
                        </div>
                      )}
                      {c.districtOfficerNotes && (
                        <div className="bg-muted/50 p-3 rounded border border-border italic">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Officer Observations</p>
                          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">"{c.districtOfficerNotes}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="bg-muted/30 border-l border-border w-16 hidden md:flex flex-col items-center justify-center gap-4 py-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDetails(c)}
                    className="h-10 w-10 text-primary hover:bg-white border hover:border-border transition-all shadow-sm rounded-full"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ComplaintDetailModal
        complaint={selectedComplaint}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        canEdit={false}
      />
    </div>
  );
};

export default CitizenComplaints;
