import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintsContext';
import KPICard from '@/components/KPICard';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  FileText, CheckCircle2, Clock, AlertTriangle,
  Shield, Bell, ArrowRight, MapPin, Zap, Info, UserCheck, Activity, Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const { getComplaintsByUser } = useComplaints();

  if (!user) return null;
  const myComplaints = getComplaintsByUser(user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const stats = {
    total: myComplaints.length,
    resolved: myComplaints.filter(c => c.status === 'Resolved' || c.status === 'Completed').length,
    inProgress: myComplaints.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length,
    pending: myComplaints.filter(c => c.status === 'Submitted' || c.status === 'Under Verification').length,
  };

  const resolutionProgress = stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">
            Citizen Service Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 font-medium text-sm">
            Road Safety Portal • Public Contribution Interface
          </p>
        </div>
        <Link to="/citizen/new-complaint">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-3 px-8 rounded-md h-12 text-sm font-bold uppercase tracking-widest shadow-md">
            <AlertTriangle className="h-4 w-4" />
            Register Grievance
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Submissions" value={stats.total} icon={FileText} />
        <KPICard title="Resolved Issues" value={stats.resolved} icon={CheckCircle2} iconClassName="text-green-600" />
        <KPICard title="In Progress" value={stats.inProgress} icon={Clock} iconClassName="text-blue-600" />
        <KPICard title="Pending Review" value={stats.pending} icon={Bell} iconClassName="text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">


          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-muted/50 border-b pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase text-primary">Your Recent Grievances</CardTitle>
                <CardDescription className="text-xs">Chronological tracking of reported road defects</CardDescription>
              </div>
              <Link to="/citizen/complaints">
                <Button variant="outline" size="sm" className="text-primary text-[10px] font-bold uppercase tracking-widest bg-white">
                  Archives <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {myComplaints.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <div className="bg-muted p-4 rounded-full mb-4">
                    <Info className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase">No Active Records</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">Participate in road safety by reporting infrastructure issues.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="gov-table">
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Subject / Title</th>
                        <th>Area</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myComplaints.slice(0, 5).map((c) => (
                        <tr key={c.id}>
                          <td className="font-bold text-[10px]">{c.id}</td>
                          <td className="font-bold text-xs">{c.title}</td>
                          <td className="text-xs">{c.area}</td>
                          <td>
                            <StatusBadge status={c.status} />
                          </td>
                          <td>
                            <Link to="/citizen/complaints">
                              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase text-primary hover:bg-primary/5 gap-1">
                                <Eye className="h-3 w-3" /> View Detail
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Bell className="h-4 w-4" /> Department Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {[
                { title: 'New Maintenance Cycle Start', desc: 'R&B department initiated phase 4 repairs in Vizag region.', time: '10m ago', type: 'update' },
                { title: 'Citizen Awareness Program', desc: 'New guidelines for reporting high-speed highway defects.', time: '2h ago', type: 'news' },
                { title: 'System Performance Audit', desc: '98% of reported potholes resolved within 48h this month.', time: 'Yesterday', type: 'stats' },
              ].map((note, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-muted last:border-0 last:pb-0">
                  <div className={`h-8 w-8 rounded flex items-center justify-center flex-shrink-0 border ${note.type === 'update' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    note.type === 'news' ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-green-50 text-green-700 border-green-100'
                    }`}>
                    {note.type === 'update' ? <Zap className="h-4 w-4" /> : note.type === 'news' ? <Info className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 group-hover:text-primary leading-tight">{note.title}</p>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{note.desc}</p>
                    <p className="text-[9px] text-gray-400 mt-1 uppercase font-black">{note.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
