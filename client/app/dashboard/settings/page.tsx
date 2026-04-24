'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  ChevronRight,
  UserCircle,
  Key,
  Database,
  Eye,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">
          SETTINGS
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Manage your account preferences and security protocols.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-12 gap-12"
      >
        {/* Navigation / Profile Summary */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-[2.5rem] bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-xl shadow-purple-500/20">
                <UserCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">User Profile</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Standard Account</p>
              <Button variant="outline" className="w-full rounded-2xl border-gray-200 dark:border-white/10">
                Edit Avatar
              </Button>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-4 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10"
          >
            <nav className="space-y-1">
              {[
                { icon: User, label: 'Profile Settings' },
                { icon: Shield, label: 'Security & Privacy' },
                { icon: Bell, label: 'Notifications' },
                { icon: Database, label: 'Data Management' },
              ].map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    i === 0 
                      ? 'bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {i === 0 && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500" />}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Settings Forms */}
        <div className="lg:col-span-8 space-y-8">
          <motion.section 
            variants={itemVariants}
            className="p-10 rounded-[2.5rem] bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">Profile Information</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Full Name</label>
                  <input className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">Email Address</label>
                  <input className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <Button className="h-14 px-8 bg-gray-900 dark:bg-white dark:text-black rounded-2xl font-bold">
                Save Changes
              </Button>
            </div>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            className="p-10 rounded-[2.5rem] bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                <Key className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">Security Protocols</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Two-Factor Authentication', desc: 'Secure your account with 2FA.', enabled: true },
                { label: 'Login History', desc: 'Monitor your recent account activity.', enabled: false },
                { label: 'Session Management', desc: 'Log out from other devices.', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200 dark:border-white/10 text-xs font-bold">
                    CONFIGURE
                  </Button>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}