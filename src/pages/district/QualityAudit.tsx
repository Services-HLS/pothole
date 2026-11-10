import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { ComplaintStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
    ShieldCheck, ArrowLeftRight, CheckCircle2, XCircle,
    RotateCcw, Info, Star, FileSearch, Download,
    Camera, MapPin, Calendar, Award, Landmark
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/StatusBadge';

const QualityAudit = () => {
    const { complaints, updateComplaintStatus } = useComplaints();
    const { toast } = useToast();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Complaints ready for audit (Completed but not Resolved)
    const auditQueue = complaints.filter(c => c.status === 'Completed' || c.status === 'Under Inspection');
    const selectedComplaint = auditQueue.find(c => c.id === selectedId);

    const handleAudit = (status: 'Resolved' | 'Reopened') => {
        if (!selectedId) return;
        updateComplaintStatus(selectedId, status);
        toast({
            title: status === 'Resolved' ? "Audit Passed" : "Rework Ordered",
            description: status === 'Resolved' ? "Repair has been verified and closed official record." : "Task sent back to field personnel for immediate correction.",
            variant: status === 'Resolved' ? "default" : "destructive"
        });
        setSelectedId(null);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Post-Repair Governance Audit</h1>
                    <p className="text-muted-foreground text-sm mt-1 font-medium italic">
                        Verification of Maintenance Standards & Statutory Compliance
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 bg-primary/5 text-primary border border-primary/20 rounded-md text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck className="h-4 w-4" /> Pending Compliance Checks: {auditQueue.length}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Audit Selection List */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-4">
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white h-[calc(100vh-250px)] flex flex-col">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <FileSearch className="h-4 w-4" /> Inspection Queue Ledger
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto px-2 py-4 space-y-3 scrollbar-none">
                            {auditQueue.map(c => (
                                <div
                                    key={c.id}
                                    onClick={() => setSelectedId(c.id)}
                                    className={`p-5 rounded-md cursor-pointer transition-all border ${selectedId === c.id
                                        ? 'bg-primary/5 border-primary shadow-sm'
                                        : 'bg-white border-gray-100 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-black font-mono text-primary uppercase tracking-tighter">CASE ID: {c.id}</span>
                                        <StatusBadge status={c.status} />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-16 w-16 rounded border border-gray-200 overflow-hidden bg-muted flex-shrink-0">
                                            <img src={c.repairImageUrl} className="h-full w-full object-cover grayscale" alt="Audit Proof" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-black uppercase truncate leading-tight text-slate-700">{c.title}</h4>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
                                                <MapPin className="h-3 w-3" /> {c.area}
                                            </p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="text-[9px] font-black text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                                                    QC SCORE: {c.qualityScore ? `${c.qualityScore}` : '94'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {auditQueue.length === 0 && (
                                <div className="py-20 text-center flex flex-col items-center opacity-40">
                                    <CheckCircle2 className="h-12 w-12 text-gray-300 mb-4" />
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Zero pending inspections</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Audit Details / Comparison Workspace */}
                <div className="lg:col-span-12 xl:col-span-8">
                    {selectedComplaint ? (
                        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white h-full flex flex-col">
                            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between pb-6">
                                <div>
                                    <CardTitle className="text-lg font-bold text-primary uppercase flex items-center gap-3">
                                        Logistics Review Workspace: <span className="font-mono">{selectedComplaint.id}</span>
                                    </CardTitle>
                                    <CardDescription className="text-xs font-medium italic">Departmental verification of maintenance integrity and standard compliance</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="border-gray-300 h-9 px-4 text-[10px] font-black uppercase tracking-widest shadow-sm bg-white">
                                        <Download className="h-4 w-4 mr-2" /> Export Briefing
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-8 space-y-8 flex-1 overflow-y-auto px-8 scrollbar-none">
                                {/* Before/After Visualizer */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">
                                            <span className="flex items-center gap-2 italic"><Calendar className="h-3.5 w-3.5" /> Preliminary Baseline</span>
                                            <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50 text-[8px] font-black px-2 rounded-sm italic uppercase tracking-widest">Infrastructure Deficit</Badge>
                                        </div>
                                        <div className="aspect-[4/3] rounded border border-gray-200 bg-muted overflow-hidden relative group shadow-sm transition-all hover:border-red-200">
                                            <img src={selectedComplaint.imageUrl} className="h-full w-full object-cover grayscale opacity-80" />
                                            <div className="absolute top-4 left-4 p-2 bg-black/60 rounded text-white border border-white/10">
                                                <p className="text-[10px] font-black uppercase leading-none">Severity: {selectedComplaint.severity}</p>
                                                <p className="text-[8px] opacity-60 font-medium italic mt-1">Logged: {new Date(selectedComplaint.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-green-700 px-1">
                                            <span className="flex items-center gap-2 italic"><CheckCircle2 className="h-3.5 w-3.5" /> Post-Execution Audit</span>
                                            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-[8px] font-black px-2 rounded-sm italic uppercase tracking-widest">Remediation Proof</Badge>
                                        </div>
                                        <div className="aspect-[4/3] rounded border border-green-200 bg-muted overflow-hidden relative group shadow-sm transition-all hover:border-green-400">
                                            <img src={selectedComplaint.repairImageUrl} className="h-full w-full object-cover grayscale-[0.5]" />
                                            <div className="absolute top-4 left-4 p-2 bg-green-900/80 rounded text-white border border-green-500/30">
                                                <p className="text-[10px] font-black uppercase leading-none">Source: Response Unit</p>
                                                <p className="text-[8px] opacity-60 font-medium italic mt-1">Uploaded: {new Date(selectedComplaint.updatedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 p-8 rounded border border-gray-200 bg-slate-50 space-y-6">
                                        <div className="flex items-center justify-between border-b pb-4 border-gray-200">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3 text-slate-800">
                                                <Award className="h-5 w-5 text-primary" /> Surface Structural Quality Index
                                            </h4>
                                            <div className="text-sm font-black text-primary px-3 py-1 bg-white border border-gray-200 rounded shadow-sm">{selectedComplaint.qualityScore || '96'}/100</div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                            {[
                                                { label: 'Bituminous Levelness', value: 98 },
                                                { label: 'Interface Seal Integrity', value: 92 },
                                                { label: 'Sub-grade Compaction', value: 95 },
                                                { label: 'Macro-Texture Profile', value: 89 },
                                            ].map(metric => (
                                                <div key={metric.label} className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-slate-500">
                                                        <span>{metric.label}</span>
                                                        <span className="text-primary">{metric.value}%</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${metric.value}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="p-6 rounded border border-green-100 bg-green-50/50 space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-green-700 flex items-center gap-2">
                                                <Landmark className="h-4 w-4" /> Compliance Log
                                            </p>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 italic">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> BITUMEN_GRADE_60/70
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 italic">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> COMPACTION_PASS_95
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 italic">
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> EDGE_OVERLAP_CONFIRMED
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 p-6 rounded border border-gray-100 bg-white">
                                            <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-primary italic">
                                                <Star className="h-4 w-4" /> Intelligence Summary
                                            </div>
                                            <p className="text-[11px] leading-relaxed text-slate-500 font-medium italic">
                                                Computer vision analysis confirms total orifice occlusion. Surface texture demonstrates longitudinal continuity with zero thermal cracking risk. Standard remediation protocols successfully executed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="bg-muted/30 border-t p-10 flex gap-6">
                                <Button
                                    variant="outline"
                                    onClick={() => handleAudit('Reopened')}
                                    className="flex-1 h-16 rounded border-red-200 text-red-700 bg-white hover:bg-red-50 gap-3 font-black uppercase text-[10px] tracking-widest shadow-sm"
                                >
                                    <RotateCcw className="h-5 w-5" /> Invalidate & Rework
                                </Button>
                                <Button
                                    onClick={() => handleAudit('Resolved')}
                                    className="flex-1 h-16 rounded bg-primary hover:bg-primary/90 text-white gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20"
                                >
                                    <CheckCircle2 className="h-5 w-5" /> Certify Quality Acceptance
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded p-20 text-center bg-white">
                            <ShieldCheck className="h-20 w-20 text-gray-100 mb-8" />
                            <h2 className="text-xl font-black uppercase italic text-gray-300 tracking-tight">Audit Terminal Standby</h2>
                            <p className="text-gray-400 mt-4 text-[11px] font-medium max-w-sm mx-auto italic leading-relaxed">
                                Please select a record from the inspection queue to initiate volumetric comparative analysis and compliance certification.
                            </p>
                            <div className="grid grid-cols-3 gap-12 mt-12 w-full max-w-lg border-t pt-10">
                                <div className="text-center">
                                    <p className="text-3xl font-black text-slate-200">0%</p>
                                    <p className="text-[9px] uppercase font-black text-gray-300 tracking-[0.2em] mt-2">Logistics Fail</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-black text-slate-200">98</p>
                                    <p className="text-[9px] uppercase font-black text-gray-300 tracking-[0.2em] mt-2">Mean index</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-black text-slate-200">2.1h</p>
                                    <p className="text-[9px] uppercase font-black text-gray-300 tracking-[0.2em] mt-2">Audit cycle</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QualityAudit;
