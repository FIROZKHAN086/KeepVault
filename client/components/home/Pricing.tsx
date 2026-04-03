'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Zap, User, Building2, Sparkles, ArrowRight, ShieldCheck, CreditCard
} from 'lucide-react';

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals securing personal documents.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: User,
    color: "from-gray-400 to-gray-500",
    textGlow: "text-gray-500 dark:text-gray-400",
    borderGlow: "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20",
    popular: false,
    btnClass: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
    features: [
      "5GB Secure Storage",
      "End-to-End Encryption",
      "1 Vault Workspace",
      "Standard Support",
      "Basic File Sharing"
    ]
  },
  {
    name: "Pro",
    description: "Ideal for professionals needing secure client portals.",
    monthlyPrice: 12,
    yearlyPrice: 10,
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    textGlow: "text-purple-600 dark:text-purple-400",
    borderGlow: "border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    popular: true,
    btnClass: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-xl shadow-purple-500/25",
    features: [
      "250GB Secure Storage",
      "Zero-Knowledge Architecture",
      "Unlimited Vaults",
      "Password-Protected Links",
      "File Expiration Dates",
      "Priority 24/7 Support"
    ]
  },
  {
    name: "Enterprise",
    description: "Advanced controls and massive scale for growing teams.",
    monthlyPrice: 39,
    yearlyPrice: 32,
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    textGlow: "text-blue-600 dark:text-blue-400",
    borderGlow: "border-gray-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50",
    popular: false,
    btnClass: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
    features: [
      "Unlimited Storage",
      "Team Management Roles",
      "Active Directory SSO / SAML",
      "Custom Branded Portals",
      "Immutable Audit Logs",
      "Dedicated Account Manager"
    ]
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const headerY = useTransform(smoothProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  return (
    <section id="pricing" ref={containerRef} className="relative py-24 lg:py-36 overflow-hidden bg-white dark:bg-[#0a0808] perspective-[2000px]">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay dark:opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16 lg:mb-20 z-10 relative"
        >
          <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-white/5 backdrop-blur-md rounded-full px-5 py-2 mb-6 border border-purple-100 dark:border-white/10 shadow-lg">
            <CreditCard className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">Transparent Pricing</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
            Secure Your Assets Today
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Simple, predictable pricing. No hidden fees. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Monthly/Annual Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 overflow-hidden flex items-center p-1 transition-all"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-md"
                style={{ marginLeft: isAnnual ? 'auto' : '0' }}
              />
            </button>
            <span className={`text-sm font-bold transition-colors flex items-center gap-2 ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Annually
              <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs px-2 py-0.5 rounded-full font-black animate-pulse">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto perspective-[1000px]">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;
            const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative bg-white/60 dark:bg-[#151212]/90 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 flex flex-col h-full z-10 transition-shadow ${plan.borderGlow} ${isPopular ? 'border-2 scale-100 lg:scale-105 z-20 overflow-hidden shadow-2xl' : 'border border-gray-100 dark:border-white/5 shadow-xl'}`}
              >
                {/* Popular Plan Highlights */}
                {isPopular && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div className="absolute top-6 right-6 bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      Most Popular
                    </div>
                    {/* Glowing back aura */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 blur-[100px] opacity-20 pointer-events-none" />
                  </>
                )}

                <div className="mb-6 z-10 relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg mb-6`}>
                    <plan.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 h-10">{plan.description}</p>
                </div>

                <div className="mb-8 z-10 relative">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter shadow-sm">
                      ${price}
                    </span>
                    <div className="flex flex-col pb-1">
                      <span className="text-sm font-bold text-gray-500 dark:text-gray-400">/ user</span>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">/ month</span>
                    </div>
                  </div>
                  <div className="h-6 mt-2">
                    <AnimatePresence mode="popLayout">
                      {isAnnual && price > 0 && (
                        <motion.span 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="text-sm font-bold text-emerald-500"
                        >
                          Billed ${price * 12} yearly
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 mb-8 z-10 relative ${plan.btnClass}`}>
                  {price === 0 ? 'Start Free Tier' : 'Select Plan'}
                </button>

                <div className="flex-1 z-10 relative">
                  <p className={`text-xs font-black uppercase tracking-widest mb-6 ${plan.textGlow}`}>
                    What's included
                  </p>
                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br ${plan.color} shadow-sm`}>
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Trust Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          className="mt-20 max-w-4xl mx-auto bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">100% Money-Back Guarantee</h4>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Try KeepVault Pro risk-free for 30 days.</p>
            </div>
          </div>
          <button className="text-sm font-bold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-[#151212] dark:text-white dark:border-white/10 dark:hover:bg-white/5 px-6 py-3 rounded-xl transition-colors shadow-sm">
            Read Refund Policy
          </button>
        </motion.div>

      </div>
    </section>
  );
}
