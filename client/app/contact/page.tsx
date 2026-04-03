'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified form logic
    alert('Message sent! We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-[#0d0914] pt-20">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-300/30 dark:bg-fuchsia-600/10 blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            >
              Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">Touch.</span>
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Have questions about security? Need a custom enterprise quote? Our team is here to help you secure what matters most.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {[
                { label: 'Support Email', value: 'firozkhan192006@gmail.com', icon: Mail, color: 'bg-purple-100 dark:bg-purple-900/30' },
                { label: 'General Inquiry', value: 'firozkhan192006@gmail.com', icon: HelpCircle, color: 'bg-blue-100 dark:bg-blue-900/30' },
                { label: 'Global Office', value: 'IND', icon: MapPin, color: 'bg-emerald-100 dark:bg-emerald-900/30' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/60 dark:bg-white/5 border border-purple-100 dark:border-white/10 backdrop-blur-md shadow-sm">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="p-8 lg:p-10 rounded-[2.5rem] bg-white dark:bg-[#1a1428]/60 border border-purple-200/50 dark:border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-10 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm" placeholder="john@email.com" required type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Subject</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm" placeholder="Security Inquiry" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm h-32" placeholder="Tell us more about your needs..." required />
                </div>
                <Button className="w-full py-6 rounded-2xl text-lg font-bold bg-gray-900 dark:bg-white dark:text-gray-900 hover:shadow-2xl transition-all shadow-xl shadow-purple-500/10">
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="w-5 h-5" />
                  </span>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
