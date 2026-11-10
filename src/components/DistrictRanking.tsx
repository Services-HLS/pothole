import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, AlertCircle, CheckCircle2, Landmark } from 'lucide-react';

const DistrictRanking = () => {
    const rankings = [
        { name: 'Tirupati', score: 98, resolved: 450, pending: 12, budget_used: 85, lag_time: '1.2 days' },
        { name: 'Chittoor', score: 95, resolved: 320, pending: 15, budget_used: 70, lag_time: '1.5 days' },
        { name: 'Nellore', score: 92, resolved: 280, pending: 22, budget_used: 92, lag_time: '1.9 days' },
        { name: 'Guntur', score: 88, resolved: 210, pending: 35, budget_used: 65, lag_time: '2.4 days' },
        { name: 'Kurnool', score: 85, resolved: 180, pending: 42, budget_used: 50, lag_time: '3.1 days' },
    ];

    return (
        <Card className="border border-slate-200 shadow-sm rounded-md overflow-hidden bg-white h-full">
            <CardHeader className="bg-slate-50 border-b pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
                            <Trophy className="h-4 w-4" /> District Performance Ranking
                        </CardTitle>
                        <CardDescription className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-tight">Composite Score: Resolution SLA & Quality Compliance</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {rankings.map((dist, i) => (
                    <div key={dist.name} className="space-y-3 group border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className={`text-sm font-black italic ${i === 0 ? 'text-primary' : i === 1 ? 'text-blue-700' : 'text-slate-400'}`}>
                                    #{i + 1}
                                </span>
                                <div>
                                    <p className="text-xs font-black text-slate-700 uppercase group-hover:text-primary transition-colors">{dist.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1 text-[8px] font-bold text-green-600 uppercase">
                                            <CheckCircle2 className="h-2.5 w-2.5" /> {dist.resolved} RSLV
                                        </div>
                                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                        <div className="flex items-center gap-1 text-[8px] font-bold text-slate-400 uppercase">
                                            <AlertCircle className="h-2.5 w-2.5" /> {dist.pending} PNDG
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-primary">{dist.score}%</p>
                                <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest mt-0.5 italic">SLA: {dist.lag_time}</p>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-[7px] font-black text-gray-400 uppercase tracking-widest">
                                <span>Fiscal Utilization Protocol</span>
                                <span>{dist.budget_used}% ALLOC</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                <div
                                    className={`h-full ${dist.budget_used > 90 ? 'bg-red-500' : 'bg-primary'}`}
                                    style={{ width: `${dist.budget_used}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
            <div className="p-4 bg-slate-50/50 border-t">
                <div className="flex items-center gap-3">
                    <Landmark className="h-3 w-3 text-primary opacity-30" />
                    <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest italic">Official Metrics verified by State Audit Cell</p>
                </div>
            </div>
        </Card>
    );
};

export default DistrictRanking;
