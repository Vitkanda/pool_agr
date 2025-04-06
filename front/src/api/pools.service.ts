/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/pools.service.ts
import api from "./api";
import { Pool } from "@/types/poolsTypes";

// interface PoolsResponse {
//   items: Pool[];
//   total: number;
// }

const PoolsService = {
  getAllPools: async (): Promise<Pool[]> => {
    const response = await api.get<Pool[]>('/pools');
    return response.data;
  },

  getPoolById: async (id: string): Promise<Pool> => {
    const response = await api.get<Pool>(`/pools/${id}`);
    return response.data;
  },

  createPool: async (pool: Partial<Pool>): Promise<Pool> => {
    const response = await api.post<Pool>("/pools", pool);
    return response.data;
  },

  updatePool: async (id: string, pool: Partial<Pool>): Promise<Pool> => {
    const response = await api.patch<Pool>(`/pools/${id}`, pool);
    return response.data;
  },

  deletePool: async (id: string): Promise<void> => {
    await api.delete(`/pools/${id}`);
  },
};

export default PoolsService;
