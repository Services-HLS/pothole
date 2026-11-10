import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComplaints } from '@/contexts/ComplaintsContext';
import {
    ArrowLeft, ShieldCheck, Zap, TrendingUp, IndianRupee,
    Clock, CheckCircle, AlertTriangle, Info, ChevronRight,
    Target, BarChart, Sparkles, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';


const RecommendationMatrix = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { complaints, updateComplaint } = useComplaints();
    const complaint = complaints.find(c => c.id === id);
    const [expandedRecId, setExpandedRecId] = React.useState<number | null>(null);
    const [initiatedRecs, setInitiatedRecs] = React.useState<string[]>([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
    const { toast } = useToast();

    const query = new URLSearchParams(window.location.search);
    const type = query.get('type') as 'resolution' | 'execution' || 'resolution';

    if (!complaint) return null;

    const recommendations = type === 'resolution'
        ? (complaint.resolutionRecommendations || [])
        : (complaint.executionRecommendations || []);

    const handleInitiate = (rec: any) => {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
            if (type === 'resolution') {
                updateComplaint(complaint.id, {
                    status: 'Approved',
                    appliedAction: rec.type,
                    updatedAt: new Date().toISOString()
                });
                toast({
                    title: "Resolution Initiated!",
                    description: `Technical resolution "${rec.type}" has been approved for Ticket #${complaint.id}.`,
                    variant: "default",
                });
            } else {
                updateComplaint(complaint.id, {
                    status: 'Assigned',
                    assignedTeam: rec.teamName,
                    updatedAt: new Date().toISOString()
                });
                toast({
                    title: "Team Assigned!",
                    description: `Team "${rec.teamName}" has been assigned for execution on Ticket #${complaint.id}.`,
                    variant: "default",
                });
            }
        }, 500);
    };

    const cardThemes = {
        Optimal: {
            container: 'bg-green-600 text-white border-green-700',
            badge: 'bg-white text-green-700',
            textMuted: 'text-green-100',
            textPrimary: 'text-white',
            border: 'border-white/20',
            icon: Sparkles
        },
        High: {
            container: 'bg-green-50 text-green-900 border-green-200',
            badge: 'bg-green-200 text-green-800',
            textMuted: 'text-green-600',
            textPrimary: 'text-green-900',
            border: 'border-green-100',
            icon: Target
        },
        Partial: {
            container: 'bg-yellow-50 text-yellow-900 border-yellow-200',
            badge: 'bg-yellow-200 text-yellow-800',
            textMuted: 'text-yellow-600',
            textPrimary: 'text-yellow-900',
            border: 'border-yellow-100',
            icon: Info
        },
        Low: {
            container: 'bg-red-50 text-red-900 border-red-200',
            badge: 'bg-red-200 text-red-800',
            textMuted: 'text-red-600',
            textPrimary: 'text-red-900',
            border: 'border-red-100',
            icon: AlertCircle
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-full h-12 w-12 border-slate-200 hover:bg-slate-50 shadow-sm">
                        <ArrowLeft className="h-6 w-6 text-slate-600" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-black tracking-tight text-primary uppercase italic">
                                {type === 'resolution' ? 'Technical Resolution Matrix' : 'Logistics & Team Allocation'}
                            </h1>
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest px-3 h-6">
                                Ticket #{complaint.id}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground font-medium text-sm flex items-center gap-2 italic uppercase tracking-wider">
                            <ShieldCheck className="h-4 w-4 text-green-600" />
                            {type === 'resolution'
                                ? 'Multi-Layered Structural Diagnostics & Financial Optimization Ledger'
                                : 'Operational Field Unit Deployment & Resource Management'
                            }
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Confidence</p>
                        <p className="text-xl font-black text-primary italic">94.8% <span className="text-[10px] text-green-600 font-bold not-italic">VAR +1.2%</span></p>
                    </div>
                    <div className="h-10 w-px bg-slate-100" />
                    <BarChart className="h-8 w-8 text-primary/20" />
                </div>
            </div>

            {/* Matrix View - Full Width Compact List */}
            <div className="space-y-4">
                {recommendations.sort((a, b) => b.confidence - a.confidence).map((rec, idx) => {
                    const theme = cardThemes[rec.suitability as keyof typeof cardThemes] || cardThemes.Partial;
                    const Icon = theme.icon;
                    const isExpanded = expandedRecId === idx;
                    const isInitiated = initiatedRecs.includes(rec.type);

                    return (
                        <div key={idx} className="space-y-1">
                            <Card className={`border border-white/10 shadow-md rounded-sm overflow-hidden transition-all flex h-24 ${theme.container}`}>
                                {/* Color Bar */}
                                <div className="w-1.5 h-full bg-black/10 shrink-0" />

                                <div className="flex-1 flex items-center px-6 gap-8">
                                    {/* Type & Suitability */}
                                    <div className="w-64 shrink-0">
                                        <h2 className={`text-lg font-black uppercase italic tracking-tighter leading-tight ${theme.textPrimary}`}>
                                            {type === 'resolution' ? rec.type : rec.teamName}
                                        </h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="h-4 w-4 rounded-full bg-black/5 flex items-center justify-center border border-black/10">
                                                <Icon className={`h-2.5 w-2.5 ${theme.textMuted}`} />
                                            </div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${theme.textMuted}`}>{rec.suitability} Fit</p>
                                        </div>
                                    </div>

                                    {/* Stats Bar */}
                                    <div className="flex-1 grid grid-cols-4 gap-6 items-center border-l border-black/5 pl-8">
                                        <div>
                                            <p className={`text-[8px] font-black uppercase mb-0.5 ${theme.textMuted}`}>Confidence</p>
                                            <p className={`text-sm font-black italic ${theme.textPrimary}`}>{rec.confidence}%</p>
                                        </div>
                                        <div>
                                            <p className={`text-[8px] font-black uppercase mb-0.5 ${theme.textMuted}`}>
                                                {type === 'resolution' ? 'Budget' : 'Daily Cost'}
                                            </p>
                                            <p className={`text-sm font-black italic ${theme.textPrimary}`}>
                                                {type === 'resolution' ? `₹${rec.cost.toLocaleString()}` : `₹${rec.cost}/day`}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-[8px] font-black uppercase mb-0.5 ${theme.textMuted}`}>
                                                {type === 'resolution' ? 'Timeline' : 'Est. Arrival'}
                                            </p>
                                            <p className={`text-sm font-black italic ${theme.textPrimary}`}>
                                                {type === 'resolution' ? rec.completionTime : rec.travelTime}
                                            </p>
                                        </div>
                                        <div className="max-w-[150px]">
                                            <p className={`text-[8px] font-black uppercase mb-0.5 ${theme.textMuted}`}>Primary Impact</p>
                                            <p className={`text-[10px] font-bold italic truncate ${theme.textPrimary} opacity-90`}>"{rec.details.impact}"</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 shrink-0 h-10">
                                        <Button
                                            onClick={() => setExpandedRecId(isExpanded ? null : idx)}
                                            className={`px-6 rounded-sm border font-black uppercase tracking-widest italic text-[9px] ${rec.suitability === 'Optimal'
                                                ? 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                                                : 'bg-black/5 text-slate-800 hover:bg-black/10 border-black/10'
                                                }`}
                                        >
                                            {isExpanded ? 'Hide Details' : 'View Details'}
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                if (!isInitiated) {
                                                    setInitiatedRecs([...initiatedRecs, (type === 'resolution' ? rec.type : rec.teamName)]);
                                                    handleInitiate(rec);
                                                }
                                            }}
                                            disabled={isInitiated}
                                            className={`px-6 rounded-sm font-black uppercase tracking-widest italic text-[9px] shadow-sm ${isInitiated
                                                ? 'bg-primary text-white scale-95 opacity-80'
                                                : rec.suitability === 'Optimal'
                                                    ? 'bg-white text-green-700 hover:bg-white/90'
                                                    : 'bg-primary text-white hover:bg-primary/90'
                                                }`}
                                        >
                                            {isInitiated ? '✔ INITIATED' : 'Initialize'}
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Inline Details Expansion */}
                            {isExpanded && (
                                <div className="bg-white border-x border-b border-slate-100 rounded-b-sm shadow-inner p-6 animate-fade-in mx-1.5 grid grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-600" /> Strategic Technical Advantages
                                        </h3>
                                        <ul className="space-y-2">
                                            {(type === 'resolution' ? rec.details.advantages : rec.details.positives || []).map((adv: any, i: number) => (
                                                <li key={i} className="flex gap-3 text-[11px] font-bold text-slate-700 leading-tight">
                                                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-green-600" />
                                                    <span>{adv}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-orange-600" /> Operational Risks
                                        </h3>
                                        <ul className="space-y-2">
                                            {(type === 'resolution' ? rec.details.risks : rec.details.negatives || []).map((risk: any, i: number) => (
                                                <li key={i} className="flex gap-3 text-[11px] font-bold text-red-700 bg-red-50 p-2 rounded-sm border border-red-100">
                                                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                                                    <span>{risk}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                            <IndianRupee className="h-4 w-4 text-blue-600" />
                                            {type === 'resolution' ? 'Inventory Requirement' : 'Unit Strength'}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {type === 'resolution' ? (rec.details.materials || []).map((mat: any, i: number) => (
                                                <Badge key={i} variant="outline" className="border-slate-200 text-slate-600 font-bold text-[8px] uppercase tracking-wider py-1 px-3 bg-slate-50">
                                                    {mat}
                                                </Badge>
                                            )) : (
                                                <Badge variant="outline" className="border-slate-200 text-slate-600 font-bold text-[8px] uppercase tracking-wider py-1 px-3 bg-slate-50">
                                                    {rec.manpower} Unit Strong
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="pt-4 border-t border-slate-100">
                                            <p className="text-[9px] font-black uppercase text-primary mb-1 italic tracking-widest">Expected Outcome</p>
                                            <p className="text-[11px] font-black italic leading-snug text-slate-600">"{rec.details.impact}"</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Initiation Success Modal */}
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="max-w-md bg-white border-2 border-primary/20 rounded-none p-10 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center border-4 border-green-500 animate-pulse">
                            <Sparkles className="h-10 w-10 text-green-600" />
                        </div>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black text-primary uppercase italic tracking-tighter text-center">Protocol Initiated!</DialogTitle>
                        <DialogDescription className="text-sm font-bold text-slate-500 italic uppercase tracking-widest text-center mt-2">
                            Field Command Activated
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-8 space-y-4">
                        <p className="text-xs font-medium text-slate-600 leading-relaxed uppercase">
                            The selected resolution protocol has been successfully transmitted to the regional dispatch center. Maintenance teams are now being mobilized for deployment.
                        </p>
                        <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tracking ID</p>
                            <p className="text-lg font-black font-mono text-primary">OP-RB-{complaint.id.substring(0, 6).toUpperCase()}</p>
                        </div>
                    </div>
                    <Button onClick={() => navigate(-1)} className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest italic text-[11px]">
                        Confirm & Return to Ledger
                    </Button>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default RecommendationMatrix;
