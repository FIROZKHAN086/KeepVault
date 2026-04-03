'use client';

import { useState, useRef } from 'react';
import { 
  CloudUpload, 
  X, 
  FileText, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderOpen
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
import { useUploadDocumentMutation } from '@/store/api/apiSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = ['Personal', 'Work', 'Finance', 'Legal', 'Medical', 'Other'];
const fileTypes = ['PDF', 'Image', 'Video', 'Audio', 'Document', 'Other'];

export default function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('Personal');
  const [fileType, setFileType] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [uploadDocument, { isLoading, isSuccess, isError, error }] = useUploadDocumentMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setCustomFileName(selectedFile.name.split('.')[0]);
      setFileType(selectedFile.type);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', `${customFileName}.${file.name.split('.').pop()}`);
    formData.append('fileType', fileType);
    formData.append('category', category);

    try {
      await uploadDocument(formData).unwrap();
      setTimeout(() => {
        onOpenChange(false);
        setFile(null);
        setCustomFileName('');
        setFileType('');
      }, 1500);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-[#0d0914] border-gray-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl">
        
        {/* Header Decor */}
        <div className="h-2 bg-linear-to-r from-violet-600 via-purple-500 to-fuchsia-500" />
        
        <div className="p-8">
          <DialogHeader className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
                    <CloudUpload className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                   <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Secure Upload</DialogTitle>
                   <DialogDescription className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-0.5">End-to-End Encrypted AES-256</DialogDescription>
                </div>
            </div>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Vault Secured!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Your document has been encrypted and stored.</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Drag & Drop Area Placeholder */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500/50 hover:bg-violet-50/30 dark:hover:bg-violet-500/5 transition-all"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                  
                  {file ? (
                    <div className="flex items-center gap-4 text-left w-full group">
                        <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{file.name}</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-500 uppercase font-black tracking-widest">{(file.size / 1024).toFixed(1)} KB • Ready to encrypt</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="rounded-full hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/2 flex items-center justify-center mb-4 transition-colors group-hover:bg-white dark:group-hover:bg-white/5 shadow-sm">
                        <FolderOpen className="w-6 h-6 text-gray-400 group-hover:text-violet-500 transition-colors" />
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-300">Click or drag to upload</p>
                      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-widest">Supports PDF, DOC, Images up to 25MB</p>
                    </>
                  )}
                </div>

                {file && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Vault Label</Label>
                        <Input 
                          value={customFileName}
                          onChange={(e) => setCustomFileName(e.target.value)}
                          className="h-11 rounded-xl bg-gray-50 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-white/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</Label>
                        <select 
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border-transparent bg-gray-50 dark:bg-white/5 dark:text-white text-sm font-bold focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all"
                        >
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">File-Type</Label>
                        <select 
                          value={fileType}
                          onChange={(e) => setFileType(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border-transparent bg-gray-50 dark:bg-white/5 dark:text-white text-sm font-bold focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all"
                        >
                          {fileTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                  </motion.div>
                )}

                {isError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-500 text-xs font-bold border border-red-200/50 dark:border-red-500/20">
                    <AlertCircle className="w-4 h-4" />
                    <span>Upload failed. Please try again.</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isSuccess && (
          <DialogFooter className="p-8 bg-gray-50/50 dark:bg-white/2 border-t border-gray-100 dark:border-white/5 sm:justify-between gap-4">
            <Button 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              disabled={!file || isLoading}
              onClick={handleUpload}
              className="bg-linear-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-black px-8 py-6 rounded-xl shadow-lg shadow-violet-500/30 disabled:opacity-50 transition-all active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Encrypting...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Secure Deposit
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
