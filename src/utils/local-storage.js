const STORAGE_KEY = 'kanban-board-tasks';

export const saveTasks = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, serializedTasks);
  } catch (err) {
    console.error('Could not save tasks to local storage:', err);
  }
};

export const loadTasks = () => {
  try {
    const serializedTasks = localStorage.getItem(STORAGE_KEY);
    if (serializedTasks === null) {
      return [];
    }
    return JSON.parse(serializedTasks);
  } catch (err) {
    console.error('Could not load tasks from local storage:', err);
    return [];
  }
};
