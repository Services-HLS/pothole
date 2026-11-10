import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { useAuth } from '@/contexts/AuthContext';
import { ComplaintStatus, SeverityLevel } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
    Calendar, Users, DollarSign, Clock, AlertTriangle,
    ChevronRight, Briefcase, Plus, Search, Filter,
    CheckCircle, FileText, LayoutGrid, List, Landmark, Download, Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { fieldTeams } from '@/data/mockData';
import { SeverityBadge } from '@/components/StatusBadge';
import { useNavigate } from 'react-router-dom';

const WorkScheduling = () => {
    const { complaints, assignTeam, updateComplaint } = useComplaints();
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [team, setTeam] = useState('');
    const [deadline, setDeadline] = useState('');
    const [budget, setBudget] = useState('');
    const [priority, setPriority] = useState<SeverityLevel>('Medium');

    // Filter complaints by district
    const districtComplaints = complaints.filter(c => c.district === user?.district);

    // Filter complaints that need scheduling
    const pendingScheduling = districtComplaints.filter(c =>
        c.status === 'Approved' ||
        (c.status === 'Submitted' && c.severity === 'Critical') ||
        (c.status === 'In Progress' && !c.assignedTeam)
    );

    const activeAssignments = districtComplaints.filter(c =>
        c.status === 'Assigned' ||
        (c.status === 'In Progress' && c.assignedTeam)
    );

    const selectedComplaint = pendingScheduling.find(c => c.id === selectedId);

    const handleSchedule = () => {
        if (!selectedId || !team || !deadline || !budget) {
            toast({ title: "Input Required", description: "Please fill all scheduling fields.", variant: "destructive" });
            return;
        }

        updateComplaint(selectedId, {
            status: 'Assigned',
            assignedTeam: team,
            deadline,
            budget: parseFloat(budget),
            severity: priority,
            updatedAt: new Date().toISOString()
        });

        toast({ title: "Work Assigned", description: `Task ${selectedId} has been successfully assigned to ${team}.` });
        setSelectedId(null);
        setTeam('');
        setDeadline('');
        setBudget('');
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Work Allocation & Resource Logistics</h1>
                    <p className="text-muted-foreground text-[11px] mt-1 font-bold italic uppercase tracking-wider">
                        Departmental Task Distribution Hub — {user?.district} Division
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200 h-10 px-6 font-black uppercase text-[10px] tracking-widest bg-white shadow-sm hover:bg-slate-50">
                        <Download className="h-4 w-4 mr-2" /> Export Queue
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Queue of Approved Complaints */}
                <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                    <Card className="border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50 border-b pb-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                                    <Briefcase className="h-4 w-4" /> Pending Assignment Ledger
                                </CardTitle>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <Input placeholder="Registry Filter..." className="pl-9 h-9 border-slate-200 rounded-sm shadow-sm text-[10px] font-black uppercase italic" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="gov-table w-full">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4">REGISTRY ID</th>
                                            <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4">LOCATION CONTEXT</th>
                                            <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4">SEVERITY</th>
                                            <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4 text-right">OPERATIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingScheduling.map(c => (
                                            <tr key={c.id} className={`${selectedId === c.id ? 'bg-primary/5' : ''} border-b border-slate-50 group`}>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-14 rounded-sm border border-slate-100 overflow-hidden bg-muted">
                                                            <img src={c.imageUrl} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Evidence" />
                                                        </div>
                                                        <span className="font-mono text-[11px] font-black text-primary italic underline decoration-primary/20">{c.id}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <p className="font-black text-slate-700 uppercase text-[11px] italic leading-tight">{c.area}</p>
                                                    <p className="text-[9px] text-gray-400 font-bold uppercase italic mt-1">{c.roadCategory || 'PUBLIC INFRASTRUCTURE'}</p>
                                                </td>
                                                <td className="p-4">
                                                    <SeverityBadge severity={c.severity} />
                                                </td>
                                                <td className="p-4 text-right space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => navigate(`/complaint/${c.id}`)}
                                                        className="h-8 px-3 text-[9px] font-black uppercase tracking-widest border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all"
                                                    >
                                                        <Eye className="h-3 w-3 mr-1.5" /> View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant={selectedId === c.id ? 'default' : 'outline'}
                                                        onClick={() => {
                                                            setSelectedId(c.id);
                                                            setPriority(c.severity);
                                                        }}
                                                        className={`text-[10px] font-black uppercase tracking-widest h-8 px-4 ${selectedId === c.id ? 'bg-primary' : 'border-primary/40 text-primary hover:bg-primary/5'}`}
                                                    >
                                                        {selectedId === c.id ? 'Active' : 'Allocate'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        {pendingScheduling.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-20 text-center text-slate-300 text-[10px] font-black uppercase italic tracking-widest">
                                                    Zero records identified for logistical allocation.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b pb-4">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                                    <Users className="h-4 w-4" /> Personnel Deployment Matrix
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-6 px-8 pb-8">
                                {fieldTeams.map(team => {
                                    const load = activeAssignments.filter(a => a.assignedTeam === team).length;
                                    const loadPercent = Math.min((load / 5) * 100, 100);
                                    return (
                                        <div key={team} className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                                                <span className="text-slate-700 italic">{team}</span>
                                                <span className={`${load >= 4 ? 'text-red-600' : 'text-primary'}`}>{load} active orders</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                <div className={`h-full transition-all duration-700 ${load >= 4 ? 'bg-red-600' : 'bg-primary'}`} style={{ width: `${loadPercent}%` }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>

                        <Card className="border border-amber-200 shadow-sm rounded-md overflow-hidden bg-amber-50/20">
                            <CardHeader className="bg-amber-100/50 border-b border-amber-200 pb-4">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-2 italic">
                                    <Clock className="h-4 w-4" /> Operational Advisories
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8 space-y-4 px-8 pb-8">
                                <div className="p-4 bg-white border border-amber-200 rounded-sm shadow-sm">
                                    <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <AlertTriangle className="h-3 w-3" /> Met-Office Protocol
                                    </p>
                                    <p className="text-[11px] text-slate-600 font-bold italic leading-relaxed">
                                        Monsoon Alert: Prioritize <span className="font-black text-slate-800 uppercase text-[9px] underline underline-offset-2">Vijayawada East</span> drainage nodes.
                                    </p>
                                </div>
                                <div className="p-4 bg-white border border-red-200 rounded-sm shadow-sm">
                                    <p className="text-[9px] font-black text-red-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Landmark className="h-3 w-3" /> State Secretariat Directive
                                    </p>
                                    <p className="text-[11px] text-slate-600 font-bold italic leading-relaxed">
                                        Visakhapatnam Summit: All coastal corridors must achieve zero-defect status within 48h.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right: Allocation Control Panel */}
                <div className="lg:col-span-12 xl:col-span-4">
                    {selectedComplaint ? (
                        <Card className="border border-primary shadow-xl rounded-md overflow-hidden bg-white sticky top-24">
                            <CardHeader className="bg-primary text-white pb-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Landmark className="h-24 w-24" />
                                </div>
                                <CardTitle className="text-xl font-black uppercase italic relative z-10 tracking-tight">Dispatch Control</CardTitle>
                                <CardDescription className="text-white/60 text-[10px] font-bold uppercase tracking-wider relative z-10 italic">Registry Authorization #{selectedComplaint.id}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0 space-y-8 relative px-8 pb-10">
                                <div className="p-4 bg-white rounded-sm shadow-2xl border border-slate-200 -mt-6 flex gap-4 items-center z-10 relative">
                                    <div className="h-14 w-14 rounded-sm border border-slate-100 overflow-hidden flex-shrink-0 bg-muted">
                                        <img src={selectedComplaint.imageUrl} className="h-full w-full object-cover grayscale" alt="" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Zone Context</p>
                                        <p className="text-[11px] font-black truncate text-primary uppercase italic">{selectedComplaint.area}</p>
                                    </div>
                                    <SeverityBadge severity={selectedComplaint.severity} />
                                </div>

                                <div className="space-y-6 pt-2">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Response Unit Tasking</label>
                                        <Select value={team} onValueChange={setTeam}>
                                            <SelectTrigger className="h-12 border-slate-200 rounded-sm shadow-sm text-[11px] font-black uppercase italic">
                                                <SelectValue placeholder="Select verified field team" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {fieldTeams.map(t => <SelectItem key={t} value={t} className="text-[10px] font-black uppercase italic">{t}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Operational Deadline</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                            <Input
                                                type="date"
                                                value={deadline}
                                                onChange={e => setDeadline(e.target.value)}
                                                className="pl-12 h-12 border-slate-200 rounded-sm shadow-sm text-[11px] font-black uppercase italic pr-4"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Fiscal Credit Protocol (INR)</label>
                                        <div className="relative">
                                            <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                            <Input
                                                type="number"
                                                placeholder="Pre-authorized upper limit"
                                                value={budget}
                                                onChange={e => setBudget(e.target.value)}
                                                className="pl-12 h-12 border-slate-200 rounded-sm shadow-sm font-black text-[11px] tracking-tight italic"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Triage Override</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {(['Medium', 'High', 'Critical'] as SeverityLevel[]).map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPriority(p)}
                                                    className={`py-3 text-[9px] font-black uppercase tracking-widest rounded-sm border transition-all ${priority === p
                                                        ? 'bg-primary text-white border-primary shadow-lg scale-105 z-10'
                                                        : 'bg-white border-slate-200 text-slate-400 hover:border-primary/30'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 pb-12 px-8">
                                <Button onClick={handleSchedule} className="w-full h-14 text-[11px] font-black uppercase tracking-[0.2em] gap-3 shadow-2xl bg-primary hover:bg-primary/95 transition-all">
                                    <CheckCircle className="h-5 w-5" />
                                    Authorize Work Order
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card className="border-2 border-dashed border-slate-200 bg-slate-50/30 p-16 flex flex-col items-center justify-center text-center rounded-md">
                            <div className="p-8 rounded-full bg-white border border-slate-100 shadow-xl mb-8">
                                <Landmark className="h-12 w-12 text-slate-200" />
                            </div>
                            <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs italic">Registry Hub</h3>
                            <p className="text-[10px] text-slate-400 mt-4 max-w-[240px] font-bold italic uppercase leading-relaxed tracking-wider">
                                Select a pending defect from the ledger to initialize operational dispatch and resource tasking.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkScheduling;
