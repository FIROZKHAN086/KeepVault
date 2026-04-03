'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Lock, 
  Database, 
  Fingerprint, 
  Eye, 
  Server, 
  Cloud, 
  Key,
  CheckCircle,
  Award,
  Sparkles,
  Globe,
  Users,
  Zap,
  Star,
  Crown,
  Heart,
  TrendingUp,
  BadgeCheck,
  FileCheck,
  Clock,
  RefreshCw
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade AES-256 encryption ensures your files are protected from upload to download. Only you hold the keys.",
    color: "from-purple-500 to-pink-500",
    badge: "🔒 Military Grade",
    proof: "256-bit",
    gradient: "from-purple-600/20 to-pink-600/20"
  },
  {
    icon: Eye,
    title: "Privacy-First Approach",
    description: "Zero-knowledge architecture means we never see your data. Your privacy is our top priority, guaranteed by design.",
    color: "from-blue-500 to-cyan-500",
    badge: "🛡️ Zero Knowledge",
    proof: "GDPR Compliant",
    gradient: "from-blue-600/20 to-cyan-600/20"
  },
  {
    icon: Database,
    title: "Secure Cloud Storage",
    description: "Enterprise-grade infrastructure with redundant backups across multiple secure data centers worldwide.",
    color: "from-emerald-500 to-teal-500",
    badge: "📁 99.99% Uptime",
    proof: "ISO 27001",
    gradient: "from-emerald-600/20 to-teal-600/20"
  },
  {
    icon: Fingerprint,
    title: "Biometric Authentication",
    description: "Advanced biometric security with Face ID, Touch ID, and hardware security key support for ultimate protection.",
    color: "from-orange-500 to-red-500",
    badge: "🔐 2FA Ready",
    proof: "FIDO2 Certified",
    gradient: "from-orange-600/20 to-red-600/20"
  }
];

const trustBadges = [
  { icon: Shield, label: "SOC 2 Type II", color: "from-purple-500 to-pink-500", verified: true },
  { icon: Award, label: "ISO 27001", color: "from-blue-500 to-cyan-500", verified: true },
  { icon: Shield, label: "GDPR Compliant", color: "from-emerald-500 to-teal-500", verified: true },
  { icon: Shield, label: "CCPA Ready", color: "from-orange-500 to-red-500", verified: true },
  { icon: Lock, label: "PCI DSS Level 1", color: "from-indigo-500 to-purple-500", verified: true },
  { icon: Shield, label: "HIPAA Compliant", color: "from-rose-500 to-pink-500", verified: true },
  { icon: BadgeCheck, label: "Zero-Knowledge", color: "from-cyan-500 to-blue-500", verified: true },
  { icon: Shield, label: "FedRAMP Ready", color: "from-violet-500 to-purple-500", verified: true },
];

const statistics = [
  { value: "99.99%", label: "Uptime SLA", icon: Clock, trend: "+0.01%" },
  { value: "256-bit", label: "Encryption", icon: Lock, trend: "AES Standard" },
  { value: "0", label: "Data Breaches", icon: Shield, trend: "Since Launch" },
  { value: "24/7", label: "Security Monitoring", icon: Eye, trend: "Real-time" },
];

const securityMetrics = [
  { metric: "Encryption Strength", value: 99.99, color: "from-purple-500 to-pink-500" },
  { metric: "Privacy Score", value: 100, color: "from-blue-500 to-cyan-500" },
  { metric: "Security Grade", value: 98.5, color: "from-emerald-500 to-teal-500" },
  { metric: "Compliance Score", value: 100, color: "from-orange-500 to-red-500" },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMetric, setActiveMetric] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  const controls = useAnimation();
  const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    
    // Floating animations (keep same)
    gsap.to(".floating-shield", {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut" as const,
    });

    gsap.to(".floating-lock", {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut" as const,
    });

    
    gsap.utils.toArray<HTMLElement>(".metric-bar").forEach((el, index) => {
      gsap.fromTo(
        el,
        { width: "0%" },
        {
          width: `${securityMetrics[index].value}%`,
          duration: 1.5,
          ease: "power3.out" as const,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            scrub: 1, 
          },
        }
      );
    });

  }, sectionRef);

  return () => ctx.revert();
}, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const},
    },
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#F8FAE5] via-white to-[#F8FAE5] dark:from-[#110e0e] dark:via-[#1a1515] dark:to-[#110e0e]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gray-200 dark:border-white/20">
            <Shield className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bank-Grade Security</span>
            <Sparkles className="w-3 h-3 text-purple-500" />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 dark:from-white dark:via-purple-400 dark:to-white bg-300% animate-gradient bg-clip-text text-transparent">
            Trust is Our Foundation
            <br />
            <span className="text-gray-600 dark:text-gray-400">Security is Our Promise</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We've built KeepVault with industry-leading security standards and privacy-first principles.
            Your data deserves nothing less than the best protection available.
          </motion.p>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500`} />
              
              <div className={`relative bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300`}>
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full px-2 py-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{feature.badge}</span>
                  </div>
                </div>
                
                {/* Icon */}
                <div className={`bg-gradient-to-r ${feature.color} rounded-xl p-3 inline-block mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                
                {/* Proof Badge */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-white/10">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{feature.proof}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">✓ Verified</span>
                </div>
                
                {/* Hover Animation Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl w-0 group-hover:w-full transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges Wall */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
        //   animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Certified & Compliant</h3>
            <p className="text-gray-600 dark:text-gray-400">Industry-leading certifications and compliance standards</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 text-center">
                  <div className={`bg-gradient-to-r ${badge.color} rounded-lg p-2 inline-block mb-3`}>
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{badge.label}</p>
                  {badge.verified && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-emerald-500 rounded-full p-1">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics & Metrics Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Security by the Numbers</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-emerald-500">{stat.trend}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Metrics Graph */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/10"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Security Performance Metrics</h3>
            <div className="space-y-5">
              {securityMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.metric}</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className={`metric-bar h-full bg-gradient-to-r ${metric.color} rounded-full relative`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Real-time Monitoring Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 text-purple-500 animate-spin" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Updated Live</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security Promise Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative overflow-hidden bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-pink-600/20 dark:to-blue-600/20 rounded-2xl p-8 lg:p-12 border border-purple-200 dark:border-purple-500/30"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Crown className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Our Security Promise</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Your Data, Your Control, Our Commitment
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              We will never access, share, or sell your data. Period. Our business model is built on trust,
              and we're committed to maintaining the highest security standards in the industry.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Privacy-first by design</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Open source audit ready</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Independent security audits</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="floating-shield absolute left-5 top-1/4 hidden xl:block">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30" />
            <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm p-2 rounded-full">
              <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="floating-lock absolute right-5 bottom-1/4 hidden xl:block">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30" />
            <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm p-2 rounded-full">
              <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}