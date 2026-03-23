export type Priority = "alta" | "media" | "baja";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  completed: boolean;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  priority?: Priority;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  priority?: Priority;
  completed?: boolean;
}

export interface ListTodoDto {
  page?: number;
  limit?: number;
  priority?: Priority;
  completed?: boolean;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TodoReport {
  totalTodos: number;
  completedTodos: number;
  pendingTodos: number;
  completionRate: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  report: TodoReport;
}
