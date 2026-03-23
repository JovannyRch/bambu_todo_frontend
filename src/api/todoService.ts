import type {
  Todo,
  CreateTodoDto,
  UpdateTodoDto,
  ListTodoDto,
  PaginatedResponse,
} from "../types/todo";
import { authService } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

class TodoService {
  private baseURL: string;

  constructor() {
    this.baseURL = `${API_BASE_URL}/v1/todo`;
  }

  async getAllTodos(query?: ListTodoDto): Promise<PaginatedResponse<Todo>> {
    try {
      const params = new URLSearchParams();
      if (query?.page) params.append("page", query.page.toString());
      if (query?.limit) params.append("limit", query.limit.toString());
      if (query?.prioridad) params.append("prioridad", query.prioridad);
      if (typeof query?.finalizada === "boolean")
        params.append("finalizada", query.finalizada.toString());

      const url = `${this.baseURL}/list${params.toString() ? `?${params.toString()}` : ""}`;
      console.log("🔍 Fetching todos from:", url);
      const headers = authService.getAuthHeaders();
      console.log("📤 Request headers:", headers);

      const response = await fetch(url, {
        headers,
      });

      console.log("📥 Response status:", response.status, response.statusText);

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const result = await response.json();
      console.log("✅ Response received:", result);

      return result;
    } catch (error) {
      console.error("❌ Error fetching todos:", error);
      throw error;
    }
  }

  async getTodoById(id: string): Promise<Todo> {
    try {
      const response = await fetch(`${this.baseURL}/list/${id}`, {
        headers: authService.getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch todo");
      }
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Error fetching todo:", error);
      throw error;
    }
  }

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    try {
      const response = await fetch(`${this.baseURL}/create`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  async updateTodo(id: string, updates: UpdateTodoDto): Promise<Todo> {
    try {
      const response = await fetch(`${this.baseURL}/update/${id}`, {
        method: "PATCH",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/list/${id}`, {
        method: "DELETE",
        headers: authService.getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }

  async toggleTodoComplete(id: string, finalizada: boolean): Promise<Todo> {
    return this.updateTodo(id, { finalizada });
  }
}

export const todoService = new TodoService();
