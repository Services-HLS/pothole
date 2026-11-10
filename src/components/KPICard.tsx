import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconClassName?: string;
  className?: string;
}

const KPICard = ({ title, value, change, icon: Icon, iconClassName = 'text-primary', className }: KPICardProps) => (
  <div className={`border border-border bg-white p-5 shadow-sm rounded-sm group hover:border-primary/50 transition-all ${className || ''}`}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 space-y-3">
        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none border-b border-muted pb-2 group-hover:border-primary/20 transition-all font-mono">
          {title}
        </p>
        <p className="text-2xl font-black text-primary italic tracking-tight">{value}</p>
        {change !== undefined && (
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter ${change >= 0 ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter italic">vs Preceding Session</span>
          </div>
        )}
      </div>
      <div className={`p-2 bg-slate-50 border border-slate-100 rounded-sm shadow-inner group-hover:bg-primary/5 group-hover:border-primary/10 transition-all ${iconClassName}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default KPICard;
