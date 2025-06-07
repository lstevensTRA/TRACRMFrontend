import React from 'react';
import { Modal } from '../ui/Modal';
import { TRACase } from '../../types/traCase';

interface ViewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  case: TRACase;
}

export const ViewCaseModal: React.FC<ViewCaseModalProps> = ({ isOpen, onClose, case: traCase }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Case ${traCase.incidentid}`} size="xl">
      <div className="space-y-6">
        {/* Case Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Case Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{traCase.title}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {traCase.statecode === 0 ? 'Active' : traCase.statecode === 1 ? 'Resolved' : 'Other'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(traCase.createdon).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Modified</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date(traCase.modifiedon).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* Description */}
        {traCase.description && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Description</h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                {traCase.description}
              </p>
            </div>
          </div>
        )}
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}; 