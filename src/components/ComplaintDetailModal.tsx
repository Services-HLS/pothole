import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Complaint, ComplaintStatus, SeverityLevel } from '@/types';
import {
    MapPin, Clock, User, Shield,
    Camera, Activity, Info, Calendar,
    CheckCircle2, AlertTriangle, Image as ImageIcon
} from 'lucide-react';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import { useComplaints } from '@/contexts/ComplaintsContext';
import { useToast } from '@/hooks/use-toast';

interface ComplaintDetailModalProps {
    complaint: Complaint | null;
    isOpen: boolean;
    onClose: () => void;
    canEdit?: boolean;
}

const ComplaintDetailModal = ({ complaint, isOpen, onClose, canEdit = true }: ComplaintDetailModalProps) => {
    const { updateComplaintStatus } = useComplaints();
    const { toast } = useToast();
    const [status, setStatus] = useState<ComplaintStatus>(complaint?.status || 'Submitted');
    const [remarks, setRemarks] = useState(complaint?.districtOfficerNotes || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        if (complaint) {
            setStatus(complaint.status);
            setRemarks(complaint.districtOfficerNotes || '');
        }
    }, [complaint]);

    const handleUpdate = async () => {
        if (!complaint) return;
        setIsSubmitting(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        updateComplaintStatus(complaint.id, status, remarks);

        toast({
            title: "Complaint Updated",
            description: `Ticket ${complaint.id} has been moved to ${status}.`,
        });

        setIsSubmitting(false);
        onClose();
    };

    if (!complaint) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-none shadow-2xl p-0">
                <DialogHeader className="p-6 bg-primary/5 border-b border-muted/20 sticky top-0 z-10 backdrop-blur-md">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-black text-muted-foreground">{complaint.id}</span>
                                <StatusBadge status={complaint.status} />
                            </div>
                            <DialogTitle className="text-xl font-bold tracking-tight">{complaint.title}</DialogTitle>
                            <DialogDescription className="flex items-center gap-2 text-xs">
                                <MapPin className="h-3 w-3" /> {complaint.area}, {complaint.landmark}, {complaint.district}
                            </DialogDescription>
                        </div>
                        <SeverityBadge severity={complaint.severity} />
                    </div>
                </DialogHeader>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Visuals & Location */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <ImageIcon className="h-3 w-3" /> Citizen Evidence
                            </Label>
                            <div className="aspect-video rounded-2xl overflow-hidden border border-muted/20 bg-muted/10 relative group">
                                <img
                                    src={complaint.imageUrl || 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&q=80&w=800'}
                                    alt="Complaint"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white">View Full Screen</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-muted/5 border border-muted/10 space-y-1">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">AI Confidence</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">{complaint.aiConfidence}%</span>
                                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${complaint.aiConfidence}%` }} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/5 border border-muted/10 space-y-1">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Classification</p>
                                <p className="text-sm font-bold text-primary">{complaint.aiClassification || 'Pothole'}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Info className="h-3 w-3" /> Description
                            </Label>
                            <p className="text-sm text-foreground/80 leading-relaxed p-4 rounded-2xl bg-muted/5 border border-muted/10 italic">
                                "{complaint.description}"
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-3 w-3" /> GPS Coordinates
                            </Label>
                            <div className="p-3 rounded-xl bg-muted/5 border border-muted/10 font-mono text-xs flex justify-between">
                                <span>Lat: {complaint.latitude}</span>
                                <span>Long: {complaint.longitude}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Processing & Actions */}
                    <div className="space-y-6">
                        {canEdit ? (
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary">Process Status</Label>
                                        <Select value={status} onValueChange={(val) => setStatus(val as ComplaintStatus)}>
                                            <SelectTrigger className="bg-white border-primary/20 h-10 rounded-xl font-bold">
                                                <SelectValue placeholder="Update status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Submitted">Submitted</SelectItem>
                                                <SelectItem value="Under Verification">Under Verification</SelectItem>
                                                <SelectItem value="Assigned">Assigned & Dispatched</SelectItem>
                                                <SelectItem value="In Progress">Repairs In Progress</SelectItem>
                                                <SelectItem value="Under Inspection">Post-Repair Audit</SelectItem>
                                                <SelectItem value="Resolved">Resolved & Closed</SelectItem>
                                                <SelectItem value="Rejected">Void/Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary">Officer Remarks</Label>
                                        <Textarea
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            placeholder="Add assessment notes, team assignment details, or closure remarks..."
                                            className="min-h-[100px] border-primary/20 bg-white rounded-xl resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary">Upload Verification Image</Label>
                                        <div className="h-20 border-2 border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-primary/5 transition-colors">
                                            <Camera className="h-5 w-5 text-primary/50" />
                                            <span className="text-[10px] font-bold text-muted-foreground">CLICK TO ATTACH SITE PHOTO</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Team Assigned</p>
                                        <Badge variant="outline" className="w-full justify-center h-8 font-bold border-muted/30">
                                            {complaint.assignedTeam || 'PENDING ASSIGNMENT'}
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Est. Budget</p>
                                        <Badge variant="outline" className="w-full justify-center h-8 font-bold border-muted/30">
                                            {complaint.estimatedCost ? `₹${complaint.estimatedCost.toLocaleString()}` : 'NOT QUOTED'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-muted/5 border border-muted/10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground">Officer Assessment</p>
                                            <p className="text-sm font-bold">{complaint.districtOfficerNotes || 'No notes provided yet.'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                            <Activity className="h-5 w-5 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground">Fulfillment Team</p>
                                            <p className="text-sm font-bold">{complaint.assignedTeam || 'Awaiting Team Dispatch'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <Clock className="h-3 w-3" /> Audit Timeline
                            </Label>
                            <div className="space-y-3 relative before:absolute before:inset-0 before:left-[7px] before:w-px before:bg-muted/30">
                                <div className="flex gap-3 relative z-10">
                                    <div className="h-3.5 w-3.5 rounded-full bg-success border-2 border-white mt-1 shadow-sm" />
                                    <div>
                                        <p className="text-xs font-bold">Reported by {complaint.citizenName}</p>
                                        <p className="text-[10px] text-muted-foreground">{new Date(complaint.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                {complaint.updatedAt !== complaint.createdAt && (
                                    <div className="flex gap-3 relative z-10">
                                        <div className="h-3.5 w-3.5 rounded-full bg-primary border-2 border-white mt-1 shadow-sm" />
                                        <div>
                                            <p className="text-xs font-bold">Last Status Update</p>
                                            <p className="text-[10px] text-muted-foreground">{new Date(complaint.updatedAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t border-muted/20 bg-muted/5 flex justify-end gap-3 sticky bottom-0 z-10 backdrop-blur-md">
                    <Button variant="outline" onClick={onClose} className="rounded-xl font-bold h-11 px-8">Close Overview</Button>
                    {canEdit && (
                        <Button
                            onClick={handleUpdate}
                            disabled={isSubmitting}
                            className="rounded-xl font-black uppercase text-xs tracking-widest h-11 px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20"
                        >
                            {isSubmitting ? 'Syncing...' : 'Dispatch Updates'}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ComplaintDetailModal;
