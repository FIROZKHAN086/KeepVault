'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoginMutation } from '@/store/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Shield, 
  Zap, 
  Star, 
  AlertCircle, 
  Loader2,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setUser(res.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#faf9f6] dark:bg-[#030014] transition-colors duration-1000 p-4">
      {/* --- Dynamic Background Layer --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-cyan-600/20 blur-[120px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <Link href="/" className="absolute top-8 left-8 z-50">
        <Button variant="ghost" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white dark:border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Left Side: Visuals/Marketing */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-purple-600/10 to-pink-600/10 dark:from-purple-600/20 dark:to-pink-600/20 border-r border-white dark:border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-xl shadow-purple-500/20">
                <Lock className="w-6 h-6 text-white dark:text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">KeepVault</span>
            </div>

            <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.9] mb-6 uppercase">
              Secure <br /> Access.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-xs leading-relaxed">
              Login to your encrypted vault and manage your digital legacy.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Shield, text: "Zero-Knowledge Encryption", color: "text-purple-500" },
              { icon: Zap, text: "Instant Synchronization", color: "text-pink-500" },
              { icon: Star, text: "Military-Grade Protection", color: "text-blue-500" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-4 group"
              >
                <div className={`p-3 rounded-xl bg-white dark:bg-white/5 border border-white dark:border-white/10 shadow-sm transition-all group-hover:scale-110 ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-200">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-3 uppercase">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Don't have an account?{' '}
              <Link href="/register" className="text-purple-600 dark:text-purple-400 font-bold hover:underline underline-offset-4 transition-all">
                Register now
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 rounded-2xl bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 text-lg font-black uppercase tracking-tight shadow-2xl shadow-purple-500/20 group transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-100 dark:border-white/10 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
              Secure Zero-Knowledge Access
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
