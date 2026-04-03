'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Building2, Scale, Palette, Briefcase, FileText, 
  FileArchive, ImageIcon, FileSpreadsheet, FileBox, CheckCircle2,
  Sparkles, Layers, Shield
} from 'lucide-react';

const useCases = [
  {
    id: "legal",
    title: "Legal & Finance",
    tagline: "Uncompromised confidentiality",
    icon: Scale,
    description: "Secure ultra-sensitive contracts, financial statements, and compliance audits with immutable zero-knowledge encryption.",
    color: "from-emerald-400 to-teal-600",
    glow: "shadow-emerald-500/20",
    features: ["End-to-End Encryption", "Immutable Audit Trails", "Granular Access Roles"],
    mockFiles: [
      { name: "Acquisition_NDA_Signed.pdf", icon: FileText, size: "1.2 MB", color: "text-red-500" },
      { name: "Q4_Financial_Audit.xlsx", icon: FileSpreadsheet, size: "4.5 MB", color: "text-emerald-500" }
    ]
  },
  {
    id: "creative",
    title: "Creative Agencies",
    tagline: "Flawless client delivery",
    icon: Palette,
    description: "Store massive design master files, share portfolios with clients safely, and lock deliverables until invoice payment.",
    color: "from-fuchsia-400 to-pink-600",
    glow: "shadow-pink-500/20",
    features: ["Massive File Support", "Media Previews", "Password-Protected Links"],
    mockFiles: [
      { name: "Brand_Guidelines_V2.ai", icon: ImageIcon, size: "145.8 MB", color: "text-orange-500" },
      { name: "Hero_Animation_Final.mp4", icon: FileBox, size: "842.1 MB", color: "text-purple-500" }
    ]
  },
  {
    id: "enterprise",
    title: "Enterprise Teams",
    tagline: "Scalable secure infrastructure",
    icon: Building2,
    description: "Deploy robust storage across thousands of employees mapping directly onto your existing SSO identity stack.",
    color: "from-blue-400 to-indigo-600",
    glow: "shadow-indigo-500/20",
    features: ["SAML / SSO Integration", "Advanced Admin Rules", "Departmental Isolation"],
    mockFiles: [
      { name: "Employee_Handbook_2026.pdf", icon: FileText, size: "8.4 MB", color: "text-blue-500" },
      { name: "Global_Architecture.zip", icon: FileArchive, size: "3.2 GB", color: "text-indigo-500" }
    ]
  },
  {
    id: "freelancers",
    title: "Independent Pros",
    tagline: "Professional file management",
    icon: Briefcase,
    description: "Look incredibly professional with branded secure portals to hand off files, while organizing your own archives natively.",
    color: "from-amber-400 to-orange-500",
    glow: "shadow-orange-500/20",
    features: ["Custom Branded Portals", "Link Expiration", "Lightweight Usage"],
    mockFiles: [
      { name: "Invoice_1042_Paid.pdf", icon: FileText, size: "0.4 MB", color: "text-gray-500" },
      { name: "Design_Assets_Handoff.zip", icon: FileArchive, size: "42.8 MB", color: "text-amber-500" }
    ]
  }
];

export default function UseCases() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const headerY = useTransform(smoothProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  const bgFloatY1 = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const bgFloatY2 = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 overflow-hidden bg-white dark:bg-[#0a0808] perspective-[2000px]">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: bgFloatY1 }}
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: bgFloatY2 }}
          className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20 lg:mb-28 z-10 relative"
        >
          <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-white/5 backdrop-blur-md rounded-full px-5 py-2 mb-6 border border-gray-200 dark:border-white/10 shadow-lg">
            <Layers className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest">Built For You</span>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
            Perfect for Every Workflow
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Whether you are a solo freelancer or an enterprise team, KeepVault adapts to secure your most critical assets effortlessly.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 perspective-[1000px]">
          {useCases.map((useCase, index) => {
            const isHovered = hoveredCase === useCase.id;
            
            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
                onHoverStart={() => setHoveredCase(useCase.id)}
                onHoverEnd={() => setHoveredCase(null)}
                className={`relative group bg-white/60 dark:bg-[#151212]/80 backdrop-blur-3xl border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 lg:p-12 overflow-hidden transform-gpu transition-all duration-500 hover:shadow-2xl ${useCase.glow}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glowing Corner Aura */}
                <div 
                  className={`absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br ${useCase.color} rounded-full blur-[90px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} 
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-5 mb-8">
                    <motion.div
                      animate={{
                        rotateZ: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center shadow-lg transform-gpu`}
                    >
                      <useCase.icon className="w-8 h-8 text-white drop-shadow-sm" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {useCase.title}
                      </h3>
                      <p className="text-sm font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${useCase.color} uppercase mt-1">
                        {useCase.tagline}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-4 mb-10 flex-1">
                    {useCase.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.7, x: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 5 : 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${useCase.color} flex items-center justify-center p-1`}>
                          <CheckCircle2 className="w-full h-full text-white" />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive Mock Files that slide up on hover */}
                  <div className="mt-auto relative h-[140px] w-full rounded-2xl bg-gray-50/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 p-4 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
                    
                    <div className="flex items-center gap-2 mb-3 px-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vault Preview</span>
                    </div>

                    <div className="space-y-2 relative z-10 w-full">
                      {useCase.mockFiles.map((file, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: 20 + (i * 20), opacity: 0.5, scale: 0.95 }}
                          animate={{ 
                            y: isHovered ? 0 : 20 + (i * 20), 
                            opacity: isHovered ? 1 : 0.5,
                            scale: isHovered ? 1 : 0.95 
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 120, 
                            damping: 14, 
                            delay: isHovered ? i * 0.1 : 0 
                          }}
                          className="flex items-center justify-between w-full bg-white dark:bg-gray-800 rounded-xl p-3 shadow-md shadow-gray-200/50 dark:shadow-black/50 border border-gray-100 dark:border-white/5"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <file.icon className={`w-5 h-5 flex-shrink-0 ${file.color}`} />
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                              {file.name}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap pl-4">
                            {file.size}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
