'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '@/store/api/apiSlice';
import { setUser, setInitializing } from '@/store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Lock } from 'lucide-react';

export default function AuthRehydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading, isFetching } = useGetMeQuery(undefined, {
    // Only run this if we don't have a user yet (though the slice will handle the logic)
    refetchOnMountOrArgChange: true,
  });


  useEffect(() => {
    
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    } else if (isError) {
      dispatch(setInitializing(false));
    }
  }, [isSuccess, isError, data, dispatch]);

  // Optionally show a global loading state during the very first check
  // This prevents the "flash" of unauthenticated content
  if (isLoading || isFetching) {
    return (
      <div className="fixed inset-0 z-9999 bg-[#faf9f6] dark:bg-[#0a0612] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 blur-xl opacity-20 animate-pulse" />
            <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-violet-600 dark:text-violet-400 animate-spin" />
            <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Verifying Vault Access</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}