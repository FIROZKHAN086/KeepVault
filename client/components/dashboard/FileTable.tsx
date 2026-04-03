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
  Star
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
import { motion } from 'framer-motion';

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
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext || '')) return FileImage;
  if (['pdf', 'doc', 'docx'].includes(ext || '')) return FileText;
  if (['ts', 'js', 'json'].includes(ext || '')) return FileCode;
  return FileType;
};

export default function FileTable({ documents, onDelete, onEdit }: FileTableProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50/50 dark:bg-white/2 rounded-3xl border border-dashed border-gray-300 dark:border-white/10">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-violet-100 to-fuchsia-100 dark:from-violet-500/10 dark:to-fuchsia-500/10 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-violet-600 dark:text-violet-400 opacity-40" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No documents found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 max-w-[280px]">Your secure vault is empty. Start by uploading your first document.</p>
        <Button className="mt-6 font-bold bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white rounded-xl px-6">
            Upload Now
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/60 dark:bg-[#110d1c]/60 backdrop-blur-xl rounded-[2rem] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50/50 dark:bg-white/2">
          <TableRow className="border-gray-200 dark:border-white/5 hover:bg-transparent">
            <TableHead className="w-12 text-center"><Star className="w-3.5 h-3.5 opacity-40 mx-auto" /></TableHead>
            <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400">File Name</TableHead>
            <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 hidden sm:table-cell">Category</TableHead>
            <TableHead className="font-black text-[11px] uppercase tracking-widest text-gray-400 hidden md:table-cell">Date Added</TableHead>
            <TableHead className="text-right font-black text-[11px] uppercase tracking-widest text-gray-400 pr-8">Ref Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc, i) => {
            const Icon = getFileIcon(doc.fileName);
            return (
              <motion.tr
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group border-gray-200 dark:border-white/5 hover:bg-violet-50/30 dark:hover:bg-violet-500/5 transition-all"
              >
                <TableCell className="text-center">
                    <Star className="w-3.5 h-3.5 text-gray-300 dark:text-white/10 group-hover:text-yellow-400 hover:scale-110 transition-all cursor-pointer mx-auto" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center transition-transform group-hover:scale-105">
                      <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-200 truncate max-w-[180px]">{doc.fileName}</p>
                        <Badge variant="outline" className="h-4.5 px-1.5 text-[8px] font-black border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 uppercase rounded-md shrink-0">
                          {doc.fileType.split('/')[1] || doc.fileType || 'UNK'}
                        </Badge>
                      </div>
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5 text-emerald-500" />
                        Encrypted AES-256
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline" className="bg-white/50 dark:bg-white/2 border-gray-200 dark:border-white/10 text-[10px] px-2.5 py-0.5 rounded-lg text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest">
                    {doc.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs font-bold text-gray-500 dark:text-gray-500">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all">
                        <MoreVertical className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl bg-white dark:bg-[#110d1c] border border-gray-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl">
                      <DropdownMenuLabel className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 px-2 py-1.5">Action Center</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={() =>{ 
                          onEdit(doc)
                        }}
                        className="gap-2.5 rounded-xl cursor-pointer py-2 focus:bg-violet-50 dark:focus:bg-violet-500/10 focus:text-violet-600 dark:focus:text-violet-300"
                      >
                        <ExternalLink className="h-4 w-4" /> <span className="font-bold text-xs">Preview</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          onEdit(doc)
                        }}
                        className="gap-2.5 rounded-xl cursor-pointer py-2 focus:bg-violet-50 dark:focus:bg-violet-500/10 focus:text-violet-600 dark:focus:text-violet-300"
                      >
                        <Download className="h-4 w-4" /> <span className="font-bold text-xs">Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(doc)} className="gap-2.5 rounded-xl cursor-pointer py-2 focus:bg-violet-50 dark:focus:bg-violet-500/10 focus:text-violet-600 dark:focus:text-violet-300">
                        <Edit3 className="h-4 w-4" /> <span className="font-bold text-xs">Manage</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1.5 bg-gray-100 dark:bg-white/5" />
                      <DropdownMenuItem 
                        onClick={() => onDelete(doc.id)}
                        className="gap-2.5 rounded-xl cursor-pointer py-2 focus:bg-red-50 dark:focus:bg-red-500/10 text-red-500 focus:text-red-600 dark:focus:text-red-400 font-bold"
                      >
                        <Trash2 className="h-4 w-4" /> <span className="text-xs">Exterminate</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
