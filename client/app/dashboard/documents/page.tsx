'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  RefreshCw,
  FileText,
  ShieldCheck,
  Download,
  MoreVertical,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  LayoutGrid,
  List,
  Shield
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
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#030014] flex overflow-hidden transition-colors duration-1000">
      
      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-purple-500/5 dark:bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 dark:bg-cyan-600/10 blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] dark:opacity-[0.25] mix-blend-overlay" />
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <DashboardSidebar />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 overflow-hidden relative z-10">
        <DashboardHeader onMenuClick={() => {}} />

        <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 custom-scrollbar">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-7xl mx-auto space-y-10"
          >
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                    <FileText className="w-3 h-3 text-purple-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">Vault Assets</span>
                  </div>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
                  My <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">Documents.</span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => refetch()}
                  className={cn(
                    "rounded-2xl border-white dark:border-white/10 bg-white/40 dark:bg-white/5 h-14 w-14 shadow-xl shadow-purple-500/5 transition-all",
                    isFetching && "animate-spin"
                  )}
                >
                  <RefreshCw className="w-6 h-6 text-gray-400" />
                </Button>
                <Button 
                   onClick={() => setIsUploadOpen(true)}
                   className="bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 font-black px-8 h-14 rounded-2xl shadow-2xl shadow-purple-500/20 transition-all flex items-center gap-3 group uppercase tracking-tight"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span>New Deposit</span>
                </Button>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white dark:border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-[600px]">
              
              {/* Toolbar */}
              <div className="p-8 border-b border-white dark:border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
                  {categories.map((cat: any) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={cn(
                        "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-2",
                        filterCategory === cat 
                          ? "bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-xl" 
                          : "bg-white/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-transparent hover:border-purple-500/30"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative group w-full lg:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  <Input 
                    placeholder="Search your vault..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 w-full bg-white/50 dark:bg-white/5 border-2 border-transparent focus:border-purple-500/20 rounded-2xl text-xs font-bold uppercase tracking-tight transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Table / Loading State */}
              <div className="flex-1 overflow-x-auto">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 space-y-4"
                    >
                       {[1,2,3,4,5].map(i => (
                         <div key={i} className="h-20 w-full rounded-3xl bg-white/50 dark:bg-white/10 animate-pulse" />
                       ))}
                    </motion.div>
                  ) : filteredDocs.length > 0 ? (
                    <motion.div
                      key="table"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FileTable 
                        documents={filteredDocs} 
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center p-32 text-center"
                    >
                      <div className="w-24 h-24 rounded-[2rem] bg-white/50 dark:bg-white/5 border border-white dark:border-white/10 flex items-center justify-center mb-6 shadow-2xl">
                        <FileText className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Vault is Empty</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[240px] mx-auto mt-2 font-medium">
                        Try adjusting your filters or deposit a new secure file.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </main>

        <footer className="px-12 py-6 border-t border-white dark:border-white/10 bg-white/20 dark:bg-white/2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] text-center">
           Protected by KeepVault Security Architecture • Zero-Knowledge GCM Encryption
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
