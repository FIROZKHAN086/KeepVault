'use client';

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Search as SearchIcon,
  ChevronRight,
  ShieldCheck,
  Calendar,
  MoreVertical,
  Plus
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
    <header className="h-20 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0d0914]/80 backdrop-blur-xl sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between transition-all">
      
      {/* Welcome Message */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5 text-gray-500" />
        </Button>
        <div className="hidden sm:block">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-black text-gray-900 dark:text-white tracking-tight"
          >
            {greeting}, {user?.email?.split('@')[0]}!
          </motion.h1>
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3 h-3" />
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block w-72">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search documents..." 
            className="pl-10 h-10 bg-gray-50 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-white/10 transition-all rounded-xl focus:ring-1 focus:ring-violet-500/50"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 border-l border-gray-200 dark:border-white/10 pl-4 sm:pl-6">
            <Button variant="ghost" size="icon" className="relative group rounded-xl hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-fuchsia-500 rounded-full border-2 border-white dark:border-[#0d0914]" />
            </Button>
            
            <div className="flex items-center gap-2 p-1 pl-2 pr-2 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 cursor-pointer hover:border-violet-500/30 transition-colors">
                <div className="w-7 h-7 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-[10px] font-black">
                    {user?.email?.charAt(0).toUpperCase()}
                </div>
                <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
            </div>
        </div>
      </div>

    </header>
  );
}
