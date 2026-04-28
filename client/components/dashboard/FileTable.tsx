'use client';

import { 
  FileText, 
  MoreHorizontal, 
  Download, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Shield,
  FileCode,
  FileImage,
  FileType,
  ChevronRight,
  MoreVertical,
  Star,
  Sparkles,
  Lock,
  Eye,
  Clock
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Document {
  id: string;
  fileName: string;
  fileType: string;
  category: string;
  fileUrl?: string;
  createdAt: string;
}

interface FileTableProps {
  documents: Document[];
  onDelete: (id: string) => void;
  onEdit: (doc: Document) => void;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'].includes(ext || '')) return FileImage;
  if (['pdf', 'doc', 'docx', 'txt', 'md'].includes(ext || '')) return FileText;
  if (['ts', 'js', 'json', 'jsx', 'tsx', 'html', 'css'].includes(ext || '')) return FileCode;
  return FileType;
};

const getFileGradient = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext || '')) {
    return 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10';
  }
  if (['pdf', 'doc', 'docx'].includes(ext || '')) {
    return 'from-red-500/20 to-rose-500/20 dark:from-red-500/10 dark:to-rose-500/10';
  }
  if (['ts', 'js', 'json'].includes(ext || '')) {
    return 'from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10';
  }
  return 'from-purple-500/20 to-fuchsia-500/20 dark:from-purple-500/10 dark:to-fuchsia-500/10';
};

// Table row with scroll animation
const TableRowAnimated = ({ children, index, isVisible }: any) => {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  return (
    <motion.tr
      ref={rowRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, type: "spring", stiffness: 100 }}
      style={{ opacity, scale }}
      className="group border-gray-200 dark:border-white/5 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-transparent dark:hover:from-violet-500/10 dark:hover:to-transparent transition-all duration-300"
    >
      {children}
    </motion.tr>
  );
};

// Animated badge component
const AnimatedBadge = ({ category }: { category: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Badge 
        variant="outline" 
        className="bg-white/50 dark:bg-white/2 border-gray-200 dark:border-white/10 text-[10px] px-2.5 py-0.5 rounded-lg text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-md"
      >
        <motion.span
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mr-1"
        >
          ✦
        </motion.span>
        {category}
      </Badge>
    </motion.div>
  );
};

// Star animation component
const StarButton = ({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      animate={isClicked ? { 
        scale: [1, 1.5, 1],
        rotate: [0, 360],
        transition: { duration: 0.3 }
      } : {}}
    >
      <Star 
        className={`w-3.5 h-3.5 transition-all duration-300 cursor-pointer mx-auto ${
          isFavorite 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300 dark:text-white/10 group-hover:text-yellow-400'
        }`}
        onClick={handleClick}
      />
    </motion.div>
  );
};

// Shimmer effect for loading state
const Shimmer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    {children}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

export default function FileTable({ documents, onDelete, onEdit }: FileTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visibleRows, setVisibleRows] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: tableRef,
    offset: ["start end", "end start"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.99]);

  useEffect(() => {
    // Gradually reveal rows
    const timer = setTimeout(() => {
      const newVisible = new Set(visibleRows);
      documents.forEach((doc, i) => {
        setTimeout(() => {
          setVisibleRows(prev => new Set(prev).add(doc.id));
        }, i * 100);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [documents]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (documents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-white/2 dark:to-white/1 rounded-3xl border border-dashed border-gray-300 dark:border-white/10 backdrop-blur-sm"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-500/10 dark:to-fuchsia-500/10 flex items-center justify-center mb-4"
        >
          <FileText className="w-8 h-8 text-violet-600 dark:text-violet-400 opacity-60" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
        >
          No documents found
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500 dark:text-gray-500 mt-1 max-w-[280px]"
        >
          Your secure vault is empty. Start by uploading your first document.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="mt-6 font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 dark:from-violet-500 dark:to-fuchsia-500 dark:hover:from-violet-600 dark:hover:to-fuchsia-600 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-4 h-4 mr-2" />
            Upload Now
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      ref={tableRef}
      style={{ opacity: backgroundOpacity, scale }}
      className="relative"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-fuchsia-500/5 rounded-[2rem] pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(139,92,246,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(217,70,239,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(139,92,246,0.05) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 dark:bg-[#110d1c]/60 backdrop-blur-xl rounded-[2rem] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      >
        {/* Animated header with gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-fuchsia-500/10 animate-pulse" />
          <Table>
            <TableHeader className="bg-gray-50/50 dark:bg-white/2">
              <TableRow className="border-gray-200 dark:border-white/5 hover:bg-transparent">
                <TableHead className="w-12 text-center">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Star className="w-3.5 h-3.5 opacity-40 mx-auto" />
                  </motion.div>
                </TableHead>
                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400">
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    File Name
                  </motion.span>
                </TableHead>
                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 hidden sm:table-cell">
                  <motion.span
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    Category
                  </motion.span>
                </TableHead>
                <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 hidden md:table-cell">
                  <motion.span
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Date Added
                  </motion.span>
                </TableHead>
                <TableHead className="text-right font-black text-[11px] uppercase tracking-widest text-gray-400 pr-8">
                  <motion.span
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    Actions
                  </motion.span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {documents.map((doc, i) => {
                  const Icon = getFileIcon(doc.fileName);
                  const gradient = getFileGradient(doc.fileName);
                  const isVisible = visibleRows.has(doc.id);
                  
                  return (
                    <TableRowAnimated 
                      key={doc.id} 
                      index={i}
                      isVisible={isVisible}
                    >
                      <TableCell className="text-center">
                        <StarButton 
                          isFavorite={favorites.has(doc.id)} 
                          onClick={() => toggleFavorite(doc.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div 
                          className="flex items-center gap-3.5"
                          onMouseEnter={() => setHoveredRow(doc.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <motion.div 
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center transition-all duration-300`}
                            whileHover={{ 
                              scale: 1.1,
                              rotate: [0, -10, 10, -10, 0],
                              transition: { duration: 0.5 }
                            }}
                            animate={{
                              boxShadow: hoveredRow === doc.id 
                                ? "0 0 20px rgba(139,92,246,0.3)" 
                                : "0 0 0px rgba(139,92,246,0)"
                            }}
                          >
                            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                          </motion.div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <motion.p 
                                className="text-sm font-bold text-gray-900 dark:text-gray-200 truncate max-w-[180px] lg:max-w-[280px]"
                               
                              >
                                {doc.fileName}
                              </motion.p>
                              <motion.div
                                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 0.3 }}
                              >
                                <Badge variant="outline" className="h-4.5 px-1.5 text-[8px] font-black border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 uppercase rounded-md shrink-0">
                                  {doc.fileType.split('/')[1] || doc.fileType || 'UNK'}
                                </Badge>
                              </motion.div>
                            </div>
                            <motion.p 
                              className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase flex items-center gap-1"
                              animate={{
                                opacity: hoveredRow === doc.id ? 0.7 : 0.5
                              }}
                            >
                              <Lock className="w-2.5 h-2.5 text-emerald-500" />
                              Encrypted AES-256
                              <motion.span
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="ml-1 text-emerald-500"
                              >
                                ●
                              </motion.span>
                            </motion.p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <AnimatedBadge category={doc.category} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <motion.div 
                          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-500"
                          whileHover={{ x: 5 }}
                        >
                          <Clock className="w-3 h-3" />
                          {new Date(doc.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </motion.div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all">
                                <MoreVertical className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                              </Button>
                            </motion.div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl bg-white dark:bg-[#110d1c] border border-gray-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 px-2 py-1.5 flex items-center gap-2">
                              <Sparkles className="w-3 h-3" />
                              Action Center
                            </DropdownMenuLabel>
                            {[
                              { icon: ExternalLink, label: 'Preview', action: () => onEdit(doc), color: 'default' },
                              { icon: Download, label: 'Download', action: () => onEdit(doc), color: 'default' },
                              { icon: Edit3, label: 'Manage', action: () => onEdit(doc), color: 'default' }
                            ].map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <DropdownMenuItem 
                                  onClick={item.action}
                                  className="gap-2.5 rounded-xl cursor-pointer py-2 focus:bg-violet-50 dark:focus:bg-violet-500/10 focus:text-violet-600 dark:focus:text-violet-300 transition-all duration-200"
                                >
                                  <item.icon className="h-4 w-4" /> 
                                  <span className="font-bold text-xs">{item.label}</span>
                                </DropdownMenuItem>
                              </motion.div>
                            ))}
                            <DropdownMenuSeparator className="my-1.5 bg-gray-100 dark:bg-white/5" />
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <DropdownMenuItem 
                                onClick={() => onDelete(doc.id)}
                                className="gap-2.5 rounded-xl cursor-pointer py-2 focus:bg-red-50 dark:focus:bg-red-500/10 text-red-500 focus:text-red-600 dark:focus:text-red-400 font-bold transition-all duration-200"
                              >
                                <Trash2 className="h-4 w-4" /> 
                                <span className="text-xs">Exterminate</span>
                              </DropdownMenuItem>
                            </motion.div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRowAnimated>
                  );
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Animated footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-200 dark:border-white/5 px-6 py-3 bg-gray-50/30 dark:bg-white/2"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-3 h-3 text-emerald-500" />
              <span>All files are encrypted with AES-256-GCM</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Lock className="w-3 h-3" />
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span>{documents.length} {documents.length === 1 ? 'document' : 'documents'} in vault</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/10" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </motion.div>
  );
}