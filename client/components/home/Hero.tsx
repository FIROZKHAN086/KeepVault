'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  AnimatePresence 
} from 'framer-motion';
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
  Play,
  Fingerprint,
  ShieldCheck,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Separate component for particles to avoid hydration mismatch from Math.random()
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: [null, "-20%", "120%"],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-1 h-1 bg-purple-500 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-start overflow-hidden bg-[#faf9f6] dark:bg-[#030014] transition-colors duration-1000"
    >
      {/* --- Dynamic Background Layer --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-[120px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-cyan-600/20 blur-[120px]"
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full bg-pink-500/5 dark:bg-fuchsia-600/10 blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* --- Main Content --- */}
      <motion.div 
        style={{ opacity, scale, y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-48 flex flex-col items-center text-center"
      >
        {/* Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative inline-flex items-center gap-2 px-6 py-2 rounded-full mb-10 bg-white/40 dark:bg-white/5 border border-purple-200/50 dark:border-white/10 backdrop-blur-xl shadow-2xl transition-all hover:bg-white/60 dark:hover:bg-white/10"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
          <span className="text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-200 dark:to-pink-200">
            Version 2.0 is now live
          </span>
          <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white">
            SECURE <br />
            <span className="relative inline-block mt-4">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-purple-600 via-pink-500 to-purple-800 dark:from-white dark:via-purple-200 dark:to-purple-500 drop-shadow-sm">
                EVERYTHING.
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-4 left-0 h-4 bg-purple-500/20 dark:bg-purple-500/40 -z-0 blur-sm"
              />
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl font-medium leading-relaxed"
        >
          The world's most elegant <span className="text-gray-900 dark:text-white font-bold underline decoration-purple-500/50 underline-offset-4">zero-knowledge</span> vault for your sensitive files, credentials, and digital assets.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
        >
          <Link href="/register">
            <Button size="lg" className="h-16 px-10 text-lg bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-2xl shadow-2xl shadow-purple-500/20 group transition-all">
              Create Secure Vault
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToHowItWorks}
            className="h-16 px-10 text-lg border-2 border-gray-200 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            <Play className="mr-2 w-5 h-5 fill-current" />
            See How It Works
          </Button>
        </motion.div>

        {/* Floating Particles Component */}
        <FloatingParticles />

        {/* Feature Grid Reveal */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          {[
            { icon: ShieldCheck, label: "Military Grade", color: "text-blue-500" },
            { icon: Fingerprint, label: "Biometric Auth", color: "text-purple-500" },
            { icon: EyeOff, label: "Zero-Knowledge", color: "text-pink-500" },
            { icon: Cloud, label: "Auto-Sync", color: "text-cyan-500" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white dark:border-white/10 backdrop-blur-md flex flex-col items-center gap-3 group transition-all hover:shadow-xl dark:hover:bg-white/10"
            >
              <div className={`p-3 rounded-2xl bg-white dark:bg-white/10 shadow-sm ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-200">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* --- Scroll-Based Decorative Elements --- */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none">
        {/* Floating Card Parallax */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [100, -300]), rotate: -12 }}
          className="absolute left-[-5%] bottom-1/4 w-72 h-48 bg-white/80 dark:bg-[#1a1428]/80 backdrop-blur-2xl rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl p-6 hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                <Lock className="w-5 h-5" />
             </div>
             <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">ENCRYPTING...</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Passport_Scan.jpg</p>
             </div>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-full bg-purple-500" 
            />
          </div>
        </motion.div>

        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [200, -200]), rotate: 8 }}
          className="absolute right-[2%] bottom-1/3 w-64 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-[2.5rem] shadow-2xl p-8 text-white hidden lg:block"
        >
          <Shield className="w-12 h-12 mb-6 opacity-50" />
          <h3 className="text-2xl font-black leading-tight mb-2">ULTRA <br /> SECURE</h3>
          <p className="text-sm font-medium text-purple-100">Your data never leaves your device unencrypted.</p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-white/20 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-purple-600 dark:bg-purple-400 rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
}