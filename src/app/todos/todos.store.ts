import React from 'react';
import { create } from "zustand";
import { persist } from 'zustand/middleware';

// Types
export type TodoStatus = 'todo' | 'in-progress' | 'complete';
export type TodoPriority = 'urgent' | 'important' | 'medium' | 'low';

export interface TodoAssignee {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  dates?: {
    startDate?: string;
    endDate?: string;
  };
  assignees: TodoAssignee[];
  priority?: TodoPriority;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  current_page: number;
  total_pages: number;
  rows_per_page: number;
  total_rows_approx: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
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
  
  // Non-paginated getters (existing functionality)
  getTodoById: (id: string) => Todo | undefined;
  getTodosByStatus: (status: TodoStatus) => Todo[];
  getAllTodos: () => Todo[];
  
  // Paginated getters
  getPaginatedTodos: (options?: PaginationOptions) => PaginatedResponse<Todo>;
  getPaginatedTodosByStatus: (status: TodoStatus, options?: PaginationOptions) => PaginatedResponse<Todo>;
  getPaginatedTodosByPriority: (priority: TodoPriority, options?: PaginationOptions) => PaginatedResponse<Todo>;
  getPaginatedTodosByAssignee: (assigneeId: string, options?: PaginationOptions) => PaginatedResponse<Todo>;
  
  // Search with pagination
  searchTodos: (query: string, options?: PaginationOptions) => PaginatedResponse<Todo>;
  
  // Bulk operations
  clearCompleted: () => void;
  clearAll: () => void;
}

// Status progression order
const STATUS_ORDER: TodoStatus[] = ['todo', 'in-progress', 'complete'];

// Default pagination settings
const DEFAULT_PAGE_SIZE = 10;

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Pagination utility function
const paginateArray = <T>(
  array: T[], 
  page: number = 1, 
  limit: number = DEFAULT_PAGE_SIZE
): PaginatedResponse<T> => {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      current_page: currentPage,
      total_pages: totalPages,
      rows_per_page: limit,
      total_rows_approx: totalItems,
    }
  };
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

      // Get todo by ID (non-paginated)
      getTodoById: (id) => {
        return get().todoList.find((todo) => todo.id === id);
      },

      // Get todos by status (non-paginated)
      getTodosByStatus: (status) => {
        return get().todoList.filter((todo) => todo.status === status);
      },

      // Get all todos (non-paginated)
      getAllTodos: () => {
        return get().todoList;
      },

      // Get paginated todos
      getPaginatedTodos: (options = {}) => {
        const { page = 1, limit = DEFAULT_PAGE_SIZE } = options;
        const todos = get().todoList;
        return paginateArray(todos, page, limit);
      },

      // Get paginated todos by status
      getPaginatedTodosByStatus: (status, options = {}) => {
        const { page = 1, limit = DEFAULT_PAGE_SIZE } = options;
        const todos = get().todoList.filter((todo) => todo.status === status);
        return paginateArray(todos, page, limit);
      },

      // Get paginated todos by priority
      getPaginatedTodosByPriority: (priority, options = {}) => {
        const { page = 1, limit = DEFAULT_PAGE_SIZE } = options;
        const todos = get().todoList.filter((todo) => todo.priority === priority);
        return paginateArray(todos, page, limit);
      },

      // Get paginated todos by assignee
      getPaginatedTodosByAssignee: (assigneeId, options = {}) => {
        const { page = 1, limit = DEFAULT_PAGE_SIZE } = options;
        const todos = get().todoList.filter((todo) => 
          todo.assignees.some(assignee => assignee.id === assigneeId)
        );
        return paginateArray(todos, page, limit);
      },

      // Search todos with pagination
      searchTodos: (query, options = {}) => {
        const { page = 1, limit = DEFAULT_PAGE_SIZE } = options;
        const searchQuery = query.toLowerCase();
        const todos = get().todoList.filter((todo) =>
          todo.title.toLowerCase().includes(searchQuery) ||
          todo.description?.toLowerCase().includes(searchQuery) ||
          todo.assignees.some(assignee => 
            `${assignee.firstName} ${assignee.lastName}`.toLowerCase().includes(searchQuery)
          )
        );
        return paginateArray(todos, page, limit);
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
      name: 'todo-storage',
      version: 1,
    }
  )
);

// Custom hooks for paginated data
export const usePaginatedTodos = (options?: PaginationOptions) => {
  const allTodos = useTodoStore((state) => state.todoList);
  const { page = 1, limit = DEFAULT_PAGE_SIZE } = options || {};
  
  return React.useMemo(() => {
    return paginateArray(allTodos, page, limit);
  }, [allTodos, page, limit]);
};

export const usePaginatedTodosByStatus = (status: TodoStatus, options?: PaginationOptions) => {
  const allTodos = useTodoStore((state) => state.todoList);
  const { page = 1, limit = DEFAULT_PAGE_SIZE } = options || {};
  
  return React.useMemo(() => {
    const filteredTodos = allTodos.filter(todo => todo.status === status);
    return paginateArray(filteredTodos, page, limit);
  }, [allTodos, status, page, limit]);
};

export const usePaginatedTodosByPriority = (priority: TodoPriority, options?: PaginationOptions) => {
  const allTodos = useTodoStore((state) => state.todoList);
  const { page = 1, limit = DEFAULT_PAGE_SIZE } = options || {};
  
  return React.useMemo(() => {
    const filteredTodos = allTodos.filter(todo => todo.priority === priority);
    return paginateArray(filteredTodos, page, limit);
  }, [allTodos, priority, page, limit]);
};

export const usePaginatedTodosByAssignee = (assigneeId: string, options?: PaginationOptions) => {
  const allTodos = useTodoStore((state) => state.todoList);
  const { page = 1, limit = DEFAULT_PAGE_SIZE } = options || {};
  
  return React.useMemo(() => {
    const filteredTodos = allTodos.filter(todo => 
      todo.assignees.some(assignee => assignee.id === assigneeId)
    );
    return paginateArray(filteredTodos, page, limit);
  }, [allTodos, assigneeId, page, limit]);
};

export const useSearchTodos = (query: string, options?: PaginationOptions) => {
  const allTodos = useTodoStore((state) => state.todoList);
  const { page = 1, limit = DEFAULT_PAGE_SIZE } = options || {};
  
  return React.useMemo(() => {
    const searchQuery = query.toLowerCase();
    const filteredTodos = allTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery) ||
      todo.description?.toLowerCase().includes(searchQuery) ||
      todo.assignees.some(assignee => 
        `${assignee.firstName} ${assignee.lastName}`.toLowerCase().includes(searchQuery)
      )
    );
    return paginateArray(filteredTodos, page, limit);
  }, [allTodos, query, page, limit]);
};

// Keep existing hooks for backward compatibility
export const useTodosByStatus = (status: TodoStatus) => {
  const allTodos = useTodoStore((state) => state.todoList);
  
  return React.useMemo(() => {
    return allTodos.filter(todo => todo.status === status);
  }, [allTodos, status]);
};

export const useTodoStats = () => {
  const allTodos = useTodoStore((state) => state.todoList);
  
  return React.useMemo(() => {
    return {
      total: allTodos.length,
      todo: allTodos.filter(t => t.status === 'todo').length,
      inProgress: allTodos.filter(t => t.status === 'in-progress').length,
      completed: allTodos.filter(t => t.status === 'complete').length,
    };
  }, [allTodos]);
};