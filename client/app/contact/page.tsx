'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, HelpCircle, Sparkles, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen relative bg-[#faf9f6] dark:bg-[#030014] transition-colors duration-1000 overflow-hidden">
      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-cyan-600/20 blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-10 bg-white/40 dark:bg-white/5 border border-purple-200/50 dark:border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-200 dark:to-pink-200 uppercase">
              Support Center
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white uppercase mb-8"
          >
            Get in <br />
            <span className="relative inline-block mt-4">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-purple-600 via-pink-500 to-purple-800 dark:from-white dark:via-purple-200 dark:to-purple-500 drop-shadow-sm">
                TOUCH.
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-4 left-0 h-4 bg-purple-500/20 dark:bg-purple-500/40 -z-0 blur-sm"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Have questions about encryption? Need a custom quote? Our dedicated security experts are here to help 24/7.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-10 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-white dark:border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none group-hover:bg-purple-500/20 transition-all" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase mb-8 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-purple-500" />
                  Connect
                </h3>
                
                <div className="space-y-8">
                  {[
                    { label: 'Support Email', value: 'firozkhan192006@gmail.com', icon: Mail, color: 'text-purple-500' },
                    { label: 'General Inquiry', value: 'hello@keepvault.com', icon: HelpCircle, color: 'text-pink-500' },
                    { label: 'Global Office', value: 'IND / Remote', icon: MapPin, color: 'text-blue-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group/item">
                      <div className={`shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-white/10 shadow-lg flex items-center justify-center group-hover/item:scale-110 transition-transform ${item.color}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl text-white relative overflow-hidden">
               <ShieldCheck className="absolute top-[-10%] right-[-10%] w-40 h-40 opacity-10 rotate-12" />
               <h4 className="text-2xl font-black tracking-tighter uppercase mb-2">Guaranteed Response</h4>
               <p className="text-purple-100 font-medium">All inquiries are answered within 12 hours by our security team.</p>
            </div>
          </motion.div>

          {/* Right Panel: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-8 lg:p-12 rounded-[2.5rem] bg-white/40 dark:bg-white/5 border border-white dark:border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white uppercase mb-10">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Name</label>
                <input 
                  className="w-full px-5 py-4 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Email</label>
                <input 
                  className="w-full px-5 py-4 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                  placeholder="john@example.com" 
                  required 
                  type="email" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Subject</label>
                <input 
                  className="w-full px-5 py-4 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                  placeholder="How can we help?" 
                  required 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Message</label>
                <textarea 
                  className="w-full px-5 py-4 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all h-40 placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none" 
                  placeholder="Tell us about your security needs..." 
                  required 
                />
              </div>
              
              <div className="md:col-span-2 pt-4">
                <Button className="w-full h-16 rounded-2xl bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 text-lg font-black uppercase tracking-tight shadow-2xl shadow-purple-500/20 group transition-all">
                  <span className="flex items-center gap-2">
                    Transmit Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
