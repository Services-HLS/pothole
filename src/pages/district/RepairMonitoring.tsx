import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { ComplaintStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
    Activity, Clock, Camera, CheckCircle2, AlertCircle,
    ChevronRight, ArrowUpRight, MessageSquare, History,
    TrendingUp, HardHat, MoreHorizontal, User, RefreshCcw, Landmark, MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StatusBadge } from '@/components/StatusBadge';

const stages: ComplaintStatus[] = ['Assigned', 'In Progress', 'Under Inspection', 'Completed'];

const RepairMonitoring = () => {
    const { complaints, updateComplaintStatus } = useComplaints();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<ComplaintStatus | 'All'>('All');

    const monitorComplaints = complaints.filter(c =>
        ['Assigned', 'In Progress', 'Under Inspection', 'Completed', 'Reopened'].includes(c.status)
    );

    const filteredComplaints = activeTab === 'All'
        ? monitorComplaints
        : monitorComplaints.filter(c => c.status === activeTab);

    const getProgress = (status: ComplaintStatus) => {
        switch (status) {
            case 'Assigned': return 25;
            case 'In Progress': return 50;
            case 'Under Inspection': return 75;
            case 'Completed': return 100;
            case 'Reopened': return 40;
            default: return 0;
        }
    };

    const handleStatusChange = (id: string, currentStatus: ComplaintStatus) => {
        const currentIndex = stages.indexOf(currentStatus);
        if (currentIndex < stages.length - 1) {
            const nextStatus = stages[currentIndex + 1];
            updateComplaintStatus(id, nextStatus);
            toast({ title: "Workflow Updated", description: `Task moved to ${nextStatus}` });
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Repair Operations Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-1 font-medium italic">
                        Real-time Fleet Auditing & In-Situ Infrastructure Restoration Monitoring
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5">
                        <TrendingUp className="h-4 w-4" /> Performance Audit
                    </Button>
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-100">
                {['All', ...stages, 'Reopened'].map(tab => (
                    <Button
                        key={tab}
                        variant={activeTab === tab ? 'default' : 'outline'}
                        onClick={() => setActiveTab(tab as any)}
                        className={`h-11 rounded-sm px-6 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'bg-primary text-white shadow-md border-primary'
                                : 'bg-white border-gray-200 text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        {tab}
                        <Badge variant="secondary" className={`ml-3 h-5 min-w-[20px] px-1.5 text-[9px] font-black ${activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                            {tab === 'All'
                                ? monitorComplaints.length
                                : monitorComplaints.filter(c => c.status === tab).length}
                        </Badge>
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredComplaints.map(c => (
                    <Card key={c.id} className="border border-border shadow-sm rounded-md overflow-hidden bg-white group hover:border-primary/50 transition-all">
                        <CardHeader className="pb-4 bg-muted/30 border-b relative">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <MapPin className="h-12 w-12" />
                            </div>
                            <div className="flex justify-between items-start mb-3 relative z-10">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-[10px] font-black text-primary p-1 bg-white border border-primary/10 rounded">
                                        {c.id}
                                    </span>
                                    <StatusBadge status={c.status} />
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5 text-slate-400">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <CardTitle className="text-sm font-black uppercase text-slate-700 tracking-tight truncate">{c.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-400 italic">
                                <Clock className="h-3 w-3" /> Updated: {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-6 space-y-6 px-6">
                            {/* Progress Bar */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Deployment Status</span>
                                    <span className="text-primary italic">{getProgress(c.status)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500 rounded-full"
                                        style={{ width: `${getProgress(c.status)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Field Team Info */}
                            <div className="flex items-center gap-4 p-4 rounded-sm border border-slate-100 bg-slate-50/50">
                                <div className="h-10 w-10 rounded shadow-sm bg-white border border-slate-200 flex items-center justify-center text-primary flex-shrink-0">
                                    <HardHat className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Authorized Team</p>
                                    <p className="text-[11px] font-black text-slate-700 uppercase italic truncate">{c.assignedTeam || 'LOG_INITIALIZING...'}</p>
                                </div>
                                <div className="flex -space-x-2">
                                    {[1, 2].map(i => (
                                        <div key={i} className="h-7 w-7 rounded-sm border border-white bg-slate-200 flex items-center justify-center shadow-sm">
                                            <User className="h-4 w-4 text-slate-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Proof */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-center italic">INCIDENT_PROOF</p>
                                    <div className="aspect-[4/3] rounded-sm bg-slate-50 overflow-hidden border border-slate-100 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                        <img src={c.imageUrl} className="h-full w-full object-cover" alt="Before" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black text-primary uppercase tracking-widest text-center italic underline underline-offset-4">LIVE_RESTORE</p>
                                    <div className="aspect-[4/3] rounded-sm bg-slate-900 flex items-center justify-center overflow-hidden relative border border-primary/20 shadow-inner">
                                        {c.repairImageUrl && c.repairImageUrl !== '/placeholder.svg' ? (
                                            <img src={c.repairImageUrl} className="h-full w-full object-cover" alt="Live" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <Camera className="h-6 w-6 text-white/20 animate-pulse" />
                                                <span className="text-[7px] text-white/30 uppercase font-black tracking-widest">FEED_PENDING</span>
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2">
                                            <Button size="icon" className="h-7 w-7 rounded-sm bg-primary/80 backdrop-blur hover:bg-primary border border-white/20 shadow-lg" variant="ghost">
                                                <RefreshCcw className="h-3.5 w-3.5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Log */}
                            <div className="p-4 rounded-sm border border-dashed border-slate-200 bg-white shadow-sm">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 border-l-2 border-primary/50 pl-3">
                                        <div className="flex-1">
                                            <p className="text-[9px] font-black uppercase text-slate-700 leading-tight">Operational Update</p>
                                            <p className="text-[9px] text-gray-400 italic mt-0.5 leading-tight">Team initiated site cleansing & bitu-base application.</p>
                                        </div>
                                        <span className="text-[8px] font-mono font-bold text-gray-400">10:45</span>
                                    </div>
                                    <div className="flex items-start gap-3 border-l-2 border-slate-200 pl-3 opacity-50">
                                        <div className="flex-1">
                                            <p className="text-[9px] font-black uppercase text-slate-400 leading-tight">System Assignment</p>
                                            <p className="text-[9px] text-gray-400 italic mt-0.5 leading-tight">Registry allocated to PWD Unit-44 Guntur Division.</p>
                                        </div>
                                        <span className="text-[8px] font-mono font-bold text-gray-400">09:00</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-4 pb-8 px-6 gap-3">
                            <Button variant="outline" className="flex-1 text-[10px] font-black uppercase tracking-widest h-11 border-primary/10 text-primary hover:bg-primary/5 gap-2">
                                <MessageSquare className="h-4 w-4" /> Comms Unit
                            </Button>
                            {c.status !== 'Completed' && (
                                <Button
                                    className="flex-1 text-[10px] font-black uppercase tracking-widest h-11 bg-primary hover:bg-primary/90 gap-2 shadow-lg"
                                    onClick={() => handleStatusChange(c.id, c.status)}
                                >
                                    Log Advance <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            )}
                            {c.status === 'Completed' && (
                                <Button variant="outline" className="flex-1 text-[10px] font-black uppercase tracking-widest h-11 border-green-200 text-green-700 bg-green-50/50 cursor-default gap-2">
                                    <CheckCircle2 className="h-4 w-4" /> Final Audit
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}

                {filteredComplaints.length === 0 && (
                    <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-100 rounded-md bg-slate-50/30">
                        <Activity className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-sm font-black uppercase text-slate-400 italic tracking-widest">No active operational logs</h3>
                        <p className="text-[10px] text-slate-300 font-medium italic mt-1 uppercase tracking-tighter">Department queue is currently clear for selected stage</p>
                    </div>
                )}
            </div>

            <div className="p-8 border-t flex items-center justify-between opacity-40 grayscale mt-8">
                <div className="flex items-center gap-4">
                    <Landmark className="h-8 w-8 text-primary" />
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-primary italic">Roads & Buildings Department (R&B)</p>
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter mt-0.5">Government of Andhra Pradesh • Repair Monitor v2.1</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 italic leading-none">Last Audit Sync</p>
                    <p className="text-[10px] font-black text-primary italic mt-1 uppercase tracking-tighter">{new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default RepairMonitoring;
