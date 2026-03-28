import React from 'react';
import { Kanban, Plus, LayoutList } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ onAddTask, message = "No tasks here yet" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-2xl w-full"
    >
      <div className="bg-accent-indigo/10 p-5 rounded-full mb-6 relative group">
        <div className="absolute inset-0 bg-accent-indigo/20 blur-xl rounded-full group-hover:bg-accent-indigo/40 transition-all duration-500" />
        <LayoutList size={40} className="text-accent-indigo relative z-10" />
      </div>
      
      <h3 className="text-lg font-bold text-text-primary mb-2">
        {message}
      </h3>
      <p className="text-sm text-text-secondary mb-8 max-w-[240px] leading-relaxed">
        Start by adding a new task to organize your workflow efficiently.
      </p>

      <button
        onClick={onAddTask}
        className="flex items-center gap-2 px-6 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary transition-all duration-300"
      >
        <Plus size={16} />
        Create Task
      </button>
    </motion.div>
  );
};

export default EmptyState;
