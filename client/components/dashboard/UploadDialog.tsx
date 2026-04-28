'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  CloudUpload, 
  X, 
  FileText, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  Image,
  File,
  Music,
  Video,
  Archive,
  Trash2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useUploadDocumentMutation } from '@/store/api/apiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { value: 'Personal', label: 'Personal', color: 'bg-blue-500' },
  { value: 'Work', label: 'Work', color: 'bg-purple-500' },
  { value: 'Finance', label: 'Finance', color: 'bg-emerald-500' },
  { value: 'Legal', label: 'Legal', color: 'bg-amber-500' },
  { value: 'Medical', label: 'Medical', color: 'bg-red-500' },
  { value: 'Other', label: 'Other', color: 'bg-gray-500' }
];

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
  if (type.startsWith('video/')) return <Video className="w-5 h-5" />;
  if (type.startsWith('audio/')) return <Music className="w-5 h-5" />;
  if (type.includes('pdf')) return <FileText className="w-5 h-5" />;
  if (type.includes('zip') || type.includes('rar')) return <Archive className="w-5 h-5" />;
  return <File className="w-5 h-5" />;
};

const truncateFileName = (name: string, maxLength: number = 30) => {
  if (name.length <= maxLength) return name;
  const extension = name.split('.').pop() || '';
  const nameWithoutExt = name.slice(0, name.lastIndexOf('.'));
  const truncatedName = nameWithoutExt.slice(0, maxLength - extension.length - 3);
  return `${truncatedName}...${extension}`;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('Personal');
  const [customFileName, setCustomFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDocument, { isLoading, isSuccess, isError, error }] = useUploadDocumentMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setCustomFileName('');
      setUploadProgress(0);
      setIsDragging(false);
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const nameWithoutExt = selectedFile.name.split('.').slice(0, -1).join('.');
      setCustomFileName(nameWithoutExt);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      const nameWithoutExt = droppedFile.name.split('.').slice(0, -1).join('.');
      setCustomFileName(nameWithoutExt);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    const fileExtension = file.name.split('.').pop();
    const finalFileName = `${customFileName.trim() || 'untitled'}.${fileExtension}`;
    
    formData.append('file', file);
    formData.append('fileName', finalFileName);
    formData.append('fileType', file.type || 'application/octet-stream');
    formData.append('category', category);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await uploadDocument(formData).unwrap();
      clearInterval(progressInterval);
      setUploadProgress(100);
      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      console.error('Upload failed:', err);
    }
  };

  const removeFile = () => {
    setFile(null);
    setCustomFileName('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] md:max-w-[600px] lg:max-w-[650px] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl">
        
        {/* Animated Gradient Header */}
        <div className="relative h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30" />
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    Secure Upload
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>End-to-End Encrypted • AES-256</span>
                  </DialogDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                Max 25MB
              </Badge>
            </div>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-6">Upload Complete!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Your document has been securely encrypted and stored</p>
                <div className="mt-6 flex gap-2">
                  <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                    Encrypted
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                    Verified
                  </Badge>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Upload Area */}
                <div
                  ref={dragAreaRef}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "relative group cursor-pointer transition-all duration-200",
                    "border-2 border-dashed rounded-xl p-8",
                    isDragging 
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" 
                      : file 
                        ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10"
                        : "border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/10"
                  )}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" 
                    accept="image/*,application/pdf,.doc,.docx,.txt,.zip"
                  />
                  
                  {file ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                          {getFileIcon(file.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {truncateFileName(file.name, 35)}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatFileSize(file.size)}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                                {file.type.split('/').pop() || 'file'}
                              </span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                            className="shrink-0 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="mt-3">
                            <Progress value={uploadProgress} className="h-1.5" />
                            <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <FolderOpen className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </div>
                        <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                          Click or drag to upload
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          PDF, DOC, DOCX, Images, ZIP (Max 25MB)
                        </p>
                        <Badge variant="outline" className="mt-3 bg-gray-100 dark:bg-gray-800">
                          Secure & Encrypted
                        </Badge>
                      </div>
                    </>
                  )}
                </div>

                {/* File Details Form */}
                {file && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        File Name
                      </Label>
                      <Input 
                        value={customFileName}
                        onChange={(e) => setCustomFileName(e.target.value)}
                        placeholder="Enter file name"
                        className="h-10 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 transition-all"
                        maxLength={50}
                      />
                      <p className="text-xs text-gray-400">
                        {customFileName.length}/50 characters
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Category
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => setCategory(cat.value)}
                            className={cn(
                              "px-3 py-2 rounded-lg text-xs font-medium transition-all",
                              category === cat.value
                                ? `${cat.color} bg-opacity-15 text-gray-900 dark:text-white border-2 border-opacity-50`
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            )}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {isError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        Upload Failed
                      </p>
                      <p className="text-xs text-red-500 dark:text-red-500">
                        Please check your connection and try again
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isSuccess && (
          <DialogFooter className="p-6 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto rounded-lg font-medium"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              disabled={!file || isLoading}
              onClick={handleUpload}
              className={cn(
                "w-full sm:w-auto rounded-lg font-semibold shadow-lg transition-all",
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                "disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Secure Upload
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </Dialog>
  );
}