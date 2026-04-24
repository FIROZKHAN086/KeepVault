'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Users, Globe, Zap, Heart, Sparkles, ArrowDown, ShieldCheck, EyeOff, Cloud } from 'lucide-react';
import { useRef } from 'react';

const stats = [
  { label: 'Active Users', value: '10K+', icon: Users, color: 'text-purple-500' },
  { label: 'Countries', value: '50+', icon: Globe, color: 'text-pink-500' },
  { label: 'Files Secured', value: '500K+', icon: Shield, color: 'text-blue-500' },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#faf9f6] dark:bg-[#030014] transition-colors duration-1000">
      {/* --- Background --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-cyan-600/20 blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-10 bg-white/40 dark:bg-white/5 border border-purple-200/50 dark:border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-200 dark:to-pink-200 uppercase">
                Behind the vault
              </span>
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white uppercase mb-12">
              Privacy <br />
              <span className="relative inline-block mt-4">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-purple-600 via-pink-500 to-purple-800 dark:from-white dark:via-purple-200 dark:to-purple-500 drop-shadow-sm">
                  REDEFINED.
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute bottom-4 left-0 h-4 bg-purple-500/20 dark:bg-purple-500/40 -z-0 blur-sm"
                />
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed mb-16">
              KeepVault was born from a simple mission: to create a truly secure, zero-knowledge sanctuary for life's most precious digital assets. We don't just store data; we protect your digital legacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-white dark:border-white/10 backdrop-blur-xl shadow-2xl transition-all hover:bg-white/60 dark:hover:bg-white/10 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/10 shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">{stat.value}</h3>
                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 uppercase leading-[1.1]">
                  Built on Trust and <br />
                  <span className="text-purple-600 dark:text-purple-400">Pure Innovation</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium">
                  We started KeepVault with a vision to revolutionize document management. Most platforms prioritize convenience over security—we decided to do both. Our zero-knowledge architecture ensures that even we cannot see your files. Only you hold the keys.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Privacy First', desc: 'Your data is encrypted before it ever leaves your device.', icon: EyeOff, color: 'text-purple-500' },
                    { title: 'Military Grade', desc: 'AES-256 bit encryption protecting every byte.', icon: ShieldCheck, color: 'text-pink-500' },
                    { title: 'Cloud Sync', desc: 'Accessible everywhere, synced instantly across devices.', icon: Cloud, color: 'text-blue-500' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5 p-6 rounded-3xl bg-white/30 dark:bg-white/5 border border-white/50 dark:border-white/10 backdrop-blur-md"
                    >
                      <div className={`shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm ${item.color}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-[3rem] blur-2xl opacity-20 dark:opacity-30 animate-pulse" />
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white dark:border-white/20 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Secure Technology" 
                    className="object-cover w-full h-full" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-10 left-10 right-10 p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20">
                     <div className="flex items-center gap-4 mb-2">
                        <Shield className="w-6 h-6 text-purple-400" />
                        <span className="text-white font-black tracking-tighter uppercase">Verified Protection</span>
                     </div>
                     <p className="text-white/70 text-sm font-medium">Industry-leading standards for digital asset security.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA or Decorative */}
      <section className="py-20 text-center relative z-10">
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
         >
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
         </motion.div>
      </section>
    </div>
  );
}
