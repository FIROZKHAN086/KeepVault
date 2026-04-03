'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Users, Globe, Zap, Heart } from 'lucide-react';

const stats = [
  { label: 'Active Users', value: '10K+', icon: Users },
  { label: 'Countries', value: '50+', icon: Globe },
  { label: 'Files Secured', value: '500K+', icon: Shield },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#0d0914] pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/40 dark:bg-purple-600/20 blur-[100px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Our Mission is to <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                Secure Your Legacy.
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              KeepVault was born out of a simple need: a truly secure, private, and elegant way to manage life's most important documents. We believe privacy shouldn't be a luxury, but a default.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-purple-100 dark:border-white/10 backdrop-blur-md shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Built on Trust and Innovation</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                We started KeepVault in 2024 with a vision to revolutionize document management. Most platforms prioritize convenience over security—we decided to do both. Our zero-knowledge architecture ensures that even we cannot see your files. Only you hold the keys.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Privacy First', desc: 'Your data is encrypted before it ever leaves your device.', icon: Lock },
                  { title: 'Speed & Reliability', desc: 'Instant access across all your devices with 99.9% uptime.', icon: Zap },
                  { title: 'User Longevity', desc: 'We build for the long term, ensuring your legacy is safe for years.', icon: Heart },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-6 h-6 text-purple-600 dark:text-purple-400">
                      <item.icon className="w-full h-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                alt="Secure Tech" 
                className="object-cover w-full h-full" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-purple-900/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
