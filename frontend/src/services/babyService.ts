import api from "@/lib/api";
import type { Baby, BabyRequest } from "@/types";

export const babyService = {
  getAll: async (): Promise<Baby[]> => {
    const response = await api.get<Baby[]>("/babies");
    return response.data;
  },

  getById: async (id: number): Promise<Baby> => {
    const response = await api.get<Baby>(`/babies/${id}`);
    return response.data;
  },

  create: async (data: BabyRequest): Promise<Baby> => {
    const response = await api.post<Baby>("/babies", data);
    return response.data;
  },

  update: async (id: number, data: BabyRequest): Promise<Baby> => {
    const response = await api.put<Baby>(`/babies/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/babies/${id}`);
  },

  search: async (query: string): Promise<Baby[]> => {
    const response = await api.get<Baby[]>(`/babies/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};