import React from 'react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  color?: string; // Optional color for role
  icon?: React.ReactNode;
}

const roleColorMap: Record<string, string> = {
  'Case Advocate': 'bg-blue-100 text-blue-800',
  'Offer Analyst': 'bg-green-100 text-green-800',
  'SET Officer': 'bg-purple-100 text-purple-800',
  'Tax Analyst': 'bg-yellow-100 text-yellow-800',
  'Tax Coordinator': 'bg-pink-100 text-pink-800',
  'Tax Investigator': 'bg-indigo-100 text-indigo-800',
  'Tax Preparer': 'bg-teal-100 text-teal-800',
  'Tax Pro': 'bg-orange-100 text-orange-800',
  'Tax Resolution Analyst': 'bg-red-100 text-red-800',
  'TI Agent': 'bg-gray-100 text-gray-800',
  'TI Support': 'bg-gray-200 text-gray-900',
  'Team': 'bg-cyan-100 text-cyan-800',
  'Default': 'bg-gray-100 text-gray-800',
};

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, avatarUrl, color, icon }) => {
  const colorClass = color || roleColorMap[role] || roleColorMap.Default;
  return (
    <div className={`flex items-center space-x-3 p-2 rounded shadow-sm ${colorClass}`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-8 h-8 rounded-full" />
      ) : icon ? (
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
      ) : (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-700 font-bold">
          {name[0]}
        </span>
      )}
      <div>
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs opacity-80">{role}</div>
      </div>
    </div>
  );
}; 