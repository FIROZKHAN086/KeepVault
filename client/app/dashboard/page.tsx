'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ShieldCheck,
  Zap,
  LayoutGrid,
  List,
  RefreshCw
} from 'lucide-react';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import FileTable from '@/components/dashboard/FileTable';
import UploadDialog from '@/components/dashboard/UploadDialog';
import DocumentDetailDialog from '@/components/dashboard/DocumentDetailDialog';
import { useGetDocumentsByUserIdQuery, useDeleteDocumentMutation } from '@/store/api/apiSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, isAuthenticated, isInitializing } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: documents = [], isLoading, isFetching, refetch } = useGetDocumentsByUserIdQuery(user?.id, {
    skip: !user?.id
  });
  const [deleteDocument] = useDeleteDocumentMutation();

  // Protect route
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/Login');
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) return null; // AuthRehydrator shows the loading screen
  if (!isAuthenticated) return null;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document? This action is irreversible.')) {
      try {
        await deleteDocument(id).unwrap();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleEdit = (doc: any) => {
    setSelectedDoc(doc);
    setIsDetailOpen(true);
  };

  const filteredDocs = documents.filter((doc: any) => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#0a0612] flex overflow-hidden">
      
      {/* ── Sidebar ── */}
      <DashboardSidebar />

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 overflow-hidden">
        
        {/* ── Header ── */}
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* ── Scrollable Dashboard Content ── */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">System Secure • 256-bit AES</span>
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">Vault Overview</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Manage your encrypted assets and security health.</p>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => refetch()}
                  className={cn(
                    "rounded-xl border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-all h-12 w-12",
                    isFetching && "animate-spin"
                  )}
                >
                  <RefreshCw className="w-5 h-5 text-gray-500" />
                </Button>
                <Button 
                   onClick={() => setIsUploadOpen(true)}
                   className="bg-linear-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black px-6 h-12 rounded-xl shadow-lg shadow-violet-500/30 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Secure Deposit</span>
                </Button>
              </div>
            </div>

            {/* Stats Cards Row */}
            <StatsCards 
              totalFiles={documents.length} 
              totalStorage="0.6 GB" 
              securityScore={98} 
            />

            {/* Document Section Shell */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Recent Deposits</h3>
                    <div className="flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                       <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md bg-white dark:bg-white/10 shadow-sm"><List className="w-3.5 h-3.5" /></Button>
                       <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-gray-400"><LayoutGrid className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                        <Input 
                          placeholder="Quick find..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 h-9 w-48 bg-white dark:bg-white/2 border-gray-200 dark:border-white/5 rounded-xl text-xs font-bold focus:ring-1 focus:ring-violet-500/30 transition-all"
                        />
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => router.push('/dashboard/documents')}
                      className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 gap-1.5 rounded-xl"
                    >
                        View All <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
               </div>

               {/* The File Table */}
               {isLoading ? (
                 <div className="grid grid-cols-1 gap-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-20 w-full rounded-2xl bg-gray-200/50 dark:bg-white/5 animate-pulse" />
                    ))}
                 </div>
               ) : (
                 <FileTable 
                    documents={filteredDocs} 
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                 />
               )}
            </div>

          </div>
        </main>

        {/* ── Footer Info ── */}
        <footer className="px-10 py-4 border-t border-gray-200 dark:border-white/5 bg-white/50 dark:bg-[#0d0914]/50 flex justify-between items-center">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">© 2026 KeepVault Inc. • Secured by AES-256 GCM</p>
            <div className="flex gap-4">
               <span className="text-[10px] font-bold text-violet-500 cursor-pointer hover:underline">Privacy Policy</span>
               <span className="text-[10px] font-bold text-violet-500 cursor-pointer hover:underline">Audited Report</span>
            </div>
        </footer>

      </div>

      {/* ── Modals ── */}
      <UploadDialog 
        open={isUploadOpen} 
        onOpenChange={setIsUploadOpen} 
      />

      <DocumentDetailDialog 
        document={selectedDoc}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />

    </div>
  );
}


