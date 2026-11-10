import React from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import {
  Shield, AlertTriangle, TrendingUp, MapPin,
  IndianRupee, Zap, Activity, ChevronRight, Download, Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AIInsights = () => {
  const { complaints } = useComplaints();

  const criticalAreas = complaints
    .filter(c => c.severity === 'Critical' || c.severity === 'High')
    .reduce((acc, c) => {
      const existing = acc.find(a => a.area === c.area);
      if (existing) existing.count++;
      else acc.push({ area: c.area, count: 1 });
      return acc;
    }, [] as { area: string; count: number }[])
    .sort((a, b) => b.count - a.count);

  const totalBudget = complaints.reduce((s, c) => s + (c.estimatedCost || 0), 0);
  const avgConfidence = complaints.reduce((s, c) => s + c.aiConfidence, 0) / (complaints.length || 1);

  const insights = [
    {
      icon: AlertTriangle,
      title: 'Monsoon Vulnerability Projection',
      description: criticalAreas[0]
        ? `${criticalAreas[0].area} exhibits a 4.2x vulnerability index. Structural reinforcement of primary service roads is advised prior to forecasted precipitation.`
        : 'Predictive models indicate high structural stability state-wide.',
      priority: 'Emergency' as const,
      color: 'bg-red-700',
      text: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-100',
    },
    {
      icon: IndianRupee,
      title: 'Fiscal Optimization Strategy',
      description: `Targeted reallocation of ₹${Math.round(totalBudget * 0.4).toLocaleString()} to high-density corridors could mitigate 2025 reactive maintenance costs by 18%.`,
      priority: 'High' as const,
      color: 'bg-orange-600',
      text: 'text-orange-700',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      icon: TrendingUp,
      title: 'Operational ROI Analysis',
      description: `Automated GIS verification has reduced administrative overhead by 62% in the Capital Region. Immediate horizontal scaling recommended.`,
      priority: 'High' as const,
      color: 'bg-blue-800',
      text: 'text-blue-800',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      icon: MapPin,
      title: 'Subsurface Anomaly Detection',
      description: 'Thermal satellite imagery indicates early-stage moisture penetration on NH-16 service lines. Proactive bitumen sealing recommended.',
      priority: 'Medium' as const,
      color: 'bg-slate-700',
      text: 'text-slate-700',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded bg-primary flex items-center justify-center shadow-md">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">AI Strategic Oversight</h1>
            <p className="text-muted-foreground text-sm font-medium italic">Predictive Infrastructure Modelling & Financial Optimization Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded border border-primary/20 shadow-sm">
          <Zap className="h-4 w-4 text-primary fill-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">CORE ENGINE v2.4 ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
          <CardContent className="pt-8 pb-6 text-center">
            <p className="text-4xl font-black text-primary tracking-tighter shadow-sm inline-block px-3 py-1 bg-primary/5 rounded">{avgConfidence.toFixed(1)}%</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4">Systemic Confidence Index</p>
          </CardContent>
          <div className="h-1 w-full bg-primary/20">
            <div className="h-full bg-primary" style={{ width: `${avgConfidence}%` }} />
          </div>
        </Card>
        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
          <CardContent className="pt-8 pb-6 text-center">
            <p className="text-4xl font-black text-red-700 tracking-tighter shadow-sm inline-block px-3 py-1 bg-red-50 rounded">{criticalAreas.length}</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4">Active Vulnerability Nodes</p>
          </CardContent>
          <div className="h-1 w-full bg-red-100">
            <div className="h-full bg-red-600" style={{ width: '65%' }} />
          </div>
        </Card>
        <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
          <CardContent className="pt-8 pb-6 text-center">
            <p className="text-4xl font-black text-green-700 tracking-tighter shadow-sm inline-block px-3 py-1 bg-green-50 rounded">₹{(totalBudget / 1000).toFixed(0)}K</p>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4">Estimated Optimization CAPEX</p>
          </CardContent>
          <div className="h-1 w-full bg-green-100">
            <div className="h-full bg-green-600" style={{ width: '42%' }} />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 border-l-4 border-primary pl-4 py-2 bg-white rounded-r border-y border-r border-border">
          <h2 className="text-lg font-black tracking-tight text-primary uppercase italic">Executive Strategic Directives</h2>
          <Badge variant="outline" className="ml-auto mr-4 text-[9px] font-bold border-gray-300">INTERNAL USE ONLY</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {insights.map((insight, i) => (
            <Card key={i} className={`border ${insight.border} shadow-sm rounded-md overflow-hidden bg-white hover:shadow-md transition-all group`}>
              <div className={`h-1 w-full ${insight.color}`} />
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`h-16 w-16 rounded border ${insight.border} ${insight.bg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <insight.icon className={`h-6 w-6 ${insight.text}`} />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-bold tracking-tight text-slate-800 uppercase">{insight.title}</h3>
                      <Badge className={`${insight.color} text-white border-none text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-sm`}>
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
                      "{insight.description}"
                    </p>
                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                      <Button variant="link" className={`${insight.text} font-black uppercase text-[10px] tracking-widest p-0 h-auto gap-2 group`}>
                        Generate Directive <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 text-slate-300">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-slate-900 text-white rounded-md border-none overflow-hidden mt-12">
        <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-10 relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Shield className="h-40 w-40" />
          </div>
          <div className="space-y-4 relative z-10 max-w-2xl">
            <h3 className="text-2xl font-black uppercase tracking-tight italic">Automated Policy Formulation</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium italic">
              Based on current state-wide data streams, the AI engine has formulated a draft maintenance policy for the 2026 Monsoon cycle. This document includes resource allocation, contractor dispatch priorities, and safety audit protocols.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold uppercase text-[10px] tracking-widest h-10 px-6 rounded-sm">
                Review Draft Policy
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest h-10 px-6 rounded-sm">
                <Download className="h-4 w-4 mr-2" /> Export Strategic Brief
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative z-10">
            <div className="p-8 bg-white/5 rounded-full border border-white/10 animate-pulse">
              <Activity className="h-16 w-16 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
