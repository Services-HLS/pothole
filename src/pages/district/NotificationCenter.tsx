import React, { useState } from 'react';
import {
    Bell, Mail, Send, Users, User,
    MessageSquare, AlertTriangle, CheckCircle,
    Clock, Search, Filter, Trash2, Archive,
    Settings, Bot, ExternalLink, Smartphone, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const NotificationCenter = () => {
    const [msg, setMsg] = useState('');

    const notifications = [
        { id: 1, type: 'alert', title: 'Critical Pothole Reported', body: 'Gachibowli flyover area, immediate attention required.', time: '5m ago', read: false },
        { id: 2, type: 'update', title: 'Repair Completed', body: 'RR Unit A has marked CPL-004 as resolved. QC Audit pending.', time: '2h ago', read: true },
        { id: 3, type: 'status', title: 'Deadline Overdue', body: 'Banjara Hills repair SLA breached by 4 hours.', time: '5h ago', read: false },
        { id: 4, type: 'system', title: 'AI Model Updated', body: 'Detection precision improved by 4% for night-time imagery.', time: '1d ago', read: true },
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notification & Communication</h1>
                    <p className="text-muted-foreground mt-1">
                        Omni-channel messaging hub for citizens and field maintenance teams.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="glass-card gap-2">
                        <Settings className="h-4 w-4" /> Hub Settings
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Message Center */}
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-6">
                    <Card className="glass-card border-none shadow-premium flex-1 flex flex-col min-h-[500px]">
                        <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between py-4">
                            <div className="flex items-center gap-4">
                                <Tabs defaultValue="field" className="w-[300px]">
                                    <TabsList className="bg-background/50 border border-white/5 p-1 rounded-full h-10 w-full">
                                        <TabsTrigger value="field" className="rounded-full flex-1 gap-2 text-xs data-[state=active]:shadow-lg"><Users className="h-3 w-3" /> Field Teams</TabsTrigger>
                                        <TabsTrigger value="citizen" className="rounded-full flex-1 gap-2 text-xs data-[state=active]:shadow-lg"><User className="h-3 w-3" /> Citizens</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 gap-1 text-[10px] animate-pulse">
                                <Bot className="h-3 w-3" /> AI_ASSIST_ACTIVE
                            </Badge>
                        </CardHeader>

                        <CardContent className="flex-1 p-0 flex">
                            {/* Conversation List */}
                            <div className="w-72 border-r border-white/5 flex flex-col">
                                <div className="p-4 border-b border-white/5">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search threads..." className="pl-9 h-8 bg-muted/20 border-none rounded-md text-xs" />
                                    </div>
                                </div>
                                <ScrollArea className="flex-1">
                                    <div className="p-2 space-y-1">
                                        {[
                                            { name: 'RR Unit - Zone A', lastMsg: 'Heading to site CPL-005 now.', time: '10:45 AM', active: true, online: true },
                                            { name: 'Emergency Squad', lastMsg: 'Barricades deployed at Gachibowli.', time: '09:20 AM', active: false, online: true },
                                            { name: 'Urban Road Div', lastMsg: 'Need more mix material for...', time: 'Yesterday', active: false, online: false },
                                            { name: 'Highway Support', lastMsg: 'Report received. Logged.', time: 'Yesterday', active: false, online: true },
                                        ].map((chat, i) => (
                                            <div
                                                key={i}
                                                className={`p-3 rounded-lg cursor-pointer transition-all ${chat.active ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/20 border border-transparent'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="flex items-center gap-2">
                                                        {chat.online && <div className="h-2 w-2 rounded-full bg-success ring-4 ring-success/10 shadow-[0_0_10px_#10b981]" />}
                                                        <span className="text-[11px] font-bold">{chat.name}</span>
                                                    </div>
                                                    <span className="text-[9px] text-muted-foreground">{chat.time}</span>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground truncate opacity-70 italic">"{chat.lastMsg}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 flex flex-col bg-muted/5">
                                <div className="flex-1 p-6 flex flex-col-reverse gap-4 overflow-y-auto">
                                    {/* Mock Messages */}
                                    <div className="flex justify-start">
                                        <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none max-w-sm border border-white/5">
                                            <p className="text-xs">RR Unit - Zone A here. We've assessed the pothole at Banjara Hills. It's larger than the report indicated. Suggest upgrading to High Priority.</p>
                                            <span className="text-[9px] text-muted-foreground mt-2 block opacity-60">10:45 AM • Received</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-primary/20 px-4 py-3 rounded-2xl rounded-tr-none max-w-sm border border-primary/20 shadow-lg shadow-primary/5">
                                            <p className="text-xs text-primary-foreground font-medium">Understood. I've updated the severity to HIGH in the system. Proceed with immediate base preparation. Budget is increased by ₹5000.</p>
                                            <span className="text-[9px] text-primary/60 mt-2 block">10:48 AM • Sent</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-white/5 bg-background/30 backdrop-blur-xl">
                                    <div className="flex gap-2 items-end">
                                        <Textarea
                                            value={msg}
                                            onChange={e => setMsg(e.target.value)}
                                            placeholder="Type an official directive..."
                                            className="min-h-[44px] h-[44px] bg-background/50 border-white/10 resize-none text-xs rounded-xl focus:border-primary/50 transition-all"
                                        />
                                        <Button className="h-11 w-11 rounded-full p-0 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex gap-4 mt-3 px-1">
                                        <button className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1"><Smartphone className="h-3 w-3" /> Push App Notif</button>
                                        <button className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1"><Mail className="h-3 w-3" /> Send Official Email</button>
                                        <button className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Broadcast Alert</button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Notifications Feed */}
                <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-6">
                    <Card className="glass-card border-none shadow-premium flex-1">
                        <CardHeader className="border-b pb-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-primary" /> Active Alerts
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md"><Filter className="h-3 w-3" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md"><Trash2 className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[400px]">
                                <div className="divide-y divide-white/5">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className={`p-4 flex gap-4 transition-all hover:bg-white/5 relative group ${!notif.read ? 'bg-primary/5' : ''}`}>
                                            {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_10px_#3b82f6]" />}
                                            <div className={`mt-1 p-2 rounded-lg shrink-0 ${notif.type === 'alert' ? 'bg-destructive/10 text-destructive' :
                                                notif.type === 'update' ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'
                                                }`}>
                                                {notif.type === 'alert' ? <AlertTriangle className="h-4 w-4" /> :
                                                    notif.type === 'update' ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <p className="text-xs font-bold leading-tight">{notif.title}</p>
                                                    <span className="text-[9px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground leading-relaxed">{notif.body}</p>
                                                <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="text-[9px] font-bold text-primary flex items-center gap-1 uppercase tracking-widest"><ExternalLink className="h-3 w-3" /> View Action</button>
                                                    <button className="text-[9px] font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-widest"><Archive className="h-3 w-3" /> Archive</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter className="bg-muted/20 py-4 justify-center border-t border-white/5">
                            <Button variant="ghost" size="sm" className="text-xs uppercase font-black text-muted-foreground hover:bg-transparent hover:text-primary">
                                View All Activity logs <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="glass-card border-none shadow-premium bg-gradient-to-br from-primary/10 to-secondary/10 border-l-4 border-l-primary">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-full bg-primary/20 text-primary">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-black uppercase tracking-widest">AI Communication Co-pilot</CardTitle>
                                    <p className="text-[10px] text-muted-foreground opacity-70">Automated insight delivery active</p>
                                </div>
                            </div>
                            <div className="p-3 bg-background/50 border border-white/5 rounded-xl space-y-2">
                                <p className="text-[10px] font-bold text-primary">Proactive Suggestion:</p>
                                <p className="text-[10px] leading-relaxed italic">
                                    "Based on the repair progress of Unit A, I suggest sending an automated status update to citizen <span className="font-bold">Rajesh Kumar</span> for CPL-001. Repair is 80% complete."
                                </p>
                                <Button size="sm" variant="outline" className="w-full text-[10px] h-8 mt-2 border-primary/20 hover:bg-primary/5 text-primary font-bold">
                                    Approve & Send Status Update
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;
