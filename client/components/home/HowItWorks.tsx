'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Upload, Lock, CheckCircle2, ArrowRight,
  Sparkles, Shield, Clock, Globe, Smartphone, Zap,
  Star, Trophy, Rocket, PlayCircle, Fingerprint
} from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your free account in under 30 seconds. No credit card required, start with 5GB free storage.",
    icon: UserPlus,
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-400",
    benefits: ["Free 5GB storage", "No credit card", "30-second setup"],
    gradient: "from-purple-600/20 to-pink-600/20",
    stat: "10K+ users joined this week"
  },
  {
    number: "02",
    title: "Upload Documents",
    description: "Drag & drop or choose files. Our smart system automatically organizes and encrypts your documents.",
    icon: Upload,
    color: "from-blue-500 to-cyan-500",
    textColor: "text-cyan-400",
    benefits: ["Drag & drop", "Auto encryption", "Smart organization"],
    gradient: "from-blue-600/20 to-cyan-600/20",
    stat: "500K+ documents uploaded daily"
  },
  {
    number: "03",
    title: "Access Anytime",
    description: "Your vault is available 24/7 on any device. Secure, fast, and always encrypted.",
    icon: Lock,
    color: "from-emerald-500 to-teal-500",
    textColor: "text-emerald-400",
    benefits: ["Any device", "24/7 access", "Bank-grade security"],
    gradient: "from-emerald-600/20 to-teal-600/20",
    stat: "99.99% uptime guaranteed"
  }
];

const features = [
  { icon: Shield, text: "Military-grade encryption", delay: 0 },
  { icon: Globe, text: "Access from anywhere", delay: 0.1 },
  { icon: Smartphone, text: "Mobile optimized", delay: 0.2 },
  { icon: Clock, text: "24/7 support", delay: 0.3 },
  { icon: Zap, text: "Lightning fast", delay: 0.4 },
  { icon: Trophy, text: "Award-winning", delay: 0.5 },
];

const testimonials = [
  { text: "Took me 2 minutes to set up and start uploading! Incredibly fast.", author: "Sarah J.", role: "Business Owner", rating: 5 },
  { text: "The zero-knowledge encryption gives me ultimate peace of mind.", author: "Michael C.", role: "Financial Advisor", rating: 5 },
  { text: "Finally a highly secure cloud solution that's actually easy to use.", author: "Emily R.", role: "Legal Consultant", rating: 5 },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  // Parallax section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Scroll-linked connector in the steps array
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start 60%", "end 60%"]
  });
  
  const connectorScale = useTransform(stepsProgress, [0, 1], [0, 1]);
  const connectorSpring = useSpring(connectorScale, { stiffness: 80, damping: 20 });
  
  const sectionBgY1 = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const sectionBgY2 = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        delay: custom * 0.15, 
        type: "spring" as const, 
        stiffness: 100,
        damping: 15
      },
    }),
    hover: {
      y: -15,
      scale: 1.02,
      rotateY: -2,
      rotateX: 2,
      boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.1)",
      transition: { duration: 0.3, type: "spring" as const, stiffness: 300, damping: 10 },
    },
  };

  const featureItemVariants = {
    hidden: { scale: 0, opacity: 0, y: 20 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.08, type: "spring"as const, stiffness: 200 },
    }),
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-[#F8FAE5] via-white to-[#F8FAE5] dark:from-[#110e0e] dark:via-[#1a1515] dark:to-[#110e0e] perspective-[2000px]">
      {/* Scroll-based Parallax Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: sectionBgY1, scale: useTransform(smoothProgress, [0, 1], [0.8, 1.2]) }}
          className="absolute top-10 right-20 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: sectionBgY2, scale: useTransform(smoothProgress, [0, 1], [1.2, 0.8]) }}
          className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-[0.04] dark:opacity-[0.05] mix-blend-overlay [mask-image:linear-gradient(to_bottom,white,transparent_80%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-24 lg:mb-32"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-8 border border-gray-200 dark:border-white/20 shadow-lg"
          >
            <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">3-Step Process</span>
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white">
            Get Started in Minutes
            <br />
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent opacity-80 mt-2 block text-3xl sm:text-4xl lg:text-5xl font-bold">Not Hours</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who trust KeepVault. Follow these simple steps to seamlessly protect and organize your valuable documents today.
          </p>
        </motion.div>

        {/* Dynamic Connected Steps Array */}
        <div ref={stepsContainerRef} className="relative mb-32">
          {/* Scroll-Driven Connectors (Desktop Only) */}
          <div className="hidden lg:block absolute top-[15%] left-[10%] right-[10%] h-1 bg-gray-200/50 dark:bg-gray-800/50 rounded-full z-0 overflow-hidden">
            <motion.div
              style={{ scaleX: connectorSpring }}
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-500 origin-left"
            />
          </div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-10 lg:gap-12 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
                className="relative group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Number Watermark backdrop */}
                <motion.div 
                  className="absolute -top-12 -left-6 lg:-top-16 lg:-left-8 text-8xl lg:text-9xl font-black italic select-none pointer-events-none"
                  animate={{
                    opacity: hoveredStep === index ? 0.2 : 0.05,
                    y: hoveredStep === index ? -10 : 0
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <span className={`bg-gradient-to-b whitespace-nowrap ${step.color} bg-clip-text text-transparent`}>
                    {step.number}
                  </span>
                </motion.div>

                <div className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 pt-12 border border-gray-100 dark:border-white/10 shadow-xl overflow-hidden h-full">
                  
                  {/* Glowing core upon hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        scale: hoveredStep === index ? 1.1 : 1,
                        rotateZ: hoveredStep === index ? [0, -10, 10, -5, 5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`bg-gradient-to-r ${step.color} rounded-2xl p-4 inline-block mb-6 shadow-xl ring-4 ring-white/30 dark:ring-black/20`}
                    >
                      <step.icon className="w-8 h-8 text-white drop-shadow-md" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {step.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: hoveredStep === index ? 1 : 0.7, x: hoveredStep === index ? 5 : 0 }}
                          transition={{ delay: i * 0.1 + 0.1 }}
                          className="flex items-center gap-3 text-sm font-medium"
                        >
                          <div className={`p-1 rounded-full bg-gradient-to-r ${step.color}`}>
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Live Stat Banner */}
                    <div className="pt-5 border-t border-gray-100 dark:border-white/10 flex items-center gap-3">
                      <motion.div 
                        animate={{ opacity: [1, 0.4, 1] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className={`w-2.5 h-2.5 rounded-full ${step.textColor.replace('text-', 'bg-')}`} 
                      />
                      <span className={`text-xs font-bold uppercase tracking-wider ${step.textColor}`}>
                        {step.stat}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sophisticated Interactive Demo Screen */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-32 overflow-hidden bg-gray-50/80 dark:bg-black/20 backdrop-blur-xl rounded-3xl p-6 lg:p-12 border border-gray-200/50 dark:border-white/10 shadow-2xl"
        >
          {/* Subtle bg glow for the container */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Col - Selectors */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 text-white to-pink-600 rounded-full px-4 py-1.5 mb-6 shadow-md">
                <PlayCircle className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase">Live Simulation</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-8">
                Watch KeepVault in Action
              </h3>
              
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`cursor-pointer p-5 rounded-2xl transition-all duration-500 relative overflow-hidden group ${
                      activeStep === index 
                        ? 'bg-white dark:bg-white/10 border-l-4 border-l-purple-500 shadow-xl'
                        : 'bg-white/40 dark:bg-white/5 border-l-4 border-l-transparent hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                    onClick={() => setActiveStep(index)}
                    whileHover={{ scale: activeStep === index ? 1 : 1.02 }}
                  >
                    {activeStep === index && (
                      <motion.div 
                        layoutId="activeTabOutline" 
                        className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-50`}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${activeStep === index ? `bg-gradient-to-r ${step.color} text-white scale-110` : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-bold text-lg mb-1 transition-colors ${activeStep === index ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                            {step.title}
                          </p>
                          <p className={`text-sm tracking-wide ${activeStep === index ? step.textColor : 'text-gray-500'} hidden sm:block`}>
                            Step {step.number} Protocol
                          </p>
                        </div>
                      </div>
                      
                      {/* Active indicator check */}
                      {activeStep === index && (
                        <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}>
                          <CheckCircle2 className="w-6 h-6 text-purple-500 drop-shadow-lg" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right Col - Visual Stage */}
            <div className="relative h-[480px] w-full perspective-[1200px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, rotateY: 30, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
                  exit={{ opacity: 0, rotateY: -30, scale: 0.8, x: -50 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
                  className="absolute inset-0 m-auto flex items-center justify-center"
                >
                  <div className={`w-full max-w-sm h-full max-h-[400px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/40 dark:border-white/10 shadow-3xl text-center flex flex-col justify-center items-center relative overflow-hidden`}>
                    
                    <div className={`absolute -inset-20 bg-gradient-to-tr ${steps[activeStep].gradient} opacity-50 blur-[80px] pointer-events-none`} />

                    <div className={`relative bg-gradient-to-br ${steps[activeStep].color} rounded-full w-24 h-24 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,0,0,0.2)]`}>
                      {activeStep === 0 && <Fingerprint className="w-12 h-12 text-white" />}
                      {activeStep === 1 && <Lock className="w-12 h-12 text-white" />}
                      {activeStep === 2 && <Shield className="w-12 h-12 text-white" />}
                    </div>

                    <h4 className="text-2xl font-black text-gray-800 dark:text-white mb-3 tracking-tight">
                      {steps[activeStep].title} Initialized
                    </h4>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 px-4">
                      {steps[activeStep].description}
                    </p>
                    
                    <div className="w-full space-y-3">
                      {steps[activeStep].benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 + 0.3 }}
                          className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl"
                        >
                          <CheckCircle2 className={`w-4 h-4 ${steps[activeStep].textColor}`} />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Features Floating Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-32"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureItemVariants}
              whileHover="hover"
              className="text-center group cursor-pointer"
            >
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 dark:border-white/10 group-hover:border-purple-300 dark:group-hover:border-purple-500/50 transition-colors duration-500 flex flex-col items-center">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl mb-4 text-purple-600 dark:text-purple-400"
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Streamlined */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-xl relative overflow-hidden"
            >
              {/* Quote mark watermark */}
              <div className="absolute top-4 right-6 text-8xl text-indigo-500/10 font-serif leading-none italic pointer-events-none select-none">
                "
              </div>
              
              <div className="flex gap-1.5 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8 italic text-lg leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 border-t border-gray-100 dark:border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-black">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
          className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-800 rounded-3xl p-10 lg:p-16 text-center shadow-2xl"
        >
          {/* Animated Background Gradients inside CTA */}
          <motion.div
            className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"
          />
          <motion.div
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_50%)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-8 shadow-inner"
            >
              <Rocket className="w-4 h-4 text-pink-300" />
              <span className="text-sm font-bold text-white tracking-widest uppercase">Start Today</span>
            </motion.div>
            
            <h3 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-md">
              Ready to Secure Your Documents?
            </h3>
            
            <p className="text-white/90 text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              Join over 10,000 users who trust KeepVault. Skip the setup headache and encrypt your first file in 30 seconds.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 bg-white text-purple-700 px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-purple-900/50 transition-all duration-300"
            >
              Deploy Your Free Vault Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <div className="mt-8 flex justify-center gap-6 text-sm font-semibold text-white/70">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> No Credit Card</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> 14-Day Free Tier</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Cancel Anytime</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}