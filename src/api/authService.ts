import type { LoginDto, RegisterDto, AuthResponse } from "../types/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

class AuthService {
  private baseURL: string;
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "auth_user";

  constructor() {
    this.baseURL = `${API_BASE_URL}/v1`;
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to register");
      }

      const authData = await response.json();
      if (authData.access_token) {
        this.setToken(authData.access_token);
      }
      if (authData.user) {
        this.setUser(authData.user);
      }
      return authData;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to login");
      }

      const authData = await response.json();

      if (authData.access_token) {
        this.setToken(authData.access_token);
      
      }
      if (authData.user) {
        this.setUser(authData.user);
      }
      return authData;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    if (!token) {
      return {
        "Content-Type": "application/json",
      };
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}

export const authService = new AuthService();
