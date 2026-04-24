'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Lock, Menu, X, LayoutDashboard, LogOut, Shield, Home, Info, Mail, Wallet, ChevronRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logout as logoutAction } from '@/store/slices/authSlice';
import { useLogoutUserMutation } from '@/store/api/apiSlice';
import { useRouter } from 'next/navigation';

const navLinks = [
  { name: 'Home',    href: '/',        icon: Home },
  { name: 'About',   href: '/about',   icon: Info },
  { name: 'Pricing', href: '/#pricing',   icon: Wallet },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch   = useDispatch();
  const router     = useRouter();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap();
      dispatch(logoutAction());
      setMobileOpen(false);
      router.push('/login');
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (!mounted) return null;

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? 'U';
  const isDark = theme === 'dark';

  return (
    <>
      <div suppressHydrationWarning className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`relative bg-white/70 dark:bg-[#030014]/70 transition-all duration-700 max-w-6xl mx-auto rounded-2xl ${
            scrolled
              ? 'backdrop-blur-2xl shadow-2xl border border-white/80 dark:border-white/10'
              : 'backdrop-blur-xl border border-white/40 dark:border-white/5'
          }`}
        >

          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] rounded-t-2xl bg-linear-to-r from-transparent via-purple-400/60 to-transparent dark:via-purple-500/40" />

          <div className="flex items-center justify-between px-5 h-[62px]">

            {/* ── Logo ── */}
            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="relative">
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-600 p-[9px] shadow-lg shadow-violet-500/30">
                  <Lock className="w-[18px] h-[18px] text-white" />
                </div>
              </motion.div>
              <div className="flex items-baseline gap-0">
                <span className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Keep</span>
                <span className="text-[17px] font-black bg-linear-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent tracking-tight">Vault</span>
              </div>
            </Link>

            {/* ── Center Nav Pills ── */}
            <nav className="hidden md:flex items-center bg-gray-100/70 dark:bg-white/5 rounded-xl px-1.5 py-1.5 gap-0.5">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <div className="relative cursor-pointer">
                      {active && (
                        <motion.div
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 bg-white dark:bg-white/10 rounded-lg shadow-sm dark:shadow-none border border-gray-200/80 dark:border-white/10"
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                      <span className={`relative z-10 flex items-center px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors duration-200 ${
                        active
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}>
                        {link.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="hidden md:flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all"
              >
                <AnimatePresence mode="wait">
                  <motion.div key={theme} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 30 }} transition={{ duration: 0.18 }}>
                    {isDark ? <Sun className="w-[17px] h-[17px]" /> : <Moon className="w-[17px] h-[17px]" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {isAuthenticated ? (
                /* ── Logged-in user pill ── */
                <div className="flex items-center gap-2">
                  <Link href="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 dark:bg-violet-500/10 dark:hover:bg-violet-500/20 border border-violet-200/60 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 text-[13px] font-semibold transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </motion.button>
                  </Link>
                  <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-violet-500/30 cursor-default">
                      {userInitial}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-500 transition-all"
                      title="Sign out"
                    >
                      <LogOut className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                /* ── Guest auth buttons ── */
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 rounded-xl text-[13px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/6 transition-all"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative px-5 py-2 rounded-xl text-[13px] font-bold text-white overflow-hidden group shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
                    >
                      {/* Gradient background */}
                      <span className="absolute inset-0 bg-linear-to-r from-violet-600 to-fuchsia-600 transition-all duration-300 group-hover:from-violet-500 group-hover:to-fuchsia-500" />
                      {/* Shimmer */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                      <span className="relative flex items-center gap-1.5">
                        Get Started
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileOpen(p => !p)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
              >
                <AnimatePresence mode="wait">
                  <motion.div key={mobileOpen ? 'x' : 'menu'} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                    {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>

          </div>
        </motion.nav>
      </div>

      {/* ═══════════════════════ MOBILE DRAWER ═══════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-[84px] inset-x-4 z-50 md:hidden bg-white/95 dark:bg-[#110d1c]/95 backdrop-blur-2xl rounded-2xl border border-gray-200/80 dark:border-white/[0.07] shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden"
            >
              {/* Accent top bar */}
              <div className="h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500" />

              {/* User Banner */}
              {isAuthenticated && (
                <div className="px-4 pt-4 pb-3">
                  <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-linear-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 border border-violet-100 dark:border-violet-500/10">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-base font-bold shrink-0 shadow-lg shadow-violet-500/25">
                      {userInitial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <Shield className="w-4 h-4 text-violet-500 ml-auto shrink-0" />
                  </div>
                </div>
              )}

              {/* Nav Links */}
              <nav className="px-3 py-2 space-y-0.5">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      <Link href={link.href}>
                        <div className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                          active
                            ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                        }`}>
                          <span className={`p-1.5 rounded-lg ${active ? 'bg-violet-100 dark:bg-violet-500/20' : 'bg-gray-100 dark:bg-white/5'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          {link.name}
                          {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                {isAuthenticated && (
                  <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}>
                    <Link href="/dashboard">
                      <div className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                        pathname === '/dashboard'
                          ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                      }`}>
                        <span className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/5">
                          <LayoutDashboard className="w-3.5 h-3.5" />
                        </span>
                        Dashboard
                      </div>
                    </Link>
                  </motion.div>
                )}
              </nav>

              {/* Bottom CTA */}
              <div className="px-4 pt-2 pb-4 border-t border-gray-100 dark:border-white/5 mt-2 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/15 dark:hover:bg-red-900/25 border border-red-100 dark:border-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link href="/login" className="block">
                      <button className="w-full py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/register" className="block">
                      <button className="relative w-full py-3 rounded-xl text-sm font-bold text-white overflow-hidden group shadow-lg shadow-violet-500/25">
                        <span className="absolute inset-0 bg-linear-to-r from-violet-600 to-fuchsia-600 group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all" />
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        <span className="relative flex items-center justify-center gap-2">
                          Get Started Free
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[78px] lg:h-[86px]" />
    </>
  );
}