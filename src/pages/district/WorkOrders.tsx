import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import {
    FileText, Search, Download, Filter,
    MapPin, Calendar, User, Eye, Hammer, Clock,
    TrendingUp, ShieldCheck, Zap, MessageSquare, Mail, Smartphone, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const WorkOrders = () => {
    const { complaints, assignTeam, maintenanceTeams } = useComplaints();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
    const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
    const [selectedTeamId, setSelectedTeamId] = useState<string>('');
    const [isSimulating, setIsSimulating] = useState(false);
    const { toast } = useToast();

    // Filter to show grievances for the current district
    const districtOrders = complaints.filter(c =>
        c.district === user?.district &&
        (c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getFilteredByStatus = (statusFilter: string) => {
        if (statusFilter === 'all') return districtOrders;
        if (statusFilter === 'pending') return districtOrders.filter(c => c.status === 'Submitted' || c.status === 'Approved');
        if (statusFilter === 'assigned') return districtOrders.filter(c => c.status === 'Assigned');
        if (statusFilter === 'progress') return districtOrders.filter(c => c.status === 'In Progress' || c.status === 'Under Inspection' || c.status === 'Completed' || c.status === 'Resolved');
        return districtOrders;
    };

    const handleOpenAssignDialog = (id: string) => {
        setSelectedComplaintId(id);
        setSelectedTeamId('');
        setIsAssignDialogOpen(true);
    };

    const simulateNotifications = async () => {
        setIsSimulating(true);
        await new Promise(resolve => setTimeout(resolve, 600)); // WhatsApp
        toast({ title: "WhatsApp Sent", description: "Deployment orders sent to Unit Lead." });
        await new Promise(resolve => setTimeout(resolve, 600)); // SMS
        toast({ title: "SMS Gateway", description: "Field dispatch coordinates synced." });
        setIsSimulating(false);
    };

    const confirmAssignment = async () => {
        if (selectedComplaintId && selectedTeamId) {
            const team = maintenanceTeams.find(t => t.id === selectedTeamId);
            if (team) {
                await simulateNotifications();
                assignTeam(selectedComplaintId, team.name);
                toast({
                    title: "Force Allocation Complete",
                    description: `${team.name} deployed to sector. Logistics chain active.`,
                });
                setIsAssignDialogOpen(false);
            }
        }
    };

    // Helper to get recommended teams (same district, available)
    const getRecommendedTeams = () => {
        return maintenanceTeams.filter(t => t.district === user?.district && t.status === 'Available');
    };

    const getOtherTeams = () => {
        return maintenanceTeams.filter(t => !(t.district === user?.district && t.status === 'Available'));
    };

    const OrderTable = ({ data }: { data: any[] }) => (
        <div className="rounded-sm border border-slate-200 bg-white shadow-md overflow-hidden overflow-x-auto">
            <table className="gov-table w-full border-0">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5 w-[120px]">ORDER ID</th>
                        <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">LOCATION</th>
                        <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">TEAM</th>
                        <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">STATUS</th>
                        <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">LAST UPDATED</th>
                        <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 text-right p-5">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50 border-b border-slate-100 transition-colors group">
                                <td className="font-mono text-[11px] font-black text-primary p-5">{c.id}</td>
                                <td className="p-5">
                                    <div className="space-y-1">
                                        <p className="text-[12px] font-black text-slate-700 uppercase italic leading-none">{c.title}</p>
                                        <p className="text-[9px] text-gray-400 flex items-center gap-1 font-bold uppercase italic">
                                            <MapPin className="h-2.5 w-2.5 text-primary" /> {c.area}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center gap-2">
                                        <User className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="text-[10px] font-bold text-slate-600 uppercase italic">
                                            {c.assignedTeam || 'UNASSIGNED'}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <StatusBadge status={c.status} />
                                </td>
                                <td className="p-5 text-[10px] font-bold text-slate-400 uppercase italic">
                                    {new Date(c.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="p-5 text-right flex justify-end gap-2">
                                    {(c.status === 'Submitted' || c.status === 'Approved') && (
                                        <Button
                                            onClick={() => handleOpenAssignDialog(c.id)}
                                            size="sm"
                                            className="h-9 px-4 rounded-sm bg-primary text-white font-black uppercase tracking-widest gap-2 hover:bg-primary/90 transition-all text-[10px]"
                                        >
                                            <Hammer className="h-3.5 w-3.5" /> Assign
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => navigate(`/complaint/${c.id}`)}
                                        variant="outline" size="sm"
                                        className="h-9 px-4 rounded-sm border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest gap-2"
                                    >
                                        <Eye className="h-3.5 w-3.5" /> View
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="py-20 text-center text-slate-400 font-black uppercase italic tracking-widest text-[10px]">
                                No active work orders identified in this category.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Infrastructure Work Orders</h1>
                    <p className="text-muted-foreground text-[11px] mt-1 font-bold italic uppercase tracking-wider">
                        Operational Logistics & Resource Assignment — {user?.district} Division
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by Order ID..."
                            className="pl-10 h-10 text-[10px] font-black uppercase italic border-slate-200 rounded-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5">
                        <Download className="h-4 w-4" /> Export Logistics
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="w-full space-y-6">
                <TabsList className="bg-slate-100 p-1 rounded-sm border border-slate-200 w-full md:w-auto h-auto flex gap-1">
                    <TabsTrigger value="all" className="rounded-sm text-[10px] font-black uppercase tracking-widest px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        All Orders
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="rounded-sm text-[10px] font-black uppercase tracking-widest px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        Pending Assignment
                    </TabsTrigger>
                    <TabsTrigger value="assigned" className="rounded-sm text-[10px] font-black uppercase tracking-widest px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        Assigned
                    </TabsTrigger>
                    <TabsTrigger value="progress" className="rounded-sm text-[10px] font-black uppercase tracking-widest px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                        In Progress
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <OrderTable data={getFilteredByStatus('all')} />
                </TabsContent>
                <TabsContent value="pending" className="space-y-4">
                    <OrderTable data={getFilteredByStatus('pending')} />
                </TabsContent>
                <TabsContent value="assigned" className="space-y-4">
                    <OrderTable data={getFilteredByStatus('assigned')} />
                </TabsContent>
                <TabsContent value="progress" className="space-y-4">
                    <OrderTable data={getFilteredByStatus('progress')} />
                </TabsContent>
            </Tabs>

            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                <DialogContent className="max-w-md bg-white border-2 border-slate-200 rounded-sm">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black text-primary uppercase italic">Manual Force Allocation</DialogTitle>
                        <DialogDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Override Auto-Scheduler & Deploy Unit</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Select Maintenance Unit</Label>
                            <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                                <SelectTrigger className="h-14 border-slate-200 font-bold text-xs uppercase">
                                    <SelectValue placeholder="Select Operational Team" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getRecommendedTeams().length > 0 && (
                                        <div className="p-2">
                                            <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mb-2 px-2 flex items-center gap-2">
                                                <Zap className="h-3 w-3" /> AI Recommended (Optimal)
                                            </p>
                                            {getRecommendedTeams().map(team => (
                                                <SelectItem key={team.id} value={team.id} className="text-xs font-bold uppercase pl-4 mb-1 focus:bg-green-50">
                                                    <div className="flex flex-col text-left">
                                                        <span>{team.name}</span>
                                                        <span className="text-[9px] text-green-600 italic flex items-center gap-2">
                                                            <TrendingUp className="h-2 w-2" /> 98% Match | {team.district} Home Base
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </div>
                                    )}
                                    <div className="p-2 border-t border-slate-100">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Other Units (Logistics Penalty)</p>
                                        {getOtherTeams().map(team => (
                                            <SelectItem key={team.id} value={team.id} className="text-xs font-medium uppercase text-slate-500 pl-4">
                                                <div className="flex flex-col text-left">
                                                    <span>{team.name}</span>
                                                    <span className="text-[9px] text-slate-400 italic">
                                                        {team.district} District (est. +45m arrival)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedTeamId && (
                            <div className="bg-primary/5 p-4 rounded-sm border border-primary/10">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center border border-primary/20">
                                        <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Estimated Mobilization</p>
                                        <p className="text-sm font-black italic text-slate-700">Immediate Deployment</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)} disabled={isSimulating} className="text-xs font-bold uppercase">Cancel</Button>
                        <Button onClick={confirmAssignment} disabled={!selectedTeamId || isSimulating} className="bg-primary text-white font-black uppercase tracking-widest text-xs min-w-[140px]">
                            {isSimulating ? 'Deploying...' : 'Confirm Deployment'}
                            {!isSimulating && <Send className="ml-2 h-3 w-3" />}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default WorkOrders;
