import React, { useState } from 'react';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { ComplaintStatus, Complaint } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle2, XCircle, AlertCircle, Eye,
  MapPin, Clock, Info, Play, ExternalLink,
  ChevronRight, ChevronLeft, ShieldCheck, Download, Landmark, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import ComplaintImage from '@/components/ComplaintImage';

const DistrictVerify = () => {
  const { complaints, updateComplaintStatus } = useComplaints();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notes, setNotes] = useState('');

  const verificationQueue = complaints.filter(c => c.status === 'Submitted' || c.status === 'Under Verification');
  const currentComplaint = verificationQueue[currentIndex];

  const handleAction = (status: ComplaintStatus) => {
    if (!currentComplaint) return;
    updateComplaintStatus(currentComplaint.id, status, notes);
    toast({
      title: `Verification ${status}`,
      description: `Complaint ${currentComplaint.id} has been processed.`
    });
    setNotes('');
    if (currentIndex < verificationQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (verificationQueue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-md text-center max-w-4xl mx-auto my-20">
        <div className="p-6 rounded-full bg-white border border-gray-100 shadow-sm mb-6">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-black uppercase italic text-primary tracking-tight">Verification Ledger Empty</h2>
        <p className="text-gray-400 mt-4 text-sm font-medium italic max-w-md">All citizen reports for your jurisdiction have been successfully audited and verified. Operational integrity maintained.</p>
        <Button className="mt-8 font-black uppercase text-[10px] tracking-widest px-8" variant="outline" onClick={() => window.location.reload()}>Refresh Database</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase italic">Complaint Verification Hub</h1>
          <p className="text-muted-foreground text-sm mt-1 font-medium italic">
            Visual Evidence Audit & AI Validation Protocol ({verificationQueue.length} Pending Records)
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-md border shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="h-10 w-10 text-primary hover:bg-primary/5"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary px-2">
            Record {currentIndex + 1} / {verificationQueue.length}
          </span>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentIndex(prev => Math.min(verificationQueue.length - 1, prev + 1))}
            disabled={currentIndex === verificationQueue.length - 1}
            className="h-10 w-10 text-primary hover:bg-primary/5"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual Evidence */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-muted/30 border-b pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-3">
                  <Eye className="h-5 w-5" /> Primary Visual Evidence Registry
                </CardTitle>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-primary text-white text-[9px] font-black rounded-sm uppercase italic">
                    AI Confidence: {currentComplaint.aiConfidence}%
                  </div>
                  <SeverityBadge severity={currentComplaint.severity} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="citizen" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-slate-50 p-0 h-14">
                  <TabsTrigger value="citizen" className="rounded-none px-8 h-full text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary transition-all">
                    Citizen Submission
                  </TabsTrigger>
                  <TabsTrigger value="dashcam" className="rounded-none px-8 h-full text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary transition-all">
                    APSRTC Telepercept
                  </TabsTrigger>
                  <TabsTrigger value="cctv" className="rounded-none px-8 h-full text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary transition-all">
                    Surveillance Feed
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="citizen" className="p-0 m-0 relative">
                  <div className="aspect-video relative bg-black group border-b">
                    <ComplaintImage src={currentComplaint.imageUrl} alt={currentComplaint.title} className="w-full h-full object-cover grayscale opacity-90" />

                    {/* Mock AI Bounding Box */}
                    <div className="absolute top-[40%] left-[30%] w-[160px] h-[100px] border-2 border-red-500 bg-red-500/10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                      <span className="absolute -top-6 left-0 bg-red-600 text-white text-[9px] px-2 py-0.5 font-black uppercase tracking-widest italic rounded-sm">
                        POTHOLE_DEFECT_DETECTED ({currentComplaint.aiConfidence}%)
                      </span>
                    </div>

                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="bg-white/90 shadow-xl border border-white h-10 px-6 font-black uppercase text-[10px] tracking-widest rounded-sm">
                        <Download className="h-4 w-4 mr-2" /> Download Evidence
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dashcam" className="p-0 m-0">
                  <div className="aspect-video relative bg-slate-900 border-b flex flex-col items-center justify-center overflow-hidden">
                    {currentComplaint.historicalFootage && currentComplaint.historicalFootage[0] ? (
                      <div className="relative w-full h-full">
                        <img src={currentComplaint.historicalFootage[0].url} className="w-full h-full object-cover grayscale opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Button className="rounded-full w-20 h-20 bg-primary/90 hover:bg-primary border-4 border-white/20 shadow-2xl">
                            <Play className="h-10 w-10 fill-current text-white ml-1" />
                          </Button>
                        </div>
                        <div className="absolute top-6 left-6 p-4 bg-black/60 rounded text-white border border-white/10">
                          <p className="text-[10px] font-black uppercase tracking-widest">APSRTC BUS UNIT #AP-39-Z-108</p>
                          <p className="text-[8px] opacity-60 font-medium italic mt-1">LOGGED: 2026-02-09 14:32:11 | DISTRICT SCALE</p>
                        </div>
                        <div className="absolute bottom-6 right-6 p-3 bg-black/60 rounded text-[9px] text-white/80 font-mono tracking-tighter italic border border-white/5">
                          17.4156 N, 78.4347 E • VECTOR_VELOC: 34KM/H
                        </div>
                      </div>
                    ) : (
                      <div className="p-10 text-center">
                        <Play className="h-16 w-16 text-slate-700 mb-6 mx-auto opacity-40" />
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Historical Telepercept Null</p>
                        <p className="text-slate-600 text-xs italic mt-2 max-w-sm mx-auto">Dashcam archive metadata not indexed for this specific spatial coordinate.</p>
                        <Button variant="link" className="text-primary text-[10px] font-black uppercase tracking-widest mt-6 underline">Request Deep Archive Search</Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="cctv" className="p-0 m-0">
                  <div className="aspect-video relative bg-slate-950 border-b flex items-center justify-center">
                    {currentComplaint.historicalFootage && currentComplaint.historicalFootage[1] ? (
                      <div className="relative w-full h-full">
                        <img src={currentComplaint.historicalFootage[1].url} className="w-full h-full object-cover grayscale opacity-70" />
                        <div className="absolute top-4 right-4 flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded-sm text-[9px] font-black text-white italic tracking-widest animate-pulse border border-red-500 shadow-lg shadow-red-900/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE GRID
                          </div>
                          <div className="bg-black/60 px-3 py-1 rounded-sm text-[9px] font-black text-white tracking-widest uppercase border border-white/10">
                            CAM_402_ZONE_SEC
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black gap-3 font-black uppercase text-[10px] tracking-widest rounded-sm px-8 h-12">
                            <ExternalLink className="h-4 w-4" /> Open Control Room GUI
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-10 text-center text-slate-700">
                        <div className="p-6 rounded-full border border-slate-800 bg-slate-900 inline-block mb-6 shadow-inner">
                          <Eye className="h-10 w-10 opacity-20" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2 italic">Null Coverage Area</p>
                        <p className="text-xs max-w-xs mx-auto text-slate-600 italic">Spatial coordinates outside the designated surveillance perimeter grid.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/30 flex justify-between items-center py-4 px-8">
              <div className="flex gap-6 text-[10px] font-black uppercase tracking-tight text-gray-400">
                <span className="flex items-center gap-2 italic"><MapPin className="h-3.5 w-3.5" /> GPS: {currentComplaint.latitude}, {currentComplaint.longitude}</span>
                <span className="flex items-center gap-2 italic"><Clock className="h-3.5 w-3.5" /> Log-Time: {new Date(currentComplaint.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-sm text-[9px] font-black uppercase tracking-widest italic">
                <ShieldCheck className="h-3.5 w-3.5" /> Integrity_Verified
              </div>
            </CardFooter>
          </Card>

          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-3">
                <FileText className="h-4 w-4" /> Formal Officer Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 px-8 pb-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block">Mandatory Verification Remarks / Log Entries</label>
                <Textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Input detailed justification for compliance audit..."
                  className="min-h-[140px] border-gray-300 rounded shadow-sm text-sm font-medium italic focus:ring-primary focus:border-primary"
                />
                <div className="p-4 bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-500 font-bold italic leading-relaxed uppercase tracking-tighter mt-4 flex items-center gap-3">
                  <Landmark className="h-5 w-5 opacity-30 flex-shrink-0" />
                  All remarks logged are binding legal entries for DPDP Act auditing and R&B Departmental Accountability Modules.
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col md:flex-row justify-end gap-4 p-8 border-t bg-muted/20">
              <Button
                variant="outline"
                onClick={() => handleAction('Rejected')}
                className="h-14 px-8 font-black uppercase text-[10px] tracking-[0.2em] border-red-200 text-red-700 bg-white hover:bg-red-50 flex-1 md:flex-none order-2 md:order-1"
              >
                <XCircle className="h-5 w-5 mr-3" /> Invalidate Defect
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAction('Under Verification')}
                className="h-14 px-8 font-black uppercase text-[10px] tracking-[0.2em] border-amber-200 text-amber-700 bg-white hover:bg-amber-50 flex-1 md:flex-none order-3 md:order-2"
              >
                <AlertCircle className="h-5 w-5 mr-3" /> Flag for Clarification
              </Button>
              <Button
                onClick={() => handleAction('Approved')}
                className="h-14 px-10 font-black uppercase text-[10px] tracking-[0.2em] bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 flex-1 md:flex-none order-1 md:order-3"
              >
                <CheckCircle2 className="h-5 w-5 mr-3" /> Approve Audit & Next record
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column: Metadata & Details */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border border-border shadow-sm rounded-md overflow-hidden bg-white">
            <CardHeader className="bg-muted/30 border-b pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-3">
                <FileText className="h-4 w-4" /> Comprehensive Metadata Ledger
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-1">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 group">
                  <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-primary transition-colors italic">Case ID Registry</span>
                  <span className="text-xs font-black font-mono text-primary bg-primary/5 px-2 py-0.5 rounded tracking-tighter">{currentComplaint.id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 group">
                  <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-primary transition-colors italic">Reporting Entity</span>
                  <span className="text-xs font-black uppercase text-slate-700 italic">{currentComplaint.citizenName}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 group">
                  <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-primary transition-colors italic">Defect Typology</span>
                  <div className="text-right">
                    <span className="text-xs font-black uppercase text-amber-600 italic block">{currentComplaint.aiClassification}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 group">
                  <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-primary transition-colors italic">Spatial Context</span>
                  <div className="text-right max-w-[200px]">
                    <span className="text-xs font-black uppercase text-slate-700 text-right leading-tight block">{currentComplaint.area}</span>
                    <span className="text-[9px] font-bold text-gray-400 text-right block italic mt-1">{currentComplaint.landmark}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 py-4">
                  <span className="text-[10px] font-black uppercase text-gray-400 italic">Algorithmic Correlation Factor</span>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black italic">
                      <span className="text-primary">{currentComplaint.aiConfidence}% Probability</span>
                      <span className="text-gray-400 uppercase tracking-tighter">High Confidence</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-gray-100">
                      <div className="h-full bg-primary" style={{ width: `${currentComplaint.aiConfidence}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded border border-primary/10 bg-primary/5 space-y-3">
                <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-primary italic underline decoration-primary/20 decoration-2 underline-offset-4">
                  <Info className="h-3.5 w-3.5" /> Citizen Narrative
                </div>
                <p className="text-[11px] text-slate-600 font-bold italic leading-relaxed text-center px-2">
                  "{currentComplaint.description}"
                </p>
              </div>

              <Card className="border border-gray-100 bg-slate-50/50 shadow-inner">
                <CardHeader className="p-5 pb-0">
                  <CardTitle className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 italic">
                    <MapPin className="h-3 w-3" /> Geospatial Coordinates Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <table className="w-full text-[10px] font-bold uppercase tracking-tighter">
                    <tbody>
                      <tr className="border-b border-gray-200/50">
                        <td className="py-2 text-gray-400">Lat:</td>
                        <td className="py-2 text-right font-mono text-slate-700">{currentComplaint.latitude}</td>
                      </tr>
                      <tr className="border-b border-gray-200/50">
                        <td className="py-2 text-gray-400">Long:</td>
                        <td className="py-2 text-right font-mono text-slate-700">{currentComplaint.longitude}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-400">Dist:</td>
                        <td className="py-2 text-right text-primary font-black">{currentComplaint.district}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="h-40 w-full mt-4 rounded border border-gray-200 overflow-hidden relative grayscale opacity-60 hover:grayscale-0 transition-all cursor-crosshair">
                    <img src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400`} alt="GIS Map" className="w-full h-full object-cover" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="h-8 w-8 text-red-600 fill-white" />
                      <div className="h-10 w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-red-500 animate-ping" />
                    </div>
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-center text-gray-400 mt-3 italic">R&B GIS-System Layer v2.4 (Andhra Pradesh)</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DistrictVerify;
