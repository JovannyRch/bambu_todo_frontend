export interface User {
  id: string;
  nombre: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user?: User;
}
