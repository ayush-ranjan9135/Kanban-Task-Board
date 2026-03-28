import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  defaultDropAnimationSideEffects 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  sortableKeyboardCoordinates, 
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Column from './components/Column';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import SettingsModal from './components/SettingsModal';
import { AnimatePresence, motion } from 'framer-motion';

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kanban-theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kanban-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const { 
    tasks, 
    allTasks,
    addTask, 
    updateTask, 
    deleteTask, 
    setTaskColumn, 
    reorderTasks,
    clearTasks,
    searchQuery, 
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    filterColumn,
    setFilterColumn,
    columns 
  } = useTasks();

  const [activeTask, setActiveTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultColumn, setDefaultColumn] = useState('To Do');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = allTasks.find(t => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = allTasks.find(t => t.id === activeId);
    const isOverTask = allTasks.find(t => t.id === overId);

    // If dragging over a column
    if (isActiveTask && !isOverTask) {
      const overColumn = overId;
      if (isActiveTask.column !== overColumn) {
        setTaskColumn(activeId, overColumn);
      }
    }

    // If dragging over another task
    if (isActiveTask && isOverTask) {
      if (isActiveTask.column !== isOverTask.column) {
        setTaskColumn(activeId, isOverTask.column);
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = allTasks.find(t => t.id === activeId);
    const overTask = allTasks.find(t => t.id === overId);

    if (activeTask && overTask && activeTask.column === overTask.column) {
      const oldIndex = allTasks.findIndex(t => t.id === activeId);
      const newIndex = allTasks.findIndex(t => t.id === overId);
      reorderTasks(arrayMove(allTasks, oldIndex, newIndex));
    }
  };

  const openAddTaskModal = (column = 'To Do') => {
    setEditingTask(null);
    setDefaultColumn(column);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (taskId) => {
    const task = allTasks.find(t => t.id === taskId);
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData.content, taskData.priority, taskData.column, taskData.description, taskData.dueDate);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-text-primary selection:bg-accent-indigo/30 selection:text-white transition-colors duration-300">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onFocusSearch={() => searchInputRef.current?.focus()}
      />
      
      <div className="kanban-container py-2 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
        <div className="flex-1">
          <SearchBar 
            inputRef={searchInputRef}
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            filterColumn={filterColumn}
            setFilterColumn={setFilterColumn}
            columns={columns}
          />
        </div>
        
        <div className="flex items-center px-4 lg:px-0">
          <button
            onClick={() => openAddTaskModal()}
            className="btn-primary w-full sm:w-auto h-12 animate-fade shrink-0 whitespace-nowrap"
          >
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      <main className="kanban-container flex-1 overflow-hidden flex flex-col pt-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 flex gap-6 overflow-x-auto pb-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {columns.map((columnTitle, index) => (
              <motion.div
                key={columnTitle}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <Column
                  title={columnTitle}
                  tasks={tasks.filter((t) => t.column === columnTitle)}
                  onUpdate={openEditTaskModal}
                  onDelete={deleteTask}
                  onMove={(id, dir) => {
                    const task = allTasks.find(t => t.id === id);
                    const currentIndex = columns.indexOf(task.column);
                    const nextIndex = currentIndex + dir;
                    if (nextIndex >= 0 && nextIndex < columns.length) {
                      setTaskColumn(id, columns[nextIndex]);
                    }
                  }}
                  onAddTask={openAddTaskModal}
                />
              </motion.div>
            ))}
          </div>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask ? (
              <TaskCard 
                task={activeTask} 
                isOverlay 
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        columns={columns}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onClearAll={clearTasks}
      />
      
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-indigo/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}

export default App;
