import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { TRACase } from '../../types/traCase';

interface ActionDropdownProps {
  case: TRACase;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  case: traCase,
  onView,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <MoreVertical className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleAction(onView)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleAction(onEdit)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleAction(onDelete)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 