import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SeverityLevel } from '@/types';
import {
  CheckCircle, Map as MapIcon, Navigation, Camera,
  Zap, Shield, Activity, FileText, Landmark, AlertTriangle, Info, Video, ShieldCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NewComplaint = () => {
  const { user } = useAuth();
  const { addComplaint } = useComplaints();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState('/placeholder.svg');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ severity: SeverityLevel; conf: number } | null>(null);
  const [form, setForm] = useState({
    title: '', description: '', area: '', landmark: '',
    district: 'Tirupati', mandal: '', village: '',
    latitude: '13.6288', longitude: '79.4125', severity: 'Medium' as SeverityLevel,
  });

  if (!user) return null;

  const reverseGeocode = (lat: string, lng: string) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (latitude > 13.5 && latitude < 13.7 && longitude > 79.3 && longitude < 79.5) {
      return { district: 'Tirupati', mandal: 'Tirupati Urban', area: 'SV University Zone' };
    }
    if (latitude > 13.1 && latitude < 13.3 && longitude > 79.0 && longitude < 79.2) {
      return { district: 'Chittoor', mandal: 'Chittoor Urban', area: 'District Headquarter' };
    }
    return null;
  };

  const simulateGPS = () => {
    toast({ title: 'GPS Syncing...', description: 'Fetching high-precision coordinates from your device.' });
    setTimeout(() => {
      // Locking specific coordinates for Tirupati for demo purposes
      const lat = '13.6288';
      const lng = '79.4125';
      const geo = reverseGeocode(lat, lng);

      setForm(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        ...(geo ? { district: geo.district, mandal: geo.mandal, area: geo.area } : {})
      }));
      toast({ title: 'Location Verified', description: `Geo-registry matched: ${geo?.district || 'Unknown'} Division.` });
    }, 1200);
  };

  const simulateAI = () => {
    if (imageUrl === '/placeholder.svg') {
      toast({ title: 'Evidence Required', description: 'Please upload a photo first.', variant: 'destructive' });
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      const conf = 75 + Math.floor(Math.random() * 20);
      setAiResult({ severity: 'High', conf });
      setForm(prev => ({ ...prev, severity: 'High' }));
      setAnalyzing(false);
      toast({ title: 'AI Analysis Complete', description: `Detected Pothole with ${conf}% confidence.` });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl === '/placeholder.svg') {
      toast({ title: 'Upload Image', description: 'Evidence is mandatory for R&B complaints.', variant: 'destructive' });
      return;
    }
    addComplaint({
      citizenId: user.id,
      citizenName: user.name,
      title: form.title,
      description: form.description,
      area: form.area,
      mandal: form.mandal,
      ward: form.village,
      landmark: form.landmark,
      district: form.district,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      severity: aiResult?.severity || form.severity,
      status: 'Submitted',
      imageUrl,
      source: 'Citizen',
      aiConfidence: aiResult?.conf || 82,
      aiClassification: 'Pothole Detected',
    });
    toast({ title: 'Ticket Generated', description: 'Your R&B grievance has been pushed to the District Node.' });
    navigate('/citizen/complaints');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" /> Grievance Registration
          </h1>
          <p className="text-muted-foreground text-sm mt-1 font-medium italic">Public Road Infrastructure Management & Maintenance Portal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 border-b pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" /> Incident Classification
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Grievance Summary / Title</Label>
                <Input id="title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., Structural crater on NH-16 service road" className="h-12 border-gray-300 rounded focus:ring-primary shadow-sm" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Detailed Observation & Safety Impact</Label>
                <Textarea id="desc" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the structural defect and its immediate risk to commuters..." rows={5} className="border-gray-300 rounded focus:ring-primary shadow-sm" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 border-b pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <MapIcon className="h-4 w-4" /> Geolocation Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Administrative District (Assigned Division)</Label>
                  <Select value={form.district} onValueChange={v => setForm({ ...form, district: v })}>
                    <SelectTrigger className="h-12 border-gray-300 rounded shadow-sm font-bold uppercase text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chittoor">Chittoor Division</SelectItem>
                      <SelectItem value="Tirupati">Tirupati Division</SelectItem>
                      <SelectItem value="Nellore">Nellore Division</SelectItem>
                      <SelectItem value="Guntur">Guntur Division</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Revenue Mandal / Town</Label>
                  <Input required value={form.mandal} onChange={e => setForm({ ...form, mandal: e.target.value })} placeholder="e.g. Chittoor Urban" className="h-12 border-gray-300 rounded shadow-sm text-xs font-bold uppercase" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Village / Ward Number</Label>
                  <Input required value={form.village} onChange={e => setForm({ ...form, village: e.target.value })} placeholder="e.g. Ward-04" className="h-12 border-gray-300 rounded shadow-sm text-xs font-bold uppercase" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nearby Landmark / Location Ref</Label>
                  <Input required value={form.landmark} onChange={e => setForm({ ...form, landmark: e.target.value })} placeholder="e.g., Opp. Municipal Hospital" className="h-12 border-gray-300 rounded shadow-sm text-xs font-bold uppercase" />
                </div>
              </div>

              <div className="p-5 rounded border border-primary/10 bg-primary/5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">GPS Synchronization</span>
                  </div>
                  <Button type="button" size="sm" variant="outline" onClick={simulateGPS} className="text-[10px] font-black uppercase h-8 px-4 bg-white border-primary/20 text-primary hover:bg-primary/5">
                    Capture Current GPS
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground">Latitude Coordinates</Label>
                    <Input type="number" step="any" value={form.latitude} readOnly className="bg-white border-gray-200 font-mono text-[10px] h-10 rounded shadow-inner" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] uppercase font-black text-muted-foreground">Longitude Coordinates</Label>
                    <Input type="number" step="any" value={form.longitude} readOnly className="bg-white border-gray-200 font-mono text-[10px] h-10 rounded shadow-inner" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-primary pb-10 text-white relative">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded border border-white/20">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold uppercase tracking-tight">Verified Evidence</CardTitle>
                    <CardDescription className="text-white/60 text-xs font-medium">Digital proof is required for regulatory audit</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <ImageUpload value={imageUrl} onChange={setImageUrl} label="" />

              <div className="mt-8 p-6 rounded border border-blue-100 bg-blue-50/50 relative overflow-hidden">
                {analyzing ? (
                  <div className="flex flex-col items-center justify-center py-10 bg-slate-50 border border-slate-200 rounded-sm">
                    <div className="relative mb-6">
                      <Activity className="h-12 w-12 text-primary animate-pulse" />
                      <Video className="h-6 w-6 text-primary absolute -top-1 -right-1 animate-bounce" />
                    </div>
                    <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Executing Visual Telemetry...</p>
                    <div className="mt-4 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary animate-bounce delay-75 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-primary animate-bounce delay-150 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-primary animate-bounce delay-300 rounded-full" />
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-4">Analyzing pixel density for structural fatigue</p>
                  </div>
                ) : aiResult ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-blue-100 pb-3">
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
                        <Zap className="h-3 w-3" /> Visual AI Diagnostic Result
                      </span>
                      <Badge className="bg-blue-600 text-white border-none text-[9px] font-bold px-3 py-0.5 rounded-sm uppercase tracking-widest italic">Validated</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded border border-blue-100 shadow-sm text-center">
                        <p className="text-[9px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Defect Profile</p>
                        <p className="text-xs font-black text-red-700 uppercase italic">{aiResult.severity} RISK</p>
                      </div>
                      <div className="p-4 bg-white rounded border border-blue-100 shadow-sm text-center">
                        <p className="text-[9px] font-black text-muted-foreground uppercase mb-1 tracking-widest">Confidence Index</p>
                        <p className="text-xs font-black text-green-700 font-mono">{aiResult.conf}.0%</p>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50/50 rounded border border-blue-100">
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Audit Assurance
                      </p>
                      <p className="text-[10px] text-gray-500 italic leading-relaxed font-medium">
                        Diagnostic Engine 4.0 has confirmed structural anomaly. Evidence locked to registry.
                      </p>
                    </div>
                  </div>
                ) : imageUrl !== '/placeholder.svg' ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 italic">
                        <Info className="h-3 w-3" /> Initial Visual Metadata
                      </span>
                      <Badge variant="outline" className="text-slate-400 border-none text-[9px] font-bold uppercase tracking-widest">Pre-Analysis</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded border border-slate-100">
                        <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Source Resolution</p>
                        <p className="text-[10px] font-bold text-slate-700">4032 x 3024 (12MP)</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded border border-slate-100">
                        <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Optical Device</p>
                        <p className="text-[10px] font-bold text-slate-700 uppercase italic">Mobile Cluster A1</p>
                      </div>
                    </div>
                    <div className="bg-primary/5 p-4 rounded border border-primary/10">
                      <p className="text-[10px] text-primary font-bold italic text-center mb-4 uppercase">Optical Input Detected. Diagnostic Path Ready.</p>
                      <Button
                        type="button"
                        onClick={simulateAI}
                        className="bg-primary hover:bg-primary/90 text-white w-full rounded-md gap-3 h-12 shadow-lg shadow-primary/20 transition-all font-black uppercase tracking-widest text-[11px]"
                      >
                        <Zap className="h-4 w-4" /> Initialize Analysis Engine
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="p-6 border border-dashed border-slate-200 rounded mb-6 opacity-40 bg-slate-50">
                      <Camera className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Diagnostic Standby</p>
                      <p className="text-[8px] font-medium text-slate-400 uppercase mt-1">Awaiting Visual Infrastructure Feed</p>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-2 leading-relaxed font-bold uppercase italic tracking-tighter">Automatic Metadata Extraction Pending</p>
                    <p className="text-[9px] text-gray-400 mb-6 font-medium italic">Upload evidence to begin digital audit process.</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t flex justify-between gap-4 py-8 px-6">
              <Button type="button" variant="outline" onClick={() => navigate('/citizen')} className="rounded-md px-8 h-12 font-black uppercase text-[10px] tracking-widest bg-white border-gray-300 shadow-sm">Cancel</Button>
              <Button type="button" onClick={handleSubmit} className="bg-primary hover:bg-primary/90 rounded-md px-10 h-12 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 gap-2 flex-1">
                <CheckCircle className="h-4 w-4" /> Finalize & Submit Ticket
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-dashed bg-gray-50/50">
            <CardHeader className="pb-3 pt-4">
              <CardTitle className="text-[9px] font-black tracking-[0.2em] text-gray-400 flex items-center gap-2 uppercase">
                <Shield className="h-4 w-4" /> Legal & Governance Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-[10px] leading-relaxed text-gray-400 font-medium italic">
                Data processed under **Section 43A of the IT Act**. Personal identifiers are redacted for field operations. Intentional submission of falsified grievances is a punishable offense under state infrastructure regulations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewComplaint;
