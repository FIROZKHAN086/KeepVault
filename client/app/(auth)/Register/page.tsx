'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegisterMutation } from '@/store/api/apiSlice';
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
  CheckCircle, 
  Check, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ChevronLeft,
  Zap,
  Star,
  SeparatorHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaChrome } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRegisterWithGoogleMutation } from '@/store/api/apiSlice';

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
  const [registerWithGoogle, { isLoading: isGoogleLoading }] = useRegisterWithGoogleMutation();
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

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const res = await registerWithGoogle(token).unwrap();
      dispatch(setUser(res.user));
      router.push('/dashboard');
    } catch (err: any) {
      if (err.message === 'Firebase: Error (auth/popup-blocked).') {
        setError('In your browser settings, allow pop-ups for this site to enable Google login.');
      } else {
        setError('Google registration failed. Please try again.');
      }
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
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-fuchsia-600/10 to-purple-600/10 dark:from-fuchsia-600/20 dark:to-purple-600/20 border-r border-white dark:border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-xl shadow-purple-500/20">
                <Lock className="w-6 h-6 text-white dark:text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">KeepVault</span>
            </div>

            <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.9] mb-6 uppercase">
              Join the <br /> Future.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-xs leading-relaxed">
              Create your zero-knowledge vault and start securing your documents today.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Sparkles, text: "Free Plan Included", color: "text-fuchsia-500" },
              { icon: Shield, text: "Privacy by Design", color: "text-purple-500" },
              { icon: Zap, text: "Set Up in Seconds", color: "text-blue-500" }
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
        <div className="p-8 lg:p-16 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-3 uppercase">Create Vault</h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-600 dark:text-purple-400 font-bold hover:underline underline-offset-4 transition-all">
                Sign in
              </Link>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading}
            className={cn(
              "w-full py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700",
              "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700",
              "transition-all duration-200 flex items-center justify-center gap-3",
              "font-semibold text-gray-700 dark:text-gray-300 mb-6",
              isGoogleLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isGoogleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FaChrome className="w-5 h-5" />
            )}
            <span>Continue with Google</span>
          </motion.button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <SeparatorHorizontal className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 dark:bg-gray-900/80 px-3 text-gray-500 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-white/50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none text-gray-900 dark:text-white font-bold transition-all"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              <AnimatePresence>
                {(focusPass || password.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 pt-2"
                  >
                    <div className="flex gap-2">
                      {[0, 1, 2].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < passStrength ? strengthColors[passStrength] : 'bg-gray-100 dark:bg-white/5'}`} />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {passwordChecks.map((check, i) => {
                        const ok = check.test(password);
                        return (
                          <div key={i} className={`flex items-center gap-2 text-xs font-bold transition-colors ${ok ? 'text-emerald-500' : 'text-gray-400'}`}>
                            {ok ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                            {check.label}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Confirm Password</label>
              <div className="relative group">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-12 pr-12 py-3.5 bg-white/50 dark:bg-white/5 border-2 rounded-2xl focus:outline-none text-gray-900 dark:text-white font-bold transition-all ${
                    confirm.length > 0
                      ? confirm === password
                        ? 'border-emerald-500/50 focus:border-emerald-500'
                        : 'border-red-500/50 focus:border-red-500'
                      : 'border-gray-100 dark:border-white/10 focus:border-purple-500'
                  }`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 rounded-2xl bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 text-lg font-black uppercase tracking-tight shadow-2xl shadow-purple-500/20 group transition-all mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10 text-center">
             <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
              By joining, you agree to our <span className="text-gray-900 dark:text-white underline cursor-pointer">Terms</span> & <span className="text-gray-900 dark:text-white underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}