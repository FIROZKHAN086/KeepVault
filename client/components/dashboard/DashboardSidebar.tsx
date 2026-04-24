'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Lock,
  Zap,
  Clock,
  HardDrive,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { useLogoutUserMutation } from '@/store/api/apiSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'My Documents', icon: FileText, href: '/dashboard/documents' },
  { name: 'Security Hub', icon: Shield, href: '/dashboard/security' },
  { name: 'Recent', icon: Clock, href: '/dashboard/recent' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      dispatch(logoutAction());
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-64 hidden lg:flex flex-col fixed inset-y-0 z-50 bg-white/40 dark:bg-white/5 backdrop-blur-2xl border-r border-white dark:border-white/10 transition-all duration-300">
      
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-white dark:border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <Lock className="w-5 h-5 text-white dark:text-black" />
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">KeepVault</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Navigation</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer mb-1 relative overflow-hidden",
                isActive 
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black shadow-xl shadow-purple-500/10"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              )}>
                <item.icon className={cn(
                  "w-5 h-5 transition-colors z-10",
                  isActive ? "text-white dark:text-black" : "text-gray-400 group-hover:text-purple-500"
                )} />
                <span className="z-10 uppercase tracking-tight">{item.name}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            </Link>
          );
        })}

        <div className="pt-10 px-2">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden group shadow-2xl shadow-purple-500/20">
                <Sparkles className="absolute top-[-10%] right-[-10%] w-24 h-24 text-white/10 group-hover:scale-110 transition-transform rotate-12" />
                <div className="relative z-10">
                  <p className="text-white font-black text-xs uppercase tracking-widest mb-2">Pro Access</p>
                  <p className="text-purple-100 text-[10px] mb-4 leading-relaxed font-bold uppercase">Unlock Enterprise Grade Encryption</p>
                  <button className="w-full py-2 bg-white text-gray-900 text-[10px] font-black rounded-xl hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
                      UPGRADE NOW
                  </button>
                </div>
            </div>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-6 border-t border-white dark:border-white/10 bg-white/20 dark:bg-white/2">
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-white/5 transition-all group cursor-pointer mb-4 border border-transparent hover:border-white dark:hover:border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-black shadow-lg">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-gray-900 dark:text-white truncate uppercase tracking-tighter">{user?.email?.split('@')[0]}</p>
            <div className="flex items-center gap-1.5">
               <ShieldCheck className="w-3 h-3 text-emerald-500" />
               <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase">Verified</p>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start gap-3 h-12 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 rounded-2xl px-4 font-black text-xs uppercase tracking-widest transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

    </aside>
  );
}
