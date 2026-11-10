import React from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import KPICard from '@/components/KPICard';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import DistrictRanking from '@/components/DistrictRanking';
import {
  BarChart3, MapPin, AlertTriangle, CheckCircle2, Clock,
  IndianRupee, TrendingUp, Users, ShieldCheck,
  ArrowUpRight, Download, FileText, PieChart as PieIcon,
  Activity, Zap, Info, Landmark, Shield, Gauge
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StateDashboard = () => {
  const { complaints } = useComplaints();

  const stats = {
    total: complaints.length,
    resolved: complaints.filter(c => c.status === 'Resolved' || c.status === 'Completed').length,
    pending: complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Verification').length,
    inProgress: complaints.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length,
    totalBudget: complaints.reduce((sum, c) => sum + 45000, 0), // Mock budget
    avgSLA: '92.4%',
  };

  const slaData = [
    { name: 'Mon', completion: 85, target: 90 },
    { name: 'Tue', completion: 88, target: 90 },
    { name: 'Wed', completion: 94, target: 90 },
    { name: 'Thu', completion: 91, target: 90 },
    { name: 'Fri', completion: 96, target: 90 },
    { name: 'Sat', completion: 82, target: 90 },
    { name: 'Sun', completion: 89, target: 90 },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">
            State Command & Logistics Overview
          </h1>
          <p className="text-muted-foreground text-[11px] mt-1 font-bold italic uppercase tracking-wider">
            Roads & Buildings Department — Centralized Infrastructure Monitoring Node
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5 shadow-sm">
            <Download className="h-4 w-4" /> State Audit Ledger
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-sm text-[10px] font-black uppercase tracking-widest shadow-md">
            <Shield className="h-4 w-4 shadow-sm" /> Command Mode Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard title="Total Defect Population" value={stats.total} change={12} icon={BarChart3} />
        <KPICard title="Operational Efficiency" value={stats.total > 0 ? ((stats.resolved / stats.total) * 100).toFixed(1) + '%' : '0%'} change={5} icon={CheckCircle2} iconClassName="text-green-600" />
        <KPICard title="Mean SLA Compliance" value={stats.avgSLA} icon={ShieldCheck} iconClassName="text-blue-600" />
        <KPICard title="Maintenance CAPEX" value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`} icon={IndianRupee} iconClassName="text-orange-600" />
        <KPICard title="Deployed Field Assets" value="42 Units" icon={Users} iconClassName="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b py-4">
            <CardTitle className="text-[10px] font-black uppercase text-primary italic flex items-center gap-2">
              <Gauge className="h-4 w-4" /> AI Source Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Citizen', count: complaints.filter(c => c.source === 'Citizen').length },
                { name: 'RTC Bus', count: complaints.filter(c => c.source === 'APSRTC Bus').length },
                { name: 'CCTV AI', count: complaints.filter(c => c.source === 'Municipal CCTV').length },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '4px', fontSize: '10px' }} />
                <Bar dataKey="count" fill="#1e3a8a" radius={[2, 2, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b py-4">
            <CardTitle className="text-[10px] font-black uppercase text-primary italic flex items-center gap-2">
              <Shield className="h-4 w-4" /> AI Classification Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Deep Pothole', value: complaints.filter(c => c.aiClassification?.includes('Pothole')).length },
                    { name: 'Structural Crack', value: complaints.filter(c => c.aiClassification?.includes('Crack')).length },
                    { name: 'Road Cave-in', value: complaints.filter(c => c.aiClassification?.includes('Cave-in')).length },
                    { name: 'Other', value: complaints.filter(c => !['Pothole', 'Crack', 'Cave-in'].some(k => c.aiClassification?.includes(k))).length },
                  ]}
                  cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                >
                  {['#1e3a8a', '#10b981', '#f59e0b', '#ef4444'].map((color, i) => <Cell key={i} fill={color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DistrictRanking />
        </div>

        <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                  <Activity className="h-4 w-4" /> State SLA Performance Matrix
                </CardTitle>
                <CardDescription className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-tight">Real-time completion velocity vs 90% departmental threshold</CardDescription>
              </div>
              <Badge variant="outline" className="text-[9px] font-black uppercase border-slate-300 bg-white">Live Feed</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-10">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={slaData}>
                <defs>
                  <linearGradient id="colorSla" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="completion" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorSla)" strokeWidth={3} />
                <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-8 p-5 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-white rounded-full border border-blue-100 flex items-center justify-center shadow-sm">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-blue-900 tracking-wider">Diagnostic Analysis Active</p>
                  <p className="text-[11px] text-blue-700 mt-0.5 font-medium italic">Integrated monitoring systems report <span className="font-black">NOMINAL</span> parameters across all 26 districts.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-9 px-4 text-[10px] uppercase font-black tracking-widest text-blue-700 border-blue-200 bg-white shadow-sm hover:bg-blue-50">View Protocol Log</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                  <AlertTriangle className="h-4 w-4 text-red-600" /> High-Criticality Escalations
                </CardTitle>
                <CardDescription className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-tight">Defects failing triage or requiring state-level intervention</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8 px-3 bg-white border-slate-200 text-[9px] font-black uppercase tracking-wider">
                <Download className="h-3.5 w-3.5 mr-2" /> Export Critical
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="gov-table w-full">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4">ID</th>
                    <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4">LOCALITY</th>
                    <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4 text-center">SEVERITY</th>
                    <th className="text-[9px] font-black text-slate-500 uppercase tracking-widest p-4 text-right">PROTOCOL</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.filter(c => c.severity === 'Critical' || c.severity === 'High').slice(0, 5).map(c => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-mono text-[10px] font-black text-primary italic">{c.id}</td>
                      <td className="p-4">
                        <p className="text-[11px] font-black text-slate-700 uppercase">{c.area}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase italic">{c.district}</p>
                      </td>
                      <td className="p-4 text-center">
                        <SeverityBadge severity={c.severity} />
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" className="h-7 text-[9px] font-black uppercase text-primary underline p-0 hover:bg-transparent">Inspect Case</Button>
                      </td>
                    </tr>
                  ))}
                  {complaints.filter(c => c.severity === 'Critical' || c.severity === 'High').length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-300 font-black uppercase text-[10px] italic">No high-criticality escalations detected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-primary border-b pb-6">
            <div className="flex justify-between items-center mb-2">
              <Badge className="bg-white/10 text-white text-[8px] font-black tracking-[0.2em] uppercase border-white/20 px-3 py-1">AI Intelligence Node</Badge>
              <Zap className="h-5 w-5 text-white opacity-40" />
            </div>
            <CardTitle className="text-xl font-black text-white uppercase italic tracking-tight">Predictive Logistics Forecast</CardTitle>
            <CardDescription className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Structural vulnerability & material resource optimization</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 rounded-sm border bg-slate-50 border-slate-200 shadow-inner">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Risk Exposure Index</p>
                <p className="text-2xl font-black text-red-700 italic uppercase">Elevated</p>
              </div>
              <div className="p-5 rounded-sm border bg-slate-50 border-slate-200 shadow-inner">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Model Integrity</p>
                <p className="text-2xl font-black text-primary italic">94.2%</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">High-Vulnerability Maintenance Zones</p>
              </div>
              {[
                { label: 'Vijayawada Urban Corridor', risk: 85, status: 'Imminent' },
                { label: 'Visakhapatnam Coastal Ring', risk: 72, status: 'Monitor' },
                { label: 'Guntur Industrial Network', risk: 64, status: 'Scheduled' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-sm border border-slate-100 bg-slate-50/50 group hover:border-primary/20 transition-all">
                  <div className="flex-1">
                    <p className="text-[11px] font-black text-slate-700 uppercase italic">{item.label}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Vulnerability threshold: {item.risk}%</p>
                  </div>
                  <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'Imminent' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>

            <Button className="w-full bg-primary hover:bg-primary/95 text-white font-black uppercase text-[10px] tracking-[0.2em] h-12 rounded-sm shadow-xl transition-all">
              Initialize Preventive Intervention Protocol
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 bg-slate-50/50 border rounded-sm flex items-center justify-between border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded bg-white border border-slate-200 shadow-sm">
            <Landmark className="h-5 w-5 text-primary opacity-50" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-primary italic">Government of Andhra Pradesh • Roads & Buildings Department</p>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">RTGS Central Monitoring Hub • Secure Access V5.0</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">State-Level Command Authorization Verified</p>
          <p className="text-[10px] font-bold text-primary italic uppercase underline underline-offset-4">Registry Authenticated</p>
        </div>
      </div>
    </div>
  );
};

export default StateDashboard;
