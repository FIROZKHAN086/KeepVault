'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Shield, 
  Lock, 
  Cloud, 
  Sparkles, 
  CheckCircle,
  Star,
  Zap,
  FileText,
  Heart,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Card setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#faf9f6] via-[#f2f0eb] to-[#e8e6df] dark:from-[#0d0914] dark:via-[#130d1f] dark:to-[#08050d] transition-colors duration-700">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 mix-blend-overlay pointer-events-none" />
      
      {/* Light Mode Soft Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/40 dark:bg-purple-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-300/30 dark:bg-fuchsia-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] left-[50%] w-[30%] h-[30%] rounded-full bg-blue-300/30 dark:bg-cyan-600/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-48 pb-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT CONTENT: Elegant Typography --- */}
          <div className="text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-white/60 dark:bg-white/5 border border-purple-100 dark:border-white/10 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-900 dark:text-purple-300">
                The Next Generation of Document Security
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6"
            >
              Your Digital Vault, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                Reimagined.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Store, manage, and secure your most important documents with zero-knowledge architecture. Beautifully designed for professionals who demand both privacy and elegance.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link href="Login"><Button size="lg" className="h-14 px-8 text-base bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white rounded-full transition-all group shadow-xl shadow-gray-900/20 dark:shadow-white/10">
                Start For Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button></Link>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={scrollToHowItWorks}
                className="h-14 px-8 text-base bg-white/50 hover:bg-white border-gray-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white rounded-full backdrop-blur-sm transition-all group"
              >
                <Play className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                See How It Works
              </Button>
            </motion.div>

            {/* Feature Checkmarks */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start"
            >
              {[
                { text: 'AES-256 Encryption' },
                { text: 'Zero-Knowledge Architecture' },
                { text: 'Cancel Anytime' },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {feat.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT: Elegant Interactive Card --- */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.3 }}
             className="relative hidden lg:flex justify-center items-center perspective-1000"
          >
            <motion.div
              style={{ rotateX, rotateY }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full max-w-[450px] aspect-[4/5] rounded-[2rem] bg-white/70 dark:bg-[#1a1428]/60 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-1 overflow-hidden"
            >
              {/* Soft Gradient Border Illusion */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/50 via-transparent to-pink-200/50 dark:from-purple-500/20 dark:via-transparent dark:to-pink-500/20 opacity-50 z-0" />
              
              <div className="relative z-10 w-full h-full bg-white/40 dark:bg-black/20 rounded-[1.85rem] backdrop-blur-md border border-white/50 dark:border-white/5 p-6 flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">KeepVault Secure</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Encrypted Storage</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                    Protected
                  </div>
                </div>

                {/* Secure Files List */}
                <div className="space-y-4 mb-auto">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Recent Uploads</h4>
                  {[
                    { name: 'Financial_Report_Q4.pdf', size: '2.4 MB', icon: FileText, color: 'text-blue-500' },
                    { name: 'Seed_Round_Contracts.zip', size: '14.2 MB', icon: Shield, color: 'text-purple-500' },
                    { name: 'Passport_Scan.jpg', size: '4.1 MB', icon: FileText, color: 'text-pink-500' },
                  ].map((file, i) => (
                    <div key={i} className="group flex items-center gap-4 p-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-transparent hover:border-purple-200 dark:hover:border-white/10 hover:shadow-sm transition-all cursor-pointer">
                      <div className={`p-2 rounded-xl bg-white dark:bg-black/30 shadow-sm ${file.color}`}>
                        <file.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>
                      </div>
                      <Cloud className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>

                {/* Storage Status */}
                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-500/10">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Storage Status</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">45GB of 1TB Used</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">4.5%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '4.5%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Floating Review Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -right-12 top-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-r from-purple-400 to-pink-400" />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Loved by Thousands</p>
              </div>
            </motion.div>

            {/* Floating Security Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute -left-12 bottom-32 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 p-3 rounded-2xl shadow-xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Military Grade</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Zero-Knowledge</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}