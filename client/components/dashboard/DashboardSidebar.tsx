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
  HardDrive
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
      router.push('/Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-64 hidden lg:flex flex-col fixed inset-y-0 z-50 bg-white dark:bg-[#0d0914] border-r border-gray-200 dark:border-white/5 transition-all duration-300">
      
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-lg p-1.5 shadow-lg shadow-violet-500/20">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-gray-900 dark:text-white tracking-tight">KeepVault</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-2 mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer mb-1",
                isActive 
                  ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
              )}>
                <item.icon className={cn(
                  "w-4.5 h-4.5 transition-colors",
                  isActive ? "text-violet-600 dark:text-violet-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                )} />
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400"
                  />
                )}
              </div>
            </Link>
          );
        })}

        <div className="pt-8 px-2">
            <div className="p-4 rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-20 transform -translate-y-px translate-x-1 group-hover:scale-110 transition-transform">
                    <Zap className="w-12 h-12 text-white" />
                </div>
                <p className="text-white font-bold text-xs mb-1">Upgrade to Pro</p>
                <p className="text-white/70 text-[10px] mb-3 leading-tight font-medium">Unlock unlimited storage and multi-device sync.</p>
                <button className="w-full py-1.5 bg-white text-violet-600 text-[10px] font-black rounded-lg hover:bg-white/90 transition-colors">
                    LEVEL UP
                </button>
            </div>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-white/5">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer mb-2">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-md shadow-violet-500/20">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user?.email?.split('@')[0]}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-500 truncate">Free Account</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start gap-3 h-10 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 rounded-xl px-3 font-semibold"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

    </aside>
  );
}
