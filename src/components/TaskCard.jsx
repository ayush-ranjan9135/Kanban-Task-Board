import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreVertical, Calendar, Trash2, Edit3, ChevronRight, ChevronLeft, AlignLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskCard = ({ task, onUpdate, onDelete, onMove, isOverlay }) => {
  const [showMenu, setShowMenu] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityConfigs = {
    High: { 
      color: 'text-priority-high', 
      bg: 'bg-priority-high/10', 
      border: 'border-priority-high',
      lightBorder: 'border-priority-high/30'
    },
    Medium: { 
      color: 'text-priority-medium', 
      bg: 'bg-priority-medium/10', 
      border: 'border-priority-medium',
      lightBorder: 'border-priority-medium/30'
    },
    Low: { 
      color: 'text-priority-low', 
      bg: 'bg-priority-low/10', 
      border: 'border-priority-low',
      lightBorder: 'border-priority-low/30'
    },
  };

  const pConfig = priorityConfigs[task.priority] || priorityConfigs.Medium;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ 
        opacity: isDragging ? 0.4 : 1, 
        y: 0, 
        scale: 1,
        rotate: isOverlay ? 2 : 0
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group relative mb-3 touch-none ${isOverlay ? 'z-50' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className={`
        bg-dark-card backdrop-blur-md p-4 rounded-xl border-l-4 ${pConfig.border}
        border border-black/5 dark:border-white/10
        transition-all duration-300 group-hover:border-accent-indigo/30
        ${isOverlay ? 'shadow-2xl shadow-accent-indigo/20' : 'shadow-sm hover:shadow-lg'}
        flex flex-col gap-3
      `}>
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <span className={`
            text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-black/5 dark:border-white/5
            ${pConfig.color} ${pConfig.bg}
          `}>
            {task.priority}
          </span>
          
          <div className="relative group/menu">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <MoreVertical size={14} />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-lg p-1 shadow-2xl z-50 backdrop-blur-xl"
                  onMouseLeave={() => setShowMenu(false)}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(task.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Edit3 size={12} /> Edit
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-bold hover:bg-priority-high/10 text-priority-high transition-colors"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-text-primary leading-snug line-clamp-2">
            {task.content}
          </h3>
          {task.description && (
            <p className="text-[11px] text-text-secondary line-clamp-2 font-medium">
              {task.description}
            </p>
          )}
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold">
            <Calendar size={10} />
            <span>{new Date(task.dueDate || task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); onMove(task.id, -1); }}
              disabled={task.column === 'To Do'}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-0 transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onMove(task.id, 1); }}
              disabled={task.column === 'Done'}
              className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-0 transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default TaskCard;
