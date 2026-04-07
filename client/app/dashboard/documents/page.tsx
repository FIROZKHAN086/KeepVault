'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw,
  FileText,
  ShieldCheck,
  Download,
  MoreVertical
} from 'lucide-react';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FileTable from '@/components/dashboard/FileTable';
import UploadDialog from '@/components/dashboard/UploadDialog';
import DocumentDetailDialog from '@/components/dashboard/DocumentDetailDialog';
import { useGetDocumentsByUserIdQuery, useDeleteDocumentMutation } from '@/store/api/apiSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function MyDocumentsPage() {
  const { user, isAuthenticated, isInitializing } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const { data: documents = [], isLoading, isFetching, refetch } = useGetDocumentsByUserIdQuery(user?.id, {
    skip: !user?.id
  });
  const [deleteDocument] = useDeleteDocumentMutation();

  // Protect route
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) return null;
  if (!isAuthenticated) return null;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id).unwrap();
        if (selectedDoc?.id === id) setIsDetailOpen(false);
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleEdit = (doc: any) => {
    setSelectedDoc(doc);
    setIsDetailOpen(true);
  };

  const filteredDocs = documents.filter((doc: any) => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(documents.map((d: any) => d.category)))];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#0a0612] flex overflow-hidden">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 overflow-hidden">
        <DashboardHeader onMenuClick={() => {}} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <FileText className="w-4 h-4 text-violet-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Vault Assets</span>
                </motion.div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">My Documents</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Access and manage all your encrypted files in one place.</p>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => refetch()}
                  className={cn(
                    "rounded-xl border-gray-200 dark:border-white/10 h-12 w-12",
                    isFetching && "animate-spin"
                  )}
                >
                  <RefreshCw className="w-5 h-5 text-gray-400" />
                </Button>
                <Button 
                   onClick={() => setIsUploadOpen(true)}
                   className="bg-linear-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black px-6 h-12 rounded-xl shadow-lg shadow-violet-500/30 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Deposit</span>
                </Button>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-[#0d0914] rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
              
              {/* Toolbar */}
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                  {categories.map((cat: any) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={cn(
                        "px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0",
                        filterCategory === cat 
                          ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" 
                          : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                  <Input 
                    placeholder="Search documents..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 w-full sm:w-64 bg-gray-50 dark:bg-[#0a0612]/50 border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
              </div>

              {/* Table / Loading State */}
              <div className="flex-1 overflow-x-auto">
                {isLoading ? (
                  <div className="p-10 space-y-4">
                     {[1,2,3,4,5].map(i => (
                       <div key={i} className="h-16 w-full rounded-2xl bg-gray-100/50 dark:bg-white/5 animate-pulse" />
                     ))}
                  </div>
                ) : filteredDocs.length > 0 ? (
                  <FileTable 
                    documents={filteredDocs} 
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-20 text-center">
                    <div className="w-16 h-16 rounded-3xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">No documents found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px] mx-auto mt-1">
                      Try adjusting your search or upload a new file.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>

        <footer className="px-10 py-4 border-t border-gray-200 dark:border-white/5 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">
          Protected by KeepVault Security Architecture • Zero-Knowledge Encryption
        </footer>
      </div>

      <UploadDialog open={isUploadOpen} onOpenChange={setIsUploadOpen} />
      <DocumentDetailDialog 
        document={selectedDoc} 
        open={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
      />
    </div>
  );
}
