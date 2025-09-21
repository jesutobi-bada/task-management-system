import { create } from "zustand";
import { persist } from 'zustand/middleware';

// Types
export type TodoStatus = 'todo' | 'in-progress' | 'complete';
export type TodoPriority = 'urgent' | 'important' | 'normal' | 'low';

export interface TodoAssignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  dates?: {
    startDate?: string; // ISO date string
    endDate?: string;   // ISO date string
  };
  assignees: TodoAssignee[];
  priority?: TodoPriority;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoStore {
  todoList: Todo[];
  
  // CRUD operations
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  deleteTodo: (id: string) => void;
  
  // Status management
  moveToNext: (id: string) => void;
  moveToPrevious: (id: string) => void;
  setStatus: (id: string, status: TodoStatus) => void;
  
  // Getters
  getTodoById: (id: string) => Todo | undefined;
  getTodosByStatus: (status: TodoStatus) => Todo[];
  getAllTodos: () => Todo[];
  
  // Bulk operations
  clearCompleted: () => void;
  clearAll: () => void;
}

// Status progression order
const STATUS_ORDER: TodoStatus[] = ['todo', 'in-progress', 'complete'];

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create store
export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todoList: [],

      // Add new todo
      addTodo: (todoData) => {
        const newTodo: Todo = {
          ...todoData,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          todoList: [...state.todoList, newTodo],
        }));
      },

      // Update existing todo
      updateTodo: (id, updates) => {
        set((state) => ({
          todoList: state.todoList.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
              : todo
          ),
        }));
      },

      // Delete todo
      deleteTodo: (id) => {
        set((state) => ({
          todoList: state.todoList.filter((todo) => todo.id !== id),
        }));
      },

      // Move todo to next status
      moveToNext: (id) => {
        const todo = get().getTodoById(id);
        if (!todo) return;

        const currentIndex = STATUS_ORDER.indexOf(todo.status);
        if (currentIndex < STATUS_ORDER.length - 1) {
          const nextStatus = STATUS_ORDER[currentIndex + 1];
          get().setStatus(id, nextStatus);
        }
      },

      // Move todo to previous status
      moveToPrevious: (id) => {
        const todo = get().getTodoById(id);
        if (!todo) return;

        const currentIndex = STATUS_ORDER.indexOf(todo.status);
        if (currentIndex > 0) {
          const previousStatus = STATUS_ORDER[currentIndex - 1];
          get().setStatus(id, previousStatus);
        }
      },

      // Set specific status
      setStatus: (id, status) => {
        get().updateTodo(id, { status });
      },

      // Get todo by ID
      getTodoById: (id) => {
        return get().todoList.find((todo) => todo.id === id);
      },

      // Get todos by status
      getTodosByStatus: (status) => {
        return get().todoList.filter((todo) => todo.status === status);
      },

      // Get all todos
      getAllTodos: () => {
        return get().todoList;
      },

      // Clear completed todos
      clearCompleted: () => {
        set((state) => ({
          todoList: state.todoList.filter((todo) => todo.status !== 'complete'),
        }));
      },

      // Clear all todos
      clearAll: () => {
        set({ todoList: [] });
      },
    }),
    {
      name: 'todo-storage', // Key for localStorage
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Handle migrations if you need to change the data structure later
        return persistedState;
      },
    }
  )
);

// Selector hooks for better performance
export const useTodosByStatus = (status: TodoStatus) => {
  return useTodoStore((state) => state.getTodosByStatus(status));
};

export const useTodoStats = () => {
  return useTodoStore((state) => {
    const todos = state.getAllTodos();
    return {
      total: todos.length,
      todo: todos.filter(t => t.status === 'todo').length,
      inProgress: todos.filter(t => t.status === 'in-progress').length,
      completed: todos.filter(t => t.status === 'complete').length,
    };
  });
};