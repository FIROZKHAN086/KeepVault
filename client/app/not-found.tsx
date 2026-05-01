'use client';

import { useEffect,  useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Shield, Home, ArrowLeft, Search, Lock, FileX } from 'lucide-react';

// Floating particle component
function Particle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-purple-400/40"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Glitch text effect
function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block select-none">
      {/* Main text */}
      <span
        className="relative z-10 text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter
                   bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
      >
        {text}
      </span>

      {/* Glitch layer 1 */}
      <AnimatePresence>
        {glitching && (
          <motion.span
            key="glitch1"
            className="absolute inset-0 text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter
                       text-cyan-400/70 z-20"
            style={{ clipPath: 'inset(20% 0 60% 0)' }}
            animate={{ x: [-4, 4, -4], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 0.15, repeat: 2 }}
            exit={{ opacity: 0 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Glitch layer 2 */}
      <AnimatePresence>
        {glitching && (
          <motion.span
            key="glitch2"
            className="absolute inset-0 text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter
                       text-pink-500/70 z-20"
            style={{ clipPath: 'inset(60% 0 10% 0)' }}
            animate={{ x: [4, -4, 4], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 0.15, repeat: 2 }}
            exit={{ opacity: 0 }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// Orbiting icon
function OrbitIcon({
  icon: Icon,
  radius,
  speed,
  offset,
  color,
}: {
  icon: React.ElementType;
  radius: number;
  speed: number;
  offset: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: radius * 2, height: radius * 2, top: '50%', left: '50%', marginTop: -radius, marginLeft: -radius }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay: offset }}
    >
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm border ${color}`}
      >
        <Icon className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

export default function NotFound() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden
                    bg-gradient-to-b from-[#f8f2e5] via-white to-[#f0e8ff]
                    dark:from-[#0d0c0f] dark:via-[#110e1a] dark:to-[#0d0c0f]">

      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 dark:bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Orbiting system */}
        <motion.div variants={itemVariants} className="relative mb-8">
          {/* Orbit rings */}
          <div className="relative w-52 h-52 flex items-center justify-center">
            {/* Ring 1 */}
            <div className="absolute inset-0 rounded-full border border-purple-300/20 dark:border-purple-500/20" />
            {/* Ring 2 */}
            <div className="absolute inset-4 rounded-full border border-pink-300/15 dark:border-pink-500/15" />
            {/* Ring 3 */}
            <div className="absolute inset-8 rounded-full border border-violet-300/10 dark:border-violet-500/10" />

            {/* Orbiting icons */}
            <OrbitIcon icon={Lock}    radius={96} speed={8}  offset={0}   color="text-purple-400 border-purple-500/30 bg-purple-500/10" />
            <OrbitIcon icon={Search}  radius={72} speed={12} offset={2}   color="text-pink-400 border-pink-500/30 bg-pink-500/10" />
            <OrbitIcon icon={FileX}   radius={96} speed={8}  offset={4}   color="text-violet-400 border-violet-500/30 bg-violet-500/10" />

            {/* Center icon */}
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600
                         flex items-center justify-center shadow-2xl shadow-purple-500/40
                         border border-purple-400/30"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* 404 Glitch number */}
        <motion.div variants={itemVariants}>
          <GlitchText text="404" />
        </motion.div>

        {/* Scan line decoration */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8 -mt-4"
        />

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold mb-4
                     text-gray-800 dark:text-white"
        >
          Lost in the{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Vault
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-md mb-10 leading-relaxed"
        >
          This page has been{' '}
          <span className="text-purple-500 font-medium">encrypted, shredded,</span> or never existed
          in the first place. Let's get you back to safety.
        </motion.p>

        {/* Animated terminal-style error box */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-sm bg-gray-900/50 dark:bg-black/40 backdrop-blur-sm
                     border border-gray-200/50 dark:border-white/10
                     rounded-xl p-4 mb-10 text-left font-mono text-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-gray-500 dark:text-gray-400 ml-2 text-xs">keepvault_shell</span>
          </div>
          <TypingLine text="$ vault locate page" delay={0.5} />
          <TypingLine text="ERROR: Document not found in vault" delay={1.5} isError />
          <TypingLine text="$ checking backup clusters..." delay={2.5} />
          <TypingLine text="RESULT: 0 matches — page is gone 💀" delay={3.5} isError />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <motion.button
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-purple-600 to-pink-600
                         shadow-lg shadow-purple-500/30
                         border border-purple-500/40
                         hover:shadow-purple-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Home className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>

          <button onClick={() => window.history.back()}>
            <motion.div
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold
                         text-gray-700 dark:text-gray-300
                         bg-white/60 dark:bg-white/5
                         backdrop-blur-sm
                         border border-gray-200 dark:border-white/10
                         hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-500/10
                         transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </motion.div>
          </button>
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600"
        >
          <Shield className="w-3 h-3 text-purple-500" />
          <span>KeepVault — Your documents are still safe</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Typing animation component
function TypingLine({
  text,
  delay,
  isError = false,
}: {
  text: string;
  delay: number;
  isError?: boolean;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <div
      className={`mb-1 ${
        isError ? 'text-pink-400' : 'text-emerald-400 dark:text-emerald-500'
      }`}
    >
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-2 h-4 bg-current animate-pulse ml-0.5 -mb-0.5" />
      )}
    </div>
  );
}
