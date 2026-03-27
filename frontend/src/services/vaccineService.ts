import api from "@/lib/api";
import type { VaccineRecord, VaccineRequest } from "@/types";

export const vaccineService = {
  getByBabyId: async (babyId: number): Promise<VaccineRecord[]> => {
    const response = await api.get<VaccineRecord[]>(`/babies/${babyId}/vaccines`);
    return response.data;
  },

  create: async (babyId: number, data: VaccineRequest): Promise<VaccineRecord> => {
    const response = await api.post<VaccineRecord>(`/babies/${babyId}/vaccines`, data);
    return response.data;
  },

  update: async (id: number, data: VaccineRequest): Promise<VaccineRecord> => {
    const response = await api.put<VaccineRecord>(`/vaccines/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/vaccines/${id}`);
  },
};