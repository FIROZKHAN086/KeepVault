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
  RefreshCw,
  Sparkles,
  Shield,
  Clock,
  HardDrive
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
      router.push('/login');
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) return null;
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
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            
            {/* Header Actions */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-2">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Vault Encrypted</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-purple-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">Zero-Knowledge</span>
                  </div>
                </motion.div>
                <h2 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
                  Dashboard <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">Overview.</span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => refetch()}
                  className={cn(
                    "rounded-2xl border-white dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-xl hover:bg-white dark:hover:bg-white/10 transition-all h-14 w-14 shadow-xl shadow-purple-500/5",
                    isFetching && "animate-spin"
                  )}
                >
                  <RefreshCw className="w-6 h-6 text-gray-500" />
                </Button>
                <Button 
                   onClick={() => setIsUploadOpen(true)}
                   className="bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 font-black px-8 h-14 rounded-2xl shadow-2xl shadow-purple-500/20 transition-all active:scale-95 flex items-center gap-3 group uppercase tracking-tight"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span>Secure Deposit</span>
                </Button>
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className="relative">
               <StatsCards 
                totalFiles={documents.length} 
                totalStorage="0.6 GB" 
                securityScore={98} 
               />
            </div>

            {/* Document Section Shell */}
            <div className="space-y-8 pt-4">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Recent Deposits</h3>
                    <div className="hidden sm:flex items-center bg-white/40 dark:bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white dark:border-white/10">
                       <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg"><List className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white"><LayoutGrid className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative group w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input 
                          placeholder="Quick search..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-11 h-12 bg-white/40 dark:bg-white/5 border-2 border-transparent focus:border-purple-500/20 rounded-2xl text-xs font-bold uppercase tracking-tight transition-all shadow-xl shadow-purple-500/5"
                        />
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => router.push('/dashboard/documents')}
                      className="h-12 px-5 text-xs font-black text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 gap-2 rounded-2xl uppercase tracking-widest transition-all"
                    >
                        All Files <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
               </div>

               {/* The File Table Shell */}
               <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white dark:border-white/10 shadow-2xl overflow-hidden min-h-[400px]">
                 {isLoading ? (
                   <div className="p-8 space-y-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-20 w-full rounded-3xl bg-white/50 dark:bg-white/10 animate-pulse" />
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

          </motion.div>
        </main>

        {/* ── Dashboard Footer ── */}
        <footer className="px-12 py-6 border-t border-white dark:border-white/10 bg-white/20 dark:bg-white/2 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-emerald-500" />
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">© 2026 KeepVault Architecture • End-to-End Encrypted</p>
            </div>
            <div className="flex gap-8">
               <span className="text-[10px] font-black text-purple-500 cursor-pointer hover:underline uppercase tracking-widest">Privacy Standards</span>
               <span className="text-[10px] font-black text-purple-500 cursor-pointer hover:underline uppercase tracking-widest">Security Audit</span>
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
