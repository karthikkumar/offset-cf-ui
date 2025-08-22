import axios from 'axios';
import type { Merchant, Store, OptIn, PaginatedResponse, OptInFilters } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Merchants
export const merchantApi = {
  register: async (data: Omit<Merchant, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<Merchant>('/merchants', data);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Merchant>(`/merchants/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<Merchant>) => {
    const response = await api.put<Merchant>(`/merchants/${id}`, data);
    return response.data;
  },
};

// Stores
export const storeApi = {
  create: async (data: Omit<Store, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<Store>('/stores', data);
    return response.data;
  },

  getByMerchantId: async (merchantId: string) => {
    const response = await api.get<Store[]>(`/merchants/${merchantId}/stores`);
    return response.data;
  },

  update: async (id: string, data: Partial<Store>) => {
    const response = await api.put<Store>(`/stores/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/stores/${id}`);
  },
};

// Opt-ins
export const optInApi = {
  getPaginated: async (filters: OptInFilters, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    // Only add filters that are not 'all'
    if (filters.storeId && filters.storeId !== 'all') {
      params.append('storeId', filters.storeId);
    }
    if (filters.month) {
      params.append('month', filters.month);
    }
    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const response = await api.get<PaginatedResponse<OptIn>>(`/opt-ins?${params}`);
    return response.data;
  },

  export: async (filters: OptInFilters) => {
    const params = new URLSearchParams();
    
    // Only add filters that are not 'all'
    if (filters.storeId && filters.storeId !== 'all') {
      params.append('storeId', filters.storeId);
    }
    if (filters.month) {
      params.append('month', filters.month);
    }
    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const response = await api.get(`/opt-ins/export?${params}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
