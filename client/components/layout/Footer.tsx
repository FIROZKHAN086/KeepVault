'use client';

import { motion } from 'framer-motion';
import { Shield, Heart } from 'lucide-react';
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';

const footerLinks = {
  Product: [
    { name: 'Features', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Changelog', href: '#' },
    { name: 'Integrations', href: '#' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Help Center', href: '#' },
  ],
  Company: [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Contact', href: '#' },
  ]
};

const socialLinks = [
  { name: 'Twitter', icon: FaTwitter, href: '#', color: 'hover:text-blue-400 hover:shadow-blue-500/20' },
  { name: 'GitHub', icon: FaGithub, href: '#', color: 'hover:text-white hover:shadow-gray-500/20' },
  { name: 'Discord', icon: FaDiscord, href: '#', color: 'hover:text-indigo-400 hover:shadow-indigo-500/20' },
  { name: 'LinkedIn', icon: FaLinkedin, href: '#', color: 'hover:text-blue-500 hover:shadow-blue-600/20' },
];

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-[#0a0808] border-t border-gray-200 dark:border-white/5 overflow-hidden">
      {/* Background glow isolation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-purple-500/10 to-transparent blur-[120px] dark:from-purple-500/5 mix-blend-screen" />
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">KeepVault</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              The premier digital vault for your most sensitive documents. Engineered with zero-knowledge architecture and pristine design for uncompromising professionals.
            </p>
            
            {/* System Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">All Systems Operational</span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1 lg:col-span-1">
              <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-colors flex items-center group"
                    >
                      {link.name}
                      {link.name === 'Pricing' && (
                        <span className="ml-2 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                          New
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact / Newsletter Column */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6">Stay Updated</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Get the latest updates on security features.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all dark:focus:border-purple-400/50"
              />
              <button 
                type="button" 
                className="absolute right-1 top-1 bottom-1 bg-white dark:bg-white/10 border border-gray-200 dark:border-transparent text-gray-700 dark:text-white px-3 rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1 font-medium">
            © {new Date().getFullYear()} KeepVault Inc. Built with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-0.5 animate-pulse" />
            for privacy.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:hover:bg-white/10 ${social.color}`}
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
