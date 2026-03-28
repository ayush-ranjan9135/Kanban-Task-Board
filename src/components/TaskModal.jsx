import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, AlignLeft, Tag, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskModal = ({ isOpen, onClose, onSave, task, columns }) => {
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [column, setColumn] = useState('To Do');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setContent(task.content || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'Medium');
      setColumn(task.column || 'To Do');
      setDueDate(task.dueDate || '');
    } else {
      setContent('');
      setDescription('');
      setPriority('Medium');
      setColumn('To Do');
      setDueDate('');
    }
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSave({ content, description, priority, column, dueDate });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md"
          />

          {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-[1001]"
        >
          {/* Header */}
          <div className="p-8 pb-0 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-black text-text-primary tracking-tight">
                {task ? 'Edit Task' : 'New Task'}
              </h2>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-1">
                Project Dashboard
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-text-muted hover:text-text-primary transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 ml-1">
                  Task Title
                </label>
                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="What needs to be done?"
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-text-primary font-bold placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-accent-indigo/10 focus:border-accent-indigo transition-all"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 ml-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Add more details about this task..."
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-text-primary text-sm font-medium placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-accent-indigo/10 focus:border-accent-indigo transition-all resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                    Column
                  </label>
                  <select
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-accent-indigo/10 transition-all appearance-none cursor-pointer"
                  >
                    {columns.map(col => (
                      <option key={col} value={col} className="bg-white dark:bg-slate-900">{col}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-accent-indigo/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="High" className="bg-white dark:bg-slate-900">High</option>
                    <option value="Medium" className="bg-white dark:bg-slate-900">Medium</option>
                    <option value="Low" className="bg-white dark:bg-slate-900">Low</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-text-primary focus:outline-none focus:ring-4 focus:ring-accent-indigo/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-text-muted hover:text-text-primary transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="btn-primary py-2.5 px-8"
                >
                  <Save size={18} />
                  <span>{task ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;

