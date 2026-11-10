import React from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import KPICard from '@/components/KPICard';
import {
  ClipboardCheck, Clock, CheckCircle2, Users,
  AlertTriangle, TrendingUp, Activity, Map as MapIcon,
  ShieldCheck, AlertCircle, Download, ChevronRight, Info, Layers, Landmark,
  FileText, Hammer
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ComplaintTable from '@/components/ComplaintTable';
import { useAuth } from '@/contexts/AuthContext';

const COLORS = ['#1e3a8a', '#10b981', '#f97316', '#ef4444', '#64748b'];

const DistrictDashboard = () => {
  const { complaints } = useComplaints();
  const { user } = useAuth();

  // Strict District Filtering
  const districtComplaints = complaints.filter(c => c.district === user?.district);

  const stats = {
    total: districtComplaints.length,
    pending: districtComplaints.filter(c => c.status === 'Submitted' || c.status === 'Under Verification').length,
    highSeverity: districtComplaints.filter(c => c.severity === 'High' || c.severity === 'Critical').length,
    activeRepairs: districtComplaints.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length,
    completed: districtComplaints.filter(c => c.status === 'Resolved' || c.status === 'Completed').length,
    avgResolutionTime: '4.2 Days',
  };

  const statusData = [
    { name: 'Submitted', value: districtComplaints.filter(c => c.status === 'Submitted').length },
    { name: 'Review', value: districtComplaints.filter(c => c.status === 'Under Verification').length },
    { name: 'Active', value: districtComplaints.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length },
    { name: 'Resolved', value: districtComplaints.filter(c => c.status === 'Resolved' || c.status === 'Completed').length },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase">
            District Operations Center
          </h1>
          <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2 font-medium">
            R&B Department — Official Monitoring Node: <span className="text-primary font-bold">{user?.district || 'Andhra Pradesh'}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-primary/20 bg-white text-primary text-xs font-bold uppercase tracking-wider h-10 px-6 rounded-md shadow-sm">
            <Download className="h-4 w-4 mr-2" /> Export Operations Data
          </Button>
          <Button className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider h-10 px-6 rounded-md shadow-md">
            <AlertTriangle className="h-4 w-4 mr-2" /> Rapid Response Dispatch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Grievances" value={stats.total} icon={FileText} iconClassName="text-slate-600" />
        <KPICard title="New Cases" value={stats.pending} icon={Clock} iconClassName="text-orange-600" />
        <KPICard title="In-Progress Cases" value={stats.activeRepairs} icon={Hammer} iconClassName="text-blue-600" />
        <KPICard title="Completed Cases" value={stats.completed} icon={CheckCircle2} iconClassName="text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border border-border shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-muted/30 border-b pb-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-bold text-primary uppercase">Zonal Infrastructure Heatmap</CardTitle>
                <CardDescription className="text-xs font-medium">AI-Synthesized road defect density across {user?.district} district</CardDescription>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded uppercase border border-green-200">Satellite GIS Active</div>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[450px] relative bg-slate-900 overflow-hidden">
            {/* Mock GIS Map View */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-slate-900 to-transparent" />

            {/* Visual Markers */}
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl" />

            {[
              { t: '30%', l: '40%', s: 'Critical', color: 'bg-red-600' },
              { t: '50%', l: '60%', s: 'High', color: 'bg-orange-600' },
              { t: '40%', l: '20%', s: 'Medium', color: 'bg-orange-400' },
              { t: '70%', l: '50%', s: 'Resolved', color: 'bg-green-600' },
            ].map((pin, i) => (
              <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer" style={{ top: pin.t, left: pin.l }}>
                <div className={`w-3 h-3 ${pin.color} rounded-full border-2 border-white shadow-lg`} />
                <div className="absolute left-full ml-2 hidden group-hover:block bg-white text-primary text-[9px] font-bold p-1 border rounded shadow-md whitespace-nowrap z-10 uppercase tracking-widest">
                  {pin.s} NODE: {Math.floor(Math.random() * 1000)}
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="bg-slate-900/80 backdrop-blur p-4 rounded border border-white/10 space-y-3">
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Operational Legend</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-white/80 font-bold uppercase tracking-tighter">
                    <span className="w-2 h-2 rounded-full bg-red-600" /> Escalated
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/80 font-bold uppercase tracking-tighter">
                    <span className="w-2 h-2 rounded-full bg-orange-600" /> Active Rep.
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/80 font-bold uppercase tracking-tighter">
                    <span className="w-2 h-2 rounded-full bg-green-600" /> Validated
                  </div>
                </div>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold uppercase text-[10px] tracking-widest h-9 px-4 rounded border border-white/10">
                <Layers className="h-3.5 w-3.5 mr-2" /> GIS Overlays
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white flex flex-col">
          <CardHeader className="bg-muted/30 border-b pb-6 text-center">
            <CardTitle className="text-lg font-bold text-primary uppercase">Audit Status Distribution</CardTitle>
            <CardDescription className="text-xs font-medium italic">Verification performance for {user?.district}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center py-6">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="#fff"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 space-y-3 px-4">
              {statusData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between border-b border-muted pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-primary pl-4 py-2 bg-white rounded-r border-y border-r border-border shadow-sm">
          <div>
            <h2 className="text-xl font-black tracking-tight text-primary uppercase italic">{user?.district} Infrastructure Ledger</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5 italic">Official regulatory tracking of reported road defects</p>
          </div>
          <Button variant="outline" size="sm" className="text-[10px] font-black uppercase border-gray-300 mr-4">
            Print Daily Ledger
          </Button>
        </div>
        <div className="rounded-md border border-border shadow-sm overflow-hidden bg-white">
          <ComplaintTable complaints={districtComplaints} canEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default DistrictDashboard;
