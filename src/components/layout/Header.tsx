import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

interface UserProfileProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
  onLogout?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, avatarUrl, onLogout }) => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />
        ) : (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold">
            {name ? name[0] : '?'}
          </span>
        )}
        <span className="hidden sm:block font-medium">{name || 'User'}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-10 p-2">
          <div className="px-2 py-1 border-b border-gray-200 dark:border-gray-700">
            <div className="font-semibold">{name || 'User'}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{email}</div>
          </div>
          <button
            className="w-full text-left px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mt-1"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          <Button
            variant="secondary"
            className="w-full mt-1"
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export const Header: React.FC<UserProfileProps> = (props) => (
  <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow">
    <div className="text-xl font-bold tracking-tight">TraCRM Frontend</div>
    <UserProfile {...props} />
  </header>
); 