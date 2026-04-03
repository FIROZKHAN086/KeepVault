'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { 
  Menu,
  Search,
  Plus,
  Upload,
  Folder,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Trash2,
  Star,
  Share2,
  Download,
  MoreVertical,
  ChevronDown,
  Bell,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Layout,
  Grid,
  List,
  Filter,
  SortAsc,
  Clock,
  Users,
  Tag,
  Lock,
  Shield,
  Cloud,
  Database,
  HardDrive,
  TrendingUp,
  Activity,
  Calendar,
  MessageSquare,
  HelpCircle,
  Gift,
  Zap,
  Sparkles
} from 'lucide-react';

const recentFiles = [
  { name: "Annual_Report_2024.pdf", size: "2.4 MB", date: "Today", type: "pdf", icon: FileText, starred: true, shared: false },
  { name: "Contract_Signed.pdf", size: "1.8 MB", date: "Yesterday", type: "pdf", icon: FileText, starred: true, shared: true },
  { name: "Tax_Returns_2024.pdf", size: "3.1 MB", date: "Dec 15, 2024", type: "pdf", icon: FileText, starred: false, shared: false },
  { name: "Profile_Picture.jpg", size: "0.5 MB", date: "Dec 14, 2024", type: "image", icon: Image, starred: false, shared: false },
  { name: "Meeting_Notes.docx", size: "1.2 MB", date: "Dec 13, 2024", type: "doc", icon: FileText, starred: true, shared: true },
  { name: "Project_Brief.pdf", size: "4.2 MB", date: "Dec 12, 2024", type: "pdf", icon: FileText, starred: false, shared: false },
];

const folders = [
  { name: "Work Documents", count: 24, icon: Folder, color: "from-blue-500 to-cyan-500" },
  { name: "Personal", count: 12, icon: Folder, color: "from-purple-500 to-pink-500" },
  { name: "Financial", count: 8, icon: Folder, color: "from-emerald-500 to-teal-500" },
  { name: "Contracts", count: 15, icon: Folder, color: "from-orange-500 to-red-500" },
];

const storageInfo = {
  used: 3.8,
  total: 10,
  percentage: 38,
  files: 156,
  folders: 24,
  shared: 12,
};

const activities = [
  { action: "Uploaded", file: "Annual_Report.pdf", time: "2 min ago", icon: Upload, color: "text-emerald-500" },
  { action: "Shared", file: "Contract.pdf", time: "1 hour ago", icon: Share2, color: "text-blue-500" },
  { action: "Starred", file: "Tax_Returns.pdf", time: "3 hours ago", icon: Star, color: "text-yellow-500" },
  { action: "Downloaded", file: "Profile.jpg", time: "5 hours ago", icon: Download, color: "text-purple-500" },
];

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  
  const controls = useAnimation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });
  
  const dashboardControls = useAnimation();
  const dashboardRef = useRef(null);
  const dashboardInView = useInView(dashboardRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (headerInView) {
      controls.start("visible");
    }
  }, [controls, headerInView]);

  useEffect(() => {
    if (dashboardInView) {
      dashboardControls.start("visible");
    }
  }, [dashboardControls, dashboardInView]);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },

    },
  };

  const headerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeInOut" as const },

    },
  };

  const dashboardVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, type: "spring" as const, stiffness: 100, damping: 20 },

    },
  };

  const fileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, delay: custom * 0.05, ease: "easeInOut" as const },

    }),
    hover: {
      x: 5,
      backgroundColor: "rgba(139, 92, 246, 0.05)",
      transition: { duration: 0.2, ease: "easeInOut" as const },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-[#F8FAE5] dark:from-[#1a1515] dark:to-[#110e0e]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div variants={headerVariants} className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gray-200 dark:border-white/20">
            <Layout className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Preview</span>
            <Sparkles className="w-3 h-3 text-purple-500" />
          </motion.div>
          
          <motion.h2 variants={headerVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-800 via-purple-700 to-gray-800 dark:from-white dark:via-purple-400 dark:to-white bg-300% animate-gradient bg-clip-text text-transparent">
              Powerful Dashboard
            </span>
            <br />
            <span className="text-gray-600 dark:text-gray-400">At Your Fingertips</span>
          </motion.h2>
          
          <motion.p variants={headerVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the intuitive interface that makes document management effortless.
            Everything you need, beautifully organized.
          </motion.p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          ref={dashboardRef}
          variants={dashboardVariants}
          initial="hidden"
          animate={dashboardControls}
          className="relative"
        >
          {/* Browser Mockup Header */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-t-2xl p-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg px-4 py-1 text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mx-auto">
              app.keepvault.com/dashboard
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white dark:bg-gray-900 rounded-b-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="flex h-[600px] lg:h-[700px]">
              {/* Sidebar */}
              <motion.div 
                className="w-64 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 flex flex-col"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Logo Area */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-1.5">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">KeepVault</span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-4 space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Main</p>
                    <nav className="space-y-1">
                      {['Dashboard', 'My Files', 'Shared', 'Starred', 'Trash'].map((item, i) => (
                        <motion.button
                          key={i}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 ${
                            i === 0 ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {i === 0 && <Layout className="w-4 h-4" />}
                          {i === 1 && <Folder className="w-4 h-4" />}
                          {i === 2 && <Users className="w-4 h-4" />}
                          {i === 3 && <Star className="w-4 h-4" />}
                          {i === 4 && <Trash2 className="w-4 h-4" />}
                          {item}
                        </motion.button>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Storage</p>
                    <div className="space-y-2">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 dark:text-gray-400">{storageInfo.used} GB used</span>
                          <span className="text-gray-600 dark:text-gray-400">{storageInfo.total} GB</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${storageInfo.percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{storageInfo.percentage}% used</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-500">Files</span>
                          <span className="text-gray-700 dark:text-gray-300">{storageInfo.files}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-500">Folders</span>
                          <span className="text-gray-700 dark:text-gray-300">{storageInfo.folders}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-500">Shared</span>
                          <span className="text-gray-700 dark:text-gray-300">{storageInfo.shared}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</p>
                    </div>
                    <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>
              </motion.div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">My Files</h2>
                    <div className="flex gap-1">
                      <motion.button 
                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-600' : 'text-gray-400'}`}
                        onClick={() => setViewMode('grid')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Grid className="w-4 h-4" />
                      </motion.button>
                      <motion.button 
                        className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-600' : 'text-gray-400'}`}
                        onClick={() => setViewMode('list')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <List className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search files..." 
                        className="pl-9 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <motion.button 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={simulateUpload}
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </motion.button>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-b border-gray-200 dark:border-gray-700 p-4 bg-purple-50 dark:bg-purple-950/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-purple-500 animate-pulse" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploading document.pdf</span>
                      </div>
                      <span className="text-sm text-purple-600 dark:text-purple-400">{uploadProgress}%</span>
                    </div>
                    <div className="h-1.5 bg-purple-200 dark:bg-purple-900 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Folders Section */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Access</h3>
                    <button className="text-xs text-purple-600 dark:text-purple-400">View all</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {folders.map((folder, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 cursor-pointer group"
                        whileHover={{ y: -5, scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`bg-gradient-to-r ${folder.color} rounded-lg p-2 inline-block mb-2`}>
                          <folder.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{folder.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{folder.count} items</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Files List */}
                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-2">
                    {recentFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={fileItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedFile === index ? 'bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setSelectedFile(index)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                            <file.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{file.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{file.size} • {file.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.starred && <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />}
                          {file.shared && <Share2 className="w-4 h-4 text-blue-500" />}
                          <Download className="w-4 h-4 text-gray-400 hover:text-purple-500 cursor-pointer transition-colors" />
                          <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Activity */}
              <motion.div 
                className="w-72 bg-gray-50 dark:bg-gray-800/50 border-l border-gray-200 dark:border-gray-700 p-4 hidden lg:block"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className={`${activity.color} bg-opacity-10 rounded-lg p-1.5`}>
                          <activity.icon className={`w-3 h-3 ${activity.color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium">{activity.action}</span> {activity.file}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Storage Insights</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Documents</span>
                      <span className="text-gray-700 dark:text-gray-300">2.1 GB</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Images</span>
                      <span className="text-gray-700 dark:text-gray-300">0.8 GB</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Archives</span>
                      <span className="text-gray-700 dark:text-gray-300">0.9 GB</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      
      </motion.div>
    </section>
  );
}