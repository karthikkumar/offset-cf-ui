export interface Merchant {
  id: string;
  name: string;
  email: string;
  company: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  merchantId: string;
  name: string;
  domain: string;
  widgetConfig: WidgetConfig;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetConfig {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  textColor: string;
  enabled: boolean;
  customMessage?: string;
}

export interface OptIn {
  id: string;
  storeId: string;
  storeName: string;
  merchantId: string;
  merchantName: string;
  customerEmail: string;
  customerName?: string;
  optInDate: string;
  source: 'widget' | 'api' | 'manual';
  status: 'active' | 'inactive';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OptInFilters {
  storeId?: 'all' | string;
  month?: string; // YYYY-MM format
  status?: 'all' | string;
  search?: string;
}
