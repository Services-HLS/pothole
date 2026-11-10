import React from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  TrendingUp, BarChart3, PieChart as PieChartIcon,
  Activity, ArrowUpRight, ShieldCheck, Zap, Download, Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const COLORS = ['#1e3a8a', '#10b981', '#f97316', '#ef4444', '#64748b'];

const StateAnalytics = () => {
  const { complaints } = useComplaints();

  const severityData = [
    { name: 'Low', value: complaints.filter(c => c.severity === 'Low').length },
    { name: 'Medium', value: complaints.filter(c => c.severity === 'Medium').length },
    { name: 'High', value: complaints.filter(c => c.severity === 'High').length },
    { name: 'Critical', value: complaints.filter(c => c.severity === 'Critical').length },
  ];

  const resolutionTime = [
    { period: 'Jan', avgDays: 5.2, prev: 6.1 },
    { period: 'Feb', avgDays: 4.8, prev: 5.8 },
    { period: 'Mar', avgDays: 3.9, prev: 4.5 },
    { period: 'Apr', avgDays: 3.5, prev: 4.2 },
    { period: 'May', avgDays: 3.2, prev: 3.8 },
  ];

  const budgetByArea = [
    { area: 'Coastal Zone', budget: 12450000, efficiency: 92 },
    { area: 'Rayalaseema', budget: 8500000, efficiency: 88 },
    { area: 'North Andhra', budget: 6200000, efficiency: 95 },
    { area: 'Capital Region', budget: 15800000, efficiency: 91 },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">
            State-Wide Infrastructure Analytics
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-medium italic">
            Roads & Buildings Department — Executive Decision Support System
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="text-[10px] font-black uppercase border-gray-300 h-10 px-6 shadow-sm bg-white">
            <Download className="h-4 w-4 mr-2" /> Download Reports
          </Button>
          <div className="flex items-center gap-2 px-4 bg-green-50 text-green-700 border border-green-200 rounded-md text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="h-4 w-4" /> Audit Verified
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-muted/30 border-b pb-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-bold text-primary uppercase flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" /> Defect Composition Matrix
                </CardTitle>
                <CardDescription className="text-xs font-medium italic">Severity distribution across state-wide reporting nodes</CardDescription>
              </div>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="#fff"
                  >
                    {severityData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 px-4">
              {severityData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.name} CLASS</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-muted/30 border-b pb-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-bold text-primary uppercase flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" /> SLA Compliance Velocity
                </CardTitle>
                <CardDescription className="text-xs font-medium italic">Mean time-to-resolution efficiency across fiscal quarters</CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-[9px] font-black px-2">OPTIMIZING</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resolutionTime}>
                  <defs>
                    <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} unit="d" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="avgDays" stroke="#10b981" fillOpacity={1} fill="url(#colorDays)" strokeWidth={3} />
                  <Area type="monotone" dataKey="prev" stroke="#cbd5e1" fillOpacity={0} strokeDasharray="5 5" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 p-4 bg-muted/30 rounded border border-border">
              <p className="text-xs text-muted-foreground font-medium italic text-center flex items-center justify-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-green-600 shadow-sm" />
                SLA Compliance demonstrates a <span className="font-black text-primary">15.4% efficiency uptick</span> over the previous baseline.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border border-border shadow-sm rounded-md overflow-hidden bg-white">
          <CardHeader className="bg-muted/30 border-b pb-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-primary uppercase flex items-center gap-2">
                <BarChart3 className="h-5 w-5" /> CAPEX Allocation & Efficiency Index
              </CardTitle>
              <CardDescription className="text-xs font-medium italic">Budget distribution mapped against regional maintenance performance</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[10px] font-black tracking-widest uppercase border-gray-300">FY 2024-25</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-8 px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-3">
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetByArea} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                      <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis dataKey="area" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#1e293b' }} width={110} />
                      <Tooltip
                        cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                        formatter={(v: number) => `₹${(v / 1000000).toFixed(2)} Million`}
                      />
                      <Bar dataKey="budget" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b pb-2">Operational Integrity</h4>
                {budgetByArea.map((area) => (
                  <div key={area.area} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                      <span>{area.area}</span>
                      <span className="text-green-700">{area.efficiency}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-gray-100">
                      <div className="h-full bg-primary" style={{ width: `${area.efficiency}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mt-8 p-4 rounded bg-slate-50 border border-slate-200">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5" /> Intelligence Directive
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium italic">
                    Fiscal realignment in the <span className="font-bold text-gray-700">Coastal Zone</span> recommended to resolve backlog volatility.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StateAnalytics;
