import React from 'react';

interface TeamMemberAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TeamMemberAvatar: React.FC<TeamMemberAvatarProps> = ({ name, size = 'sm' }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-500 flex items-center justify-center text-white ring-2 ring-white dark:ring-gray-800`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}; 