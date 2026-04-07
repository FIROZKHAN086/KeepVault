'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegisterMutation } from '@/store/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, CheckCircle, Check, AlertCircle, Loader2, Sparkles } from 'lucide-react';


const passwordChecks = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [focusPass, setFocusPass] = useState(false);

  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    try {
      const res = await registerUser({ email, password }).unwrap();
      dispatch(setUser(res.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  

  const passStrength = passwordChecks.filter(c => c.test(password)).length;
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen flex bg-[#faf9f6] dark:bg-[#0a0612]">

      {/* ── Left Panel: Visual ── */}
      <div className="hidden lg:flex flex-col w-[46%] relative overflow-hidden bg-linear-to-br from-fuchsia-600 via-violet-700 to-indigo-800">
        <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-3xl" />

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
        <div className="relative z-10 flex-1 flex flex-col justify-center px-12 py-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-200" />
              <span className="text-xs font-semibold text-white/90">Free plan included</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              Join thousands<br />protecting their<br />documents.
            </h2>
            <p className="text-violet-200 text-base leading-relaxed max-w-xs mb-10">
              Get started in seconds. No credit card needed. Cancel anytime.
            </p>

            {/* Steps */}
            <div className="space-y-4">
              {[
                { step: '01', title: 'Create your account', desc: 'Sign up in under 30 seconds' },
                { step: '02', title: 'Upload your documents', desc: 'Drag & drop, all formats supported' },
                { step: '03', title: 'Vault is secure', desc: 'Encrypted and accessible anywhere' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white/70 text-[11px] font-black shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{s.title}</p>
                    <p className="text-violet-300 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 px-12 pb-10">
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: '10K+', label: 'Users' },
              { val: '99.9%', label: 'Uptime' },
              { val: '500K+', label: 'Docs Secured' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-3 py-3 rounded-xl bg-white/10 border border-white/15">
                <p className="text-lg font-black text-white">{stat.val}</p>
                <p className="text-violet-300 text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 lg:py-10 overflow-y-auto">
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
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Create your vault</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline underline-offset-2">
                Sign in
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
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none text-sm font-medium transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-violet-500 dark:focus:border-violet-500 focus:outline-none text-sm font-medium transition-colors"
                />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              <AnimatePresence>
                {(focusPass || password.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2.5 space-y-2 overflow-hidden"
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passStrength ? strengthColors[passStrength] : 'bg-gray-200 dark:bg-white/10'}`} />
                      ))}
                    </div>
                    {password.length > 0 && (
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        Strength: <span className={passStrength === 3 ? 'text-emerald-500' : passStrength >= 2 ? 'text-yellow-500' : 'text-red-500'}>{strengthLabels[passStrength] || 'Too weak'}</span>
                      </p>
                    )}
                    <div className="space-y-1">
                      {passwordChecks.map((check, i) => {
                        const ok = check.test(password);
                        return (
                          <div key={i} className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'}`}>
                            {ok ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                            {check.label}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Confirm password</label>
              <div className="relative">
                <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none text-sm font-medium transition-colors ${
                    confirm.length > 0
                      ? confirm === password
                        ? 'border-emerald-400 dark:border-emerald-500'
                        : 'border-red-400 dark:border-red-500'
                      : 'border-gray-200 dark:border-white/10 focus:border-violet-500 dark:focus:border-violet-500'
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirm.length > 0 && confirm === password && (
                <p className="mt-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="relative w-full overflow-hidden py-3 rounded-xl font-bold text-white text-sm group shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow disabled:opacity-60 mt-2"
            >
              <span className="absolute inset-0 bg-linear-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </span>
            </motion.button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600 leading-relaxed">
            By creating an account, you agree to our{' '}
            <span className="underline cursor-pointer hover:text-gray-600 dark:hover:text-gray-400">Terms of Service</span>
            {' '}and{' '}
            <span className="underline cursor-pointer hover:text-gray-600 dark:hover:text-gray-400">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
