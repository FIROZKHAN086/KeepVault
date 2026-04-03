'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  ShieldCheck, 
  HardDrive, 
  BarChart3,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatsProps {
  totalFiles: number;
  totalStorage: string;
  securityScore: number;
}

export default function StatsCards({ totalFiles, totalStorage, securityScore }: StatsProps) {
  const stats = [
    {
      label: 'Total Documents',
      value: totalFiles,
      subValue: '+2 this week',
      icon: FileText,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-100 dark:bg-violet-500/10',
    },
    {
      label: 'Storage Used',
      value: totalStorage,
      subValue: 'of 5GB free',
      icon: HardDrive,
      color: 'text-fuchsia-600 dark:text-fuchsia-400',
      bgColor: 'bg-fuchsia-100 dark:bg-fuchsia-500/10',
      progress: 12 // Simulated %
    },
    {
      label: 'Main Format',
      value: 'PDF',
      subValue: 'Most Used',
      icon: FileText,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-500/10',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="border-gray-200 dark:border-white/5 bg-white/60 dark:bg-[#110d1c]/60 backdrop-blur-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "p-2.5 rounded-xl transition-transform group-hover:scale-110",
                  stat.bgColor,
                  stat.color
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.progress ? (
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Monthly Usage</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-20 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.progress}%` }}
                            className="h-full bg-linear-to-r from-violet-500 to-fuchsia-500"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{stat.progress}%</span>
                      </div>
                   </div>
                ) : (
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">Stable</span>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{stat.subValue}</span>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-linear-to-br from-violet-500/5 to-fuchsia-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// Helper to fix the missing cn in this file
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
