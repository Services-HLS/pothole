import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import {
    Map as MapIcon, Layers, Filter, MapPin,
    Maximize2, MousePointer2, Settings, Download,
    Navigation, Info, Search, Activity, Landmark
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const DistrictGIS = () => {
    const { complaints } = useComplaints();
    const [layers, setLayers] = useState({
        potholes: true,
        heatmap: true,
        accidents: false,
        drainage: false,
        traffic: true
    });

    const [filterSeverity, setFilterSeverity] = useState({
        Critical: true,
        High: true,
        Medium: true,
        Low: true
    });

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col space-y-6 animate-fade-in relative pb-4">
            {/* Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-md border border-border shadow-sm">
                <div>
                    <h1 className="text-xl font-black tracking-tight flex items-center gap-3 text-primary uppercase italic">
                        <MapIcon className="h-6 w-6" /> GIS Command & Spatial Intelligence
                    </h1>
                    <p className="text-[11px] text-muted-foreground font-medium italic mt-0.5">District-wide infrastructure density analysis & logistical planning interface</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Registry ID / Coordinates..." className="w-72 pl-10 h-10 bg-slate-50 border-slate-200 text-xs font-bold italic" />
                    </div>
                    <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5">
                        <Download className="h-4 w-4" /> Export GeoJSON
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar Controls */}
                <div className="w-80 flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-none">
                    {/* Layer Control */}
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                                <Layers className="h-4 w-4" /> Map Layer Protocol
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4 px-6 pb-6">
                            {Object.entries(layers).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors">
                                    <Label htmlFor={key} className="text-[10px] font-bold uppercase text-slate-600 cursor-pointer">{key} Information</Label>
                                    <Checkbox
                                        id={key}
                                        checked={value}
                                        onCheckedChange={(checked) => setLayers(prev => ({ ...prev, [key]: checked }))}
                                        className="h-4 w-4 rounded-sm border-primary/30 data-[state=checked]:bg-primary"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Filter Control */}
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                                <Filter className="h-4 w-4" /> Severity Constraints
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4 px-6 pb-6">
                            {Object.entries(filterSeverity).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors">
                                    <Label htmlFor={`sev-${key}`} className="text-[10px] font-bold uppercase text-slate-600 flex items-center gap-3 cursor-pointer">
                                        <div className={`h-2.5 w-2.5 rounded-full ${key === 'Critical' ? 'bg-red-600' :
                                            key === 'High' ? 'bg-orange-600' :
                                                key === 'Medium' ? 'bg-amber-400' : 'bg-green-600'
                                            }`} /> {key} Classification
                                    </Label>
                                    <Checkbox
                                        id={`sev-${key}`}
                                        checked={value}
                                        onCheckedChange={(checked) => setFilterSeverity(prev => ({ ...prev, [key]: checked }))}
                                        className="h-4 w-4 rounded-sm border-primary/30 data-[state=checked]:bg-primary"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Operational Feed */}
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-slate-900 text-white mt-auto">
                        <CardHeader className="bg-white/5 border-b border-white/10 pb-3">
                            <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                                <Activity className="h-3 w-3 animate-pulse text-secondary" /> Telemetry Stream
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3 px-6 pb-6">
                            <div className="space-y-3">
                                <div className="p-3 bg-white/5 rounded border border-white/10 text-[9px] font-mono leading-relaxed">
                                    <span className="text-secondary font-bold mr-2">[18:45:01]</span> GPS cluster (R-22) detected within Cyber Corridor. Initiating scan.
                                </div>
                                <div className="p-3 bg-red-500/10 rounded border border-red-500/20 text-[9px] font-mono leading-relaxed">
                                    <span className="text-red-400 font-bold mr-2">[18:42:15]</span> Density alert C-04 active. Surface stress threshold exceeded.
                                </div>
                            </div>
                            <Button variant="ghost" className="w-full text-[8px] h-8 uppercase font-black tracking-widest text-white/40 hover:text-white hover:bg-white/5 border border-white/10 mt-2">
                                Clear Log Buffer
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Map Canvas */}
                <div className="flex-1 relative rounded border border-border shadow-lg overflow-hidden bg-slate-950 group">
                    {/* Mock Map Background */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1526778545894-6297aa496122?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-transparent to-slate-950/50 pointer-events-none" />

                    {/* Heatmap Layer */}
                    {layers.heatmap && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-[30%] left-[40%] w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
                            <div className="absolute bottom-[20%] right-[30%] w-[300px] h-[300px] bg-orange-600/10 rounded-full blur-[100px]" />
                        </div>
                    )}

                    {/* Markers Layer */}
                    {layers.potholes && (
                        <div className="absolute inset-0 p-10 cursor-crosshair">
                            {complaints.filter(c => filterSeverity[c.severity]).map((c, i) => (
                                <div
                                    key={c.id}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:z-50 transition-all duration-300"
                                    style={{
                                        top: `${40 + (c.latitude % 0.1) * 400}%`,
                                        left: `${30 + (c.longitude % 0.1) * 400}%`,
                                    }}
                                >
                                    <div className="group/marker relative">
                                        <div className="bg-slate-900 p-1 rounded-sm border border-white/20 shadow-2xl relative">
                                            <MapPin className={`h-7 w-7 transition-all group-hover/marker:scale-110 cursor-pointer ${c.severity === 'Critical' ? 'text-red-600' :
                                                c.severity === 'High' ? 'text-orange-600' :
                                                    c.severity === 'Medium' ? 'text-amber-500' : 'text-green-600'
                                                }`} />
                                            {c.severity === 'Critical' && (
                                                <div className="absolute -inset-1 rounded-sm border border-red-600/50 animate-ping" />
                                            )}
                                        </div>

                                        {/* Popover on Hover */}
                                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/marker:opacity-100 transition-all pointer-events-none w-56 z-[100] translate-y-2 group-hover/marker:translate-y-0">
                                            <div className="bg-slate-900 border border-white/20 rounded-sm shadow-2xl p-4 text-white">
                                                <p className="text-[10px] font-mono font-black text-secondary mb-1">REG_ID: {c.id}</p>
                                                <p className="text-xs font-black uppercase italic leading-tight text-white mb-3 underline underline-offset-4 decoration-primary/50">{c.area}</p>
                                                <div className="flex justify-between items-center bg-white/5 p-2 rounded-sm">
                                                    <span className="text-[8px] font-black uppercase text-white/50">{c.severity} RISK</span>
                                                    <span className="text-[8px] font-black uppercase text-secondary">{c.status}</span>
                                                </div>
                                            </div>
                                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/20 mx-auto" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Operational Controls */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                        <Button size="icon" className="h-10 w-10 bg-slate-900 border border-white/10 text-white rounded-sm hover:bg-slate-800 shadow-lg"><Maximize2 className="h-4 w-4" /></Button>
                        <Button size="icon" className="h-10 w-10 bg-slate-900 border border-white/10 text-white rounded-sm hover:bg-slate-800 shadow-lg"><Navigation className="h-4 w-4" /></Button>
                        <Button size="icon" className="h-10 w-10 bg-slate-900 border border-white/10 text-white rounded-sm hover:bg-slate-800 shadow-lg mt-4"><Settings className="h-4 w-4" /></Button>
                    </div>

                    {/* Map Information Panel */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                        <div className="bg-slate-900 border border-white/20 p-6 rounded-sm text-white max-w-sm pointer-events-auto shadow-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Landmark className="h-5 w-5 text-secondary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Zone_Telemetry_Unit</span>
                            </div>
                            <p className="text-[10px] text-white/60 font-medium italic leading-relaxed mb-6 uppercase tracking-tighter">
                                Strategic monitoring active. AI analysis indicates high structural stress in Southern Corridor Segment-D. Recommended: Urgent Audit.
                            </p>
                            <div className="flex gap-8">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black italic">24</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Registry Count</span>
                                </div>
                                <div className="flex flex-col border-l border-white/10 pl-8">
                                    <span className="text-2xl font-black italic text-red-600">12</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-red-600/40">Critical Nodes</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 text-white/40 text-[9px] font-mono font-bold pointer-events-auto">
                            <span className="bg-slate-900/80 px-3 py-1 rounded-sm border border-white/5 uppercase italic">LAT: 17.4156 | LNG: 78.4347 | ALT: 542M</span>
                            <span className="bg-slate-900/80 px-3 py-1 rounded-sm border border-white/5 uppercase italic">SCALE: 1:5,000 | DATUM: WGS84</span>
                            <div className="h-1.5 w-48 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-secondary w-2/3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistrictGIS;
