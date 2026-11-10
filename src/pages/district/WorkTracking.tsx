import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBadge } from '@/components/StatusBadge';
import {
    Activity, Search, Download, MapPin,
    Eye, CheckCircle2, Clock, Hammer, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const WorkTracking = () => {
    const { complaints } = useComplaints();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [liveProgress, setLiveProgress] = useState<Record<string, number>>({});

    // Active and Completed grievances for tracking
    const trackingStatuses = ['In Progress', 'Under Inspection', 'Completed', 'Resolved'];
    const districtTracking = complaints.filter(c =>
        c.district === user?.district &&
        trackingStatuses.includes(c.status) &&
        (c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Simulate live telemetry updates
    React.useEffect(() => {
        const interval = setInterval(() => {
            setLiveProgress(prev => {
                const next = { ...prev };
                complaints.forEach(c => {
                    if (c.status === 'In Progress') {
                        // Randomly bump progress between 0 and 5%
                        const current = next[c.id] || 45;
                        if (current < 90) {
                            next[c.id] = current + Math.floor(Math.random() * 2);
                        }
                    }
                });
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [complaints]);

    const getProgressValue = (status: string, id: string) => {
        if (status === 'In Progress') return liveProgress[id] || 45;
        if (status === 'Under Inspection') return 85;
        if (status === 'Completed' || status === 'Resolved') return 100;
        return 0;
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Real-Time Work Tracking</h1>
                    <p className="text-muted-foreground text-[11px] mt-1 font-bold italic uppercase tracking-wider">
                        Operational Telemetry & Field Execution Monitoring — {user?.district} Division
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Filter Tracking ID..."
                            className="pl-10 h-10 text-[10px] font-black uppercase italic border-slate-200 rounded-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[8px] font-black text-green-600 uppercase tracking-widest">Live</span>
                        </div>
                    </div>
                    <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5">
                        <Download className="h-4 w-4" /> Export Operations Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {districtTracking.length > 0 ? (
                    districtTracking.map((c) => (
                        <div key={c.id} className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden flex flex-col group hover:border-primary transition-all">
                            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                                <span className="text-[10px] font-mono font-black text-primary">{c.id}</span>
                                <StatusBadge status={c.status} />
                            </div>
                            <div className="p-5 flex-1 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-xs font-black uppercase tracking-tight text-slate-700 italic">{c.title}</h3>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase flex items-center gap-1">
                                        <MapPin className="h-2.5 w-2.5 text-primary" /> {c.area}, {c.district}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">Execution Progress</span>
                                        <span className="text-primary">{getProgressValue(c.status, c.id)}%</span>
                                    </div>
                                    <Progress value={getProgressValue(c.status, c.id)} className="h-1.5 rounded-full bg-slate-100 [&>div]:bg-primary transition-all duration-1000" />
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div className={`aspect-square rounded-sm border flex flex-col items-center justify-center gap-1 ${c.beforeImageUrl ? 'bg-white border-slate-200' : 'bg-slate-50 border-dashed border-slate-300'}`}>
                                        <Camera className={`h-3 w-3 ${c.beforeImageUrl ? 'text-green-500' : 'text-slate-300'}`} />
                                        <span className="text-[7px] font-black uppercase text-slate-400">Before</span>
                                    </div>
                                    <div className={`aspect-square rounded-sm border flex flex-col items-center justify-center gap-1 ${c.duringImageUrl ? 'bg-white border-slate-200' : 'bg-slate-50 border-dashed border-slate-300'}`}>
                                        <Hammer className={`h-3 w-3 ${c.duringImageUrl ? 'text-blue-500' : 'text-slate-300'}`} />
                                        <span className="text-[7px] font-black uppercase text-slate-400">During</span>
                                    </div>
                                    <div className={`aspect-square rounded-sm border flex flex-col items-center justify-center gap-1 ${c.afterImageUrl ? 'bg-white border-slate-200' : 'bg-slate-50 border-dashed border-slate-300'}`}>
                                        <CheckCircle2 className={`h-3 w-3 ${c.afterImageUrl ? 'text-green-600' : 'text-slate-300'}`} />
                                        <span className="text-[7px] font-black uppercase text-slate-400">After</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                                <Button
                                    onClick={() => navigate(`/complaint/${c.id}`)}
                                    className="w-full h-9 rounded-sm bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest gap-2 shadow-md shadow-primary/10"
                                >
                                    <Eye className="h-3.5 w-3.5" /> Inspect Progress
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-slate-50 border border-dashed border-slate-200 rounded-sm">
                        <Activity className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No active fieldwork identified for tracking.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkTracking;
