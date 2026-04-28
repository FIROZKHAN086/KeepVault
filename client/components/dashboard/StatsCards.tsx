'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  HardDrive, 
  TrendingUp,
  CheckCircle,
  Clock,
  ChevronRight,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StatsProps {
  totalFiles: number;
  totalStorage: string;
  securityScore: number;
  recentActivity?: number;
  storageUsed?: number;
  storageLimit?: number;
  fileTypeStats?: {
    pdf: number;
    images: number;
    documents: number;
    other: number;
  };
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1, suffix = '', prefix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration, isVisible]);

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="inline-block"
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

// Progress Ring Component - Responsive
const ProgressRing = ({ value, size = 80, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Responsive size
  const responsiveSize = typeof window !== 'undefined' ? 
    (window.innerWidth < 640 ? size * 0.75 : size) : size;

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={responsiveSize} height={responsiveSize} className="transform -rotate-90">
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-800"
        />
        <motion.circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-purple-500"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isVisible ? offset : circumference }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-sm sm:text-xl font-black text-gray-900 dark:text-white"
        >
          {value}%
        </motion.span>
      </div>
    </div>
  );
};

// Main Stats Cards Component
export default function StatsCards({ 
  totalFiles, 
  totalStorage, 
  securityScore,
  recentActivity = 12,
  storageUsed = 2.4,
  storageLimit = 5,
  fileTypeStats = { pdf: 45, images: 30, documents: 15, other: 10 }
}: StatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const storagePercentage = (storageUsed / storageLimit) * 100;

  const stats = [
    {
      id: 1,
      label: 'Total Documents',
      value: totalFiles,
      subValue: `+${recentActivity} this week`,
      icon: FileText,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-100 dark:bg-violet-500/10',
      borderColor: 'border-violet-200 dark:border-violet-500/20',
      gradient: 'from-violet-500 to-purple-500',
      trend: '+12%',
      trendUp: true,
      mobileOrder: 1,
    },
    {
      id: 2,
      label: 'Storage Used',
      value: `${storageUsed}GB / ${storageLimit}GB`,
      subValue: `${storagePercentage.toFixed(0)}% of limit`,
      icon: HardDrive,
      color: 'text-fuchsia-600 dark:text-fuchsia-400',
      bgColor: 'bg-fuchsia-100 dark:bg-fuchsia-500/10',
      borderColor: 'border-fuchsia-200 dark:border-fuchsia-500/20',
      gradient: 'from-fuchsia-500 to-pink-500',
      progress: storagePercentage,
      trend: '+8%',
      trendUp: true,
      mobileOrder: 2,
    },
    {
      id: 3,
      label: 'Security Score',
      value: `${securityScore}%`,
      subValue: securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Moderate' : 'Needs attention',
      icon: ShieldCheck,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-500/10',
      borderColor: 'border-amber-200 dark:border-amber-500/20',
      gradient: 'from-amber-500 to-orange-500',
      securityScore: securityScore,
      status: securityScore >= 80 ? 'Secure' : securityScore >= 60 ? 'Moderate' : 'Risky',
      mobileOrder: 3,
    },
    {
      id: 4,
      label: 'Main Format',
      value: 'PDF',
      subValue: 'Most Used',
      icon: FileText,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-500/10',
      borderColor: 'border-emerald-200 dark:border-emerald-500/20',
      gradient: 'from-emerald-500 to-teal-500',
      fileTypeDistribution: fileTypeStats,
      mobileOrder: 4,
    },
  ];

  // Sort stats for mobile (horizontal scroll) and desktop (grid)
  const sortedStats = isMobile ? stats : stats;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Connection Status for Mobile */}
      {isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 px-4 py-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-full inline-flex items-center gap-2 text-xs"
        >
          <Wifi className="w-3 h-3 text-green-500" />
          <span className="text-gray-600 dark:text-gray-400">Live Updates</span>
          <Battery className="w-3 h-3 text-gray-400" />
          <Signal className="w-3 h-3 text-green-500" />
        </motion.div>
      )}

      {/* Mobile Horizontal Scroll View */}
      {isMobile ? (
        <div className="relative overflow-x-auto pb-4 px-4 -mx-4">
          <div className="flex gap-4 min-w-max px-4">
            {sortedStats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="w-[280px] flex-shrink-0"
              >
                <StatCard stat={stat} isMobile={true} />
              </motion.div>
            ))}
          </div>
          {/* Scroll Indicator */}
          <div className="flex justify-center gap-1 mt-4">
            {sortedStats.map((_, i) => (
              <div
                key={i}
                className="h-1 w-4 rounded-full bg-gray-300 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      ) : (
        // Desktop Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 sm:px-0">
          {sortedStats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <StatCard stat={stat} isMobile={false} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Separate Stat Card Component for better organization
const StatCard = ({ stat, isMobile }: { stat: any; isMobile: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card className={cn(
      "relative border-2 transition-all duration-300 overflow-hidden",
      stat.borderColor,
      "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
      !isMobile && "hover:shadow-2xl hover:scale-[1.02]",
      isMobile && "active:scale-98"
    )}>
      {/* Animated Gradient Border */}
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0",
          !isMobile && "group-hover:opacity-100",
          stat.gradient
        )}
        style={{ filter: "blur(20px)" }}
      />
      
      <CardContent className={cn("relative z-10", isMobile ? "p-4" : "p-6")}>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <motion.div
            whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
            transition={{ duration: 0.5 }}
            className={cn(
              "rounded-xl transition-all duration-300",
              stat.bgColor,
              stat.color,
              isMobile ? "p-2" : "p-2.5"
            )}
          >
            <stat.icon className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
          </motion.div>
          
          <div className="flex items-center gap-1">
            {stat.trend && (
              <>
                <TrendingUp className={cn(
                  "w-3 h-3",
                  stat.trendUp ? "text-emerald-500" : "text-red-500"
                )} />
                <span className={cn(
                  "text-[10px] md:text-xs font-bold",
                  stat.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                )}>
                  {stat.trend}
                </span>
              </>
            )}
            {isMobile && (
              <ChevronRight className="w-3 h-3 text-gray-400" />
            )}
          </div>
        </div>
        
        {/* Content Section */}
        <div>
          <p className="text-[10px] md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {stat.label}
          </p>
          
          <div className="flex items-baseline gap-1 md:gap-2 mt-1 md:mt-2 flex-wrap">
            <h3 className={cn(
              "font-black text-gray-900 dark:text-white tracking-tight",
              isMobile ? "text-lg" : "text-2xl"
            )}>
              {stat.id === 1 && <AnimatedCounter value={stat.value} />}
              {stat.id === 2 && <>{stat.value}</>}
              {stat.id === 3 && <AnimatedCounter value={stat.securityScore} suffix="%" />}
              {stat.id === 4 && <>{stat.value}</>}
            </h3>
            <span className="text-[8px] md:text-xs font-semibold text-gray-400 dark:text-gray-500">
              {stat.subValue}
            </span>
          </div>

          {/* Progress Bar for Storage */}
          {stat.progress !== undefined && (
            <motion.div 
              className="mt-3 md:mt-4"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between text-[8px] md:text-xs text-gray-500 mb-1">
                <span>Used</span>
                <span>{stat.progress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 md:h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={cn("h-full rounded-full bg-gradient-to-r", stat.gradient)}
                />
              </div>
            </motion.div>
          )}

          {/* File Type Distribution for Mobile (Simplified) */}
          {stat.fileTypeDistribution && isMobile && (
            <motion.div 
              className="mt-3 space-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex gap-1">
                {Object.entries(stat.fileTypeDistribution).map(([type, percentage]) => (
                  <motion.div
                    key={type}
                    initial={{ height: 0 }}
                    animate={{ height: 6 }}
                    transition={{ delay: 0.5 }}
                    className="h-1.5 rounded-full"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: type === 'pdf' ? '#8b5cf6' : 
                                      type === 'images' ? '#ec4899' :
                                      type === 'documents' ? '#10b981' : '#6b7280'
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 text-[8px] font-semibold">
                {Object.entries(stat.fileTypeDistribution).map(([type, percentage]) => (
                  <div key={type} className="flex items-center gap-0.5">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      type === 'pdf' ? "bg-purple-500" :
                      type === 'images' ? "bg-pink-500" :
                      type === 'documents' ? "bg-emerald-500" : "bg-gray-500"
                    )} />
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {type}: {percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* File Type Distribution for Desktop */}
          {stat.fileTypeDistribution && !isMobile && (
            <motion.div 
              className="mt-4 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Distribution</span>
                <span className="text-gray-400">by type</span>
              </div>
              <div className="flex gap-1">
                {Object.entries(stat.fileTypeDistribution).map(([type, percentage]) => (
                  <motion.div
                    key={type}
                    initial={{ height: 0 }}
                    animate={{ height: 8 }}
                    transition={{ delay: 0.5 }}
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: type === 'pdf' ? '#8b5cf6' : 
                                      type === 'images' ? '#ec4899' :
                                      type === 'documents' ? '#10b981' : '#6b7280'
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-semibold">
                {Object.entries(stat.fileTypeDistribution).map(([type, percentage]) => (
                  <div key={type} className="flex items-center gap-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      type === 'pdf' ? "bg-purple-500" :
                      type === 'images' ? "bg-pink-500" :
                      type === 'documents' ? "bg-emerald-500" : "bg-gray-500"
                    )} />
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{type}: {percentage}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Score Ring */}
          {stat.securityScore !== undefined && (
            <motion.div 
              className={cn(
                "flex items-center justify-between",
                isMobile ? "mt-3" : "mt-4"
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <ProgressRing 
                value={stat.securityScore} 
                size={isMobile ? 50 : 60} 
                strokeWidth={isMobile ? 5 : 6} 
              />
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <CheckCircle className={cn(
                    "text-emerald-500",
                    isMobile ? "w-3 h-3" : "w-4 h-4"
                  )} />
                  <span className={cn(
                    "font-bold text-gray-900 dark:text-white",
                    isMobile ? "text-[10px]" : "text-xs"
                  )}>
                    {stat.status}
                  </span>
                </div>
                <p className={cn(
                  "text-gray-500",
                  isMobile ? "text-[8px]" : "text-[10px]"
                )}>
                  AES-256 Encrypted
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Hover Glow Effect - Desktop only */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)`,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};