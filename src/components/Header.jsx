import React, { useState } from 'react';
import { Layout, Moon, Sun, Bell, User, Search, Settings, LogOut, Shield, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ theme, toggleTheme, onOpenSettings, onFocusSearch }) => {
  const isDark = theme === 'dark';
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, text: 'New task "Design UI" added', time: '2m ago', icon: <Layout size={12} className="text-accent-indigo" /> },
    { id: 2, text: 'Task "API Integration" completed', time: '1h ago', icon: <Check size={12} className="text-priority-low" /> },
  ];

  return (
    <header className="kanban-container py-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-[50]">
      <div className="flex items-center gap-4 animate-fade">
        <div className="bg-gradient-to-br from-accent-indigo to-accent-purple p-3 rounded-2xl shadow-lg shadow-accent-indigo/20 ring-4 ring-white/5">
          <Layout size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent transition-all duration-500">
            Kanban Board
          </h1>
          <p className="text-sm font-medium text-text-muted tracking-wide uppercase text-[10px] transition-colors duration-500">
            Manage your workflow efficiently
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 animate-fade">
        {/* Quick Search Trigger */}
        <div 
          onClick={onFocusSearch}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-text-muted text-xs font-medium cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-colors mr-2 group"
        >
          <Search size={14} className="group-hover:text-accent-indigo transition-colors" />
          <span>Quick find...</span>
          <span className="ml-4 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-[9px]">⌘K</span>
        </div>

        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors duration-500 relative">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all duration-300 ${isDark ? 'bg-white/10 text-white shadow-inner ring-1 ring-white/10' : 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200'}`}
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className={`p-2 rounded-xl transition-all relative ${showNotifications ? 'bg-slate-200 dark:bg-white/10 text-text-primary' : 'text-text-muted hover:text-text-primary hover:bg-slate-200 dark:hover:bg-white/10'}`}
            >
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-priority-high rounded-full border-2 border-slate-100 dark:border-dark-bg transition-transform hover:scale-110" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden"
                >
                  <div className="p-3 border-b border-black/5 dark:border-white/5 mb-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-text-muted">Notifications</h3>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors flex gap-3">
                      <div className="mt-0.5">{n.icon}</div>
                      <div>
                        <p className="text-[11px] font-bold text-text-primary leading-tight">{n.text}</p>
                        <p className="text-[10px] text-text-muted mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2 mt-2 text-[10px] font-bold text-accent-indigo hover:bg-accent-indigo/5 rounded-lg transition-colors">
                    View all notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-bold"
          >
            <Settings size={18} />
          </button>
        </div>

        <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10 mx-1" />

        <div className="relative">
          <div 
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="group relative cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] shadow-lg transition-all duration-300 group-hover:scale-105 active:scale-95 ${showProfile ? 'ring-4 ring-accent-indigo/20' : 'shadow-accent-indigo/10'}`}>
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-dark-bg flex items-center justify-center overflow-hidden transition-colors duration-500">
                <User size={20} className="text-slate-600 dark:text-white/80" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-priority-low rounded-full border-2 border-white dark:border-dark-bg translate-x-1/4 -translate-y-1/4" />
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl p-2 shadow-2xl"
                onMouseLeave={() => setShowProfile(false)}
              >
                <div className="p-3 border-b border-black/5 dark:border-white/5 mb-2">
                  <p className="text-xs font-black text-text-primary">ProDesk User</p>
                  <p className="text-[10px] text-text-muted leading-none mt-1">pro@desk.it</p>
                </div>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  <User size={14} /> My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  <Shield size={14} /> Security
                </button>
                <div className="h-[1px] bg-black/5 dark:bg-white/5 my-2" />
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-priority-high hover:bg-priority-high/5 transition-all">
                  <LogOut size={14} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
