import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/local-storage';

const INITIAL_COLUMNS = ['To Do', 'In Progress', 'Done'];

const DEFAULT_TASKS = [
  { id: '1', content: 'Design the landing page', priority: 'High', column: 'To Do', createdAt: new Date().toISOString() },
  { id: '2', content: 'Implement authentication', priority: 'Medium', column: 'To Do', createdAt: new Date().toISOString() },
  { id: '3', content: 'Setup database schema', priority: 'High', column: 'In Progress', createdAt: new Date().toISOString() },
  { id: '4', content: 'Research Kanban patterns', priority: 'Low', column: 'Done', createdAt: new Date().toISOString() },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const loaded = loadTasks();
    return loaded.length > 0 ? loaded : DEFAULT_TASKS;
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterColumn, setFilterColumn] = useState('All');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (content, priority, column = 'To Do', description = '', dueDate = '') => {
    const newTask = {
      id: crypto.randomUUID(),
      content,
      priority,
      column,
      description,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id, direction) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const currentIndex = INITIAL_COLUMNS.indexOf(task.column);
          const nextIndex = currentIndex + direction;
          if (nextIndex >= 0 && nextIndex < INITIAL_COLUMNS.length) {
            return { ...task, column: INITIAL_COLUMNS[nextIndex] };
          }
        }
        return task;
      })
    );
  };

  const setTaskColumn = (id, column) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, column } : task))
    );
  };

  const reorderTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesColumn = filterColumn === 'All' || task.column === filterColumn;
    return matchesSearch && matchesPriority && matchesColumn;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    setTaskColumn,
    reorderTasks,
    clearTasks,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
    filterColumn,
    setFilterColumn,
    columns: INITIAL_COLUMNS,
  };
};
