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

export interface DailyOptInData {
  day: string;
  opt_ins: number;
  estimated_offset: number;
}

export interface MonthlySummaryResponse {
  store: string;
  month: string;
  currency: string;
  totals: {
    opt_ins: number;
    estimated_offset: number;
  };
  daily: DailyOptInData[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OptInFilters {
  store_id?: string;
  month?: string; // YYYY-MM format
}
