import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Complaint } from '@/types';
import { StatusBadge, SeverityBadge } from '@/components/StatusBadge';
import { Eye, MapPin, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ComplaintTableProps {
    complaints: Complaint[];
    canEdit?: boolean;
}

const ComplaintTable = ({ complaints, canEdit = true }: ComplaintTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredComplaints = complaints.filter(c =>
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (complaint: Complaint) => {
        navigate(`/complaint/${complaint.id}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-6 rounded-md border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-[450px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Filter registry by ID, area, or context..."
                        className="pl-12 h-11 bg-slate-50 border-slate-200 rounded-sm text-xs font-bold italic"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="h-11 rounded-sm gap-2 font-black border-primary/20 bg-white text-primary text-[10px] uppercase tracking-widest flex-1 md:flex-initial shadow-sm px-6">
                        <Filter className="h-3.5 w-3.5" /> Registry Filters
                    </Button>
                    <Button variant="outline" className="h-11 rounded-sm gap-2 font-black border-primary/20 bg-white text-primary text-[10px] uppercase tracking-widest flex-1 md:flex-initial shadow-sm px-6">
                        <ArrowUpDown className="h-3.5 w-3.5" /> Logical Sort
                    </Button>
                </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white shadow-md overflow-hidden overflow-x-auto">
                <Table className="gov-table border-0">
                    <TableHeader className="bg-slate-50 border-b border-slate-200">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="w-[120px] text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">REGISTRY ID</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5">CONTEXT / GEOGRAPHICAL DATA</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5 w-[150px]">PRIORITY</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 p-5 w-[150px]">WORKFLOW</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700 text-right p-5">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredComplaints.length > 0 ? (
                            filteredComplaints.map((c) => (
                                <TableRow key={c.id} className="cursor-pointer hover:bg-slate-50 border-slate-100 transition-colors group" onClick={() => handleRowClick(c)}>
                                    <TableCell className="font-mono text-[11px] font-black text-primary p-5">{c.id}</TableCell>
                                    <TableCell className="p-5">
                                        <div className="space-y-1.5">
                                            <p className="text-[13px] font-black text-slate-700 uppercase italic leading-none group-hover:text-primary transition-colors">{c.title}</p>
                                            <p className="text-[10px] text-gray-400 flex items-center gap-2 font-bold uppercase tracking-tight italic">
                                                <MapPin className="h-3 w-3 text-primary" /> {c.area}, {c.district}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-5">
                                        <SeverityBadge severity={c.severity} />
                                    </TableCell>
                                    <TableCell className="p-5">
                                        <StatusBadge status={c.status} />
                                    </TableCell>
                                    <TableCell className="p-5 text-right">
                                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-sm border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest gap-2">
                                            <Eye className="h-3.5 w-3.5" /> Inspect
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="py-24 text-center text-slate-400 font-black uppercase italic tracking-widest text-xs">
                                    Zero records identified matching the requested parameters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
};

export default ComplaintTable;
