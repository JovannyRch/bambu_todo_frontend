import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Todo, CreateTodoDto, UpdateTodoDto, ListTodoDto, PaginationMeta, TodoReport } from '../types/todo';
import { todoService } from '../api/todoService';

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  meta: PaginationMeta | null;
  report: TodoReport | null;
  fetchTodos: (query?: ListTodoDto) => Promise<void>;
  addTodo: (todo: CreateTodoDto) => Promise<void>;
  updateTodo: (id: string, updates: UpdateTodoDto) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [report, setReport] = useState<TodoReport | null>(null);

  const fetchTodos = async (query?: ListTodoDto) => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getAllTodos(query);
      setTodos(response.data);
      setMeta(response.meta);
      setReport(response.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo: CreateTodoDto) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
      
      setReport((prev) => {
        if (!prev) return prev;
        const newTotal = prev.totalTodos + 1;
        const newPending = prev.pendingTodos + 1;
        return {
          ...prev,
          totalTodos: newTotal,
          pendingTodos: newPending,
          completionRate: (prev.completedTodos / newTotal) * 100,
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err;
    }
  };

  const updateTodo = async (id: string, updates: UpdateTodoDto) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      const todoToDelete = todos.find((t) => t.id === id);
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      
      // Update report optimistically
      if (todoToDelete) {
        setReport((prev) => {
          if (!prev) return prev;
          const newTotal = prev.totalTodos - 1;
          const newCompleted = todoToDelete.completed ? prev.completedTodos - 1 : prev.completedTodos;
          const newPending = todoToDelete.completed ? prev.pendingTodos : prev.pendingTodos - 1;
          return {
            ...prev,
            totalTodos: newTotal,
            completedTodos: newCompleted,
            pendingTodos: newPending,
            completionRate: newTotal > 0 ? (newCompleted / newTotal) * 100 : 0,
          };
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      setError(null);
      const updatedTodo = await todoService.toggleTodoComplete(id, completed);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      
      setReport((prev) => {
        if (!prev) return prev;
        const newCompleted = completed ? prev.completedTodos + 1 : prev.completedTodos - 1;
        const newPending = completed ? prev.pendingTodos - 1 : prev.pendingTodos + 1;
        return {
          ...prev,
          completedTodos: newCompleted,
          pendingTodos: newPending,
          completionRate: (newCompleted / prev.totalTodos) * 100,
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
      throw err;
    }
  };

  const value = {
    todos,
    loading,
    error,
    meta,
    report,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
