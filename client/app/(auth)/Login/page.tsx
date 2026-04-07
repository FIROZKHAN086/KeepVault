'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoginMutation } from '@/store/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, Zap, Star, AlertCircle, Loader2 } from 'lucide-react';


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
    <div className="min-h-screen flex bg-[#faf9f6] dark:bg-[#0a0612]">

      {/* ── Left Panel: Visual ── */}
      <div className="hidden lg:flex flex-col w-[46%] relative bg-linear-to-br from-violet-600 via-purple-700 to-fuchsia-700 overflow-hidden">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
        
        {/* Floating orbs */}
        <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-fuchsia-400/20 blur-3xl" />
        
        {/* Brand */}
        <div className="relative z-10 px-12 pt-12">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">KeepVault</span>
          </Link>
        </div>
        
        {/* Center Content */}
        <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-12 py-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Your vault,<br />always secure.
            </h2>
            <p className="text-violet-200 text-base leading-relaxed max-w-xs mb-10">
              Military-grade encryption protects every document you store. Access from anywhere, anytime.
            </p>

            {/* Feature pills */}
            <div className="space-y-3">
              {[
                { icon: Shield, text: 'AES-256 bit encryption at rest' },
                { icon: Zap, text: 'Instant access across all devices' },
                { icon: Star, text: 'Trusted by 10,000+ professionals' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
                    <f.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom testimonial */}
        <div className="relative z-10 px-12 pb-10">
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
            <p className="text-white/90 text-sm italic leading-relaxed mb-3">
              "KeepVault transformed how our team handles sensitive documents. It's fast, secure, and incredibly easy to use."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-fuchsia-300 to-violet-300 flex items-center justify-center text-violet-900 text-xs font-bold">S</div>
              <div>
                <p className="text-white text-xs font-semibold">Sarah Johnson</p>
                <p className="text-violet-300 text-xs">CEO, TechStart Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[400px]"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black text-gray-900 dark:text-white">KeepVault</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              New here?{' '}
              <Link href="/register" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline underline-offset-2 transition-all">
                Create a free account
              </Link>
            </p>
          </div>

          {/* Google Button
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-all duration-200 shadow-sm mb-5"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </motion.button> */}

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase">or with email</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none text-sm font-medium transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                <button type="button" className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-semibold">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none text-sm font-medium transition-colors"
                />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="relative w-full overflow-hidden py-3 rounded-xl font-bold text-white text-sm group shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow disabled:opacity-60"
            >
              <span className="absolute inset-0 bg-linear-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </span>
            </motion.button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600 leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="underline cursor-pointer hover:text-gray-600 dark:hover:text-gray-400">Terms</span>
            {' '}and{' '}
            <span className="underline cursor-pointer hover:text-gray-600 dark:hover:text-gray-400">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
