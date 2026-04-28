'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Settings, 
  LogOut, 
  Lock,
  Clock,
  HardDrive,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  Crown,
  Activity,
  Fingerprint
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { useLogoutUserMutation } from '@/store/api/apiSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard', color: 'from-blue-500 to-cyan-500' },
  { name: 'My Documents', icon: FileText, href: '/dashboard/documents', color: 'from-purple-500 to-pink-500' },
  { name: 'Security Hub', icon: Shield, href: '/dashboard/security', color: 'from-emerald-500 to-teal-500' },
  { name: 'Recent', icon: Clock, href: '/dashboard/recent', color: 'from-orange-500 to-red-500' },
  { name: 'Settings', icon: Settings, href: '/dashboard/settings', color: 'from-gray-500 to-gray-700' },
];

// Fixed Loading Animation Component
const SidebarLoader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing secure vault...");
  const intervalRef = useRef<NodeJS.Timeout>();
  const messageIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Progress animation
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    // Message animation
    const messages = [
      "Initializing secure vault...",
      "Decrypting keys...",
      "Loading dashboard...",
      "Almost there..."
    ];
    let messageIndex = 0;
    
    messageIntervalRef.current = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 600);

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
    };
  }, []);

  // Call onLoadingComplete when progress reaches 100
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      <div className="text-center space-y-8 p-8">
        {/* Animated Logo - Fixed animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: progress < 100 ? Infinity : 0,
            repeatType: "reverse"
          }}
          className="relative w-24 h-24 mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Lock className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl font-black"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              KeepVault
            </span>
          </motion.div>
          
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
            <Activity className="w-4 h-4 animate-pulse text-purple-400" />
            <span className="font-mono">{loadingMessage}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <Progress value={progress} className="h-1.5 bg-white/20" />
            <p className="text-xs text-gray-400 mt-2 font-mono">
              {progress}% complete
            </p>
          </div>
        </div>

        {/* Animated Dots - Fixed to stop after loading */}
        {progress < 100 && (
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  repeatType: "loop"
                }}
                className="w-2 h-2 bg-purple-400 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Fixed Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

// Fixed Animated Menu Item Component
const AnimatedMenuItem = ({ item, isActive, index }: { item: any; isActive: boolean; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link href={item.href}>
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "group relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer mb-1 overflow-hidden",
            isActive 
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/20"
              : "text-gray-600 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
          )}
        >
          {/* Animated Background Gradient - Fixed to stop on hover end */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered && !isActive ? "0%" : "-100%" }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon with Animation - Fixed to reset after hover */}
          <motion.div
            animate={isHovered ? { rotate: [0, 5, -5, 0], scale: 1.05 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <item.icon className={cn(
              "w-5 h-5 transition-all duration-300",
              isActive ? "text-white" : "text-gray-400 group-hover:text-purple-500",
              isHovered && !isActive && "text-purple-500"
            )} />
          </motion.div>

          <span className="relative z-10 uppercase tracking-tight">{item.name}</span>

          {/* Active Indicator */}
          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -z-0"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setHasLoaded(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      dispatch(logoutAction());
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Only show loading on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasLoaded) {
        handleLoadingComplete();
      }
    }, 3000); // Fallback timeout
    
    return () => clearTimeout(timer);
  }, [handleLoadingComplete, hasLoaded]);

  const SidebarContent = () => (
    <>
      <ScrollProgress />

      {/* Brand */}
      <motion.div 
        className="h-20 flex items-center px-6 md:px-8 border-b border-white dark:border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
      >
        <Link href="/" className="flex items-center gap-3 group relative">
          <motion.div 
            className="relative"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Fingerprint className="w-5 h-5 text-white" />
            </div>
          </motion.div>
          
          <motion.span 
            className="text-xl font-black tracking-tighter bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent uppercase"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            KeepVault
          </motion.span>

        </Link>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
          Navigation
        </p>
        
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <AnimatedMenuItem 
              key={item.name} 
              item={item} 
              isActive={isActive} 
              index={index}
            />
          );
        })}

        {/* Storage Stats */}
        <motion.div 
          className="pt-8 px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Storage</span>
              </div>
              <span className="text-xs font-mono text-gray-500">2.4GB / 5GB</span>
            </div>
            <Progress value={48} className="h-2 bg-gray-100 dark:bg-gray-800" />
            <p className="text-[10px] text-gray-400 mt-2">48% used • Upgrade for more</p>
          </div>
        </motion.div>

        {/* Upgrade Card */}
        <motion.div 
          className="pt-4 px-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-600 to-pink-600 overflow-hidden group shadow-2xl shadow-purple-500/30">
            {/* Fixed shimmer animation - only runs 3 times */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ 
                duration: 2, 
                repeat: 3,
                repeatType: "loop"
              }}
            />
            
            <Sparkles className="absolute top-0 right-0 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-500 rotate-12" />
            
            <div className="relative z-10">
              <Crown className="w-8 h-8 text-yellow-300 mb-3" />
              <p className="text-white font-black text-xs uppercase tracking-widest mb-1">Unlock Pro</p>
              <p className="text-purple-100 text-[10px] mb-4 leading-relaxed font-medium">
                Get enterprise-grade encryption & unlimited storage
              </p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full py-2.5 bg-white text-purple-600 text-xs font-black rounded-xl hover:bg-gray-50 transition-all shadow-lg"
              >
                UPGRADE NOW
              </motion.button>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* User Footer */}
      <motion.div 
        className="p-6 border-t border-white dark:border-white/10 bg-white/20 dark:bg-white/2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-white/5 transition-all group cursor-pointer mb-4 border border-transparent hover:border-white dark:hover:border-white/10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-gray-900 dark:text-white truncate uppercase tracking-tighter">
              {user?.email?.split('@')[0]}
            </p>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-500 uppercase">Verified Account</p>
            </div>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start gap-3 h-12 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 rounded-xl px-4 font-black text-xs uppercase tracking-widest transition-all group"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            Sign Out
          </Button>
        </motion.div>
      </motion.div>
    </>
  );

  // Show loading only on initial load
  if (isLoading) {
    return <SidebarLoader onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-gray-200 dark:border-gray-800 shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col fixed inset-y-0 z-40 bg-white/40 dark:bg-white/5 backdrop-blur-2xl border-r border-white dark:border-white/10 transition-all duration-300">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 shadow-2xl"
            >
              <div className="pt-16 h-full overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </>
  );
}