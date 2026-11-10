import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import {
  Landmark, FileText, Search, Download,
  MapPin, Eye, Info, ShieldCheck, Hammer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const DistrictComplaints = () => {
  const { complaints } = useComplaints();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter complaints by district and search term
  const districtComplaints = complaints.filter(c =>
    c.district === user?.district &&
    (c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Administrative Grievance Ledger</h1>
          <p className="text-muted-foreground text-[11px] mt-1 font-bold italic uppercase tracking-wider">
            Consolidated Registry — {user?.district} Infrastructure Division
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by ID or Location..."
              className="pl-10 h-10 text-[10px] font-black uppercase italic border-slate-200 rounded-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5">
            <Download className="h-4 w-4" /> Export Registry
          </Button>
        </div>
      </div>

      <div className="rounded-sm border border-slate-200 bg-white shadow-md overflow-hidden overflow-x-auto">
        <table className="gov-table w-full border-0">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5 w-[120px]">GRIEVANCE ID</th>
              <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">LOCATION</th>
              <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">SUBMITTED BY</th>
              <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">CONFIDENCE</th>
              <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">STATUS</th>
              <th className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 text-right p-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {districtComplaints.length > 0 ? (
              districtComplaints.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 border-b border-slate-100 transition-colors group">
                  <td className="font-mono text-[11px] font-black text-primary p-5">{c.id}</td>
                  <td className="p-5">
                    <div className="space-y-1">
                      <p className="text-[12px] font-black text-slate-700 uppercase italic leading-none">{c.title || 'Road Defect'}</p>
                      <p className="text-[9px] text-gray-400 flex items-center gap-1 font-bold uppercase italic">
                        <MapPin className="h-2.5 w-2.5 text-primary" /> {c.area}
                      </p>
                    </div>
                  </td>
                  <td className="p-5">
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter border-slate-200 rounded-sm bg-slate-50 italic">
                      {c.source || 'Citizen'}
                    </Badge>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${c.aiConfidence > 90 ? 'bg-green-500' : c.aiConfidence > 75 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                          style={{ width: `${c.aiConfidence || 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-primary">{c.aiConfidence || 0}%</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="p-5 text-right">
                    <Button
                      onClick={() => navigate(`/complaint/${c.id}`)}
                      variant="outline" size="sm"
                      className="h-8 px-4 rounded-sm border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all text-[9px] font-black uppercase tracking-widest gap-2"
                    >
                      <Eye className="h-3 w-3" /> Scrutinize
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-20 text-center text-slate-400 font-black uppercase italic tracking-widest text-[10px]">
                  No grievance records found for this district.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-slate-50/50 border rounded-sm flex items-center justify-between border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded bg-white border border-slate-200 shadow-sm">
            <Landmark className="h-5 w-5 text-primary opacity-50" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-primary italic">Department of Roads & Buildings (Govt. of AP)</p>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">District Logistics Division • Registry Telemetry v4.2</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Authorized User Access Only</p>
          <p className="text-[10px] font-bold text-primary italic uppercase underline underline-offset-4">Secure Portal Protocol Active</p>
        </div>
      </div>
    </div>
  );
};

export default DistrictComplaints;
