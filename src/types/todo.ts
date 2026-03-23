export type Priority = "alta" | "media" | "baja";

export interface Todo {
  id: string;
  nombre: string;
  descripcion?: string;
  prioridad?: Priority;
  finalizada: boolean;
  userId?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface CreateTodoDto {
  nombre: string;
  descripcion?: string;
  prioridad?: Priority;
}

export interface UpdateTodoDto {
  nombre?: string;
  descripcion?: string;
  prioridad?: Priority;
  finalizada?: boolean;
}

export interface ListTodoDto {
  page?: number;
  limit?: number;
  prioridad?: Priority;
  finalizada?: boolean;
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
