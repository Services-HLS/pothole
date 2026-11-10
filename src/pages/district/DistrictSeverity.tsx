import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { SeverityLevel, Complaint } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
    ShieldAlert, TrafficCone, MapPin, ShieldCheck,
    ArrowRight, Info, AlertTriangle, Scale, History, Landmark, FileText, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const DistrictSeverity = () => {
    const { complaints, setSeverity, updateComplaint } = useComplaints();
    const { toast } = useToast();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [newSeverity, setNewSeverity] = useState<SeverityLevel | null>(null);
    const [justification, setJustification] = useState('');
    const [trafficDensity, setTrafficDensity] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [roadCategory, setRoadCategory] = useState<string>('National Highway');

    // Show only approved but not yet assigned/resolved complaints for severity management
    const manageableComplaints = complaints.filter(c => c.status === 'Approved' || c.status === 'Submitted' || c.status === 'Under Verification');
    const selectedComplaint = manageableComplaints.find(c => c.id === selectedId);

    const handleUpdate = () => {
        if (!selectedId || !newSeverity || !justification) {
            toast({ title: "Validation Error", description: "Severity and justification are mandatory.", variant: "destructive" });
            return;
        }

        setSeverity(selectedId, newSeverity);
        updateComplaint(selectedId, {
            justification,
            trafficDensity,
            roadCategory: roadCategory as any
        });

        toast({ title: "Severity Updated", description: `Severity for ${selectedId} has been successfully validated.` });
        setSelectedId(null);
        setNewSeverity(null);
        setJustification('');
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Defect Severity Governance</h1>
                    <p className="text-muted-foreground text-sm mt-1 font-medium italic">
                        Field Parameter Validation & AI-Predicted Severity Calibration
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-primary/5 text-primary border border-primary/20 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Scale className="h-4 w-4" /> Pending Validation: {manageableComplaints.length}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Complaint List */}
                <div className="lg:col-span-4 space-y-4">
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white h-[calc(100vh-250px)] flex flex-col">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Validation Queue Ledger
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto px-2 py-4 space-y-3 scrollbar-none">
                            {manageableComplaints.map(c => (
                                <div
                                    key={c.id}
                                    onClick={() => {
                                        setSelectedId(c.id);
                                        setNewSeverity(c.severity);
                                        setTrafficDensity(c.trafficDensity || 'Medium');
                                        setRoadCategory(c.roadCategory || 'National Highway');
                                    }}
                                    className={`p-5 rounded-md cursor-pointer transition-all border ${selectedId === c.id
                                        ? 'bg-primary/5 border-primary shadow-sm'
                                        : 'bg-white border-gray-100 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] font-black font-mono text-primary uppercase tracking-tighter">CASE ID: {c.id}</span>
                                        <Badge variant={c.severity === 'Critical' || c.severity === 'High' ? 'destructive' : 'secondary'} className="text-[9px] font-black uppercase italic tracking-widest h-5 px-2 rounded-sm">
                                            AI: {c.severity}
                                        </Badge>
                                    </div>
                                    <h3 className="text-xs font-black uppercase truncate leading-tight text-slate-700">{c.title}</h3>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2 block italic">{c.area}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Validation Interface */}
                <div className="lg:col-span-8">
                    {selectedComplaint ? (
                        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white h-full flex flex-col">
                            <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between pb-6">
                                <div>
                                    <CardTitle className="text-lg font-bold text-primary uppercase flex items-center gap-3">
                                        <ShieldAlert className="h-5 w-5" /> Severity Calibration: <span className="font-mono">{selectedComplaint.id}</span>
                                    </CardTitle>
                                    <CardDescription className="text-xs font-medium italic">Adjust risk levels based on multi-factor field parameters and safety protocols</CardDescription>
                                </div>
                                <Badge className="bg-green-50 text-green-700 border border-green-100 text-[10px] font-black uppercase tracking-widest italic rounded-sm">
                                    Status: {selectedComplaint.status}
                                </Badge>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-8 flex-1 overflow-y-auto px-8 scrollbar-none">
                                {/* Visual Context */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="aspect-video rounded border border-gray-200 overflow-hidden bg-muted relative shadow-sm group">
                                        <img src={selectedComplaint.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="pothole" />
                                        <div className="absolute top-4 left-4 p-2 bg-black/60 rounded text-white border border-white/10">
                                            <p className="text-[10px] font-black uppercase leading-none italic tracking-widest">Defect Visualization</p>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded border border-primary/10 bg-primary/5 space-y-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-3 underline decoration-primary/20 decoration-2 underline-offset-4 italic">
                                            <Info className="h-4 w-4" /> Algorithmic Prediction Data
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-2 border-b border-primary/10">
                                                <span className="text-[10px] font-black uppercase text-gray-400 italic">Classification Typology</span>
                                                <span className="text-xs font-black uppercase text-slate-700 italic">{selectedComplaint.aiClassification}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-primary/10">
                                                <span className="text-[10px] font-black uppercase text-gray-400 italic">Correlation Confidence</span>
                                                <span className="text-xs font-black text-primary italic">{selectedComplaint.aiConfidence}% Probability</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-primary/10">
                                                <span className="text-[10px] font-black uppercase text-gray-400 italic">Pre-assigned Severity</span>
                                                <span className="text-xs font-black text-red-700 uppercase italic tracking-widest">{selectedComplaint.severity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Validation Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                            <TrafficCone className="h-4 w-4 text-primary" /> Traffic Density Profile
                                        </Label>
                                        <Select value={trafficDensity} onValueChange={(v: any) => setTrafficDensity(v)}>
                                            <SelectTrigger className="h-12 border-gray-300 rounded shadow-sm font-medium italic">
                                                <SelectValue placeholder="Select density profile" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Low">Low Density (Residential Hub)</SelectItem>
                                                <SelectItem value="Medium">Medium Density (Commercial Corridor)</SelectItem>
                                                <SelectItem value="High">High Density (Arterial Bypass)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                            <MapPin className="h-4 w-4 text-primary" /> Road Statutory Category
                                        </Label>
                                        <Select value={roadCategory} onValueChange={setRoadCategory}>
                                            <SelectTrigger className="h-12 border-gray-300 rounded shadow-sm font-medium italic">
                                                <SelectValue placeholder="Select road statutory category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="National Highway">National Highway (NH Network)</SelectItem>
                                                <SelectItem value="State Highway">State Highway (SH Secondary)</SelectItem>
                                                <SelectItem value="District Road">District Main Connector</SelectItem>
                                                <SelectItem value="Village Road">Village / Internal Precinct</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center justify-between px-1">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 italic">
                                            <Scale className="h-4 w-4 text-primary" /> Final Departmental Severity Decision
                                        </Label>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-sm text-[8px] font-black uppercase tracking-widest italic">
                                            <History className="h-3.5 w-3.5" /> Immutable Audit logging active
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        {(['Low', 'Medium', 'High', 'Critical'] as SeverityLevel[]).map((level) => (
                                            <Button
                                                key={level}
                                                variant={newSeverity === level ? 'default' : 'outline'}
                                                onClick={() => setNewSeverity(level)}
                                                className={`flex-1 flex flex-col h-20 gap-1 rounded border transition-all duration-300 ${newSeverity === level
                                                    ? 'bg-primary text-white shadow-xl shadow-primary/20 border-primary scale-105 z-10'
                                                    : 'bg-white border-gray-200 text-slate-400 hover:bg-slate-50 hover:border-slate-300'
                                                    }`}
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest">{level}</span>
                                                <span className={`text-[8px] font-bold italic uppercase tracking-tighter ${newSeverity === level ? 'text-white/70' : 'text-gray-300'}`}>
                                                    {level === 'Critical' ? 'E-1: Immediate' : level === 'High' ? 'E-2: < 24h' : 'E-3: Routine'}
                                                </span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Mandatory Technical Justification</Label>
                                    <Textarea
                                        value={justification}
                                        onChange={e => setJustification(e.target.value)}
                                        placeholder="Enter detailed technical reasoning for decision (e.g., Tactical hub proximity, monsoon vector, strategic node status...)"
                                        className="min-h-[120px] border-gray-300 rounded shadow-sm text-sm font-medium italic focus:ring-primary focus:border-primary"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t p-10 flex gap-6 bg-muted/20">
                                <Button variant="outline" onClick={() => setSelectedId(null)} className="h-16 px-8 font-black uppercase text-[10px] tracking-widest rounded border-gray-300 bg-white shadow-sm flex-1 md:flex-none">
                                    Abort Operation
                                </Button>
                                <Button onClick={handleUpdate} className="h-16 px-12 gap-3 font-black uppercase text-[10px] tracking-widest bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 flex-1">
                                    <ShieldCheck className="h-6 w-6" /> Certify & Update Severity Record
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center border border-dashed border-gray-200 rounded p-20 text-center bg-white min-h-[600px]">
                            <div className="p-8 rounded-full bg-slate-50 border border-slate-100 shadow-inner mb-8 bg-white">
                                <ShieldAlert className="h-16 w-16 text-slate-200" />
                            </div>
                            <h2 className="text-xl font-black uppercase italic text-gray-300 tracking-tight">Calibration Terminal Standby</h2>
                            <p className="text-gray-400 mt-4 text-[11px] font-medium max-w-sm mx-auto italic leading-relaxed">
                                Please select a categorical record from the validation queue to initiate the official severity assessment and traffic impact validation protocol.
                            </p>
                            <div className="grid grid-cols-2 gap-12 mt-12 w-full max-w-md border-t pt-10">
                                <div className="text-center group">
                                    <div className="p-4 rounded border border-slate-50 bg-slate-50 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Scale className="h-6 w-6 text-primary mx-auto mb-2" />
                                        <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Risk Index</p>
                                    </div>
                                </div>
                                <div className="text-center group">
                                    <div className="p-4 rounded border border-slate-50 bg-slate-50 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Landmark className="h-6 w-6 text-primary mx-auto mb-2" />
                                        <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Protocol Sync</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="link" className="mt-12 gap-2 text-[10px] font-black uppercase tracking-widest text-primary italic underline underline-offset-4">
                                Review Regulatory Severity Protocols <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DistrictSeverity;
