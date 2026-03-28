import React from 'react';
import { X, Trash2, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsModal = ({ isOpen, onClose, onClearAll }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative z-[1001]"
          >
            <div className="p-8 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-black text-text-primary tracking-tight">
                  Board Settings
                </h2>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">
                  Configure your workspace
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-text-muted hover:text-text-primary transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-priority-high/5 border border-priority-high/10 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-priority-high">
                    <AlertTriangle size={18} />
                    <h3 className="text-sm font-bold">Danger Zone</h3>
                  </div>
                  <p className="text-xs text-text-secondary font-medium leading-relaxed">
                    Clearing all tasks is permanent and cannot be undone. Please be certain.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear all tasks? This cannot be undone.')) {
                        onClearAll();
                        onClose();
                      }
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-priority-high/10 hover:bg-priority-high text-priority-high hover:text-white text-xs font-bold transition-all duration-300"
                  >
                    <Trash2 size={14} />
                    Clear All Tasks
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col gap-3 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3 text-text-primary">
                    <RefreshCw size={18} />
                    <h3 className="text-sm font-bold">Resync Data</h3>
                  </div>
                  <p className="text-xs text-text-secondary font-medium">
                    Feature coming soon in the next update.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl text-xs font-bold text-text-primary transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
