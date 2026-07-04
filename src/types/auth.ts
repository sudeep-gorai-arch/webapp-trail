import { User } from "./user";

export interface AuthRequest {
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type AuthProvider = "LOCAL" | "GOOGLE";