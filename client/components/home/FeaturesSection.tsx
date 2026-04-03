'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  CloudUpload, Share2, Search, Bell, Users, Archive, Lock,
  Zap, Globe, Smartphone, FolderSync, History, Tag, Star, Sparkles, Shield,
  Database, Settings, Heart, CheckCircle2, ArrowRight, Layers
} from 'lucide-react';

const mainFeatures = [
  {
    icon: CloudUpload,
    title: "Smart Cloud Sync",
    description: "Automatically sync your documents across all devices with real-time updates and offline access.",
    benefits: ["Real-time sync", "Offline access", "Cross-platform"],
    color: "from-purple-500 to-pink-500",
    gradient: "from-purple-600/20 to-pink-600/20",
  },
  {
    icon: Lock,
    title: "Military-Grade Security",
    description: "End-to-end encryption with zero-knowledge architecture. Your data stays private, always.",
    benefits: ["256-bit AES", "Zero knowledge", "Biometric auth"],
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-600/20 to-cyan-600/20",
  },
  {
    icon: Share2,
    title: "Secure File Sharing",
    description: "Share documents with password protection, expiration dates, and granular permission controls.",
    benefits: ["Password protect", "Expiry dates", "Permission control"],
    color: "from-emerald-500 to-teal-500",
    gradient: "from-emerald-600/20 to-teal-600/20",
  },
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Find any document instantly with intelligent search that recognizes text, tags, and content.",
    benefits: ["OCR technology", "Smart tags", "Content search"],
    color: "from-orange-500 to-red-500",
    gradient: "from-orange-600/20 to-red-600/20",
  },
  {
    icon: History,
    title: "Version Control",
    description: "Never lose changes with automatic version history. Restore any previous version with one click.",
    benefits: ["Auto backups", "Version restore", "Change tracking"],
    color: "from-indigo-500 to-purple-500",
    gradient: "from-indigo-600/20 to-purple-600/20",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time collaboration, comments, and team workspaces.",
    benefits: ["Real-time editing", "Comments", "Team spaces"],
    color: "from-rose-500 to-pink-500",
    gradient: "from-rose-600/20 to-pink-600/20",
  }
];

const additionalFeatures = [
  { icon: FolderSync, title: "Auto Backup", description: "Automatic backups every hour" },
  { icon: Smartphone, title: "Mobile Access", description: "Full functionality on iOS & Android" },
  { icon: Tag, title: "Smart Tags", description: "AI-powered auto-tagging system" },
  { icon: Bell, title: "Real-time Alerts", description: "Instant notifications for activity" },
  { icon: Globe, title: "Global Access", description: "Access from anywhere, anytime" },
  { icon: Archive, title: "Archive System", description: "Organize old documents easily" },
  { icon: Zap, title: "Lightning Fast", description: "Optimized for speed & performance" },
  { icon: Shield, title: "2FA Security", description: "Two-factor authentication" },
  { icon: Database, title: "Cloud Storage", description: "Scalable enterprise storage" },
  { icon: Settings, title: "Custom Settings", description: "Personalize your experience" },
];

const integrations = [
  { name: "Google Drive", icon: "G", color: "from-red-500 to-orange-500" },
  { name: "Dropbox", icon: "D", color: "from-blue-500 to-indigo-500" },
  { name: "OneDrive", icon: "O", color: "from-blue-600 to-cyan-500" },
  { name: "Slack", icon: "S", color: "from-purple-500 to-pink-500" },
  { name: "Teams", icon: "T", color: "from-indigo-500 to-purple-500" },
  { name: "Gmail", icon: "M", color: "from-red-500 to-pink-500" },
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Advanced scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const headerY = useTransform(smoothProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const bgY1 = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const bgY2 = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        delay: custom * 0.1, 
        type: "spring" as const, 
        stiffness: 100,
        damping: 15
      },
    }),
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 2,
      rotateX: -2,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 400, damping: 10 },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.05, type: "spring" as const },
    }),
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0px 10px 30px rgba(168, 85, 247, 0.2)",
      borderColor: "rgba(168, 85, 247, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section suppressHydrationWarning ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-[#F8FAE5] dark:from-[#1a1515] dark:to-[#110e0e] perspective-[2000px]">
      {/* Advanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: bgY1 }} className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <motion.div style={{ y: bgY2 }} className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        
        {/* Floating Orbs using Framer Motion */}
        <motion.div 
          animate={{ y: [-20, 20, -20], x: [-20, 20, -20], rotate: [0, 45, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-32 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ y: [30, -30, 30], x: [30, -30, 30], rotate: [0, -45, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-32 w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20 lg:mb-28"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-white/40 dark:border-white/20 shadow-xl"
          >
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tracking-wide uppercase">Next-Gen Capabilities</span>
            <Zap className="w-4 h-4 text-purple-500" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white leading-tight drop-shadow-sm"
          >
            Everything You Need
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">to Manage Securely</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Discover why thousands of users trust KeepVault for their document management needs.
            Powerful features combined with enterprise-grade security.
          </motion.p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-28"
          style={{ transformStyle: "preserve-3d" }}
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative cursor-pointer z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition duration-700`} />
              
              <div className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-white/10 shadow-2xl overflow-hidden h-full transform transition-all duration-300">
                
                {/* Advanced Shine Effect */}
                <motion.div 
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={hoveredIndex === index ? { x: '200%', opacity: 0.3 } : { x: '-100%', opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 z-0"
                />

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotateZ: hoveredIndex === index ? [0, -10, 10, -5, 5, 0] : 0,
                      scale: hoveredIndex === index ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                    className={`bg-gradient-to-br ${feature.color} rounded-2xl p-4 inline-block mb-6 shadow-xl ring-4 ring-white/20 dark:ring-black/20`}
                  >
                    <feature.icon className="w-8 h-8 text-white drop-shadow-md" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0.8, x: hoveredIndex === index ? 5 : 0 }}
                        transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className={`p-1 rounded-full bg-gradient-to-r ${feature.color}`}>
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Animated Bottom Line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${feature.color} rounded-b-3xl`}
                  initial={{ width: "0%", left: "50%" }}
                  animate={{ width: hoveredIndex === index ? "100%" : "0%", left: hoveredIndex === index ? "0%" : "50%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mb-32 relative"
        >
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              And So Much More...
            </motion.h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore additional features that make KeepVault the best choice
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={badgeVariants}
                whileHover="hover"
                className="group relative z-10"
              >
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-100 dark:border-white/10 transition-colors duration-500 text-center h-full flex flex-col items-center justify-center">
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ duration: 0.4 }}
                    className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl mb-4 text-purple-600 dark:text-purple-400"
                  >
                    <feature.icon className="w-7 h-7" />
                  </motion.div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integrations Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-10 lg:p-16 border border-white/50 dark:border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <Layers className="w-48 h-48 text-purple-500" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-6">
                  Integrations
                </div>
                <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                  Connect seamlessly with your favorite tools
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                  KeepVault integrates natively with the platforms you already use, creating a unified workspace for all your files.
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  View All Integrations
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotate: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: "spring" }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.15,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  className="group flex flex-col items-center justify-center p-4 cursor-pointer"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300 transform group-hover:-translate-y-2`}>
                    <span className="text-3xl font-black text-white">{integration.icon}</span>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="mt-4 font-semibold text-gray-700 dark:text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {integration.name}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating Embellishments */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 top-1/4 hidden xl:flex items-center justify-center w-16 h-16 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl"
        >
          <Star className="w-8 h-8 text-yellow-500 drop-shadow-md" />
        </motion.div>
        
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-10 bottom-1/3 hidden xl:flex items-center justify-center w-16 h-16 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl"
        >
          <Heart className="w-8 h-8 text-rose-500 drop-shadow-md" />
        </motion.div>

      </div>
    </section>
  );
}