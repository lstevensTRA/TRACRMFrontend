import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Plus, RefreshCw, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { traCasesApi } from '../services/traCasesApi';
import { TRACase } from '../types/traCase';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ViewCaseModal } from '../components/cases/ViewCaseModal';
import { EditCaseModal } from '../components/cases/EditCaseModal';
import { DeleteConfirmModal } from '../components/cases/DeleteConfirmModal';
import { CreateCaseModal } from '../components/cases/CreateCaseModal';

export const TRACasesListPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<TRACase | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const queryClient = useQueryClient();

  const { data: cases, isLoading, error, refetch } = useQuery({
    queryKey: ['tra-cases'],
    queryFn: traCasesApi.getCases,
  });

  // CRUD Mutations
  const createMutation = useMutation({
    mutationFn: traCasesApi.createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tra-cases'] });
      setIsCreateModalOpen(false);
    },
    onError: (error) => {
      console.error('Create case error:', error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ caseId, caseData }: { caseId: string; caseData: Partial<TRACase> }) => 
      traCasesApi.updateCase(caseId, caseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tra-cases'] });
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      console.error('Update case error:', error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: traCasesApi.deleteCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tra-cases'] });
      setIsDeleteModalOpen(false);
    },
    onError: (error) => {
      console.error('Delete case error:', error);
    }
  });

  // Filter cases based on search and status
  const filteredCases = cases?.filter(traCase => {
    const matchesSearch = !searchTerm || 
      traCase.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traCase.casenumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traCase.ticketnumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && traCase.statecode === 0) ||
      (statusFilter === 'resolved' && traCase.statecode === 1);
    
    return matchesSearch && matchesStatus;
  });

  const handleViewCase = (traCase: TRACase) => {
    setSelectedCase(traCase);
    setIsViewModalOpen(true);
  };

  const handleEditCase = (traCase: TRACase) => {
    setSelectedCase(traCase);
    setIsEditModalOpen(true);
  };

  const handleDeleteCase = (traCase: TRACase) => {
    setSelectedCase(traCase);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-2xl mx-auto mt-8">
          <div className="text-red-800 dark:text-red-200">
            <h3 className="font-medium text-lg">Error loading cases</h3>
            <p className="text-sm mt-2">{error.message}</p>
            <button 
              onClick={() => refetch()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TRA Cases</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Manage and track tax relief cases</p>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filters and Actions */}
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Cases</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
              </select>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Case
              </button>
              
              <button 
                onClick={() => refetch()}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg p-3">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{cases?.length || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg p-3">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cases?.filter(c => c.statecode === 0).length || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg p-3">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolved Cases</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cases?.filter(c => c.statecode === 1).length || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-3">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cases?.filter(c => c.prioritycode === 1).length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Case Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCases?.map((traCase) => (
                  <tr key={traCase.incidentid} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        {traCase.ticketnumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {traCase.title || 'Untitled Case'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {traCase.customerid_formatted || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={traCase.statecode} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(traCase.createdon).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewCase(traCase)}
                          className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditCase(traCase)}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCase(traCase)}
                          className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 px-3 py-1 rounded-md text-xs font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredCases?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-medium">No cases found</h3>
                <p className="mt-2">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters.' 
                    : 'There are no cases to display at this time.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        {filteredCases && filteredCases.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing {filteredCases.length} of {cases?.length || 0} cases
          </div>
        )}

        {/* Error Messages */}
        {createMutation.error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
            <p className="text-red-800">Create error: {createMutation.error.message}</p>
          </div>
        )}

        {updateMutation.error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
            <p className="text-red-800">Update error: {updateMutation.error.message}</p>
          </div>
        )}

        {deleteMutation.error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-4">
            <p className="text-red-800">Delete error: {deleteMutation.error.message}</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateCaseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(caseData: Partial<TRACase>) => createMutation.mutate(caseData)}
        isLoading={createMutation.isPending}
      />

      {selectedCase && (
        <>
          <ViewCaseModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            case={selectedCase}
          />
          
          <EditCaseModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            case={selectedCase}
            onSubmit={(caseData: Partial<TRACase>) => updateMutation.mutate({ 
              caseId: selectedCase.incidentid, 
              caseData 
            })}
            isLoading={updateMutation.isPending}
          />

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            case={selectedCase}
            onConfirm={() => deleteMutation.mutate(selectedCase.incidentid)}
            isDeleting={deleteMutation.isPending}
          />
        </>
      )}
    </div>
  );
};
