import React, { useState } from 'react';
import {
    ShieldCheck, Lock, EyeOff, UserCheck,
    FileText, History, Info, AlertOctagon,
    Fingerprint, Database, Scale, Globe, Landmark
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const CompliancePanel = () => {
    const [privacyMode, setPrivacyMode] = useState(true);
    const [dataRetention, setDataRetention] = useState(true);

    const auditLogs = [
        { id: 'LOG-4012', user: 'District Officer', action: 'Accessed Evidence Video', resource: 'CPL-001', timestamp: '2026-02-10 18:20:11' },
        { id: 'LOG-4011', user: 'System (AI)', action: 'Anonymized Face Detection', resource: 'CPL-005', timestamp: '2026-02-10 17:15:34' },
        { id: 'LOG-4010', user: 'State Admin', action: 'Exported Financial Report', resource: 'Hyderabad_Q1_Repairs', timestamp: '2026-02-10 16:11:02' },
        { id: 'LOG-4009', user: 'District Officer', action: 'Changed Severity Level', resource: 'CPL-003', timestamp: '2026-02-10 15:45:12' },
        { id: 'LOG-4008', user: 'Citizen', action: 'Requested Data Deletion', resource: 'USR-8821', timestamp: '2026-02-10 14:32:00' },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Compliance & Governance Hub</h1>
                    <p className="text-muted-foreground text-sm mt-1 font-medium italic">
                        DPDP Act 2023 Statutory Oversight & Encryption Protocol Management
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 gap-3 px-4 py-2 font-black uppercase text-[10px] tracking-widest italic rounded-sm">
                        <ShieldCheck className="h-4 w-4" /> NODE_STATUS: SECURE • HYD-01
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Compliance Controls */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-3 italic">
                                <Lock className="h-4 w-4" /> Privacy Control Protocol
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-6 px-8 pb-8">
                            <div className="flex items-center justify-between p-4 rounded border border-gray-100 bg-slate-50 shadow-inner group">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Citizen Anonymization</p>
                                    <p className="text-[9px] text-gray-400 font-bold italic uppercase tracking-tighter">AI-driven face/plate masking</p>
                                </div>
                                <Switch checked={privacyMode} onCheckedChange={setPrivacyMode} />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded border border-gray-100 bg-slate-50 shadow-inner group">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Log Scrubber System</p>
                                    <p className="text-[9px] text-gray-400 font-bold italic uppercase tracking-tighter">PII purge cycle: 90 days</p>
                                </div>
                                <Switch checked={dataRetention} onCheckedChange={setDataRetention} />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded border border-gray-100 bg-slate-50 shadow-inner group">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Audit Trail Integrity</p>
                                    <p className="text-[9px] text-gray-400 font-bold italic uppercase tracking-tighter">Blockchain-Verified Ledger</p>
                                </div>
                                <Badge className="bg-primary text-white text-[8px] font-black tracking-widest italic rounded-sm">ACTIVE</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white border-l-4 border-l-primary">
                        <CardHeader className="bg-muted/30 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-3 italic">
                                <Scale className="h-4 w-4" /> Statutory Health Index
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-8 px-8 pb-10">
                            <div className="text-center">
                                <div className="relative inline-flex mb-6 group cursor-crosshair">
                                    <svg className="w-32 h-32">
                                        <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                                        <circle className="text-primary transition-all duration-1000" strokeWidth="8" strokeDasharray={352} strokeDashoffset={352 * 0.05} strokeLinecap="square" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black text-primary tracking-tighter italic">95%</span>
                                        <span className="text-[7px] font-black uppercase tracking-[0.2em] text-gray-400 -mt-1">INDEX_VAL</span>
                                    </div>
                                    <div className="absolute -inset-2 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />
                                </div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">DPDP COMPLIANCE HEALTH</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded border border-gray-100 bg-white shadow-sm text-center">
                                    <p className="text-2xl font-black italic text-primary">12</p>
                                    <p className="text-[8px] uppercase font-black text-gray-400 tracking-widest mt-1">Queries</p>
                                </div>
                                <div className="p-4 rounded border border-gray-100 bg-white shadow-sm text-center">
                                    <p className="text-2xl font-black italic text-red-600">0</p>
                                    <p className="text-[8px] uppercase font-black text-gray-400 tracking-widest mt-1">Breaches</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Audit Trail */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white h-full flex flex-col">
                        <CardHeader className="bg-muted/30 border-b pb-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-3">
                                        <History className="h-5 w-5" /> Inviolable Audit Ledger
                                    </CardTitle>
                                    <CardDescription className="text-xs font-medium italic mt-1">Real-time immutable tracking of inter-departmental data access</CardDescription>
                                </div>
                                <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest gap-2 bg-white border-primary/20 text-primary hover:bg-primary/5">
                                    <Fingerprint className="h-4 w-4" /> Verify Signatures
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-1">
                            <div className="overflow-x-auto">
                                <table className="gov-table w-full">
                                    <thead>
                                        <tr>
                                            <th className="w-24">LOG_ID</th>
                                            <th className="w-48">MGR_AGENT</th>
                                            <th>PROTOCOL_ACTION</th>
                                            <th className="w-32">RES_CODE</th>
                                            <th className="text-right w-48">SYS_TIMESTAMP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {auditLogs.map((log) => (
                                            <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="font-mono text-[10px] font-black text-gray-400 tracking-tighter truncate">{log.id}</td>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-7 w-7 rounded-sm border border-primary/10 bg-primary/5 flex items-center justify-center flex-shrink-0">
                                                            {log.user.includes('AI') ? <Database className="h-3.5 w-3.5 text-primary" /> : <UserCheck className="h-3.5 w-3.5 text-primary" />}
                                                        </div>
                                                        <span className="text-[11px] font-black uppercase tracking-tight text-slate-700 italic">{log.user}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`text-[9px] px-3 py-1 font-black uppercase italic tracking-widest rounded-sm ${log.action.includes('Accessed') ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                                        log.action.includes('Exported') ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-green-50 text-green-700 border-green-100'
                                                        }`}>
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td className="text-[10px] font-black font-mono text-primary text-center px-4">
                                                    <span className="bg-primary/5 px-2 py-0.5 rounded tracking-tighter">{log.resource}</span>
                                                </td>
                                                <td className="text-right text-[10px] font-bold text-gray-400 italic font-mono tabular-nums">{log.timestamp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                        <CardFooter className="mt-auto border-t bg-muted/20 py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-[9px] text-gray-400 font-bold uppercase italic flex items-center gap-2 tracking-tighter">
                                <Info className="h-4 w-4 opacity-40" /> SYSTEM-LEVEL FINGERPRINTING APPLIED TO ALL LOG ENTRIES FOR TAMPER-EVIDENCE AUDITING.
                            </p>
                            <div className="flex gap-2">
                                <Button variant="ghost" className="h-9 px-4 text-[10px] font-black uppercase tracking-widest border border-gray-200 bg-white hover:bg-primary/5 transition-all">Previous</Button>
                                <Button variant="ghost" className="h-9 px-4 text-[10px] font-black uppercase tracking-widest border border-gray-200 bg-white hover:bg-primary/5 transition-all">Next</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                {[
                    { icon: EyeOff, label: 'Data Masking', status: 'Global Active' },
                    { icon: Globe, label: 'Residency', status: 'Local (Andhra)' },
                    { icon: Fingerprint, label: 'Biometrics', status: 'AES-256 Enc' },
                    { icon: AlertOctagon, label: 'Infringements', status: 'Zero Detected' }
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded border border-gray-100 bg-white flex items-center gap-5 transition-all hover:border-primary/30 hover:shadow-lg group">
                        <div className="p-4 rounded-sm bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-gray-100">
                            <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] italic mb-1">{item.label}</p>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-700 italic">{item.status}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-10 border border-primary/20 bg-primary/5 rounded-md text-center max-w-4xl mx-auto mt-12 space-y-4">
                <Landmark className="h-12 w-12 text-primary mx-auto opacity-30" />
                <h3 className="text-sm font-black uppercase italic tracking-widest text-primary">Department of Information Technology & Communications</h3>
                <p className="text-xs text-primary/60 font-medium italic max-w-2xl mx-auto leading-relaxed uppercase tracking-tighter">
                    Governance console strictly managed under Government orders. Unauthorized access to audit logs or privacy parameters is a punishable offense under the IT Act and DPDP framework.
                </p>
                <div className="pt-4 flex justify-center gap-6">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/40">ID: AP-IT-LOG-V4</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/40">CERT: 2044-RE-SHI</span>
                </div>
            </div>
        </div>
    );
};

export default CompliancePanel;
