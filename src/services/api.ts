import axios from 'axios';
import type { Merchant, Store, MonthlySummaryResponse, OptInFilters } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.offsetcf.com';

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
  getMonthlySummary: async (filters: OptInFilters) => {
    const params = new URLSearchParams();
    
    let storeId = '';
    // Only add filters that are not 'all'
    if (filters.store_id && filters.store_id !== 'all') {
      storeId = filters.store_id;
    }
    if (filters.month) {
      params.append('month', filters.month);
    }
    
    // Ensure we have a storeId before making the API call
    if (!storeId) {
      throw new Error('Store ID is required');
    }
    
    const response = await api.get<MonthlySummaryResponse>(`/v1/merchant/${storeId}/monthly-summary?${params}`);
    return response.data;
  },

  export: async (filters: OptInFilters) => {
    const params = new URLSearchParams();
    
    let storeId = '';
    // Only add filters that are not 'all'
    if (filters.store_id && filters.store_id !== 'all') {
      storeId = filters.store_id;
    }
    if (filters.month) {
      params.append('month', filters.month);
    }
    
    // Ensure we have a storeId before making the API call
    if (!storeId) {
      throw new Error('Store ID is required');
    }
    
    const response = await api.get(`/v1/merchant/${storeId}/monthly-summary/export?${params}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
