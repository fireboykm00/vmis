import api from "@/lib/api";
import type { JwtResponse, LoginRequest, RegisterRequest, User } from "@/types";

export const authService = {
  login: async (data: LoginRequest): Promise<JwtResponse> => {
    const response = await api.post<JwtResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<JwtResponse> => {
    const response = await api.post<JwtResponse>("/auth/register", data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};