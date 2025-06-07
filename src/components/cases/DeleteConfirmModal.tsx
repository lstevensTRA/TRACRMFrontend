import React from 'react';
import { Modal } from '../ui/Modal';
import { TRACase } from '../../types/traCase';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  case: TRACase;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  case: traCase,
  onConfirm,
  isDeleting
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Case" size="md">
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete case {traCase.incidentid} - {traCase.title}?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete Case'}
          </button>
        </div>
      </div>
    </Modal>
  );
}; 