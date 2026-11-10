import React from 'react';
import { ComplaintStatus, SeverityLevel } from '@/types';

export const StatusBadge = ({ status }: { status: ComplaintStatus }) => {
  const classMap: Record<ComplaintStatus, string> = {
    'Submitted': 'status-pending',
    'Under Verification': 'status-pending',
    'Approved': 'status-progress',
    'Assigned': 'status-progress',
    'In Progress': 'status-progress',
    'Under Inspection': 'status-progress',
    'Completed': 'status-resolved',
    'Resolved': 'status-resolved',
    'Rejected': 'status-rejected',
    'Reopened': 'status-pending',
  };

  return (
    <span className={`status-badge ${classMap[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {status}
    </span>
  );
};

export const SeverityBadge = ({ severity }: { severity: SeverityLevel }) => {
  const classMap: Record<SeverityLevel, string> = {
    'Low': 'bg-green-100 text-green-800 border-green-200',
    'Medium': 'bg-orange-100 text-orange-800 border-orange-200',
    'High': 'bg-red-100 text-red-800 border-red-200',
    'Critical': 'bg-red-200 text-red-900 border-red-300 font-black',
  };

  return (
    <span className={`status-badge ${classMap[severity] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {severity}
    </span>
  );
};
