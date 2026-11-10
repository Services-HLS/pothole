import React, { useState, useMemo } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import ComplaintTable from '@/components/ComplaintTable';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Landmark, Camera, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StateComplaints = () => {
  const { complaints } = useComplaints();
  const [districtFilter, setDistrictFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchDistrict = districtFilter === 'all' || c.district === districtFilter;
      const matchSource = sourceFilter === 'all' || c.source === sourceFilter;
      const matchSeverity = severityFilter === 'all' || c.severity === severityFilter;
      const matchSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.area.toLowerCase().includes(searchTerm.toLowerCase());
      return matchDistrict && matchSource && matchSeverity && matchSearch;
    });
  }, [complaints, districtFilter, sourceFilter, severityFilter, searchTerm]);

  const districts = Array.from(new Set(complaints.map(c => c.district)));
  const sources = ['Citizen', 'APSRTC Bus', 'Municipal CCTV'];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Automated State Grievance Ledger</h1>
          <p className="text-muted-foreground text-[11px] mt-1 font-bold italic uppercase tracking-wider">
            Executive Oversight Dashboard — Nationwide Infrastructure Registry
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5 shadow-sm">
            <Download className="h-4 w-4" /> Comprehensive Export
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-sm text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="h-4 w-4" /> State Audit Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-sm border border-slate-200 shadow-sm">
        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Contextual Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="ID, Title, or Area..."
              className="pl-10 h-10 text-[10px] font-black uppercase italic border-slate-200 bg-white rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Administrative District</label>
          <Select value={districtFilter} onValueChange={setDistrictFilter}>
            <SelectTrigger className="h-10 text-[10px] font-black uppercase italic border-slate-200 bg-white rounded-sm">
              <SelectValue placeholder="All Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-[10px] font-black uppercase italic">All Districts</SelectItem>
              {districts.map(d => (
                <SelectItem key={d} value={d} className="text-[10px] font-black uppercase italic">{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Input Source Channel</label>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="h-10 text-[10px] font-black uppercase italic border-slate-200 bg-white rounded-sm">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-[10px] font-black uppercase italic">All Sources</SelectItem>
              {sources.map(s => (
                <SelectItem key={s} value={s} className="text-[10px] font-black uppercase italic">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Criticality Level</label>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="h-10 text-[10px] font-black uppercase italic border-slate-200 bg-white rounded-sm">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-[10px] font-black uppercase italic">All Levels</SelectItem>
              <SelectItem value="Critical" className="text-[10px] font-black uppercase italic">Critical</SelectItem>
              <SelectItem value="High" className="text-[10px] font-black uppercase italic">High</SelectItem>
              <SelectItem value="Medium" className="text-[10px] font-black uppercase italic">Medium</SelectItem>
              <SelectItem value="Low" className="text-[10px] font-black uppercase italic">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-primary opacity-40" />
            <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.15em]">Registry Population: {filteredComplaints.length} Records Identified</p>
          </div>
          <Button variant="ghost" className="h-auto p-0 text-[10px] font-black uppercase text-primary underline" onClick={() => {
            setDistrictFilter('all');
            setSourceFilter('all');
            setSeverityFilter('all');
            setSearchTerm('');
          }}>Clear All Protocols</Button>
        </div>
        <ComplaintTable complaints={filteredComplaints} canEdit={true} />
      </div>

      <div className="p-6 bg-slate-50/50 border rounded-sm flex items-center justify-between border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded bg-white border border-slate-200 shadow-sm">
            <Landmark className="h-5 w-5 text-primary opacity-50" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-primary italic">Department of Roads & Buildings (Govt. of AP)</p>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">State Secretariat • Unified Logistics Ledger v4.5</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Executive Access Verification Protocol</p>
          <p className="text-[10px] font-bold text-primary italic uppercase underline underline-offset-4">Registry Integrity Guaranteed</p>
        </div>
      </div>
    </div>
  );
};

export default StateComplaints;
