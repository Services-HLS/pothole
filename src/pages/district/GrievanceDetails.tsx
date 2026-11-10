import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import {
    Calendar, MapPin, User, Activity, Hammer,
    ArrowLeft, CheckCircle2, Clock, AlertTriangle,
    Info, Zap, FileText, Camera, ShieldCheck,
    Upload, CheckCircle, Video, IndianRupee,
    ChevronRight, Truck, Users, Fuel, Gauge,
    TrendingUp, AlertCircle, Landmark, Sparkles,
    MessageSquare, Mail, Smartphone, Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const ResolutionCard = ({ rec, onApply, applied, onOpenDetails }: { rec: any; onApply: () => void; applied: boolean; onOpenDetails: () => void }) => {
    const cardThemes = {
        Optimal: {
            container: 'bg-green-600 text-white border-green-700',
            badge: 'bg-white text-green-700',
            textMuted: 'text-green-100',
            textPrimary: 'text-white',
            buttonLabel: 'text-green-700 bg-white hover:bg-green-50',
            buttonAction: 'bg-white text-green-700 hover:bg-green-50',
            border: 'border-white/20'
        },
        High: {
            container: 'bg-green-50 text-green-900 border-green-200',
            badge: 'bg-green-200 text-green-800',
            textMuted: 'text-green-600',
            textPrimary: 'text-green-900',
            buttonLabel: 'border-green-200 text-green-700 hover:bg-green-100',
            buttonAction: 'bg-green-600 text-white hover:bg-green-700',
            border: 'border-green-100'
        },
        Partial: {
            container: 'bg-yellow-50 text-yellow-900 border-yellow-200',
            badge: 'bg-yellow-200 text-yellow-800',
            textMuted: 'text-yellow-600',
            textPrimary: 'text-yellow-900',
            buttonLabel: 'border-yellow-200 text-yellow-700 hover:bg-yellow-100',
            buttonAction: 'bg-yellow-600 text-white hover:bg-yellow-700',
            border: 'border-yellow-100'
        },
        Low: {
            container: 'bg-red-50 text-red-900 border-red-200',
            badge: 'bg-red-200 text-red-800',
            textMuted: 'text-red-600',
            textPrimary: 'text-red-900',
            buttonLabel: 'border-red-200 text-red-700 hover:bg-red-100',
            buttonAction: 'bg-red-600 text-white hover:bg-red-700',
            border: 'border-red-100'
        }
    };

    const theme = cardThemes[rec.suitability as keyof typeof cardThemes] || cardThemes.Partial;

    return (
        <Card className={`border shadow-lg rounded-sm transition-all relative overflow-hidden ${theme.container} ${applied ? 'ring-4 ring-offset-1 ring-primary scale-[1.01]' : ''}`}>
            {rec.suitability === 'Optimal' && (
                <div className="absolute -right-8 -top-8 bg-white/10 w-24 h-24 rounded-full blur-2xl" />
            )}
            <CardContent className="p-4 space-y-3 relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <p className={`text-[10px] font-black uppercase italic mb-1 ${theme.textPrimary}`}>{rec.type}</p>
                        <Badge className={`text-[8px] font-black uppercase tracking-widest border-none px-2 py-0.5 ${theme.badge}`}>
                            {rec.suitability === 'Optimal' ? 'RECOMMENDED' : `${rec.suitability} Fit`}
                        </Badge>
                    </div>
                    <div className="text-right">
                        <p className={`text-xs font-black ${theme.textPrimary}`}>₹{rec.cost.toLocaleString()}</p>
                        <p className={`text-[7px] font-bold uppercase ${theme.textMuted}`}>Budget Node</p>
                    </div>
                </div>

                <div className={`p-2 rounded border ${theme.border} bg-white/5`}>
                    <p className={`text-[8px] font-black uppercase mb-1 opacity-60 ${theme.textPrimary}`}>Technical Outcome:</p>
                    <p className={`text-[10px] font-bold italic leading-tight ${theme.textPrimary}`}>"{rec.details.impact}"</p>
                </div>

                <div className={`grid grid-cols-2 gap-3 py-2 border-y ${theme.border}`}>
                    <div className="space-y-0.5">
                        <p className={`text-[8px] font-black uppercase ${theme.textMuted}`}>Est. Time</p>
                        <p className={`text-[10px] font-bold ${theme.textPrimary}`}>{rec.completionTime}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                        <p className={`text-[8px] font-black uppercase ${theme.textMuted}`}>AI Score</p>
                        <p className={`text-[10px] font-bold ${theme.textPrimary}`}>{rec.confidence}%</p>
                    </div>
                </div>

                <div className="flex gap-2 pt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onOpenDetails}
                        className={`flex-1 h-8 text-[9px] font-black uppercase tracking-widest gap-2 group transition-all border-none ${theme.buttonLabel}`}
                    >
                        Review <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5" />
                    </Button>
                    <Button
                        size="sm"
                        onClick={onApply}
                        disabled={applied}
                        className={`flex-1 h-8 text-[9px] font-black uppercase tracking-widest border-none shadow-sm ${theme.buttonAction}`}
                    >
                        {applied ? 'ACTIVE' : 'APPROVE'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const ExecutionCard = ({ rec, onApply, applied, onOpenDetails }: { rec: any; onApply: () => void; applied: boolean; onOpenDetails: () => void }) => {
    const cardThemes = {
        Optimal: {
            container: 'bg-green-600 text-white border-green-700',
            badge: 'bg-white text-green-700',
            iconBg: 'bg-white/20',
            iconText: 'text-white',
            textMuted: 'text-green-100',
            textPrimary: 'text-white',
            buttonLabel: 'text-green-700 bg-white hover:bg-green-50',
            buttonAction: 'bg-white text-green-700 hover:bg-green-50',
            border: 'border-white/20'
        },
        High: {
            container: 'bg-green-50 text-green-900 border-green-200',
            badge: 'bg-green-200 text-green-800',
            iconBg: 'bg-green-100',
            iconText: 'text-green-600',
            textMuted: 'text-green-600',
            textPrimary: 'text-green-900',
            buttonLabel: 'border-green-200 text-green-700 hover:bg-green-100',
            buttonAction: 'bg-green-600 text-white hover:bg-green-700',
            border: 'border-green-100'
        },
        Partial: {
            container: 'bg-yellow-50 text-yellow-900 border-yellow-200',
            badge: 'bg-yellow-200 text-yellow-800',
            iconBg: 'bg-yellow-100',
            iconText: 'text-yellow-600',
            textMuted: 'text-yellow-600',
            textPrimary: 'text-yellow-900',
            buttonLabel: 'border-yellow-200 text-yellow-700 hover:bg-yellow-100',
            buttonAction: 'bg-yellow-600 text-white hover:bg-yellow-700',
            border: 'border-yellow-100'
        },
        Low: {
            container: 'bg-red-50 text-red-900 border-red-200',
            badge: 'bg-red-200 text-red-800',
            iconBg: 'bg-red-100',
            iconText: 'text-red-600',
            textMuted: 'text-red-600',
            textPrimary: 'text-red-900',
            buttonLabel: 'border-red-200 text-red-700 hover:bg-red-100',
            buttonAction: 'bg-green-600 text-white hover:bg-green-700',
            border: 'border-red-100'
        }
    };

    const theme = cardThemes[rec.suitability as keyof typeof cardThemes] || cardThemes.Partial;

    return (
        <Card className={`border shadow-lg rounded-sm transition-all relative overflow-hidden ${theme.container} ${applied ? 'ring-4 ring-offset-1 ring-primary scale-[1.01]' : ''}`}>
            <CardContent className="p-4 space-y-3 relative z-10">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded flex items-center justify-center border ${theme.iconBg}`}>
                            <Truck className={`h-5 w-5 ${theme.iconText}`} />
                        </div>
                        <div>
                            <p className={`text-[10px] font-black uppercase italic ${theme.textPrimary}`}>{rec.teamName}</p>
                            <p className={`text-[8px] font-bold uppercase ${theme.textMuted}`}>Conflict: {rec.delayProb}%</p>
                        </div>
                    </div>
                    <Badge className={`text-[8px] font-black uppercase border-none px-2 py-0.5 ${theme.badge}`}>{rec.confidence}% AI</Badge>
                </div>

                <div className={`p-2 rounded border ${theme.border} bg-white/5`}>
                    <p className={`text-[8px] font-black uppercase mb-1 opacity-60 ${theme.textPrimary}`}>Logistics Node:</p>
                    <p className={`text-[10px] font-bold italic leading-tight ${theme.textPrimary}`}>"{rec.details.manpowerImpact}"</p>
                </div>

                <div className={`grid grid-cols-2 gap-3 py-2 border-y ${theme.border}`}>
                    <div className="space-y-0.5">
                        <p className={`text-[8px] font-black uppercase ${theme.textMuted}`}>Route Time</p>
                        <p className={`text-[10px] font-bold ${theme.textPrimary}`}>{rec.travelTime}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                        <p className={`text-[8px] font-black uppercase ${theme.textMuted}`}>Manpower</p>
                        <p className={`text-[10px] font-bold ${theme.textPrimary}`}>{rec.manpower} Units</p>
                    </div>
                </div>

                <div className="flex gap-2 pt-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onOpenDetails}
                        className={`flex-1 h-8 text-[9px] font-black uppercase tracking-widest gap-2 group transition-all border-none ${theme.buttonLabel}`}
                    >
                        Logistics <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5" />
                    </Button>
                    <Button
                        size="sm"
                        onClick={onApply}
                        disabled={applied}
                        className={`flex-1 h-8 text-[9px] font-black uppercase tracking-widest border-none shadow-sm ${theme.buttonAction}`}
                    >
                        {applied ? 'ON ROUTE' : 'DISPATCH'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const GrievanceDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { complaints, updateComplaint } = useComplaints();
    const { toast } = useToast();

    const [selectedResolution, setSelectedResolution] = useState<any>(null);
    const [selectedExecution, setSelectedExecution] = useState<any>(null);
    const [confirmAction, setConfirmAction] = useState<{ type: 'Resolution' | 'Execution' | 'Completion', data?: any } | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);

    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-xl font-bold uppercase italic tracking-tighter">Diagnostic Link Severed</h2>
                <p className="text-gray-400 text-xs mt-2 uppercase font-black tracking-widest">Entry not found in regional ledger.</p>
                <Button onClick={() => navigate(-1)} className="mt-8 bg-primary">Return to Registry</Button>
            </div>
        );
    }

    const simulateNotifications = async () => {
        setIsSimulating(true);
        // Simulate sending notifications
        await new Promise(resolve => setTimeout(resolve, 800)); // WhatsApp
        toast({ title: "WhatsApp Sent", description: "Official Alert distributed to registered stakeholder devices." });
        await new Promise(resolve => setTimeout(resolve, 600)); // SMS
        toast({ title: "SMS Gateway", description: "Text alert dispatched to field units." });
        await new Promise(resolve => setTimeout(resolve, 600)); // Email
        toast({ title: "Email Chain", description: "Formal work order logged and emailed to Department." });
        setIsSimulating(false);
    };

    const confirmResolution = async () => {
        if (!confirmAction?.data || !complaint) return;
        await simulateNotifications();
        updateComplaint(complaint.id, {
            status: 'Approved',
            appliedAction: confirmAction.data.type,
            updatedAt: new Date().toISOString()
        });
        setConfirmAction(null);
        navigate(-1); // Return to list after action
    };

    const confirmExecution = async () => {
        if (!confirmAction?.data || !complaint) return;
        await simulateNotifications();
        updateComplaint(complaint.id, {
            status: 'Assigned',
            assignedTeam: confirmAction.data.teamName,
            updatedAt: new Date().toISOString()
        });
        setConfirmAction(null);
        navigate(-1); // Return to list after action
    };

    const confirmCompletion = async () => {
        if (!complaint) return;
        await simulateNotifications();
        updateComplaint(complaint.id, {
            status: 'Completed',
            resolvedAt: new Date().toISOString(),
            afterImageUrl: 'https://images.unsplash.com/photo-1594498259359-60a623066013b?auto=format&fit=crop&q=80&w=800',
            updatedAt: new Date().toISOString()
        });
        setConfirmAction(null);
        toast({ title: "Work Order Closed", description: "Grievance marked as resolved. Citizen dashboard updated." });
    };

    const isResolutionPhase = ['Submitted', 'Under Verification'].includes(complaint.status);
    const isExecutionPhase = ['Approved'].includes(complaint.status);
    const isTrackingPhase = ['Assigned', 'In Progress', 'Under Inspection', 'Completed', 'Resolved'].includes(complaint.status);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div className="flex items-center gap-5">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="h-10 w-10 border-slate-200">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Digital Inspection Ledger</h1>
                            <Badge variant="outline" className="font-mono text-primary font-black px-3 py-1 bg-primary/5 border-primary/20">#{complaint.id}</Badge>
                        </div>
                        <p className="text-muted-foreground text-[10px] mt-1 font-bold uppercase tracking-wider italic flex items-center gap-2">
                            <Landmark className="h-3 w-3" /> Division: {complaint.district} | Source: {complaint.source} Feed
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status={complaint.status} />
                    <SeverityBadge severity={complaint.severity} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Metadata & Imagery */}
                <div className="space-y-6">
                    <Card className="rounded-sm border-slate-200 overflow-hidden shadow-sm">
                        <CardHeader className="bg-slate-50 border-b py-3">
                            <CardTitle className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 italic">
                                <Camera className="h-3.5 w-3.5" /> Optical Evidence Triage
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 aspect-square relative bg-slate-900 overflow-hidden group">
                            <img src={complaint.imageUrl} className="h-full w-full object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all duration-700" alt="Telemetry" />

                            {/* AI Detection Overlay */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Red Bounding Box */}
                                <div className="absolute top-[30%] left-[25%] w-[40%] h-[35%] border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse">
                                    <div className="absolute -top-6 -left-0.5 bg-red-600 text-white text-[8px] font-black uppercase px-2 py-0.5 italic tracking-tighter">
                                        DETECTION: {complaint.aiClassification} ({complaint.aiConfidence}%)
                                    </div>
                                    {/* Corner Accents */}
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
                                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />
                                </div>

                                {/* Scanning Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/50 shadow-[0_0_10px_#ef4444] animate-[scan_3s_linear_infinite]" />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute top-4 right-4">
                                <Badge className="bg-primary/20 backdrop-blur-md border border-white/20 text-white text-[8px] font-black uppercase tracking-widest italic px-3 h-6 flex items-center">
                                    {complaint.source.includes('Bus') || complaint.source.includes('CCTV') ? <Video className="h-3 w-3 mr-1" /> : <Camera className="h-3 w-3 mr-1" />}
                                    {complaint.source} FEED ACTIVE
                                </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 space-y-2">
                                <p className="text-[11px] font-black text-white italic uppercase tracking-tight">{complaint.title}</p>
                                <div className="flex items-center justify-between text-[9px] font-bold text-white/60 uppercase italic">
                                    <div className="flex items-center gap-1"><MapPin className="h-3 w-3 text-red-500" /> {complaint.latitude.toFixed(4)}, {complaint.longitude.toFixed(4)}</div>
                                    <span>Gis Node Localized</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-sm border-slate-200 shadow-sm overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50 border-b py-3">
                            <CardTitle className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2 italic">
                                <MapPin className="h-3.5 w-3.5" /> Geo-Administrative Sync
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                                {[
                                    { label: 'Administrative Division', value: complaint.district },
                                    { label: 'Revenue Mandal', value: complaint.mandal || 'N/A' },
                                    { label: 'Sector / Ward', value: complaint.area },
                                    { label: 'Telemetry Point', value: complaint.landmark }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-[11px] font-bold text-slate-800 uppercase italic truncate">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: AI & Recommendations */}
                <div className="lg:col-span-2 space-y-8">
                    {/* AI Analysis View */}
                    <Card className="rounded-sm border-slate-200 shadow-sm overflow-hidden bg-white">
                        <CardHeader className="border-b bg-primary/5 py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-black text-primary uppercase italic tracking-tighter">AI Diagnostic Engine v5.0</h2>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Structural Integrity Assessment Hub</p>
                                </div>
                                <Badge className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-4 py-1 italic">Real-Time Core: Active</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm space-y-2">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Gauge className="h-3 w-3 text-red-500" /> Depth Estimate
                                    </p>
                                    <p className="text-xl font-black text-slate-800 italic">{complaint.depthEstimate || '14.2'} CM</p>
                                    <Progress value={complaint.depthEstimate ? (complaint.depthEstimate / 25) * 100 : 60} className="h-1 bg-slate-200" />
                                </div>
                                <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm space-y-2">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <AlertTriangle className="h-3 w-3 text-orange-500" /> Surface Impact
                                    </p>
                                    <p className="text-xl font-black text-slate-800 italic">{complaint.surfaceDamage || '42'}%</p>
                                    <Progress value={complaint.surfaceDamage || 40} className="h-1 bg-slate-200" />
                                </div>
                                <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm space-y-2">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <ShieldCheck className="h-3 w-3 text-green-500" /> AI Confidence
                                    </p>
                                    <p className="text-xl font-black text-slate-800 italic">{complaint.aiConfidence}%</p>
                                    <Progress value={complaint.aiConfidence} className="h-1 bg-slate-200" />
                                </div>
                            </div>

                            <div className="bg-slate-900 text-white p-5 rounded-sm border border-slate-800 shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 flex gap-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                    <Activity className="h-16 w-16" />
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-primary italic mb-4 flex items-center gap-2">
                                    <Zap className="h-4 w-4" /> Structural Anomaly Diagnosis
                                </h3>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between text-sm italic font-black uppercase">
                                        <span className="text-white/40 italic">Incident Profile:</span>
                                        <span className="text-red-500">{complaint.aiClassification}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm italic font-black uppercase">
                                        <span className="text-white/40 italic">Computed Risk Level:</span>
                                        <span className={complaint.severity === 'Critical' ? 'text-red-600' : 'text-orange-500'}>{complaint.severity} RIS</span>
                                    </div>
                                    <p className="text-[10px] text-white/60 font-medium leading-relaxed uppercase border-t border-white/10 pt-4">
                                        Diagnostic Node Extract: Structural failure detected via pixel-density variance. Sub-base moisture saturation
                                        likely exceeds safety thresholds. Recommended protocol: Immediate structural stabilization.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resolution Recommendation Panel (Cost Focused) */}
                    {isResolutionPhase && (
                        <Card className="rounded-sm border-slate-200 shadow-sm overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            <CardHeader className="bg-slate-50 border-b py-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                                            <Sparkles className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter leading-none">Resolution Hub</h2>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-1.5 mt-1">
                                                <TrendingUp className="h-2.5 w-2.5" /> Tiered AI Structural Ledger
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-[8px] font-black uppercase text-orange-500 border-orange-200 bg-orange-50 px-2 py-0.5">
                                        Pending Analysis
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                    <div className="bg-primary/5 p-6 rounded-full border border-primary/10 mb-4">
                                        <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Technical Analysis Complete</h3>
                                    <p className="text-sm font-medium text-slate-500 max-w-md mx-auto italic">
                                        AI has generated {complaint.resolutionRecommendations?.length || 3} structural remediation protocols based on distress metrics.
                                    </p>
                                    <Button
                                        onClick={() => navigate(`/district/recommendations/${complaint.id}?type=resolution`)}
                                        className="h-12 px-8 bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 mt-4 rounded-sm"
                                    >
                                        View Recommendation Matrix
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Execution Recommendation Panel (Speed/Logistics Focused) */}
                    {isExecutionPhase && (
                        <Card className="rounded-sm border-blue-100 shadow-sm overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            <CardHeader className="bg-blue-50/50 border-b border-blue-100 py-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-black text-blue-900 uppercase italic tracking-tighter">Field Dispatch Optimization</h2>
                                        <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest italic">Operational Speed & Logistics Minimization</p>
                                    </div>
                                    <Truck className="h-6 w-6 text-blue-200" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                    <div className="bg-blue-50 p-6 rounded-full border border-blue-100 mb-4">
                                        <Truck className="h-12 w-12 text-blue-600 animate-bounce" />
                                    </div>
                                    <h3 className="text-xl font-black text-blue-900 uppercase italic tracking-tighter">Logistics Optimization Ready</h3>
                                    <p className="text-sm font-medium text-slate-500 max-w-md mx-auto italic">
                                        {complaint.executionRecommendations?.length || 3} Dispatch Scenarios calculated for optimal resource allocation.
                                    </p>
                                    <Button
                                        onClick={() => navigate(`/district/recommendations/${complaint.id}?type=execution`)}
                                        className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 mt-4 rounded-sm"
                                    >
                                        Initialize Force Allocation
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Work Tracking Phase */}
                    {isTrackingPhase && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            <div className="p-6 border border-blue-100 bg-blue-50/50 rounded-sm">
                                <p className="text-[10px] font-black text-blue-800 uppercase mb-4">Active Field Assignment</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-white rounded border border-blue-200 flex items-center justify-center">
                                            <Truck className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-blue-900 italic uppercase">{complaint.assignedTeam}</p>
                                            <p className="text-[9px] font-bold text-blue-400 uppercase">Unit deployed and syncing with command</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-blue-600 text-white text-[9px] font-black uppercase">Live Link Active</Badge>
                                </div>
                            </div>

                            <Card className="rounded-sm border-slate-800 bg-slate-900 text-white shadow-xl overflow-hidden">
                                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-2">
                                            <Activity className="h-5 w-5 text-green-500" /> Work Execution Monitor
                                        </h3>
                                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Live Telemetry Feed</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Completion</p>
                                        <p className="text-2xl font-black text-green-500 italic">
                                            {complaint.status === 'Completed' ? '100%' : '45%'}
                                        </p>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase text-white/60 mb-2">Progress Logs</p>
                                            <div className="space-y-3 pl-4 border-l border-white/10">
                                                <div className="relative">
                                                    <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-green-500" />
                                                    <p className="text-[9px] font-bold text-white uppercase">{new Date().toLocaleDateString()} - Team Deployed</p>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-blue-500" />
                                                    <p className="text-[9px] font-bold text-white/70 uppercase">Material Arrived at Site</p>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-slate-600" />
                                                    <p className="text-[9px] font-bold text-white/40 uppercase">Execution Protocol Active</p>
                                                </div>
                                            </div>
                                        </div>
                                        {complaint.status !== 'Completed' && (
                                            <div className="flex flex-col justify-end">
                                                <Button
                                                    onClick={() => setConfirmAction({ type: 'Completion' })}
                                                    className="bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest rounded-sm text-[10px] h-10 px-6"
                                                >
                                                    <CheckCircle2 className="h-4 w-4 mr-2" /> Verify & Close
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Work Execution Proof */}
                    {complaint.status === 'Completed' && (
                        <Card className="rounded-sm border-green-200 bg-green-50/20 shadow-sm overflow-hidden">
                            <CardHeader className="border-b border-green-100 py-3">
                                <CardTitle className="text-[10px] font-black text-green-700 uppercase italic flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" /> Operational Audit Finalized
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-[8px] font-black text-slate-400 uppercase text-center">Initial Detection</p>
                                        <img src={complaint.imageUrl} className="aspect-video object-cover rounded grayscale" alt="Before" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[8px] font-black text-slate-400 uppercase text-center">Field Execution</p>
                                        <img src={complaint.duringImageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800'} className="aspect-video object-cover rounded" alt="During" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[8px] font-black text-slate-400 uppercase text-center">Final Restorration</p>
                                        <img src={complaint.afterImageUrl || 'https://images.unsplash.com/photo-1594498259359-60a623066013b?auto=format&fit=crop&q=80&w=800'} className="aspect-video object-cover rounded" alt="After" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Resolution Detail Dialog */}
            <Dialog open={!!selectedResolution} onOpenChange={() => setSelectedResolution(null)}>
                <DialogContent className="max-w-2xl bg-white border-2 border-slate-200 rounded-sm italic">
                    <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-xl font-black text-primary uppercase italic">{selectedResolution?.type} Profile</DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Comprehensive Remediation Drill-Down</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-8 py-6">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                                    <TrendingUp className="h-3 w-3 text-green-600" /> Operational Advantages
                                </p>
                                <ul className="space-y-2">
                                    {selectedResolution?.details.advantages.map((adv: string, i: number) => (
                                        <li key={i} className="text-[11px] font-bold text-slate-700 flex gap-2">
                                            <span className="text-green-500">•</span> {adv}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                                    <AlertTriangle className="h-3 w-3 text-red-600" /> Technical Limitations
                                </p>
                                <ul className="space-y-2">
                                    {selectedResolution?.details.disadvantages.map((dis: string, i: number) => (
                                        <li key={i} className="text-[11px] font-bold text-slate-700 flex gap-2">
                                            <span className="text-red-400">•</span> {dis}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-sm">
                                <p className="text-[10px] font-black text-primary uppercase mb-2">Primary Materials Required</p>
                                <p className="text-[11px] text-slate-600 font-bold italic leading-relaxed">
                                    {selectedResolution?.details.materials.join(', ')}
                                </p>
                            </div>
                            <div className="p-4 bg-primary text-white rounded-sm shadow-md">
                                <p className="text-[10px] font-black uppercase mb-1 opacity-60 italic">Expected Longevity Impact</p>
                                <p className="text-xs font-black italic">{selectedResolution?.details.impact}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-3 flex items-center gap-2 italic">
                                    <AlertCircle className="h-3 w-3 text-orange-500" /> Risk Factors
                                </p>
                                <ul className="space-y-2">
                                    {selectedResolution?.details.risks.map((risk: string, i: number) => (
                                        <li key={i} className="text-[11px] font-bold text-orange-800 flex gap-2 bg-orange-50 rounded px-2 py-1">
                                            {risk}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <Button onClick={() => setSelectedResolution(null)} className="bg-primary text-white font-black px-8 uppercase text-[10px] tracking-widest italic rounded-sm">Close Analysis</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Execution Detail Dialog */}
            <Dialog open={!!selectedExecution} onOpenChange={() => setSelectedExecution(null)}>
                <DialogContent className="max-w-2xl bg-white border-2 border-blue-200 rounded-sm italic">
                    <DialogHeader className="border-b border-blue-50 pb-4">
                        <DialogTitle className="text-xl font-black text-blue-900 uppercase italic">Execution Logistics Breakdown</DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-blue-400 uppercase tracking-widest italic">Team: {selectedExecution?.teamName} Dispatch Analysis</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-8 py-6">
                        <div className="space-y-6 text-blue-900">
                            <div>
                                <p className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 italic underline decoration-blue-200 underline-offset-4">
                                    <TrendingUp className="h-3 w-3" /> Positive Logistics Impact
                                </p>
                                <ul className="space-y-2">
                                    {selectedExecution?.details.positives.map((adv: string, i: number) => (
                                        <li key={i} className="text-[11px] font-bold text-blue-800 flex gap-2">
                                            <span className="text-green-600">✓</span> {adv}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 bg-blue-900 text-white rounded-sm shadow-md">
                                <p className="text-[10px] font-black uppercase mb-3 opacity-60">Resource Consumption</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Fuel className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-black italic">₹{selectedExecution?.details.costs.fuel} Fuel</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-black italic">{selectedExecution?.details.costs.time}m Idle</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-50 border border-blue-100 rounded-sm">
                                <p className="text-[10px] font-black text-blue-900 uppercase mb-2">Departmental SLA Effect</p>
                                <p className="text-[11px] text-blue-600 font-bold italic leading-relaxed">
                                    {selectedExecution?.details.slaEffect}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-blue-400 uppercase italic underline decoration-blue-200 underline-offset-4">Personnel Allocation Details</p>
                                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-sm border border-blue-50">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    <p className="text-[11px] font-bold text-blue-800 italic uppercase leading-none">{selectedExecution?.details.manpowerImpact}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-red-400 uppercase mb-3 flex items-center gap-2 italic">
                                    <AlertCircle className="h-3 w-3" /> Operational Negatives
                                </p>
                                <ul className="space-y-2">
                                    {selectedExecution?.details.negatives.map((dis: string, i: number) => (
                                        <li key={i} className="text-[11px] font-bold text-red-800 flex gap-2 border-l-2 border-red-200 pl-2">
                                            {dis}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-blue-50">
                        <Button onClick={() => setSelectedExecution(null)} className="bg-blue-700 text-white font-black px-8 uppercase text-[10px] tracking-widest italic rounded-sm">Close Logistics</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Confirmation Action Dialog */}
            <Dialog open={!!confirmAction} onOpenChange={() => !isSimulating && setConfirmAction(null)}>
                <DialogContent className="max-w-md bg-white border-2 border-slate-200 rounded-sm shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-black text-primary uppercase italic">
                            {confirmAction?.type === 'Resolution' && 'Authorize Remediation'}
                            {confirmAction?.type === 'Execution' && 'Authorize Deployment'}
                            {confirmAction?.type === 'Completion' && 'Verify & Close Order'}
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                            Action will trigger automated communication protocols
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        {confirmAction?.type === 'Resolution' && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-slate-700">Initialize <span className="font-black italic">{confirmAction.data.type}</span> protocol for this grievance?</p>
                                <div className="p-3 bg-green-50 border border-green-100 rounded-sm">
                                    <p className="text-[10px] uppercase font-bold text-green-800">Impact: Status will update to 'APPROVED' and proceed to Work Order Assignment.</p>
                                </div>
                            </div>
                        )}

                        {confirmAction?.type === 'Execution' && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-slate-700">Dispatch <span className="font-black italic">{confirmAction.data.teamName}</span> to site coordinates?</p>
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded-sm">
                                    <p className="text-[10px] uppercase font-bold text-blue-800">Impact: Work Order generated. Field Team notified via Digital Dispatch.</p>
                                </div>
                            </div>
                        )}

                        {confirmAction?.type === 'Completion' && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-slate-700">Confirm satisfactory completion of all roadworks?</p>
                                <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm">
                                    <p className="text-[10px] uppercase font-bold text-slate-600">Impact: Grievance closed. Citizen notified. Public Dashboard updated.</p>
                                </div>
                            </div>
                        )}


                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Communication Ledger (Automated)</p>
                            <div className="flex justify-between gap-2">
                                <div className={`flex-1 p-2 rounded border flex flex-col items-center gap-1 transition-all ${isSimulating ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'}`}>
                                    <Smartphone className={`h-4 w-4 ${isSimulating ? 'text-green-600 animate-pulse' : 'text-slate-300'}`} />
                                    <span className="text-[8px] font-bold uppercase text-slate-500">WhatsApp</span>
                                </div>
                                <div className={`flex-1 p-2 rounded border flex flex-col items-center gap-1 transition-all ${isSimulating ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                                    <MessageSquare className={`h-4 w-4 ${isSimulating ? 'text-blue-600 animate-pulse' : 'text-slate-300'}`} />
                                    <span className="text-[8px] font-bold uppercase text-slate-500">SMS</span>
                                </div>
                                <div className={`flex-1 p-2 rounded border flex flex-col items-center gap-1 transition-all ${isSimulating ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-100'}`}>
                                    <Mail className={`h-4 w-4 ${isSimulating ? 'text-orange-600 animate-pulse' : 'text-slate-300'}`} />
                                    <span className="text-[8px] font-bold uppercase text-slate-500">Email</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        <Button variant="outline" onClick={() => setConfirmAction(null)} disabled={isSimulating} className="h-8 text-[10px] font-black uppercase">Cancel</Button>
                        <Button
                            onClick={() => {
                                if (confirmAction?.type === 'Resolution') confirmResolution();
                                if (confirmAction?.type === 'Execution') confirmExecution();
                                if (confirmAction?.type === 'Completion') confirmCompletion();
                            }}
                            disabled={isSimulating}
                            className="h-8 px-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary/90"
                        >
                            {isSimulating ? 'Transmitting...' : 'Confirm & Transmit'}
                            {!isSimulating && <Send className="ml-2 h-3 w-3" />}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default GrievanceDetails;
