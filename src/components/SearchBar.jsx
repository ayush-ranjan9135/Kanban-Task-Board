import React from 'react';
import { Search, Filter, ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const SearchBar = ({ 
  inputRef,
  searchQuery, 
  setSearchQuery, 
  filterPriority, 
  setFilterPriority,
  filterColumn,
  setFilterColumn,
  columns 
}) => {
  return (
    <div className="kanban-container flex flex-col lg:flex-row gap-4 items-stretch lg:items-center py-4">
      <div className="relative flex-[2] group animate-fade">
        <Search 
          size={18} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-indigo transition-colors"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl pl-12 pr-10 h-12 text-sm font-medium text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-accent-indigo/10 focus:border-accent-indigo transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-fade flex-1">
        <div className="flex flex-1 items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-2xl h-12">
          <SlidersHorizontal size={14} className="text-text-muted ml-1" />
          
          <div className="relative flex-1">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-text-secondary hover:text-text-primary cursor-pointer appearance-none pl-1 pr-6 focus:outline-none transition-colors"
            >
              <option value="All" className="bg-dark-bg text-text-primary">All Priorities</option>
              <option value="High" className="bg-dark-bg text-text-primary">High Priority</option>
              <option value="Medium" className="bg-dark-bg text-text-primary">Medium Priority</option>
              <option value="Low" className="bg-dark-bg text-text-primary">Low Priority</option>
            </select>
            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
          </div>

          <div className="w-[1px] h-4 bg-white/10 mx-1" />

          <div className="relative flex-1">
            <select
              value={filterColumn}
              onChange={(e) => setFilterColumn(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-text-secondary hover:text-text-primary cursor-pointer appearance-none pl-1 pr-6 focus:outline-none transition-colors"
            >
              <option value="All" className="bg-dark-bg text-text-primary">All Stages</option>
              {columns.map(col => (
                <option key={col} value={col} className="bg-dark-bg text-text-primary">{col}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
