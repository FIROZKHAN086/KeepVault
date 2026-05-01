'use client';

import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '@/store/api/apiSlice';
import { setUser, setInitializing } from '@/store/slices/authSlice';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Loader2, 
  Lock, 
  Shield, 
  Sparkles, 
  Fingerprint,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Zap
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';


const LoadingSequence = ({ progress }: { progress: number }) => {
  const [currentStage, setCurrentStage] = useState<number>(0);
  
  const stages = [
    { message: "Initializing secure vault...", icon: Lock, color: "from-purple-500 to-pink-500" },
    { message: "Decrypting authentication keys...", icon: Shield, color: "from-blue-500 to-cyan-500" },
    { message: "Verifying credentials...", icon: Fingerprint, color: "from-emerald-500 to-teal-500" },
    { message: "Establishing secure channel...", icon: Database, color: "from-orange-500 to-red-500" },
    { message: "Loading your vault...", icon: Cloud, color: "from-indigo-500 to-purple-500" },
    { message: "Almost ready...", icon: Zap, color: "from-yellow-500 to-amber-500" },
  ];

  useEffect(() => {
    const stageIndex = Math.min(Math.floor(progress / (100 / stages.length)), stages.length - 1);
    setCurrentStage(stageIndex);
  }, [progress, stages.length]);

  const CurrentIcon = stages[currentStage]?.icon || Lock;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-6"
    >
      
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative w-24 h-24 mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
        <div className={cn(
          "relative w-24 h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-2xl",
          stages[currentStage]?.color
        )}>
          <CurrentIcon className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      {/* Loading  */}
      <div className="space-y-3">
        <motion.p
          key={currentStage}
  initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-lg font-black text-gray-900 dark:text-white"
        >
          {stages[currentStage]?.message}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-400 font-mono"
        >
          {Math.floor(progress)}% Complete
        </motion.p>
      </div>

      
      <div className="w-64 mx-auto space-y-2">
        <Progress value={progress} className="h-1.5 bg-gray-200 dark:bg-gray-800" />
        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
          <span>🔒 Secure Connection</span>
          <span>AES-256</span>
        </div>
      </div>
    </motion.div>
  );
};

// Particle Background Component
const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 100, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Animated Background
const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%]"
        style={{ rotate: rotateX }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-purple-500/10 to-transparent" />
      </motion.div>
      
      
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cdefs%3E%3Cpattern id=%27grid%27 width=%2760%27 height=%2760%27 patternUnits=%27userSpaceOnUse%27%3E%3Cpath d=%27M 60 0 L 0 0 0 60%27 fill=%27none%27 stroke=%27rgba(139,92,246,0.05)%27 stroke-width=%271%27/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%27100%25%27 height=%27100%25%27 fill=%27url(%23grid)%27/%3E%3C/svg%3E')] bg-repeat" />
      </motion.div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
      />
    </div>
  );
};

// Security Badges 
const SecurityBadges = () => {
  const badges = [
    { text: "AES-256 Encryption", icon: Lock, color: "text-emerald-500" },
    { text: "Zero-Knowledge", icon: Shield, color: "text-blue-500" },
    { text: "2FA Ready", icon: Fingerprint, color: "text-purple-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-3 mt-6"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800"
        >
          <badge.icon className={cn("w-3 h-3", badge.color)} />
          <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">
            {badge.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Verification Steps 
const VerificationSteps = ({ isComplete }: { isComplete: boolean }) => {
  const steps = [
    { name: "Authentication", icon: Lock, completed: false },
    { name: "Decryption", icon: Shield, completed: false },
    { name: "Loading", icon: Database, completed: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-4 mt-6"
    >
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={isComplete ? { scale: [1, 1.2, 1] } : {}}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              isComplete 
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30"
                : "bg-gray-200 dark:bg-gray-800"
            )}
          >
            {isComplete ? (
              <CheckCircle2 className="w-4 h-4 text-white" />
            ) : (
              <step.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </motion.div>
          {index < steps.length - 1 && (
            <motion.div
              animate={isComplete ? { width: 40 } : { width: 20 }}
              className="h-0.5 bg-gray-300 dark:bg-gray-700 rounded-full"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main Component
export default function AuthRehydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading, isFetching } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  
  const [progress, setProgress] = useState(0);
  const [showSecurityMessage, setShowSecurityMessage] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (isLoading || isFetching) {
      // Simulate progress
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
      
      // Show security message after 1 second
      const messageTimer = setTimeout(() => setShowSecurityMessage(true), 1000);
      
      return () => {
        clearInterval(progressInterval);
        clearTimeout(messageTimer);
      };
    }
    
    return () => clearInterval(progressInterval);
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (isSuccess && data?.user) {
      setProgress(100);
      setIsComplete(true);
      
      // Small delay before dispatching for smooth animation
      const timer = setTimeout(() => {
        dispatch(setUser(data.user));
      }, 500);
      
      return () => clearTimeout(timer);
    } else if (isError) {
      setProgress(100);
      const timer = setTimeout(() => {
        dispatch(setInitializing(false));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError, data, dispatch]);

  // Optionally show a global loading state during the very first check
  if (isLoading || isFetching) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 overflow-hidden">
        <AnimatedBackground />
        <ParticleBackground />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          {/* Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white uppercase">
              KeepVault
            </span>
          </motion.div>

         
          <div className="max-w-md w-full">
            <LoadingSequence progress={progress} />
            
           
            <AnimatePresence>
              {showSecurityMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        Secure Connection Established
                      </p>
                      <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                        TLS 1.3 • Perfect Forward Secrecy
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

           
            <VerificationSteps isComplete={isComplete} />
            
        
            <SecurityBadges />
          </div>

          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-600">
              <Cpu className="w-3 h-3" />
              <span>End-to-End Encrypted</span>
              <span>•</span>
              <span>Zero Access Architecture</span>
            </div>
          </motion.div>
        </div>

       
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-purple-500/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-pink-500/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blue-500/10"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Add these styles to your global CSS or tailwind config
const globalStyles = `
@keyframes gradient {
  0% { transform: translate(0%, 0%) rotate(0deg); }
  50% { transform: translate(10%, 10%) rotate(180deg); }
  100% { transform: translate(0%, 0%) rotate(360deg); }
}

.animate-gradient {
  animation: gradient 20s ease infinite;
}
`;