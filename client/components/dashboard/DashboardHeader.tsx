'use client';

import { 
  Bell, 
  Search as SearchIcon,
  Calendar,
  MoreVertical,

  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';

export default function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <header className="h-20 border-b w-full border-white dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-2xl sticky top-0 z-40 px-6 sm:px-10 flex items-center justify-between transition-all">
      
      {/* Welcome Message */}
      <div className="flex items-center gap-6">
        
        <div className="hidden sm:block">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-0.5"
          >
             <Sparkles className="w-4 h-4 text-purple-500" />
             <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
              {greeting}, <span className="text-purple-600 dark:text-purple-400">{user?.email?.split('@')[0]}</span>
            </h1>
          </motion.div>
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Search Bar */}
        <div className="relative hidden md:block w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          <Input 
            placeholder="Search your vault..." 
            className="pl-12 h-12 bg-white/50 dark:bg-white/5 border-2 border-transparent focus:border-purple-500/30 transition-all rounded-2xl text-xs font-bold uppercase tracking-tight focus:ring-0"
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
            <Button variant="ghost" size="icon" className="relative group rounded-2xl bg-white/50 dark:bg-white/5 w-11 h-11 border border-transparent hover:border-purple-500/30 transition-all">
                <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-purple-500" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-pink-500 rounded-full border-2 border-white dark:border-[#030014]" />
            </Button>
            
            <div className="flex items-center gap-3 p-1.5 pl-2.5 pr-2.5 bg-gray-900 dark:bg-white rounded-2xl shadow-xl shadow-purple-500/10 cursor-pointer hover:scale-105 transition-all group">
                <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center text-white text-[10px] font-black">
                    {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                   <p className="text-[10px] font-black text-white dark:text-black uppercase tracking-widest">Vault ID</p>
                   <p className="text-[9px] font-bold text-white/50 dark:text-black/50 uppercase">#KV-{user?.id?.slice(0, 4) || '7721'}</p>
                </div>
                <MoreVertical className="w-4 h-4 text-white/50 dark:text-black/50 group-hover:text-white dark:group-hover:text-black transition-colors" />
            </div>
        </div>
      </div>

    </header>
  );
}