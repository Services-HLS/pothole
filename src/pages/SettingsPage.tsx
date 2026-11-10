import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
    User, Shield, Bell, Globe, Lock,
    Mail, Phone, Save, AlertCircle, Info, Landmark, Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
    const { user } = useAuth();
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings Updated",
            description: "Your official profile and preferences have been successfully synchronized.",
        });
    };

    if (!user) return null;

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic flex items-center gap-3">
                        <Settings className="h-6 w-6" /> Portal Settings
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1 font-medium italic">Roads & Buildings Department — User Preferences & Governance Controls</p>
                </div>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest h-10 px-8 shadow-lg shadow-primary/20 gap-2 rounded-md">
                    <Save className="h-4 w-4" /> Commit Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile & Security */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-primary/5 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <User className="h-4 w-4" /> Official Personnel Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-6 px-8">
                            <div className="flex items-center gap-6 pb-6 border-b border-muted">
                                <div className="h-20 w-20 rounded bg-muted flex items-center justify-center border border-border shadow-inner">
                                    <User className="h-10 w-10 text-gray-400" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-primary uppercase">{user.name}</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{user.role.replace('_', ' ')} • ID: AP-RB-{user.id}</p>
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] font-black uppercase tracking-tighter">Verified Official</Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Legal Name</Label>
                                    <Input defaultValue={user.name} className="h-12 border-gray-300 rounded shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Departmental Email</Label>
                                    <Input defaultValue={user.email} className="h-12 border-gray-300 rounded shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verified Mobile (MFA)</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input defaultValue="+91 91234 56789" className="h-12 border-gray-300 rounded shadow-sm pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Office Designation</Label>
                                    <Input defaultValue={user.role === 'citizen' ? 'Registered Citizen' : 'Senior Executive Officer'} readOnly className="h-12 border-gray-100 bg-gray-50 rounded shadow-inner font-medium text-gray-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-primary/5 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <Shield className="h-4 w-4" /> Governance & Security Protocols
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-8 px-8 pb-10">
                            <div className="flex items-center justify-between p-4 rounded border border-orange-100 bg-orange-50/50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-white rounded border border-orange-200 shadow-sm mt-0.5">
                                        <Lock className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">Two-Factor Authentication (OTP)</p>
                                        <p className="text-xs text-slate-500 font-medium italic">Secure your sessions with mandatory Aadhaar-linked OTP verification.</p>
                                    </div>
                                </div>
                                <Switch checked />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded border border-blue-100 bg-blue-50/50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-white rounded border border-blue-200 shadow-sm mt-0.5">
                                        <Shield className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">Biometric Signature Login</p>
                                        <p className="text-xs text-slate-500 font-medium italic">Enable fingerprint or face recognition for rapid administrative access.</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>

                            <div className="pt-4 border-t border-muted">
                                <Button variant="outline" className="border-red-200 text-red-700 bg-red-50 hover:bg-red-100 font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-md">
                                    Reset Portal Credentials
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Preferences */}
                <div className="space-y-8">
                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-primary/5 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <Bell className="h-4 w-4" /> Notification Directives
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-6 px-6 pb-10">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-slate-700 uppercase">Emergency Alerts</p>
                                        <p className="text-[10px] text-gray-400 font-medium italic">Immediate SMS for critical road failures</p>
                                    </div>
                                    <Switch checked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-slate-700 uppercase">Audit Summaries</p>
                                        <p className="text-[10px] text-gray-400 font-medium italic">Weekly executive performance reports via email</p>
                                    </div>
                                    <Switch checked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-slate-700 uppercase">Citizen Feedback</p>
                                        <p className="text-[10px] text-gray-400 font-medium italic">Push notifications for new grievance submissions</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
                        <CardHeader className="bg-primary/5 border-b pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <Globe className="h-4 w-4" /> Linguistic Intelligence
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-6 px-6 pb-10">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Primary Display Language</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="h-12 border-primary bg-primary/5 text-primary font-black uppercase text-[10px] tracking-widest rounded shadow-sm">
                                        English (INT)
                                    </Button>
                                    <Button variant="outline" className="h-12 border-gray-300 text-gray-500 font-black uppercase text-[10px] tracking-widest rounded shadow-sm">
                                        తెలుగు (AP)
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-dashed border-2 bg-muted/10">
                        <CardHeader className="pb-3 pt-4 px-6 text-center">
                            <CardTitle className="text-[9px] font-black tracking-[0.2em] text-gray-400 flex items-center justify-center gap-2 uppercase">
                                <Landmark className="h-4 w-4" /> Transparency & Privacy
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-8 px-6 text-center">
                            <p className="text-[9px] leading-relaxed text-gray-400 font-medium italic font-serif">
                                This account is strictly for official use. Activity is tracked as per the **RTGS Oversight Protocol 2024**. For policy clarifications, contact the Departmental IT Cell.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
