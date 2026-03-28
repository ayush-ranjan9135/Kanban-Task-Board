import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, MoreHorizontal } from 'lucide-react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

const Column = ({ title, tasks, onAddTask, onMove, onDelete, onUpdate }) => {
  const titleColor = title === 'To Do' ? 'bg-priority-high' : title === 'In Progress' ? 'bg-priority-medium' : 'bg-priority-low';

  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  return (
    <div className={`
      flex flex-col min-w-[320px] flex-1 min-h-[calc(100vh-280px)] glass rounded-2xl p-5
      transition-all duration-300 border border-white/10
      ${isOver ? 'bg-accent-indigo/5 border-accent-indigo/50 shadow-glow ring-2 ring-accent-indigo/20 scale-[1.01]' : 'bg-dark-column'}
    `}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${titleColor}`} />
          <h2 className="font-bold text-sm tracking-tight text-text-primary uppercase group-hover:text-accent-indigo transition-colors">
            {title}
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[10px] font-bold text-text-muted border border-black/5 dark:border-white/5">
            {tasks.length}
          </span>
        </div>
        <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Task List container */}
      <div 
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-3"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length > 0 ? (
            <div className="flex flex-col gap-3">
              {tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onUpdate={onUpdate} 
                  onDelete={onDelete} 
                  onMove={onMove} 
                />
              ))}
            </div>
          ) : (
            !isOver && (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState message={`No tasks in ${title}`} onAddTask={() => onAddTask(title)} />
              </div>
            )
          )}
        </SortableContext>
        
        {/* Helper visual when empty and dragging over */}
        {isOver && tasks.length === 0 && (
          <div className="h-24 rounded-xl border-2 border-dashed border-accent-indigo/30 bg-accent-indigo/5" />
        )}
      </div>

      {/* Add Task Button */}
      <div className="flex items-center justify-center py-4 group/btn">
        <button 
          onClick={() => onAddTask(title)}
          className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-accent-indigo transition-all duration-300 py-2 px-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Plus size={14} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default Column;
