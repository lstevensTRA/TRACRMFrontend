import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../ui/Modal';
import { TRACase } from '../../types/traCase';
import { Search } from 'lucide-react';
import { searchCustomers } from '../../services/dynamicsService';

interface CreateCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<TRACase>) => void;
  isLoading: boolean;
}

interface CreateCaseFormData {
  title: string;
  description: string;
  prioritycode: number;
  statecode: number;
  statuscode: number;
  _customerid_value?: string;
  _customerid_type?: string;
}

export const CreateCaseModal: React.FC<CreateCaseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{id: string; name: string; type: 'contact' | 'account'}>>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<{id: string; name: string; type: 'contact' | 'account'} | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCaseFormData>({
    defaultValues: {
      title: '',
      description: '',
      prioritycode: 2,
      statecode: 0,
      statuscode: 1
    }
  });

  const handleSearch = async () => {
    if (!searchTerm) return;
    setIsSearching(true);
    try {
      const results = await searchCustomers(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectCustomer = (customer: {id: string; name: string; type: 'contact' | 'account'}) => {
    setSelectedCustomer(customer);
    setValue('_customerid_value', customer.id);
    setValue('_customerid_type', customer.type);
    setSearchResults([]);
    setSearchTerm('');
  };

  const onFormSubmit = handleSubmit((data) => {
    onSubmit({
      ...data
    });
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Case" size="lg">
      <form onSubmit={onFormSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="prioritycode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <select
            id="prioritycode"
            {...register('prioritycode')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value={1}>High</option>
            <option value={2}>Normal</option>
            <option value={3}>Low</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="customer"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Customer (Contact or Account)
          </label>
          <div className="mt-1 relative">
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search contacts or accounts..."
                className="flex-1 block w-full rounded-l-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => handleSelectCustomer(result)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {result.name} ({result.type})
                  </button>
                ))}
              </div>
            )}

            {selectedCustomer && (
              <div className="mt-2 flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedCustomer.name} ({selectedCustomer.type})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCustomer(null);
                    setValue('_customerid_value', '');
                    setValue('_customerid_type', '');
                  }}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
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
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Case'}
          </button>
        </div>
      </form>
    </Modal>
  );
}; 