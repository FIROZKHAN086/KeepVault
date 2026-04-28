'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  Loader2,
  Download,
  Trash2,
  Edit3,
  ExternalLink,
  Calendar,
  Tag,
  FileType,
  Eye,
  Save,
  Play,
  FileIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditDocumentMutation, useDeleteDocumentMutation } from '@/store/api/apiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  fileName: string;
  fileType: string;
  category: string;
  fileUrl?: string;
  createdAt: string;
}

interface DocumentDetailDialogProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = ['Personal', 'Work', 'Finance', 'Legal', 'Medical', 'Other'];
const fileTypes = ['PDF', 'Image', 'Video', 'Audio', 'Document', 'Other'];

export default function DocumentDetailDialog({ document, open, onOpenChange }: DocumentDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editFileType, setEditFileType] = useState('');
  
  const [editDocument, { isLoading: isUpdating }] = useEditDocumentMutation();
  const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation();

  useEffect(() => {
    if (document) {
      setEditName(document.fileName.split('.')[0]);
      setEditCategory(document.category);
      setEditFileType(document.fileType);
      setIsEditing(false);
    }
  }, [document]);

  if (!document) return null;

  const handleUpdate = async () => {
    const extension = document.fileName.split('.').pop();
    const formData = new FormData();
    formData.append('fileName', `${editName}.${extension}`);
    formData.append('category', editCategory);
    formData.append('fileType', editFileType);

    try {
      await editDocument({ id: document.id, formData }).unwrap();
      setIsEditing(false);
    } catch (err: any) {
      console.error('Update failed:', err);
      alert(`Update failed: ${err.data?.message || err.error || 'Unknown error'}`);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to permanently delete this document?')) {
      try {
        await deleteDocument(document.id).unwrap();
        onOpenChange(false);
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const renderPreview = () => {
    const type = document.fileType.toLowerCase();
    const url = document.fileUrl;

    if (!url) return (
      <div className="w-full h-48 bg-gray-100 dark:bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-white/10">
        <ShieldCheck className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preview Encrypted</p>
      </div>
    );

    // Image Preview
    if (type.includes('image')) {
      return (
        <div className="relative group rounded-2xl overflow-hidden aspect-video bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10">
          <img src={url} alt={document.fileName} className="w-full h-full object-contain" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm" className="rounded-xl font-bold">
                <ExternalLink className="w-4 h-4 mr-2" /> Full View
              </Button>
            </a>
          </div>
        </div>
      );
    }

    // Video Preview
    if (type.includes('video')) {
      return (
        <div className="rounded-2xl overflow-hidden aspect-video bg-black shadow-2xl border border-gray-200 dark:border-white/10">
          <video src={url} controls className="w-full h-full" />
        </div>
      );
    }

    // PDF Preview
    if (type.includes('pdf')) {
      return (
        <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 relative group">
          <iframe src={`${url}#toolbar=0`} className="w-full h-full border-none pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-auto">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm" className="rounded-xl font-bold">
                <Eye className="w-4 h-4 mr-2" /> Open PDF
              </Button>
            </a>
          </div>
        </div>
      );
    }

    // Default icon back
    return (
      <div className="w-full h-48 bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/5 dark:to-fuchsia-500/5 rounded-2xl flex flex-col items-center justify-center border border-gray-200 dark:border-white/10">
        <FileIcon className="w-16 h-16 text-violet-500 opacity-60 mb-3" />
        <p className="text-sm font-black text-gray-900 dark:text-gray-300 uppercase tracking-tighter">{document.fileName.split('.').pop()} File</p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white dark:bg-[#0d0914] border-gray-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl">
        <div className="h-2 bg-linear-to-r from-violet-600 via-purple-500 to-fuchsia-500" />
        
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                   <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Security Detail</DialogTitle>
                   <p className="text-[10px] font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-0.5">Reference ID: {document.id.slice(0, 8)}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onOpenChange(false)}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview Section */}
            {renderPreview()}

            {/* Info Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {isEditing ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/2 border border-gray-100 dark:border-white/5">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Rename Asset</Label>
                       <Input 
                         value={editName}
                         onChange={(e) => setEditName(e.target.value)}
                         className="h-11 rounded-xl bg-white dark:bg-[#0a0612] border-transparent font-bold"
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Asset Format</Label>
                       <select 
                          value={editFileType}
                          onChange={(e) => setEditFileType(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border-transparent bg-white dark:bg-[#0a0612] dark:text-white text-sm font-bold focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                       >
                         {fileTypes.map((type) => (
                           <option key={type} value={type} className="bg-white dark:bg-[#0a0612] text-gray-900 dark:text-white">
                             {type}
                           </option>
                         ))}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Categorization</Label>
                       <select 
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="w-full h-11 px-3 rounded-xl border-transparent bg-white dark:bg-[#0a0612] dark:text-white text-sm font-bold focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                        >
                          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-white/2 border border-gray-100 dark:border-white/5">
                      <div className="p-2 rounded-lg bg-white dark:bg-white/5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Deposited</p>
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-200">{new Date(document.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-white/2 border border-gray-100 dark:border-white/5">
                      <div className="p-2 rounded-lg bg-white dark:bg-white/5">
                        <Tag className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Category</p>
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-200">{document.category}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/2 border border-gray-100 dark:border-white/5",
                    isEditing && "hidden"
                )}>
                  <div className="p-2.5 rounded-xl bg-violet-600 shadow-md shadow-violet-500/30">
                    <FileType className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Asset Identifier</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{document.fileName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50/50 dark:bg-white/2 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between w-full gap-4">
             <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleDelete}
                  className="rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 h-11 w-11 transition-all active:scale-95"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
                <Button 
                   variant="outline" 
                   size="icon"
                   onClick={() => document.fileUrl && window.open(document.fileUrl, '_blank')}
                   className="rounded-xl border-gray-200 dark:border-white/10 h-11 w-11 transition-all active:scale-95"
                >
                  <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </Button>
             </div>

             <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl font-bold">Cancel</Button>
                    <Button 
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="bg-linear-to-br from-violet-600 to-fuchsia-600 text-white font-bold px-6 h-11 rounded-xl shadow-lg shadow-violet-500/20 flex items-center gap-2"
                    >
                      {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Finalize
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black px-6 h-11 rounded-xl flex items-center gap-2 transition-all active:scale-95"
                  >
                    <Edit3 className="w-4 h-4" />
                    Manage
                  </Button>
                )}
             </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}